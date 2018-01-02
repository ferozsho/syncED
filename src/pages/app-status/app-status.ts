import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MyApp } from '../../app/app.component';
import { ValidatorProvider } from './../../providers/validator/validator';

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
    public myApp: MyApp) {
    this.schInfo = this.navParams.get('siteInfo');
  }

  ionViewWillLoad() {
    this.validation_messages = this.formValidator.statusAppValidationMessages;
    
    this.findout_fill_group = new FormGroup({
      admissionNo: new FormControl('', Validators.minLength(5)),
      aadhaarNo: new FormControl('', Validators.minLength(12))
    }, (formGroup: FormGroup) => {
      return this.formValidator.appStatusAreEqual(formGroup);
    });

    this.statusApp = this.formBuilder.group({
      findout_fill: this.findout_fill_group
    });

  }

  ionViewCanEnter() {
    if (typeof this.schInfo === 'undefined') {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.setRoot('SchoolListPage');
      this.navCtrl.popToRoot();
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
      let formData = JSON.stringify(this.statusApp.value.findout_fill);
      console.log(formData)
      this.myApp.onPresentToast(formData)
    } else {
      this.myApp.onPresentToast('Invalid code, Please enter either Enrolment or Aadhaar number.')
    }
  }

}
