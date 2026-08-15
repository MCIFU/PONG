// Service worker: permite instalar la PWA y jugar sin conexión.
// Los assets se precargan al instalar y se rellenan en segundo plano si falta
// alguno, de modo que la segunda visita se sirve entera desde la caché.
//
// Estrategia de cacheo en runtime:
//  - Interfaz (HTML, CSS, fuente, iconos, manifest): stale-while-revalidate.
//    Se sirve al instante desde la caché y, en paralelo, se descarga la versión
//    fresca de la red para actualizar la caché en segundo plano.
//  - Juego (js/script.js): solo se cachea al instalar. Se sirve desde la caché sin
//    revalidar, para no gastar datos ni competir por CPU en cada visita.

const CACHE_NAME = 'pong-v87';

// Límite de tamaño de la caché (en bytes). Aquí 5 MB.
// Los assets del juego pesan mucho menos, así que este tope actúa como
// red de seguridad para que la caché nunca crezca sin control.
const MAX_CACHE_SIZE = 5 * 1024 * 1024;

const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './assets/fonts/press-start-2p.woff2',
  './manifest.webmanifest',
  './assets/icons/icon-180.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-96.png',
  './assets/icons/icon-32.png',
  './assets/icons/icon-152-ios.png',
  './assets/icons/icon-167-ios.png',
  './assets/icons/icon-180-ios.png',
  './assets/icons/icon-512-ios.png'
];

// Normaliza una ruta relativa a su pathname absoluto para comparar peticiones.
const toPath = (asset) => new URL(asset, self.location).pathname;

// El juego (js/script.js) mantiene la caché solo al instalar: en runtime se sirve
// desde la caché sin revalidar. Todo lo demás (la interfaz) usa stale-while-revalidate.
const GAME_ASSETS = ['./js/script.js'].map(toPath);
const UI_ASSETS = ASSETS.filter((asset) => !GAME_ASSETS.includes(toPath(asset))).map(toPath);

// Calcula el tamaño total (en bytes) de todas las entradas de una caché.
async function getCacheSize(cache) {
  const requests = await cache.keys();
  let total = 0;
  for (const request of requests) {
    const response = await cache.match(request);
    if (!response) continue;
    const blob = await response.clone().blob();
    total += blob.size;
  }
  return total;
}

// Elimina entradas de la caché (empezando por las primeras) hasta que
// su tamaño total no supere MAX_CACHE_SIZE.
async function trimCache(cache) {
  const requests = await cache.keys();
  let total = await getCacheSize(cache);
  let i = 0;
  while (total > MAX_CACHE_SIZE && i < requests.length) {
    await cache.delete(requests[i]);
    total = await getCacheSize(cache);
    i++;
  }
}

// Precarga en segundo plano todos los assets. Cada uno se descarga por separado:
// si uno falla no se aborta el resto, y los que ya están en caché no se vuelven
// a descargar (así la precarga solo rellena huecos, sin gastar datos cada visita).
async function precache() {
  const cache = await caches.open(CACHE_NAME);
  let added = false;
  await Promise.all(
    ASSETS.map(async (asset) => {
      const already = await cache.match(asset);
      if (already) return;
      try {
        await cache.add(asset);
        added = true;
      } catch (error) {
        // Se reintentará en la siguiente precarga (instalación o mensaje PRECACHE).
      }
    })
  );
  // Solo comprobamos el límite de tamaño si hemos añadido algo nuevo.
  if (added) await trimCache(cache);
}

self.addEventListener('install', (event) => {
  event.waitUntil(precache());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => precache()) // rellena cualquier hueco antes de tomar el control
  );
  self.clients.claim();
});

// La página pide precargar en segundo plano (por si el install se interrumpió
// o algún asset falló). Solo descarga lo que aún no está en la caché.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRECACHE') {
    event.waitUntil(precache());
  }
});

// Enrutado de peticiones según el tipo de asset.
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return; // solo nos interesan peticiones GET

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // solo assets del propio origen

  const path = url.pathname;

  // Juego: caché primero, sin revalidar (se actualiza solo al instalar/precachear).
  if (GAME_ASSETS.includes(path)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
    return;
  }

  // Interfaz: stale-while-revalidate. Devolvemos la copia en caché al instante
  // y, en paralelo, pedimos la versión fresca para actualizar la caché.
  if (UI_ASSETS.includes(path)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response && response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, copy))
                .catch(() => {});
            }
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
  // Cualquier otra petición: comportamiento normal del navegador (sin cachear).
});
