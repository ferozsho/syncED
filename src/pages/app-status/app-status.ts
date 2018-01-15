import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MyApp } from '../../app/app.component';
import { ValidatorProvider } from './../../providers/validator/validator';
import { RestProvider } from './../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-app-status',
  templateUrl: 'app-status.html',
})
export class AppStatusPage {

  siteData: schoolInterface = {};
  statusApp: FormGroup;
  findout_fill_group: FormGroup;
  validation_messages: any;
  admissionNo: number;
  aadhaarNo: number;
  serverRes: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private formValidator: ValidatorProvider, private myApp: MyApp, private modal: ModalController, private resProvider: RestProvider) {
    this.localStorageSetData();
  }

  localStorageSetData() {
    this.siteData = JSON.parse(localStorage.getItem('schoolInfo'))
    this.admissionNo = 1801151;
    this.aadhaarNo = null;
    if (this.navParams.get('admissionNo')) {
      this.admissionNo = this.navParams.get('admissionNo');
      console.log('this.admissionNo' + this.admissionNo);
    }
  }

  ionViewWillLoad() {
    if (typeof this.siteData === 'undefined') {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.setRoot('SchoolListPage');
      this.navCtrl.popToRoot();
    }
    this.validation_messages = this.formValidator.statusAppValidationMessages;
    this.findout_fill_group = new FormGroup({
      admissionNo: new FormControl('', Validators.compose([Validators.minLength(7)])),
      aadhaarNo: new FormControl('', Validators.compose([Validators.minLength(12)])),
    }, (formGroup: FormGroup) => {
      return this.formValidator.appStatusAreEqual(formGroup);
    });
    this.statusApp = this.formBuilder.group({
      findout_fill: this.findout_fill_group
    });

    console.log('Enter Tracking Information')
  }

  ionViewDidEnter() {
    try {
      this.myApp.removeMessage()
    } catch (error) {
      console.log(error.message)
    }
  }

  onSearchSubmit() {
    if (this.findout_fill_group.valid) {
      this.resProvider.trackApplication(this.findout_fill_group.value)
        .then(data => {
          this.serverRes = data
          if (this.serverRes.status == false) {
            this.myApp.onPresentToast('Srv.Response: ' + this.serverRes.message, false);
          } else {
            this.createModalTrack(this.serverRes);
          }
          this.myApp.removeMessage();
        }, error => {
          this.myApp.removeMessage();
          this.myApp.onPresentToast(error);
        }).catch(exception => {
          this.myApp.removeMessage();
          this.myApp.onPresentToast(exception.message);
        });
    } else {
      this.myApp.onPresentToast('Invalid code, Please enter either Enrolment or Aadhaar number.');
    }
  }
  createModalTrack(formData: any) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myTrackModal = this.modal.create('ModalTrackPage', { mData: formData }, myModalOptions);
    myTrackModal.present();
  }
}

interface schoolInterface {
  siteID?: number,
  siteName?: string,
  siteAddress?: string,
  siteLogo?: string,
  apiURL?: string,
  tracks?: string,
  status?: number,
  priority?: number,
}
