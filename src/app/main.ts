import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// https://github.com/zwacky/game-music-player

platformBrowserDynamic()
.bootstrapModule(AppModule)
.then(() => {
    // registerServiceWorker('sw-default')
    window['isUpdateAvailable'] = new Promise((resolve, reject) => {
        // lazy way of disabling service workers while developing
        if ('serviceWorker' in navigator && ['localhost', '127'].indexOf(location.hostname) === -1) {
          // register service worker file
          navigator.serviceWorker.register('service-worker.js')
            .then(reg => {
              console.log('service worker installed')
              reg.onupdatefound = () => {
                const installingWorker = reg.installing;
                installingWorker.onstatechange = () => {
                  switch (installingWorker.state) {
                    case 'installed':
                      if (navigator.serviceWorker.controller) {
                        // new update available
                        console.log('service worker: new update available')
                        resolve(true);
                      } else {
                        // no update available
                        resolve(false);
                      }
                      break;
                  }
                };
              };
            })
            .catch(err => console.error('[SW ERROR]', err));
        }
      });    
  });

  /*
function registerServiceWorker(swName: string) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(`/${swName}.js`)
        .then(reg => {
          console.log('[App] Successful service worker registration', reg);
        })
        .catch(err =>
          console.error('[App] Service worker registration failed', err)
        );
    } else {
      console.error('[App] Service Worker API is not supported in current browser');
    }
  }
  */