Create project in Firebase console.

Install Firebase tools
```
npm install -g firebase-tools
```
```
firebase login
firebase init
firebase deploy
```
## Workbox
https://workboxjs.org/
```
npm install workbox-cli --global
```

### package.json
```
  "scripts": {
    "clean": "ionic-app-scripts clean",
    "build": "ionic-app-scripts build && workbox-cli generate:sw",
    "lint": "ionic-app-scripts lint",
    "ionic:build": "ionic-app-scripts build && workbox-cli generate:sw",
    "ionic:serve": "ionic-app-scripts serve"
  },
```
### Build app & run workbox-cli to generate service-worker.js
```
npm run build
```
or
```
npm run build --prod
```

### workbox-cli-config.js
```js
module.exports = {
  "globDirectory": "www\\",
  "globPatterns": [
    "**/*.{html,eot,scss,svg,ttf,woff,woff2,ico,css,map,js,json}"
  ],
  'swDest': './www/service-worker.js',
  "globIgnores": [
    "..\\workbox-cli-config.js"
  ]
};
```
### https://github.com/zwacky/game-music-player
#### src/index.html
```html
  <script>
    // make the whole serviceworker process into a promise so later on we can
    // listen to it and in case new content is available a toast will be shown
    window.isUpdateAvailable = new Promise(function (resolve, reject) {
      // lazy way of disabling service workers while developing
      if ('serviceWorker' in navigator && ['localhost', '127'].indexOf(location.hostname) === -1) {
        // register service worker file
        navigator.serviceWorker.register('service-worker.js')
          .then(reg => {
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              installingWorker.onstatechange = () => {
                switch (installingWorker.state) {
                  case 'installed':
                    if (navigator.serviceWorker.controller) {
                      // new update available
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
  </script>
```
home.ts
```typescript
  ngOnInit() {
    // listen to the service worker promise in index.html to see if there has been a new update.
    // condition: the service-worker.js needs to have some kind of change - e.g. increment CACHE_VERSION.
    window['isUpdateAvailable']
      .then(isAvailable => {
        if (isAvailable) {
          const toast = this.toastCtrl.create({
            message: 'New Update available! Reload the webapp to see the latest juicy changes.',
            position: 'bottom',
            showCloseButton: true,
          });
          toast.present();
        }
      });
  }
```
- remove src/service-worker.js
- remove @ionic-native from package.json & app.component.ts & app.module.ts





