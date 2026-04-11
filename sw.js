/* ═══════════════════════════════════════════
   PROJECT HUB — Service Worker
   Version : 1.0.0
═══════════════════════════════════════════ */
const CACHE_NAME  = 'project-hub-v1';
const SHELL_URLS  = [
  '/',
  '/index.html',
  '/manifest.json',
];

/* ── INSTALL : mise en cache du shell ── */
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_URLS))
  );
});

/* ── ACTIVATE : nettoyage des vieux caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── FETCH : stratégie Network-first pour l'API, Cache-first pour le shell ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API GitHub → network only (pas de cache long terme)
  if(url.hostname === 'api.github.com'){
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Fonts Google → cache first
  if(url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    event.respondWith(
      caches.match(event.request).then(cached => {
        if(cached) return cached;
        return fetch(event.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Shell app → cache first, network fallback
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
