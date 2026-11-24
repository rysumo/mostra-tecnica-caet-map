// Service Worker para Modo Offline Completo — Mostra Técnica CAET
const CACHE_NAME = 'caet-map-v4';
const TILE_CACHE_NAME = 'caet-tiles-v2';
const MAX_TILES_IN_CACHE = 1000;

const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './data/locations.json',
  './vendor/leaflet.css',
  './vendor/leaflet.js',
  './vendor/MarkerCluster.css',
  './vendor/MarkerCluster.Default.css',
  './vendor/leaflet.markercluster.js'
];

// Install: Precache 100% local App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Remove stale App Shell caches while keeping cached tiles
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== TILE_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

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

async function notifyClients(payload) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  for (const client of clients) {
    client.postMessage(payload);
  }
}

async function precacheCampusTiles(urls) {
  if (!Array.isArray(urls) || urls.length === 0) return;

  const cache = await caches.open(TILE_CACHE_NAME);
  let done = 0;
  let cachedCount = 0;
  const total = urls.length;
  const BATCH_SIZE = 4;

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (url) => {
      try {
        const existing = await cache.match(url);
        if (existing) {
          cachedCount++;
          return;
        }
        const res = await fetch(url, { mode: 'no-cors' });
        if (res && (res.status === 200 || res.type === 'opaque')) {
          await cache.put(url, res);
          cachedCount++;
        }
      } catch (_err) {
        // Ignore single tile errors when network fluctuates
      } finally {
        done++;
      }
    }));

    await notifyClients({
      type: 'PRECACHE_PROGRESS',
      done,
      total,
      cachedCount
    });
  }

  await trimCache(TILE_CACHE_NAME, MAX_TILES_IN_CACHE);
  await notifyClients({
    type: 'PRECACHE_DONE',
    done,
    total,
    cachedCount
  });
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRECACHE_CAMPUS_TILES') {
    event.waitUntil(precacheCampusTiles(event.data.urls));
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Map Tiles (Google Maps / Esri World Imagery / OSM)
  const isTile =
    (url.hostname.includes('google.com') && url.pathname.includes('/vt/lyrs=')) ||
    url.hostname.includes('arcgisonline.com') ||
    url.hostname.includes('openstreetmap.org');

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
            trimCache(TILE_CACHE_NAME, MAX_TILES_IN_CACHE);
          }
          return networkResponse;
        } catch (_err) {
          return cachedResponse || new Response('', { status: 408 });
        }
      })
    );
    return;
  }

  // 2. App Shell & Local Assets (Cache First with Stale-While-Revalidate)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
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
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
