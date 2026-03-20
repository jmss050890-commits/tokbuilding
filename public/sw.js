const CACHE_NAME = 'vcc-hub-v1';
const STATIC_ASSETS = ['/', '/tokhealth', '/tokthrukpa', '/tokbuilding'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  // Non-GET requests (POST, PUT, etc.) are not cached and go directly to the network.
  // This ensures API calls like /api/chat always reach the server.
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
