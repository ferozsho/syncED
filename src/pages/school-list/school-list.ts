import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-school-list',
  templateUrl: 'school-list.html',
})
export class SchoolListPage {

  loader: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {
    this.loader = this.loading.create({
      content: 'Please Wait...',
    });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolListPage');
    
  }

  ionViewCanEnter() {
    this.loader.present();
    console.log("Loading...");
  }
  ionViewDidEnter() {
    this.loader.dismiss();
    console.log("Hide loading");
  }

  refreshPage() {
    
  }

  filterSchool(events) {
    console.log(events);
  }

}
