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

