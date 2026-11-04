// Service Worker para Modo Offline — Mostra Técnica CAET
const CACHE_NAME = 'caet-map-v2';
const TILE_CACHE_NAME = 'caet-tiles-v2';
const MAX_TILES_IN_CACHE = 800;

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data/locations.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Install: Precache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== TILE_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: Trim cache to avoid memory leaks
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    const toDelete = keys.length - maxItems;
    for (let i = 0; i < toDelete; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// Fetch: Smart Cache Strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Map Tiles (Google Maps Satellite / OSM)
  const isTile = url.hostname.includes('google.com') && url.pathname.includes('/vt/lyrs=') ||
                 url.hostname.includes('openstreetmap.org') ||
                 url.hostname.includes('arcgisonline.com');

  if (isTile) {
    event.respondWith(
      caches.open(TILE_CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(event.request, { mode: 'no-cors' });
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(event.request, networkResponse.clone());
            // Trim asynchronously
            trimCache(TILE_CACHE_NAME, MAX_TILES_IN_CACHE);
          }
          return networkResponse;
        } catch (err) {
          // If offline and tile not cached, return empty transparent 256x256 png or fail gracefully
          return cachedResponse || new Response('', { status: 408 });
        }
      })
    );
    return;
  }

  // 2. Static Assets & App Shell (Cache First with Stale While Revalidate)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch update in background if online
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {/* offline, ignore */});

        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        return networkResponse;
      }).catch(() => {
        // Fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
