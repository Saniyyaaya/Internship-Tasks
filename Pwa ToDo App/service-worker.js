// service-worker.js

const cacheName = 'task-manager-cache-v1';
const cacheAssets = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/auth.js',
    '/icon.png',
    // Add any other files that need to be cached
];

// Install Service Worker
self.addEventListener('install', e => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Service Worker
self.addEventListener('activate', e => {
    const cacheWhitelist = [cacheName];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (!cacheWhitelist.includes(cache)) {
                        console.log('Service Worker: Deleting Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch files from Cache
self.addEventListener('fetch', e => {
    e.respondWith(
        caches
            .match(e.request)
            .then(cacheRes => {
                return cacheRes || fetch(e.request);
            })
            .catch(() => caches.match('/index.html'))
    );
});
s