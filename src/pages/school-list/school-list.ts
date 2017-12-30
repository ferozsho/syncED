import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { MyApp } from './../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-school-list',
  templateUrl: 'school-list.html',
})
export class SchoolListPage {

  schList: any;
  schListTemp: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public resProvider: RestProvider, public toastCtrl: ToastController, public storage: Storage) {
    this.refreshPage(0);
  }
  
  refreshPage(refKey) {
    if (refKey != 0) {
      this.fnRemoveSchoolData('schoolList');
    }
    this.myApp.addLoadingMessage();
    this.fnGetSchoolData();
  }

  fnGetSchoolData() {
    this.storage.ready().then(() => {
      this.storage.get('schoolList').then(data => {
        if (data) {
          this.schListTemp = data
          this.schList = data
          this.myApp.removeMessage()
        } else {
          this.getSchoolList()
        }
      }).catch(err => {
        this.myApp.removeMessage()
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
        this.myApp.removeMessage()
      },
      error => {
        this.storage.clear();
        console.log(error);
        this.myApp.removeMessage()
        this.onPresentToast(error);
      }).catch(exception => {
        this.storage.clear();
        this.myApp.removeMessage()
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

  openSchoolInfo(items) {
    this.myApp.addLoadingMessage();
    
    this.storage.set('schoolInfo', items);
    this.navCtrl.push('SchoolInfoPage', {item: items}).then(
      response => {
        //console.log('Response ' + response);
      },
      error => {
        this.onPresentToast(error);
      }).catch(exception => {
        this.onPresentToast(exception);
      });
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
