import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-school-info',
  templateUrl: 'school-info.html',
})
export class SchoolInfoPage {
  
  session:any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
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
    console.log('Enter SchoolInfoPage')
  }

  ionViewCanLeave() {
    this.storage.remove('schoolInfo');
    console.log('Leave SchoolInfoPage');
  }
  
  registerApplication(siteID: any) {
    console.log(siteID);
  }
}
