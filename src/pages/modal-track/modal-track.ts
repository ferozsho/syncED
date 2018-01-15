import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-track',
  templateUrl: 'modal-track.html',
})
export class ModalTrackPage {

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {

  }

  ionViewWillLoad() {
    const rData = this.navParams.get('mData');
    console.log(rData);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
