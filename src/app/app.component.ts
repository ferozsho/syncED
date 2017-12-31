import { Component } from '@angular/core';
import { Platform, LoadingController, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage: any = 'SchoolListPage';
  loader: any;
  public deviceInfo: deviceInterface = {};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public androidFullScreen: AndroidFullScreen,
    public loading: LoadingController, public toastCtrl: ToastController, public device: Device ) {

    this.androidFullScreen.isSupported()
      .then(() => {
        this.androidFullScreen.showSystemUI();
      })
      .catch((error: any) => console.log(error));    

    //this.androidFullScreen.isSupported().then(() => this.androidFullScreen.showSystemUI());

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.getDeviceInfo();
      this.hideSplashScreen();
    });
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }
  
  public addLoadingMessage() {
    this.loader = this.loading.create({
      content: 'Please Wait...',
    });
    this.loader.present();
  }

  public removeMessage() {
    console.log('Loading Removed...');
    this.loader.dismiss();
  }

  public onPresentToast(msgString: any) {
    const toast = this.toastCtrl.create({
      message: msgString,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.onDidDismiss(() => {
      console.log("Toast Dismiss!!!");
    });;
    toast.present();
  }

  public getDeviceInfo() {
    this.deviceInfo.id = this.device.uuid;
    this.deviceInfo.model = this.device.model;
    this.deviceInfo.cordova = this.device.cordova;
    this.deviceInfo.platform = this.device.platform;
    this.deviceInfo.version = this.device.version;
    this.deviceInfo.manufacturer = this.device.manufacturer;
    this.deviceInfo.serial = this.device.serial;
    this.deviceInfo.isVirtual = this.device.isVirtual;
  }

}

interface deviceInterface {
  id?: string,
  model?: string,
  cordova?: string,
  platform?: string,
  version?: string,
  manufacturer?: string,
  serial?: string,
  isVirtual?: boolean,
}
