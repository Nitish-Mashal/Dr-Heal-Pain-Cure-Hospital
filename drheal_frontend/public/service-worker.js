const CACHE_NAME = "drheal-cache-v2";

const urlsToCache = [
    "/",
    "/?source=pwa",
    "/assets/drheal_frontend/manifest.json",

    // Icons
    "/files/pwa-192x192.png",
    "/files/pwa-512x512.png",
    "/files/pwa-maskable-192x192.png",
    "/files/pwa-maskable-512x512.png",

    // Screenshots
    "/files/dr-rakesh-profile.jpeg",
    "/files/main-screen.jpeg",
    "/files/dr-list.jpeg",
    "/files/services-back-pain.jpeg",
    "/files/why-choose-us.jpeg",
    "/files/service-types.jpeg"
];

// Install Service Worker
self.addEventListener("install", event => {

    console.log("Service Worker Installing...");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );

    self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", event => {

    console.log("Service Worker Activated...");

    event.waitUntil(
        caches.keys().then(cacheNames => {

            return Promise.all(
                cacheNames.map(cache => {

                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }

                })
            );

        })
    );

    self.clients.claim();
});

// Fetch Requests
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                // Return cache if available
                if (response) {
                    return response;
                }

                // Else fetch from network
                return fetch(event.request)
                    .then(networkResponse => {

                        return caches.open(CACHE_NAME)
                            .then(cache => {

                                cache.put(
                                    event.request,
                                    networkResponse.clone()
                                );

                                return networkResponse;

                            });

                    })
                    .catch(() => {

                        return new Response(
                            "Offline Mode"
                        );

                    });

            })

    );

});