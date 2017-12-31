import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from './../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-reg-form',
  templateUrl: 'reg-form.html',
})

export class RegFormPage {
  
  siteData: Promise<any>
  deviceID: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public storage: Storage) {
    this.siteData = this.navParams.get('siteInfo');
  }

  ionViewCanEnter() {
    console.log('Enter school registration')
    if (this.siteData == null) {
      this.siteData = null;
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.setRoot('SchoolListPage');
      this.navCtrl.popToRoot();
    } else {
      this.siteData = this.navParams.get('siteInfo');
    }
  }

  ionViewDidEnter() {
    try {
      this.myApp.removeMessage()  
    } catch (error) {
      console.log(error)
    }
  }

  getInfo() {
    this.deviceID = this.myApp.device.uuid;
    this.myApp.onPresentToast('Device ID: ' + this.deviceID)   
    //this.deviceInfo = this.myApp.getDeviceInfo();
  }
  
}