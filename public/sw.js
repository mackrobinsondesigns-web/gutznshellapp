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
      // Use cache.addAll safely
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

// SINGLE Fetch Event - Handles caching, network fallback, and offline states
self.addEventListener("fetch", (event) => {
  // Only handle GET requests and local web assets
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Serve from cache if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Otherwise, fetch from network
      return fetch(event.request).catch(() => {
        // 3. Elegant offline fallback if network fails
        // If it's a page navigation request, you can serve index.html
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }

        // Generic offline response for assets/APIs
        return new Response("You are offline.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      });
    }),
  );
});
