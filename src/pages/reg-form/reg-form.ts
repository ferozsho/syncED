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
  private siteOptions: optionsInterface = {}
  public serverRes: serverResponse = {}
  public hideForm: boolean = false;

  regFormData: any
  validationMessage: any
  validationFatherMessage: any
  validationMotherMessage: any
  validationContactMessage: any
  ApplicationForm: string
  deviceInfo: any

  regForm: FormGroup
  applicantGroup: FormGroup
  fatherGroup: FormGroup
  motherGroup: FormGroup
  contactGroup: FormGroup

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
  father_email: string
  monthly_income: number
  mother_name: string
  mother_qualification: string
  mother_profession: string
  mother_phone: number
  mother_email: string
  email: string
  address: string
  city: string
  pincode: number
  country: string
  phone: number

  classOptionsFormatted: Array<Object> = [];
  casteOptionsFormatted: Array<Object> = [];
  religionOptionsFormatted: Array<Object> = [];
  mtOptionsFormatted: Array<Object> = [];
  bgOptionsFormatted: Array<Object> = [];
  countryOptionsFormatted: Array<Object> = [];

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
          Validators.pattern('^[ A-Za-z.,()]*$'),
          Validators.maxLength(100),
        ])
      ),
      father_profession: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[ A-Za-z.,()]*$'),
          Validators.maxLength(40),
        ])
      ),
      father_phone: new FormControl('',
        Validators.compose([
          Validators.pattern('[0-9]*'),
          Validators.maxLength(10),
        ])
      ),
      father_email: new FormControl('',
        Validators.compose([
          Validators.pattern(this.formValidator.pureEmail)
        ])
      ),
      monthly_income: new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(10),
        ])
      ),
    })

    this.motherGroup = new FormGroup({
      mother_name: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(4),
          Validators.maxLength(60)
        ])
      ),
      mother_qualification: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[ A-Za-z.,()]*$'),
          Validators.maxLength(100),
        ])
      ),
      mother_profession: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[ A-Za-z.,()]*$'),
          Validators.maxLength(40),
        ])
      ),
      mother_phone: new FormControl('',
        Validators.compose([
          Validators.pattern('[0-9]*'),
          Validators.maxLength(10),
        ])
      ),
      mother_email: new FormControl('',
        Validators.compose([
          Validators.pattern(this.formValidator.pureEmail)
        ])
      ),
    })

    this.contactGroup = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.formValidator.pureEmail)])),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])),
      country: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')]))
    })

    this.regForm = this.formBuilder.group({
      applicantGroup: this.applicantGroup,
      fatherGroup: this.fatherGroup,
      motherGroup: this.motherGroup,
      contactGroup: this.contactGroup
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
    this.validationFatherMessage = this.formValidator.regFormFatherMessages;
    this.validationMotherMessage = this.formValidator.regFormMotherMessages;
    this.validationContactMessage = this.formValidator.regFormContactMessages;

    this.dob = new Date().toISOString();
    this.sex = 'Female';
    this.applicantName = 'Sofya Shaik';
    this.aadhaarNo = '444455556666';
    this.classesID = '13';
    this.caste = 'OC';
    this.religion = 'Islam';
    this.mother_tongue = 'Urdu';
    this.nationality = 'Indian';
    this.bloodgroup = 'A+';
    this.id_marks_one = '';
    this.id_marks_two = '';

    this.father_name = 'Mohammed Feroz Shaik';
    this.father_qualification = 'B.Sc';
    this.father_profession = 'IT';
    this.monthly_income = 5000;
    this.father_phone = 9908313427;
    this.father_email = 'ferozsho@yahoo.com';

    this.mother_name = 'Asiya Nazima';
    this.mother_qualification = 'M.A';
    this.mother_profession = 'Housewife';
    this.mother_phone = null;
    this.mother_email = '';

    this.email = '';
    this.address = '391/54/18, SN - 2';
    this.city = 'Hyderabad';
    this.pincode = 500035;
    this.country = 'IN';
    this.phone = null;

    setTimeout(() => {
      this.gotoNext('father')
      setTimeout(() => {
        this.gotoNext('mother')
        setTimeout(() => {
          this.gotoNext('contact')
        }, 250);
      }, 200);
    }, 200);

    console.log('Loading default data...')
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

    // prepre bloodGroup select box
    this.countryOptionsFormatted.push({
      abbr: '',
      name: 'None'
    });
    for (var cyKey in this.siteOptions.Country) {
      this.countryOptionsFormatted.push({
        abbr: cyKey,
        name: this.siteOptions.Country[cyKey],
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
    if (!this.applicantGroup.valid && pageName === 'father') {
      this.myApp.onPresentToast('Application form contains error', true)
      nexPage = false
    }
    if (!this.fatherGroup.valid && pageName === 'mother') {
      this.myApp.onPresentToast('Application form contains error', true)
      nexPage = false
    }
    if (!this.motherGroup.valid && pageName === 'contact') {
      this.myApp.onPresentToast('Application form contains error', true)
      nexPage = false
    }
    if (pageName === 'contact') {
      //check Phone field
      if (this.phone == null) {
        if (this.father_phone !== null && this.father_phone.toString() !== "") {
          this.phone = this.father_phone;
        } else {
          if (this.mother_phone !== null && this.mother_phone.toString() !== "") {
            this.phone = this.mother_phone;
          }
        }
      }
      //check Email field
      if (this.email.toString() === "") {
        if (this.father_email !== null && this.father_email.toString() !== "") {
          this.email = this.father_email;
        } else {
          if (this.mother_email !== null && this.mother_email.toString() !== "") {
            this.email = this.mother_email;
          }
        }
      }
    }
    if (nexPage) {
      this.ApplicationForm = pageName
    } else {
      return false
    }
  }

  gotoBack(pageName: string) {
    this.ApplicationForm = pageName
  }

  onRegistrationSubmit(formValues) {
    this.myApp.addLoadingMessage()
    this.deviceInfo = this.myApp.deviceInfo
    this.regFormData = formValues;
    this.saveRegForm()
  }

  saveRegForm() {
    this.resProvider.postNewAdminssion(this.deviceInfo, this.regFormData)
      .then(data => {
        this.serverRes = data
        if (this.serverRes.status == false) {
          this.myApp.onPresentToast('Server response: ' + this.serverRes.message, false)
          this.regFormData = null
        } else {
          this.myApp.onPresentToast('Your enrolment number is : ' + this.serverRes.message, false, false, 'success')
          this.hideForm = true
        }
        this.myApp.removeMessage()
      },
      error => {
        this.myApp.removeMessage()
        this.myApp.onPresentToast(error)
      }).catch(exception => {
        this.myApp.removeMessage()
        this.myApp.onPresentToast(exception.message)
      });
  }

  goBack() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop()
    } else {
      this.navCtrl.setRoot('SchoolListPage');
      this.navCtrl.push('SchoolInfoPage').then(
        response => {
          //console.log('Response ' + response);
        },
        error => {
          this.myApp.onPresentToast(error);
        }
      ).catch(exception => {
        this.myApp.onPresentToast(exception);
      });
    }
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

interface serverResponse {
  status?: Boolean,
  message?: any
}