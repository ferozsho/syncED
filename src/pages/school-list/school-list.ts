import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-school-list',
  templateUrl: 'school-list.html',
})
export class SchoolListPage {

  loader: any;
  schList: any;
  schListTemp: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public resProvider: RestProvider, public toastCtrl: ToastController) {
    this.refreshPage();
  }
  
  addLoadingMessage() {
    this.loader = this.loading.create({
      content: 'Please Wait...',
    });
    this.loader.present();
  }

  refreshPage() {
    this.addLoadingMessage();
    this.schListTemp = null;
    this.getSchoolList();
  }

  getSchoolList() {
    this.resProvider.getSchoolList()
      .then(data => {
        this.schList = data;
        this.schListTemp = data;
        this.loader.dismiss();
      },
      error => {
        this.loader.dismiss();
        this.onPresentToast(error.message);
      }).catch(exception => {
        this.loader.dismiss();
        this.onPresentToast(exception.message);
      });
  }

  onCancel(ev: any) {
    ev.target.val = '';
  }

  filterItems(ev: any) {
    this.schListTemp = this.schList;
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.schListTemp = this.schListTemp.filter(function (item) {
        return (item.siteName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
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
