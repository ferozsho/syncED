import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MyApp } from './../../app/app.component';
import { ValidatorProvider } from './../../providers/validator/validator';
import { RestProvider } from '../../providers/rest/rest';
import { StudentInfo } from '../../models/student-info';

@IonicPage()
@Component({
  selector: 'page-reg-form',
  templateUrl: 'reg-form.html',
})

export class RegFormPage {

  studentInfo = {} as StudentInfo;
  
  public siteData: schoolInterface = {}
  public serverRes: serverResponse = {}
  public hideForm: boolean = false;
  private siteOptions: optionsInterface = {}
  
  inputsInvalid: formInterface = {};
  regFormData: any;
  validationMessage: any;
  validationFatherMessage: any;
  validationMotherMessage: any;
  validationContactMessage: any;
  ApplicationForm: string;
  deviceInfo: any;
  
  regForm: FormGroup;
  applicantGroup: FormGroup;
  fatherGroup: FormGroup;
  motherGroup: FormGroup;
  contactGroup: FormGroup;

  btnFather: boolean = true;
  btnMother: boolean = true;
  btnContact: boolean = true;

  classOptionsFormatted: Array<classOptionsFormatted> = [];
  casteOptionsFormatted: Array<casteOptionsFormatted> = [];
  religionOptionsFormatted: Array<religionOptionsFormatted> = [];
  mtOptionsFormatted: Array<mtOptionsFormatted> = [];
  bgOptionsFormatted: Array<bgOptionsFormatted> = [];
  countryOptionsFormatted: Array<countryOptionsFormatted> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public formBuilder: FormBuilder,
    public formValidator: ValidatorProvider, public resProvider: RestProvider, public alertCtrl: AlertController) {
    this.localStorageSetData();
    this.loadSchoolClassesAPI();
    this.loadDefaultValues();
  }

  ionViewWillLoad() {
    if (typeof this.siteData === 'undefined') {
      this.myApp.onPresentToast('Sorry! We unable to get school information from server.', false, false, 'error', 'top', true);
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
      //this.ctrlOnChangeEvent();
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

    this.studentInfo.dob = new Date().toISOString();
    this.studentInfo.sex = 'Female';
    this.studentInfo.applicantName = 'Sofiya Shaik';
    this.studentInfo.aadhaarNo = '333344445555';
    this.studentInfo.classesID = '13';
    this.studentInfo.caste = 'OC';
    this.studentInfo.religion = 'Islam';
    this.studentInfo.mother_tongue = 'Urdu';
    this.studentInfo.nationality = 'Indian';
    this.studentInfo.bloodgroup = 'A+';
    this.studentInfo.id_marks_one = '';
    this.studentInfo.id_marks_two = '';

    this.studentInfo.father_name = 'Feroz Shaik';
    this.studentInfo.father_qualification = 'BSc';
    this.studentInfo.father_profession = 'IT';
    this.studentInfo.monthly_income = 5000;
    this.studentInfo.father_phone = null;
    this.studentInfo.father_email = '';

    this.studentInfo.mother_name = 'Asiya Nazima';
    this.studentInfo.mother_qualification = 'M.A';
    this.studentInfo.mother_profession = 'HMaker';
    this.studentInfo.mother_phone = null;
    this.studentInfo.mother_email = '';

    this.studentInfo.email = 'feroz.shaik@3pillarstc.com';
    this.studentInfo.address = '391-54/18, SN -2';
    this.studentInfo.city = 'Hyderabad';
    this.studentInfo.pincode = 500034;
    this.studentInfo.country = 'IN';
    this.studentInfo.phone = 9908313427;

    console.log('Loading default data...')
    
    setTimeout(() => {
      this.ApplicationForm = 'father';
      setTimeout(() => {
        this.ApplicationForm = 'mother';
        setTimeout(() => {
          this.ApplicationForm = 'contact';
        }, 1000);
      }, 1000);
    }, 1000);
    
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
        this.myApp.onPresentToast(error, false, false, 'error', 'bottom', true);
      }).catch(exception => {
        this.myApp.removeMessage()
        this.myApp.onPresentToast(exception.message, false, false, 'error', 'bottom', true);
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
      this.validateAllFormFields(this.applicantGroup);
      this.myApp.onPresentToast('Application form contains error', true, false, 'error', 'top', true);
      nexPage = false
    }
    if (!this.fatherGroup.valid && pageName === 'mother') {
      this.validateAllFormFields(this.fatherGroup);
      this.myApp.onPresentToast('Application form contains error', true, false, 'error', 'top', true);
      nexPage = false
    }
    if (!this.motherGroup.valid && pageName === 'contact') {
      this.validateAllFormFields(this.motherGroup);
      this.myApp.onPresentToast('Application form contains error', true, false, 'error', 'top', true);
      nexPage = false
    }
    if (pageName === 'contact') {
      //check Phone field
      if (this.studentInfo.phone == null) {
        if (this.studentInfo.father_phone !== null && this.studentInfo.father_phone.toString() !== "") {
          this.studentInfo.phone = this.studentInfo.father_phone;
        } else {
          if (this.studentInfo.mother_phone !== null && this.studentInfo.mother_phone.toString() !== "") {
            this.studentInfo.phone = this.studentInfo.mother_phone;
          }
        }
      }
      //check Email field
      if (this.studentInfo.email.toString() === "") {
        if (this.studentInfo.father_email !== null && this.studentInfo.father_email.toString() !== "") {
          this.studentInfo.email = this.studentInfo.father_email;
        } else {
          if (this.studentInfo.mother_email !== null && this.studentInfo.mother_email.toString() !== "") {
            this.studentInfo.email = this.studentInfo.mother_email;
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
    this.validateAllFormFields(this.contactGroup);
    if (!this.regForm.valid) {
      this.myApp.onPresentToast('Application form contains error', true, false, 'error', 'top', true);
      return false;
    } else {
      this.myApp.addLoadingMessage();
      this.deviceInfo = this.myApp.deviceInfo;
      this.regFormData = formValues;
      this.saveRegForm();
    }
  }

  saveRegForm() {
    let targetData = {
      'siteID': this.siteData.siteID,
      'deviceInfo': this.deviceInfo,
      'formData': this.regFormData,
    }
    this.resProvider.postNewAdminssion(targetData)
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
      }).catch((error) => {
        error = typeof error === "undefined" ? 'Server issue while posting your info.' : error;
        this.myApp.onPresentToast(error, false, false, 'error', 'top', true);
        this.myApp.removeMessage()
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


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        let shadesEl = document.querySelector('[formControlName="' + field + '"]').parentElement.parentElement.parentElement;
        if (control.errors != null) {
          shadesEl.classList.remove('ng-untouched');
          shadesEl.classList.add('ng-invalid', 'ng-touched', 'ng-dirty');
        } else {
          shadesEl.classList.remove('ng-dirty', 'ng-invalid');
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  ctrlIsValid(formGroup: FormGroup, ctrl: string) {
    let shadesEl = document.querySelector('[formControlName="' + ctrl + '"]').parentElement.parentElement.parentElement;
    const control = formGroup.get(ctrl);
    if (control.errors != null) {
      shadesEl.classList.remove('ng-untouched');
      shadesEl.classList.add('ng-invalid', 'ng-touched', 'ng-dirty');
    } else {
      shadesEl.classList.remove('ng-dirty', 'ng-invalid');
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

interface formInterface {
  classesID?: string
}

interface classOptionsFormatted {
  abbr?: any,
  name?: any
}

interface casteOptionsFormatted {
  abbr?: any,
  name?: any
}

interface religionOptionsFormatted {
  abbr?: any,
  name?: any
}

interface mtOptionsFormatted {
  abbr?: any,
  name?: any
}

interface bgOptionsFormatted {
  abbr?: any,
  name?: any
}

interface countryOptionsFormatted {
  abbr?: any,
  name?: any
}
