"use strict";

// Cache Name
const CACHE_STATIC = "static-cache-gog-regions-price-v4";
const CACHE_DYNAMIC = "dynamic-cache-gog-regions-price-v1";

// Cache Files
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./index.css",
  "./build/bundle.js",
  "./manifest.json",
  "./favicon.svg",
];

// install
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");

  evt.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Active PWA Cache and clear out anything older
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");

  evt.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// listen for fetch events in page navigation and return anything that has been cached
self.addEventListener("fetch", (evt) =>
  evt.respondWith(
    caches.match(evt.request).then((r) => {
      console.log(`[Servicio Worker] Feching: ${evt.request.url}`);
      return (
        r ||
        fetch(evt.request).then(async (response) => {
          const cache = await caches.open(CACHE_DYNAMIC);
          console.log(
            "[Servicio Worker] Caching the new resource: " + evt.request.url
          );
          if (typeof cache === "function")
            cache.put(evt.request.url, response.clone());
          return response;
        })
      );
    })
  )
);
