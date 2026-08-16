// Service worker mínimo: cachea el "app shell" (todo vive en index.html) para
// que la app abra al instante y siga funcionando sin internet una vez instalada.
// Los precios reales se sirven aparte (ver backend) y no pasan por este caché.

const CACHE_NAME = "ahorra-lima-v2"; // sube este número cuando publiques cambios importantes
const APP_SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  // Red primero, no caché primero: esta app cambia seguido (varias veces
  // por semana), así que cuando hay internet siempre se prefiere la
  // versión más nueva. El caché queda solo como respaldo para cuando no
  // hay conexión — antes era al revés, y por eso instalados en el
  // teléfono se quedaban pegados en versiones viejas por días.
  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then((res) => {
        if (res.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, res.clone()));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
