/**
 * OPERAVA Global Solutions — Production Service Worker
 * Architecture: Tiered caching strategies (Cache-First for static assets, Network-First for HTML navigation,
 * Network-Only for API and sensitive requests).
 */

const SW_VERSION = 'v3';
const STATIC_CACHE = `operava-static-${SW_VERSION}`;
const RUNTIME_CACHE = `operava-runtime-${SW_VERSION}`;

// Pre-cached core assets
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/public/icons/favicon.svg',
  '/public/images/hero-bg.webp',
  '/public/css/operava-privacy.css',
  '/public/css/operava-search.css',
  '/public/js/operava-search.js',
  '/public/js/operava-storage.js',
  '/public/js/operava-cookies.js',
  '/public/js/operava-cache.js',
  '/public/js/operava-consent.js',
  '/public/js/operava-telemetry.js',
  '/public/js/operava-diagnostics.js'
];

// Sensitive endpoint substrings that must NEVER be handled by Service Worker cache
const SENSITIVE_URL_PATTERNS = [
  '/api/',
  'session',
  'token',
  'auth',
  'contact',
  'talent',
  'resume',
  'referral',
  'logout'
];

function isSensitive(url) {
  const lower = url.toLowerCase();
  return SENSITIVE_URL_PATTERNS.some(pattern => lower.includes(pattern));
}

// Install Event: Pre-cache core resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        // Use addAll safely with catch to prevent install failure if a single asset fails
        return Promise.all(
          PRECACHE_ASSETS.map(url => {
            return cache.add(url).catch(err => {
              console.warn('[ServiceWorker] Pre-cache item failed (safe continue):', url, err);
            });
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Cleanup stale/obsolete caches
self.addEventListener('activate', event => {
  const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.startsWith('operava-') && !currentCaches.includes(cacheName)) {
              console.info('[ServiceWorker] Deleting obsolete cache namespace:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Apply tailored strategies per resource type
self.addEventListener('fetch', event => {
  const request = event.request;

  // 1. Only handle GET requests; never cache POST, PUT, DELETE
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // 2. Ignore Chrome extension or non-HTTP(S) schemes
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // 3. Sensitive / API routes -> strictly Network Only
  if (isSensitive(url.pathname)) {
    event.respondWith(fetch(request));
    return;
  }

  // 4. HTML Page Navigation -> Network First with Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, copy);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed: attempt to retrieve cached page or fallback to root
          return caches.match(request).then(cachedPage => {
            return cachedPage || caches.match('/index.html') || caches.match('/');
          });
        })
    );
    return;
  }

  // 5. Static Assets (CSS, JS, Web Fonts, Images, Icons) -> Cache First with Network Fallback
  const isStaticAsset = (
    url.pathname.startsWith('/public/') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('images.unsplash.com')
  );

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          // Stale-While-Revalidate in background for public assets to keep cache fresh
          fetch(request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(request, networkResponse);
              });
            }
          }).catch(() => { /* ignore background revalidate network error */ });

          return cachedResponse;
        }

        // Cache miss: fetch from network and store in static cache
        return fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 6. Default: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then(networkResponse => {
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
