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
  session: any;

  statusApp: FormGroup;
  findout_fill_group: FormGroup;
  admissionNo: AbstractControl;
  aadhaarNo: AbstractControl;
  validation_messages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public formValidator: ValidatorProvider,
    public myApp: MyApp) {
    this.session = this.navParams.get('siteInfo');
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
    if (typeof this.session === 'undefined') {
      this.session = null;
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.popToRoot();
      return false;
    } else {
      this.session = this.navParams.get('item');
    }
    console.log('Enter School Information')
  }

  ionViewDidEnter() {
    this.myApp.removeMessage();
  }
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
    this.navCtrl.pop();
  }

}
