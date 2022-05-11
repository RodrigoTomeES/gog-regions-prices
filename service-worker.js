"use strict";

// Cache Name
const CACHE_NAME = "static-cache-gog-regions-price-v1";

// Cache Files
const FILES_TO_CACHE = ["."];

// install
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");

  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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
          if (key !== CACHE_NAME) {
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
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);

  // when not a navigation event return
  if (evt.request.mode !== "navigate") return;

  evt.respondWith(
    fetch(evt.request).catch(() =>
      caches.open(CACHE_NAME).then((cache) => cache.match("."))
    )
  );
});
