# Changes from blank template
- Ionic Framework: ionic-angular 3.7.1

## package.json
```
  "scripts": {
    "clean": "ionic-app-scripts clean",
    "build": "ionic-app-scripts build && workbox-cli generate:sw",
    "lint": "ionic-app-scripts lint",
    "ionic:build": "ionic-app-scripts build && workbox-cli generate:sw",
    "ionic:serve": "ionic-app-scripts serve"
  },
```
- remove @ionic-native

## .firebaserc
```json
{
  "projects": {
    "default": "ionic-pwa-blank"
  }
}
```
## firebase.json
```json
{
  "hosting": {
    "public": "www",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      }
    ]
  }
}
```
## workbox-cli-config.js
```js
module.exports = {
  'globDirectory': 'www/',
  'globPatterns': [
    '**/*.{eot,scss,svg,ttf,woff,woff2,ico,png,js,css,html,json}'
  ],
  'swDest': './www/service-worker.js',
  'globIgnores': [
    '../workbox-cli-config.js'
  ]
};
```


## app.component.ts
- remove @ionic-native

```typescript
import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    private toastCtrl: ToastController,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.serviceWorkerUpdatesCheck();
    });
  }

  private serviceWorkerUpdatesCheck(): void {
    // listen to the service worker promise in index.html to see if there has been a new update.
    // condition: the service-worker.js needs to have some kind of change - e.g. increment CACHE_VERSION.
    window['isUpdateAvailable']
      .then(isAvailable => {
        if (isAvailable) {
          console.log('isUpdateAvailable');
          // window.location.reload();

          const toast = this.toastCtrl.create({
            message: 'A new version is available, reload ',
            closeButtonText: "Reload",
            showCloseButton: true,
          });
          toast.onDidDismiss((data, role) => {
            if (role === 'close') {
              window.location.reload();
            };
          });
          toast.present();
        }
      });
  }
}
```
## app.module.ts
- remove @ionic-native

## src folder
- remove src/service-worker.js

## main.ts
```typescript
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
```
## src/index.html
- remove cordova.js

## src/manifest.json
```json
{
  "name": "PWA Blank",
  "short_name": "PWA Blank",
  "start_url": "index.html",
  "display": "standalone",
  "icons": [{
    "src": "assets/img/appicon-192a.png",
    "sizes": "192x192",
    "type": "image/png"
  }],
  "background_color": "#4e8ef7",
  "theme_color": "#4e8ef7"
}
```