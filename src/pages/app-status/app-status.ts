import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MyApp } from '../../app/app.component';
import { ValidatorProvider } from './../../providers/validator/validator';
import { SchoolApi } from '../../providers/school-api/school-api';

@IonicPage()
@Component({
  selector: 'page-app-status',
  templateUrl: 'app-status.html',
})
export class AppStatusPage {
  schInfo: any;

  statusApp: FormGroup;
  findout_fill_group: FormGroup;
  admissionNo: AbstractControl;
  aadhaarNo: AbstractControl;
  validation_messages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public formValidator: ValidatorProvider,
    public myApp: MyApp, public schoolAPI: SchoolApi) {
    this.schInfo = this.navParams.get('siteInfo');
  }

  ionViewWillLoad() {
    this.validation_messages = this.formValidator.statusAppValidationMessages;
    
    this.findout_fill_group = new FormGroup({
      admissionNo: new FormControl('', Validators.minLength(5)),
      aadhaarNo: new FormControl('', Validators.minLength(10))
    }, (formGroup: FormGroup) => {
      return this.formValidator.areAnyEqual(formGroup);
    });

    this.statusApp = this.formBuilder.group({
      findout_fill: this.findout_fill_group
    });

  }

  ionViewCanEnter() {
    if (typeof this.schInfo === 'undefined') {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.popToRoot();
      return false;
    } else {
      this.schInfo = this.navParams.get('siteInfo');
    }
    console.log('Enter School Information')
  }

  ionViewDidEnter() {
    this.myApp.removeMessage();
  }

  onSearchSubmit() {
    if (this.statusApp.valid) {
      console.log(this.statusApp.value.findout_fill)
      this.myApp.onPresentToast(JSON.stringify(this.statusApp.value.findout_fill))
    } else {
      this.myApp.onPresentToast('Invalid code, Please enter either Enrolment or Aadhaar number.')
    }
  }

  doCancel() {
    this.navCtrl.pop();
  }

}
