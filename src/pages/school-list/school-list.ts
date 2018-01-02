import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  schOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public resProvider: RestProvider, public storage: Storage) {
    this.refreshPage(0);
  }

  refreshPage(refKey) {
    if (refKey != 0) {
      this.fnRemoveSchoolData('schoolList');
      this.fnRemoveSchoolData('schoolOptions');
      localStorage.removeItem('schoolInfo');
    }
    this.myApp.addLoadingMessage();
    this.fnGetSchoolData();
  }

  fnGetSchoolData() {
    this.storage.ready().then(() => {

      Promise.all([this.storage.get("schoolList"), this.storage.get("schoolOptions")]).then(values => {
        if (values[0] === null) {
          console.log('loading school data from API');
          this.getSchoolList()
        } else {
          console.log('loading school data from Storage');
          this.schList = values[0]
          this.schListTemp = values[0]
          this.schOptions = values[1]
          this.myApp.removeMessage()
        }
      }).catch(err => {
        this.myApp.removeMessage()
        this.myApp.onPresentToast(err.message);
        console.log(err);
      })

    });
  }

  fnSetSchoolData(tempdata) {
    // School List
    this.storage.set('schoolList', tempdata.schools)
    this.schList = tempdata.schools
    this.schListTemp = tempdata.schools
    // School Combo Options
    this.storage.set('schoolOptions', tempdata.schoolOptions)
    this.schOptions = tempdata.schoolOptions
  }

  fnRemoveSchoolData(name: string) {
    console.log('Cache Data Removed: ' + name);
    this.storage.remove(name)
    localStorage.removeItem(name)
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
        this.myApp.onPresentToast(error);
      }).catch(exception => {
        this.storage.clear();
        this.myApp.removeMessage()
        this.myApp.onPresentToast(exception.message);
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
    localStorage.setItem("schoolInfo", JSON.stringify(items));
    localStorage.setItem("schoolOptions", JSON.stringify(this.schOptions));
    this.navCtrl.push('SchoolInfoPage').then(
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
