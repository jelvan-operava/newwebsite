/**
 * OPERAVA Global Solutions — First-Party Cache Manager
 * Architecture: Centralized CacheStorage API wrapper with automatic cache versioning,
 * namespace isolation, configurable TTLs, and zero caching of sensitive or mutating endpoints.
 */
(function(window) {
  'use strict';

  var CACHE_VERSION = 'v1';
  var CACHE_PREFIX = 'operava-';

  var CACHE_NAMESPACES = {
    static: CACHE_PREFIX + 'static-' + CACHE_VERSION,
    runtime: CACHE_PREFIX + 'runtime-' + CACHE_VERSION,
    api: CACHE_PREFIX + 'api-' + CACHE_VERSION
  };

  // Centralized TTL configuration (in seconds)
  var CACHE_TTL = {
    STATIC_ASSETS: 86400 * 30, // 30 days
    IMAGES: 86400 * 14,        // 14 days
    API_DATA: 60 * 5,          // 5 minutes for read-only catalog/health data
    RUNTIME_HTML: 3600 * 2     // 2 hours
  };

  // Strict denylist of sensitive endpoints that must NEVER be cached
  var SENSITIVE_PATTERNS = [
    '/api/contact',
    '/api/talent',
    '/api/resume',
    '/api/referral',
    '/api/session/logout',
    '/api/session/refresh',
    'auth',
    'password',
    'token',
    'payment',
    'credit',
    'cvv'
  ];

  function isCacheSupported() {
    return typeof window !== 'undefined' && 'caches' in window;
  }

  function isSensitive(url) {
    if (!url) return true;
    var str = url.toLowerCase();
    for (var i = 0; i < SENSITIVE_PATTERNS.length; i++) {
      if (str.indexOf(SENSITIVE_PATTERNS[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  var OperavaCache = {
    VERSION: CACHE_VERSION,
    NAMESPACES: CACHE_NAMESPACES,
    TTL: CACHE_TTL,

    isSupported: function() {
      return isCacheSupported();
    },

    initializeCache: function() {
      if (!isCacheSupported()) {
        return Promise.resolve(false);
      }

      // Automatically clean up old versions from previous deployments
      return caches.keys().then(function(cacheKeys) {
        var currentValues = Object.values(CACHE_NAMESPACES);
        var deletionPromises = cacheKeys.filter(function(key) {
          // Check if this is an operava cache but not one of our current namespaces
          return key.indexOf(CACHE_PREFIX) === 0 && currentValues.indexOf(key) === -1;
        }).map(function(obsoleteKey) {
          console.info('[OperavaCache] Purging obsolete cache:', obsoleteKey);
          return caches.delete(obsoleteKey);
        });

        return Promise.all(deletionPromises);
      }).then(function() {
        return true;
      }).catch(function(err) {
        console.warn('[OperavaCache] Initialization error (safe fallback):', err);
        return false;
      });
    },

    getCachedData: function(namespace, requestUrl) {
      if (!isCacheSupported() || isSensitive(requestUrl)) {
        return Promise.resolve(null);
      }

      var targetCacheName = CACHE_NAMESPACES[namespace] || namespace;

      return caches.open(targetCacheName).then(function(cache) {
        return cache.match(requestUrl);
      }).then(function(response) {
        if (!response) return null;

        // Check embedded TTL header
        var cachedDateHeader = response.headers.get('x-operava-cached-at');
        var ttlHeader = response.headers.get('x-operava-ttl');

        if (cachedDateHeader && ttlHeader) {
          var cachedAt = parseInt(cachedDateHeader, 10);
          var ttlMs = parseInt(ttlHeader, 10) * 1000;
          if (Date.now() - cachedAt > ttlMs) {
            // Expired: delete and return null
            OperavaCache.deleteCachedData(namespace, requestUrl);
            return null;
          }
        }

        return response;
      }).catch(function() {
        return null;
      });
    },

    setCachedData: function(namespace, requestUrl, response, ttlSeconds) {
      if (!isCacheSupported() || !response || isSensitive(requestUrl)) {
        return Promise.resolve(false);
      }

      var targetCacheName = CACHE_NAMESPACES[namespace] || namespace;
      var ttl = ttlSeconds || CACHE_TTL.API_DATA;

      // Clone response to add custom caching headers
      return response.clone().blob().then(function(blob) {
        var headers = new Headers(response.headers);
        headers.set('x-operava-cached-at', Date.now().toString());
        headers.set('x-operava-ttl', ttl.toString());

        var wrappedResponse = new Response(blob, {
          status: response.status,
          statusText: response.statusText,
          headers: headers
        });

        return caches.open(targetCacheName).then(function(cache) {
          return cache.put(requestUrl, wrappedResponse);
        });
      }).then(function() {
        return true;
      }).catch(function(e) {
        console.warn('[OperavaCache] Failed to put into cache:', e);
        return false;
      });
    },

    deleteCachedData: function(namespace, requestUrl) {
      if (!isCacheSupported()) return Promise.resolve(false);
      var targetCacheName = CACHE_NAMESPACES[namespace] || namespace;
      return caches.open(targetCacheName).then(function(cache) {
        return cache.delete(requestUrl);
      }).catch(function() {
        return false;
      });
    },

    clearOperavaCache: function() {
      if (!isCacheSupported()) return Promise.resolve(false);
      return caches.keys().then(function(keys) {
        var promises = keys.filter(function(k) {
          return k.indexOf(CACHE_PREFIX) === 0;
        }).map(function(k) {
          return caches.delete(k);
        });
        return Promise.all(promises);
      }).then(function() {
        return true;
      }).catch(function() {
        return false;
      });
    },

    invalidateCacheVersion: function(newVersion) {
      if (!isCacheSupported() || !newVersion) return Promise.resolve(false);
      return caches.keys().then(function(keys) {
        var promises = keys.filter(function(k) {
          return k.indexOf(CACHE_PREFIX) === 0 && k.indexOf('-' + newVersion) === -1;
        }).map(function(k) {
          return caches.delete(k);
        });
        return Promise.all(promises);
      });
    },

    getCacheStatus: function() {
      if (!isCacheSupported()) {
        return Promise.resolve({
          supported: false,
          version: CACHE_VERSION,
          caches: []
        });
      }

      return caches.keys().then(function(keys) {
        var operavaCaches = keys.filter(function(k) {
          return k.indexOf(CACHE_PREFIX) === 0;
        });

        var detailPromises = operavaCaches.map(function(cacheName) {
          return caches.open(cacheName).then(function(cache) {
            return cache.keys().then(function(requests) {
              return {
                name: cacheName,
                itemCount: requests.length,
                urls: requests.slice(0, 10).map(function(r) { return r.url; })
              };
            });
          });
        });

        return Promise.all(detailPromises).then(function(details) {
          return {
            supported: true,
            version: CACHE_VERSION,
            currentNamespaces: CACHE_NAMESPACES,
            caches: details
          };
        });
      }).catch(function(err) {
        return {
          supported: true,
          error: err.message,
          caches: []
        };
      });
    }
  };

  // Automatically initialize on script load
  if (typeof window !== 'undefined') {
    OperavaCache.initializeCache();
  }

  window.OperavaCache = OperavaCache;
})(typeof window !== 'undefined' ? window : this);
