import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { MyApp } from './../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-reg-form',
  templateUrl: 'reg-form.html',
  })

export class RegFormPage {
  
  public deviceInfo: deviceInterface = {};
  public siteData: schoolInfo = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, private device: Device, public toastCtrl: ToastController, public storage: Storage) {
    this.siteData = this.navParams.get('siteInfo');
  }

  ionViewCanEnter() {
    console.log('Enter School Registration')
    if (this.siteData == null) {
      this.siteData = null;
      this.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.popToRoot();
      return false;
    } else {
      this.siteData = this.navParams.get('siteInfo');
    }
    console.log(this.siteData);
  }

  ionViewDidEnter() {
    this.myApp.removeMessage();    
  }

  onPresentToast(msgString: any) {
    const toast = this.toastCtrl.create({
      message: msgString,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.onDidDismiss(() => {
      console.log("Registration: Toast Dismiss!");
    });
    toast.present();
  }  

  getInfo() {
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

interface schoolInfo {
  siteID?: number,
  siteName?: string,
  siteAddress?: string,
  apiURL?: string
}
