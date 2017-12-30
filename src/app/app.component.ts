import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = 'SchoolListPage';
  loader: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public androidFullScreen: AndroidFullScreen,
  public loading: LoadingController) {

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
  
}