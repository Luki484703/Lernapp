// Speichert die Lernapps, damit sie auch ohne Internet starten. Zuerst immer die neueste Version aus dem Netz.
const CACHE = "lernapps-v7";
const DATEIEN = ["./", "index.html", "fahrradpruefung.html", "mathe.html", "deutsch.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const kopie = r.clone(); caches.open(CACHE).then(c => c.put(e.request, kopie)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
