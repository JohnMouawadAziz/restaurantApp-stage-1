if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
  .then(function(registration) {
    console.log('Service Worker Registered succissfully');
  });
  navigator.serviceWorker.ready.then(function(registration) {
   console.log('Service Worker Ready now');
 });
}