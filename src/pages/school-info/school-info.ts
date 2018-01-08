import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { MyApp } from './../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-school-info',
  templateUrl: 'school-info.html',
})
export class SchoolInfoPage {

  private siteInfo: siteInformation = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp) {
    this.localStorageSetData();
  }

  ionViewCanEnter() {
    if (typeof this.siteInfo === 'undefined') {
      this.localStorageSetData();
    }
    if (this.siteInfo === null) {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.push('SchoolListPage');
      this.navCtrl.popToRoot();
    }
    console.log('Enter School Information')
  }

  localStorageSetData() {
    this.siteInfo = JSON.parse(localStorage.getItem('schoolInfo'))
  }

  ionViewDidEnter() {
    try {
      this.myApp.removeMessage()
    } catch (error) {
      console.log(error)
    }
  }

  ionViewWillUnload() {
    localStorage.removeItem('schoolInfo');
    localStorage.removeItem('schoolOptions');
    console.log('Unload School Information and removed from storage');
  }

  trackApplication() {
    this.myApp.addLoadingMessage();
    this.navCtrl.push('AppStatusPage').then(
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
    this.navCtrl.push('RegFormPage').then(
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

interface siteInformation {
  siteID?: number,
  siteName?: string,
  siteAddress?: string,
  siteLogo?: string,
  apiURL?: string,
  tracks?: string,
  status?: number,
  priority?: number,
}