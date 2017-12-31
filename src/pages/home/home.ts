import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from './../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp) {

  }

  onRegistration() {
    this.fnPageCall('SchoolListPage');
  }

  onApplicationStatus() {
    this.fnPageCall('AppStatusPage');
  }

  fnPageCall(pageName: any) {
    this.navCtrl.push(pageName).then(
      response => {
        //console.log('Response ' + response);
      },
      error => {
        this.myApp.onPresentToast(error);
      }).catch(exception => {
        this.myApp.onPresentToast(exception);
      });
  }

}
