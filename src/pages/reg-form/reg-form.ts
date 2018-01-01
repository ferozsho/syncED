import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from './../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-reg-form',
  templateUrl: 'reg-form.html',
})

export class RegFormPage {
  
  applicant: string = "applicant";
  deviceID: string
  public siteData: schoolInterface = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp) {
    this.localStorageSetData();
  }

  ionViewWillLoad() {
    console.log('Enter school registration')
    if (typeof this.siteData === 'undefined') {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.setRoot('SchoolListPage');
      this.navCtrl.popToRoot();
    }
  }

  localStorageSetData() {
    let stroageSchoolInfo = JSON.parse(localStorage.getItem('schoolInfo'));
    this.siteData = stroageSchoolInfo;
  }

  ionViewDidEnter() {
    try {
      this.myApp.removeMessage()
    } catch (error) {
      console.log(error.message)
    }
  }

  doResetForm() {
    
  }
  tabChange() {
    console.log('Updated');
  }
  onRegistrationSubmit() {
     this.myApp.onPresentToast('Invalid Application')
  }
  getInfo() {
    this.deviceID = this.myApp.device.uuid;
    this.myApp.onPresentToast('Device ID: ' + this.deviceID)   
    //this.deviceInfo = this.myApp.getDeviceInfo();
  }

}
