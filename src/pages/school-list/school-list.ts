import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-school-list',
  templateUrl: 'school-list.html',
})
export class SchoolListPage {

  loader: any;
  schList: any;
  schListTemp: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public resProvider: RestProvider, public toastCtrl: ToastController, public storage: Storage) {
    this.refreshPage(0);
  }
  
  addLoadingMessage() {
    this.loader = this.loading.create({
      content: 'Please Wait...',
    });
    this.loader.present();
  }

  refreshPage(refKey) {
    if (refKey != 0) {
      this.fnRemoveSchoolData('schoolList');
    }
    this.addLoadingMessage();
    this.fnGetSchoolData();
  }

  fnGetSchoolData() {
    this.storage.ready().then(() => {
      this.storage.get('schoolList').then(data => {
        if (data) {
          this.schListTemp = data
          this.schList = data
          this.loader.dismiss();
        } else {
          this.getSchoolList()
        }
      }).catch(err => {
        this.loader.dismiss();
        this.onPresentToast(err.message);
        console.log(err);
      })
    });
  }

  fnSetSchoolData(data) {
    this.storage.set('schoolList', data);
    this.schList = data;
    this.schListTemp = data;
  }
  fnRemoveSchoolData(name:string) {
    this.storage.remove(name);
  }

  getSchoolList() {
    this.resProvider.getSchoolList()
      .then(data => {
        this.fnSetSchoolData(data);
        this.loader.dismiss();
      },
      error => {
        this.storage.clear();
        console.log(error);
        this.loader.dismiss();
        this.onPresentToast(error);
      }).catch(exception => {
        this.storage.clear();
        this.loader.dismiss();
        this.onPresentToast(exception.message);
      });
  }

  schoolClick(ev: any) {
    console.log(ev);
  }

  onCancel(ev: any) {
    ev.target.val = '';
  }

  filterItems(ev: any) {
    this.schListTemp = this.schList;
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.schListTemp = this.schListTemp.filter((item) => {
        if (
          item.siteName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.siteAddress.toLowerCase().indexOf(val.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      })
    }
  }

  openSchoolInfo(item) {
    this.navCtrl.push('SchoolInfoPage', { item: item });
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
