import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { MyApp } from './../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-school-info',
  templateUrl: 'school-info.html',
})
export class SchoolInfoPage {

  public schInfo: schoolInterface = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp) {
    this.localStorageSetData();
  }

  ionViewCanEnter() {
    if (typeof this.schInfo === 'undefined') {
      this.localStorageSetData();
    }
    console.log(this.schInfo.siteID)
    if (this.schInfo === null) {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.push('SchoolListPage');
      this.navCtrl.popToRoot();
    }
    console.log('Enter School Information')
  }

  localStorageSetData() {
    let stroageSchoolInfo = JSON.parse(localStorage.getItem('schoolInfo'));
    this.schInfo = stroageSchoolInfo;
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
    console.log('Unload School Information and removed from storage');
  }

  trackApplication() {
    this.myApp.addLoadingMessage();
    this.navCtrl.push('AppStatusPage', { siteInfo: this.schInfo }).then(
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
    this.navCtrl.push('RegFormPage', { siteInfo: this.schInfo }).then(
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
