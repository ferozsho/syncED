import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  public siteOptions: optionsInterface = {}

  viewApplicantGroup: any
  validationMessage: any
  ApplicationForm: string
  deviceID: string

  regForm: FormGroup
  applicantGroup: FormGroup
  fatherGroup: FormGroup

  btnFather: boolean = true
  btnMother: boolean = true
  btnContact: boolean = true

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
  father_name: string
  father_qualification: string
  father_profession: string
  father_phone: number
  monthly_income: number

  classOptionsFormatted: Array<Object> = [];
  casteOptionsFormatted: Array<Object> = [];
  religionOptionsFormatted: Array<Object> = [];
  mtOptionsFormatted: Array<Object> = [];
  bgOptionsFormatted: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public formBuilder: FormBuilder,
    public formValidator: ValidatorProvider, public resProvider: RestProvider, public alertCtrl: AlertController) {
    this.localStorageSetData();
    this.loadSchoolClassesAPI();
    this.loadDefaultValues();
  }

  ionViewWillLoad() {
    if (typeof this.siteData === 'undefined') {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.')
      this.navCtrl.setRoot('SchoolListPage');
      this.navCtrl.popToRoot();
    }
    this.applicantGroup = new FormGroup({
      applicantName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4)])),
      aadhaarNo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])),
      dob: new FormControl(),
      sex: new FormControl(),
      classesID: new FormControl('', Validators.required),
      caste: new FormControl('', Validators.required),
      religion: new FormControl('', Validators.required),
      mother_tongue: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      bloodgroup: new FormControl(),
      id_marks_one: new FormControl(),
      id_marks_two: new FormControl(),
    })

    this.fatherGroup = new FormGroup({
      father_name: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(4),
          Validators.maxLength(60)
        ])
      ),
      father_qualification: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(100),
        ])
      ),
      father_profession: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(40),
        ])
      ),
      father_phone: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ])  
      ),
      monthly_income: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(10),
        ])
      ),
    })

    this.regForm = this.formBuilder.group({
      applicantGroup: this.applicantGroup,
      fatherGroup: this.fatherGroup
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

  loadDefaultValues() {
    this.ApplicationForm = 'applicant';
    this.validationMessage = this.formValidator.regFormMessages;
    this.dob = new Date().toISOString();
    this.sex = 'Male';
    /*
    this.applicantName = 'Sofiya Shaik';
    this.aadhaarNo = '444455556666';
    this.classesID = '13';
    this.caste = 'OC';
    this.religion = 'Islam';
    this.mother_tongue = 'Urdu';
    this.nationality = 'Indian';
    this.bloodgroup = 'A+';
    this.id_marks_one = 'A mole on right hand';
    this.id_marks_two = '';
    this.father_name = 'Mohammed Feroz Shaik';
    this.father_qualification = 'B.Sc';
    this.father_profession = 'System Analyst';
    this.monthly_income = 5000;
    this.father_phone = 9908313427;
    */
    console.log('Default form data loaded...')
    /*
    setTimeout(() => {
      this.ApplicationForm = 'father'
    }, 500);
    */
  }

  localStorageSetData() {
    this.siteData = JSON.parse(localStorage.getItem('schoolInfo'))
    this.siteOptions = JSON.parse(localStorage.getItem('schoolOptions'))

    // prepre caste select box
    this.casteOptionsFormatted.push({
      abbr: '',
      name: 'None'
    });
    for (var cKey in this.siteOptions.Caste) {
      this.casteOptionsFormatted.push({
        abbr: cKey,
        name: this.siteOptions.Caste[cKey],
      });
    }

    // prepre religion select box
    this.religionOptionsFormatted.push({
      abbr: '',
      name: 'None'
    });
    for (var rKey in this.siteOptions.Religion) {
      this.religionOptionsFormatted.push({
        abbr: rKey,
        name: this.siteOptions.Religion[rKey],
      });
    }

    // prepre Mother Tongue select box
    this.mtOptionsFormatted.push({
      abbr: '',
      name: 'None'
    });
    for (var mtKey in this.siteOptions.MotherTongue) {
      this.mtOptionsFormatted.push({
        abbr: mtKey,
        name: this.siteOptions.MotherTongue[mtKey],
      });
    }

    // prepre bloodGroup select box
    this.bgOptionsFormatted.push({
      abbr: '',
      name: 'None'
    });
    for (var bgKey in this.siteOptions.Bloodgroup) {
      this.bgOptionsFormatted.push({
        abbr: bgKey,
        name: this.siteOptions.Bloodgroup[bgKey],
      });
    }

  }

  loadSchoolClassesAPI() {
    this.resProvider.getSchoolClasses(this.siteData.siteID, this.siteData.apiURL)
      .then(data => {
        //this.fnSetSchoolData(data);
        this.classOptionsFormatted.push({
          abbr: '',
          name: 'None'
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

  onSegmentChange($event) {
    let pageName = $event.value;
    if (pageName === 'father') {
      this.btnFather = false
      this.btnMother = true
      this.btnContact = true
    } else if (pageName === 'mother') {
      this.btnFather = false
      this.btnMother = false
      this.btnContact = true
    } else if (pageName === 'contact') {
      this.btnFather = false
      this.btnMother = false
      this.btnContact = false
    } else {
      this.btnFather = true
      this.btnMother = true
      this.btnContact = true
    }
  }
  gotoNext(pageName: string) {
    let nexPage = true
    console.log(pageName)
    if (!this.applicantGroup.valid && pageName === 'father') {
      this.myApp.onPresentToast('Application form contains error', true)
      nexPage = false
    }
    if (!this.fatherGroup.valid && pageName === 'mother') {
      this.myApp.onPresentToast('Application form contains error', true)
      nexPage = false
    }
    if (nexPage) {
      console.log(JSON.stringify(this.regForm.value))
      this.viewApplicantGroup = this.regForm.value
      this.ApplicationForm = pageName
    } else {
      return false
    }
  }
  gotoBack(pageName: string) {
    this.ApplicationForm = pageName
  }

  getInfo() {
    this.deviceID = this.myApp.device.uuid;
    this.myApp.onPresentToast('Device ID: ' + this.deviceID)
    //this.deviceInfo = this.myApp.getDeviceInfo();
  }

  doResetForm() {
    let confirm = this.alertCtrl.create({
      title: 'Rest Form!',
      message: "Are you sure you want to rest form?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'button-primary'
        },
        {
          text: 'Yes',
          cssClass: 'button-royal',
          handler: data => {
            console.log('form Reset...')
            return true
          }
        }
      ]
    });
    confirm.present()
  }

  onRegistrationSubmit(formValues) {
    console.log(formValues)
  }
}

interface optionsInterface {
  Bloodgroup?: Array<Object>,
  Caste?: Array<Object>,
  Country?: Array<Object>,
  MotherTongue?: Array<Object>,
  Religion?: Array<Object>,
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