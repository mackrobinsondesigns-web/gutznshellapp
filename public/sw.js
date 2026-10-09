const CACHE_NAME = "gutznshell-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/site.webmanifest",
];

// Install Event - Caches essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

// Activate Event - Cleans up old cache structures
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch Event - Serves cached items offline, drops back to network online
self.addEventListener("fetch", (event) => {
  // Only handle local web requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  // A minimal fetch handler is required for PWA installability
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response("You are offline.");
    }),
  );
});
