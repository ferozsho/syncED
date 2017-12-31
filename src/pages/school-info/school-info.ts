import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { MyApp } from './../../app/app.component';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-school-info',
  templateUrl: 'school-info.html',
})
export class SchoolInfoPage {

  session: Promise<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public myApp: MyApp) {
    this.session = this.navParams.get('item');
  }

  ionViewCanEnter() {
    if (typeof this.session === 'undefined') {
      this.session = null;
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.popToRoot();
      return false;
    } else {
      this.session = this.navParams.get('item');
    }
    console.log('Enter School Information')
  }

  ionViewDidEnter() {
    this.myApp.removeMessage();
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
        this.myApp.onPresentToast(error);
      }).catch(exception => {
        this.myApp.onPresentToast(exception);
      });
  }
  registerApplication() {
    this.myApp.addLoadingMessage();
    this.navCtrl.push('RegFormPage', { siteInfo: this.session }).then(
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
