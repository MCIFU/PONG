// Service worker: permite instalar la PWA y jugar sin conexión.
// Los archivos se cachean SOLO al instalar; después se sirven desde la caché.
// Para forzar una actualización de la caché, cambia CACHE_NAME.

const CACHE_NAME = 'pong-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Caché primero: servimos desde la caché (rellenada solo al instalar).
// Si un archivo no está en caché, lo pedimos a la red.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
