/**
 * OPERAVA Global Solutions — Client Storage Manager
 * Architecture: First-party, privacy-safe, namespaced, TTL-aware client storage.
 * Supports localStorage, sessionStorage, and memory fallback for private browsing.
 */
(function(window) {
  'use strict';

  var NAMESPACE = 'operava:';
  var memoryStorage = {
    local: {},
    session: {}
  };

  function testStorage(type) {
    try {
      var storage = window[type + 'Storage'];
      if (!storage) return false;
      var testKey = '__operava_test__';
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  var isLocalStorageAvailable = testStorage('local');
  var isSessionStorageAvailable = testStorage('session');

  function getRawStorage(type) {
    if (type === 'session') {
      return isSessionStorageAvailable ? window.sessionStorage : null;
    }
    return isLocalStorageAvailable ? window.localStorage : null;
  }

  function qualifyKey(key) {
    if (!key) return NAMESPACE;
    return key.indexOf(NAMESPACE) === 0 ? key : NAMESPACE + key;
  }

  var OperavaStorage = {
    isAvailable: function(type) {
      return type === 'session' ? isSessionStorageAvailable : isLocalStorageAvailable;
    },

    set: function(key, value, ttlSeconds, type) {
      var storageType = type === 'session' ? 'session' : 'local';
      var qualified = qualifyKey(key);
      var expiresAt = null;

      if (typeof ttlSeconds === 'number' && ttlSeconds > 0) {
        expiresAt = Date.now() + (ttlSeconds * 1000);
      }

      var payload = {
        _v: 1,
        created: Date.now(),
        expires: expiresAt,
        data: value
      };

      var serialized;
      try {
        serialized = JSON.stringify(payload);
      } catch (err) {
        console.warn('[OperavaStorage] Failed to serialize value for', qualified, err);
        return false;
      }

      var raw = getRawStorage(storageType);
      if (raw) {
        try {
          raw.setItem(qualified, serialized);
          return true;
        } catch (e) {
          // Quota exceeded or private browsing limitation
          console.warn('[OperavaStorage] Storage setItem failed, falling back to memory', e);
          memoryStorage[storageType][qualified] = payload;
          return true;
        }
      } else {
        memoryStorage[storageType][qualified] = payload;
        return true;
      }
    },

    get: function(key, defaultValue, type) {
      var storageType = type === 'session' ? 'session' : 'local';
      var qualified = qualifyKey(key);
      var raw = getRawStorage(storageType);
      var payload = null;

      if (raw) {
        try {
          var item = raw.getItem(qualified);
          if (item) {
            payload = JSON.parse(item);
          }
        } catch (e) {
          payload = memoryStorage[storageType][qualified] || null;
        }
      } else {
        payload = memoryStorage[storageType][qualified] || null;
      }

      if (!payload) {
        return defaultValue !== undefined ? defaultValue : null;
      }

      // Check TTL expiration
      if (payload.expires && Date.now() > payload.expires) {
        OperavaStorage.remove(key, storageType);
        return defaultValue !== undefined ? defaultValue : null;
      }

      return payload.data !== undefined ? payload.data : defaultValue;
    },

    remove: function(key, type) {
      var storageType = type === 'session' ? 'session' : 'local';
      var qualified = qualifyKey(key);
      var raw = getRawStorage(storageType);
      if (raw) {
        try {
          raw.removeItem(qualified);
        } catch (e) {}
      }
      delete memoryStorage[storageType][qualified];
      return true;
    },

    clearNamespace: function(prefix, type) {
      var storageType = type === 'session' ? 'session' : 'local';
      var targetPrefix = qualifyKey(prefix || '');
      var raw = getRawStorage(storageType);

      if (raw) {
        try {
          var keysToRemove = [];
          for (var i = 0; i < raw.length; i++) {
            var k = raw.key(i);
            if (k && k.indexOf(targetPrefix) === 0) {
              keysToRemove.push(k);
            }
          }
          keysToRemove.forEach(function(k) { raw.removeItem(k); });
        } catch (e) {}
      }

      // Also clean memory storage
      Object.keys(memoryStorage[storageType]).forEach(function(k) {
        if (k.indexOf(targetPrefix) === 0) {
          delete memoryStorage[storageType][k];
        }
      });
    },

    cleanExpired: function(type) {
      var storageType = type === 'session' ? 'session' : 'local';
      var raw = getRawStorage(storageType);
      var now = Date.now();
      if (!raw) return;

      try {
        var expiredKeys = [];
        for (var i = 0; i < raw.length; i++) {
          var k = raw.key(i);
          if (k && k.indexOf(NAMESPACE) === 0) {
            try {
              var item = JSON.parse(raw.getItem(k));
              if (item && item.expires && now > item.expires) {
                expiredKeys.push(k);
              }
            } catch (err) {}
          }
        }
        expiredKeys.forEach(function(k) { raw.removeItem(k); });
      } catch (e) {}
    },

    getDiagnostics: function() {
      var result = {
        localStorageAvailable: isLocalStorageAvailable,
        sessionStorageAvailable: isSessionStorageAvailable,
        localKeys: [],
        sessionKeys: []
      };

      if (isLocalStorageAvailable) {
        try {
          for (var i = 0; i < window.localStorage.length; i++) {
            var k = window.localStorage.key(i);
            if (k && k.indexOf(NAMESPACE) === 0) {
              result.localKeys.push(k);
            }
          }
        } catch (e) {}
      }

      if (isSessionStorageAvailable) {
        try {
          for (var j = 0; j < window.sessionStorage.length; j++) {
            var sk = window.sessionStorage.key(j);
            if (sk && sk.indexOf(NAMESPACE) === 0) {
              result.sessionKeys.push(sk);
            }
          }
        } catch (e) {}
      }

      return result;
    }
  };

  // Run a quick cleanup of expired entries on initialization
  try {
    OperavaStorage.cleanExpired('local');
    OperavaStorage.cleanExpired('session');
  } catch (e) {}

  window.OperavaStorage = OperavaStorage;
})(typeof window !== 'undefined' ? window : this);
