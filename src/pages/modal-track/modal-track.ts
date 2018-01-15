import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-track',
  templateUrl: 'modal-track.html',
})
export class ModalTrackPage {

  trackData: trackInfo = {};

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {

  }

  ionViewWillLoad() {
    const rData = this.navParams.get('mData');
    if (rData) {
      this.trackData.admissionNo = rData.admissionNo;
      this.trackData.aadhaarNo = rData.aadhaarNo;
      this.trackData.applicantName = rData.applicantName;
      this.trackData.className = rData.className;
      this.trackData.active =  rData.active;
      this.trackData.jod = rData.jod;
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}

interface trackInfo {
  admissionNo?: string,
  aadhaarNo?: string,
  applicantName?: string,
  className?: string,
  active?: string,
  jod?: string
}
