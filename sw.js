// Service Worker for Alexander's Transits PWA
const CACHE_NAME = 'transits-v59';
const URLS_TO_CACHE = [
  './', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './src/engine/ephemeris.js', './src/engine/motion.js', './src/engine/voc.js', './src/engine/aspects.js',
  './src/hellenistic/sect.js', './src/hellenistic/profections.js', './src/hellenistic/hours.js',
  './src/hellenistic/lots.js', './src/hellenistic/zr.js', './src/hellenistic/firdaria.js',
  './src/hellenistic/decans.js', './src/hellenistic/mansions.js', './src/hellenistic/fixedstars.js',
  './src/hellenistic/returns.js', './src/hellenistic/liturgy.js', './src/hellenistic/electional.js',
  './src/voice/house-voice.js', './src/voice/natal-voice.js', './src/voice/aspect-voice.js?v=59',
  './src/voice/hard-brings.js', './src/voice/ingress-notes.js', './src/voice/tone.js',
  './src/voice/synastry-voice.js?v=59', './src/voice/astrocarto-voice.js', './src/voice/references.js',
  './src/synthesis/prompts.js', './src/synthesis/claude-client.js',
  './src/synthesis/context-builder.js', './src/synthesis/deterministic.js',
  './src/synthesis/synthesizer.js', './src/synthesis/citations.js', './src/synthesis/consult.js',
  './src/ui/glyphs.js', './src/ui/widgets/biwheel.js', './src/ui/widgets/synth-card.js', './src/ui/widgets/chat.js',
  './src/data/chart-storage.js', './src/ui/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      // Network-first for HTML, cache-first for others
      if (event.request.mode === 'navigate') {
        return fetch(event.request).then(resp => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return resp;
        }).catch(() => cached || new Response('Offline', { status: 503 }));
      }
      return cached || fetch(event.request);
    })
  );
});
