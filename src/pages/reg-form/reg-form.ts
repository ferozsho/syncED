import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MyApp } from './../../app/app.component';
import { ValidatorProvider } from './../../providers/validator/validator';
import { RestProvider } from '../../providers/rest/rest';

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

  applicantName: string
  sex: string
  dob: string
  aadhaarNo: string
  classesID: string
  caste: string
  religion: string
  mother_tongue: string
  nationality: string
  bloodgroup: string
  id_marks_one: string
  id_marks_two: string

  classOptionsFormatted: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public formBuilder: FormBuilder,
    public formValidator: ValidatorProvider, public resProvider: RestProvider ) {
    this.localStorageSetData();
    this.loadSchoolClassesAPI();
    this.loadDefaultValues();
  }

  loadDefaultValues() {
    this.ApplicationForm = 'applicant'
    this.validationMessage = this.formValidator.regFormMessages
    this.applicantName = 'Sofiya'
    this.aadhaarNo = '444455556666'
    this.dob = new Date().toISOString();
    this.sex = 'Female';
    this.classesID = '';
  }

  ionViewWillLoad() {
    if (typeof this.siteData === 'undefined') {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.setRoot('SchoolListPage');
      this.navCtrl.popToRoot();
    }
    this.applicantGroup = new FormGroup({
      applicantName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      aadhaarNo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])),
      dob: new FormControl(),
      sex: new FormControl(),
      classesID: new FormControl('', Validators.compose([Validators.required])),
    })
    this.regForm = this.formBuilder.group({
      applicantGroup: this.applicantGroup
    });
    console.log('Enter school registration')
  }

  ionViewDidEnter() {
    try {
      if (this.classOptionsFormatted.length != 0) {
        this.myApp.removeMessage()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  localStorageSetData() {
    this.siteData = JSON.parse(localStorage.getItem('schoolInfo'))
  }

  loadSchoolClassesAPI() {
    this.resProvider.getSchoolClasses(this.siteData.siteID, this.siteData.apiURL)
      .then(data => {
        //this.fnSetSchoolData(data);
        this.classOptionsFormatted.push({
          abbr: '',
          name: '- Select Class -'
        });
        for (var key in data) {
          this.classOptionsFormatted.push({
            abbr: data[key]['classesID'],
            name: data[key]['classes']
          });
        }
        this.myApp.removeMessage()
      },
      error => {
        this.myApp.removeMessage()
        this.myApp.onPresentToast(error);
      }).catch(exception => {
        this.myApp.removeMessage()
        this.myApp.onPresentToast(exception.message);
      });
  }

  gotoNext(pageName: string) {
    if (!this.applicantGroup.valid) {
      this.myApp.onPresentToast('This form contains error', true)
    } else {
      console.log(this.regForm.value)
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