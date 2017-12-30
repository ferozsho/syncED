import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { MyApp } from './../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-school-info',
  templateUrl: 'school-info.html',
})
export class SchoolInfoPage {
  
  session: any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController,
    public myApp: MyApp) {
    this.session = this.navParams.get('item');
  }

  ionViewCanEnter() {
    if (this.session == null) {
      this.storage.get('schoolInfo').then(data => {
        this.session = data;
      })
    } else {
      this.session = this.navParams.get('item');
    }
    console.log('Enter School Information')
    this.myApp.removeMessage();
  }

  ionViewWillLeave() {
    //this.myApp.removeMessage();
  }
  ionViewWillUnload() {
    this.storage.remove('schoolInfo');
    console.log('Unload School Information and removed from storage');
  }

  trackApplication() {
    this.myApp.addLoadingMessage();
    this.navCtrl.push('AppStatusPage', { siteInfo: this.session }).then(
      response => {
        //console.log('Response ' + response);
      },
      error => {
        this.onPresentToast(error);
      }).catch(exception => {
        this.onPresentToast(exception);
      });
  }
  registerApplication() {
    this.myApp.addLoadingMessage();
    this.navCtrl.push('RegFormPage', { siteInfo: this.session }).then(
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
