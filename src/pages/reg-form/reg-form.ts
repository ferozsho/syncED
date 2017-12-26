import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reg-form',
  templateUrl: 'reg-form.html',
})
export class RegFormPage {
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {
    this.loader = this.loading.create({
      content: 'Please Wait...',
    });    
  }

  ionViewCanEnter() {
    this.loader.present();
  }
  ionViewDidEnter() {
    this.loader.dismiss();
  }
}
