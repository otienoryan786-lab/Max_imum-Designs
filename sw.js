var SHELL_CACHE = 'maximum-designs-shell-v1';
var RUNTIME_CACHE = 'maximum-designs-runtime-v1';
var CORE_FILES = [
  './index.html',
  './services.html',
  './portfolio.html',
  './campaign.html',
  './playground.html',
  './brand-health-check.html',
  './policies.html',
  './privacy.html',
  './service-terms.html',
  './ai-policy.html',
  './terms.html',
  './offline.html',
  './manifest.webmanifest',
  './style.css',
  './css/max.css',
  './business-details.js',
  './details.js',
  './offer.js',
  './prices.js',
  './main.js',
  './campaign.js',
  './portfolio-data.js',
  './portfolio.js',
  './js/healthcheck.js',
  './js/max-chat.js',
  './js/max.js',
  './js/menu.js',
  './js/project-brief.js',
  './js/tools.js',
  './assets/logo/apple-touch-icon.png',
  './assets/logo/favicon-32.png',
  './assets/logo/favicon.svg',
  './assets/logo/icon-192.png',
  './assets/logo/icon-512.png',
  './assets/logo/logo-reversed.svg',
  './assets/logo/logo.svg',
  './assets/img/dukapay-colour.jpg',
  './assets/img/dukapay-logo.jpg',
  './assets/img/dukapay-social.jpg',
  './assets/img/dukapay-stationery.jpg',
  './assets/img/maximum-colour.jpg',
  './assets/img/maximum-logo.jpg',
  './assets/img/maximum-profile.jpg',
  './assets/img/maximum-ratecard.jpg',
  './assets/img/maximum-social.jpg',
  './assets/img/maximum-stationery.jpg',
  './assets/portfolio/deck-1.jpg',
  './assets/portfolio/deck-2.jpg',
  './assets/portfolio/duka-1.jpg',
  './assets/portfolio/duka-2.jpg',
  './assets/portfolio/duka-3.jpg',
  './assets/portfolio/duka-4.jpg',
  './assets/portfolio/health-1.jpg',
  './assets/portfolio/max-identity-1.jpg',
  './assets/portfolio/max-identity-2.jpg',
  './assets/portfolio/max-identity-3.jpg',
  './assets/portfolio/max-identity-4.jpg',
  './assets/portfolio/max-social-1.jpg',
  './assets/portfolio/max-social-2.jpg',
  './assets/portfolio/max-stationery-1.jpg',
  './assets/portfolio/max-stationery-2.jpg',
  './assets/portfolio/motion-1.jpg',
  './assets/portfolio/motion-2.jpg',
  './assets/portfolio/motion-poster.jpg',
  './assets/portfolio/profile-1.jpg',
  './assets/portfolio/ratecard-1.jpg',
  './assets/portfolio/templates-1.jpg',
  './assets/portfolio/templates-2.jpg',
  './assets/portfolio/website-1.jpg',
  './downloads/Max_imum_Designs_Brand_Health_Check.pdf',
  './downloads/Max_imum_Designs_Portfolio_2026.pdf',
  './MaxImum_Promo_Batch_2/promo/png/MaxImum_N04_Tip_Three_Colours.png',
  './Max_imum_Promotional_Materials/11_Promotional_Materials/01_Social_Posts/MaxImum_P01_We_Are_Live.png',
  './Max_imum_Promotional_Materials/11_Promotional_Materials/01_Social_Posts/MaxImum_P09_Why_Max_imum.png',
  './Max_imum_Promotional_Materials/11_Promotional_Materials/02_Instagram_Carousels/MaxImum_C1_Slide_0_Cover.png',
  './Max_imum_Promotional_Materials/11_Promotional_Materials/02_Instagram_Carousels/MaxImum_C2_Slide_0_Cover.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(function (cache) { return cache.addAll(CORE_FILES); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key.indexOf('maximum-designs-') === 0 &&
          key !== SHELL_CACHE && key !== RUNTIME_CACHE;
      }).map(function (key) { return caches.delete(key); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin ||
      request.headers.has('range') || /\.mp4$/i.test(url.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(function (response) {
        if (response.ok) {
          var copy = response.clone();
          caches.open(RUNTIME_CACHE).then(function (cache) { return cache.put(request, copy); });
        }
        return response;
      }).catch(function () {
        return caches.match(request, { ignoreSearch: true })
          .then(function (cached) { return cached || caches.match('./offline.html'); });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response.ok && response.type === 'basic') {
          var copy = response.clone();
          caches.open(RUNTIME_CACHE).then(function (cache) { return cache.put(request, copy); });
        }
        return response;
      });
    })
  );
});
