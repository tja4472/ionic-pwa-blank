https://medium.com/progressive-web-apps/using-workbox-2-and-angular-5-to-create-a-progressive-web-app-part-1-app-shell-b14f9872384a

https://realfavicongenerator.net/

Registering service worker
Now we are ready to ask browser to use this auto-generated sw-default.js as a service worker for our app. There are two ways possible:
- Having registration code in index.html
- Register our service worker after Angular app bootstrapped

The best practice here is: the later — the better, for service worker not to compete with the main thread for bandwidth and processor time, saving precious milliseconds of first-time load for our customers. So we go for the second option.

main.ts
```typescript
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    registerServiceWorker('sw-default')
  });

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
```
