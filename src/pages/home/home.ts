import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
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
        this.onPresentToast(error);
      }).catch(exception => {
        this.onPresentToast(exception);
      });
  }

  onPresentToast(msgString: any) {
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
}
