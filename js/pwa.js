(function () {
  var status = document.getElementById('pwa-status');
  var installButton = document.getElementById('pwa-install');
  var installPrompt = null;

  function showOfflineStatus() {
    if (!status) return;
    status.textContent = navigator.onLine
      ? 'Offline access is ready for core pages and tools on this device.'
      : 'You are offline. Saved pages and tools work; WhatsApp, email and external links need internet.';
  }

  window.addEventListener('online', showOfflineStatus);
  window.addEventListener('offline', showOfflineStatus);
  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    installPrompt = event;
    if (installButton) installButton.hidden = false;
  });
  window.addEventListener('appinstalled', function () {
    installPrompt = null;
    if (installButton) installButton.hidden = true;
    if (status) status.textContent = 'Max_imum Designs is installed on this device.';
  });

  if (!('serviceWorker' in navigator) || !window.siteWorkerRegistration) {
    if (status) status.textContent = 'Offline access needs a modern browser and a secure (HTTPS) website.';
    return;
  }

  window.siteWorkerRegistration.then(function (registration) {
    if (!registration) throw new Error('Offline app registration failed.');
    return navigator.serviceWorker.ready;
  }).then(showOfflineStatus).catch(function (error) {
    console.error('Could not enable offline access:', error);
    if (status) status.textContent = 'Offline access could not be enabled. Please open the website online and try again.';
  });

  if (installButton) {
    installButton.addEventListener('click', function () {
      if (!installPrompt) return;
      installPrompt.prompt().then(function () {
        return installPrompt.userChoice;
      }).then(function (choice) {
        if (choice.outcome === 'accepted') {
          installButton.hidden = true;
          if (status) status.textContent = 'Installing Max_imum Designs for offline use.';
        }
        installPrompt = null;
      }).catch(function (error) {
        console.error('Could not open the app install prompt:', error);
        if (status) status.textContent = 'Could not open the install prompt. Use your browser menu to install the app.';
      });
    });
  }
})();
