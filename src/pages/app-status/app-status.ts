import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ValidatorProvider } from './../../providers/validator/validator';

@IonicPage()
@Component({
  selector: 'page-app-status',
  templateUrl: 'app-status.html',
})
export class AppStatusPage {

  statusApp: FormGroup;
  findout_fill_group: FormGroup;
  admissionNo: AbstractControl;
  aadhaarNo: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public formValidator: ValidatorProvider) {

  }

  ionViewWillLoad() {

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

  validation_messages = {
    'admissionNo': [
      { type: 'minlength', message: 'Admission must be at least 5 characters long.' }
    ],
    'aadhaarNo': [
      { type: 'minlength', message: 'Aadhaar must be at least 10 characters long.' }
    ],
    'findout_fill': [
      { type: 'areAnyEqual', message: 'Invalid entry' }
    ],
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppStatusPage');
  }

  onSearchSubmit() {
    if (this.statusApp.valid) {
      console.log(this.statusApp.value)
    } else {

    }
  }

  doCancel() {
    this.navCtrl.popToRoot();
  }

}
