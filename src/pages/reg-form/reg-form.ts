import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MyApp } from './../../app/app.component';
import { ValidatorProvider } from './../../providers/validator/validator';

@IonicPage()
@Component({
  selector: 'page-reg-form',
  templateUrl: 'reg-form.html',
})

export class RegFormPage {
  
  public siteData: schoolInterface = {}
  validationMessage: any
  ApplicationForm: string
  deviceID: string

  regForm: FormGroup
  applicantGroup: FormGroup
  btnFather: boolean = true
  btnMother: boolean = true

  sex: string
  dob: string
  aadhaarNo: number

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public formBuilder: FormBuilder,
    public formValidator: ValidatorProvider) {
    this.localStorageSetData();
    this.loadDefaultValues();
  }

  loadDefaultValues() {
    this.ApplicationForm = 'applicant'
    this.validationMessage = this.formValidator.regFormMessages;
    this.dob = new Date().toISOString();
    this.sex = 'Male';
  }

  ionViewWillLoad() {
    if (typeof this.siteData === 'undefined') {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.setRoot('SchoolListPage');
      this.navCtrl.popToRoot();
    }
    this.applicantGroup = new FormGroup({
      applicantName : new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      aadhaarNo     : new FormControl('', Validators.compose([Validators.required, Validators.minLength(12)])),
      dob           : new FormControl(),
      sex           : new FormControl(),
    })
    this.regForm = this.formBuilder.group({
      applicantGroup: this.applicantGroup
    });
    
    console.log('Enter school registration')
  }

  localStorageSetData() {
    let stroageSchoolInfo = JSON.parse(localStorage.getItem('schoolInfo'));
    this.siteData = stroageSchoolInfo;
  }

  ionViewDidEnter() {
    try {
      this.myApp.removeMessage()
    } catch (error) {
      console.log(error.message)
    }
  }

  gotoNext(pageName: string) {
    if (!this.applicantGroup.valid) {
      this.myApp.onPresentToast('This form contains error', true)
    } else {
      this.ApplicationForm = pageName;
    }
  }

  onRegistrationSubmit() {
    if (this.regForm.valid) {
      let formData = JSON.stringify(this.regForm.value);
      console.log(formData)
      this.myApp.onPresentToast(formData)
    } else {
      this.myApp.onPresentToast('Invalid Application')
    }
  }
  getInfo() {
    this.deviceID = this.myApp.device.uuid;
    this.myApp.onPresentToast('Device ID: ' + this.deviceID)   
    //this.deviceInfo = this.myApp.getDeviceInfo();
  }

  doResetForm() {
    
  }
  
}
