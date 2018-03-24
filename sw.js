
let version = '1.4.0';

let staticCacheName = 'mws-rrs1-' + version;


self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});



self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {

      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }

      console.log('Network request for ', event.request.url);
      return fetch(event.request)
        .then(function(response) {
          // TODO 5 - Respond with custom 404 page
          return caches.open(staticCacheName).then(function(cache) {
            if (event.request.url.indexOf('maps') < 0) { // don't cache google maps
              // ^ it's not a site asset, is it?
              console.log('Saving ' + event.request.url + ' into cache.');
              cache.put(event.request.url, response.clone());
            }
            return response;
          });
        });

    }).catch(function(error) {
      // TODO 6 - Respond with custom offline page
    })
  );
});


/* delete old cache */
self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');

  var cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

