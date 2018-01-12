import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ValidatorProvider {

  public pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public statusAppValidationMessages = {
    'admissionNo': [
      { type: 'minlength', message: 'Admission must be at least 7 digist number.' }
    ],
    'aadhaarNo': [
      { type: 'minlength', message: 'Aadhaar must be at least 12 digit number.' }
    ],
    'findout_fill': [
      { type: 'appStatusAreEqual', message: 'Please enter either Enrolment or Aadhaar number.' }
    ],
  };

  public regFormMessages = {
    'aadhaarNo': [
      { type: 'required', message: 'Aadhaar is requried.' },
      { type: 'minlength', message: 'Must be at least 12 digit number.' },
      { type: 'maxlength', message: 'Maximum length 12 digits.' },
    ],
    'applicantName': [
      { type: 'required', message: 'Applicant name is requried.' },
      { type: 'minlength', message: 'Invalid, provide the full applicant name.' },
    ],
    'classesID': [
      { type: 'required', message: 'This field is required.' },
    ],
    'caste': [
      { type: 'required', message: 'This field is required.'}
    ],
    'nationality': [
      { type: 'required', message: 'This field is required.' }
    ],
  };

  public regFormFatherMessages = {
    'father_name': [
      { type: 'required', message: 'Father name is requried.' },
      { type: 'pattern',  message: 'Invalid full name!'},
      { type: 'minlength', message: 'Invalid, provide the full name.' },
      { type: 'maxlength', message: 'Maximum length 60 digits.' },
    ],
    'father_qualification': [
      { type: 'required', message: 'Father name is requried.' },
      { type: 'pattern', message: 'Invalid qualification!.' },
      { type: 'maxlength', message: 'Maximum length 60 digits.' },
    ],
    'father_profession': [
      { type: 'required', message: 'Profession/Occupation is requried.' },
      { type: 'pattern', message: 'Invalid input!' },
      { type: 'maxlength', message: 'Maximum length 60 digits.' },
    ],
    'father_phone': [
      { type: 'required', message: 'Contact number is requried.' },
      { type: 'pattern', message: 'This entry can only contain numbers from 0 to 9.' },
      { type: 'minlength', message: 'Invalid contact number.' },
      { type: 'maxlength', message: 'Maximum length 10 digits.' },
    ],
    'father_email': [
      { type: 'pattern', message: 'Invalid mail address ex: yourname@domain.com' },
    ],
    'monthly_income': [
      { type: 'required', message: 'The monthly income is required.'},
      { type: 'pattern', message: 'This entry can only contain numbers from 0 to 9.' },
      { type: 'maxlength', message: 'Maximum length 10 digits.' },
    ],
  };

  public regFormMotherMessages = {
    'mother_name': [
      { type: 'required', message: 'Name is requried.' },
      { type: 'pattern', message: 'Invalid full name!' },
      { type: 'minlength', message: 'Invalid, provide the full name.' },
      { type: 'maxlength', message: 'Maximum length 60 digits.' },
    ],
    'mother_qualification': [
      { type: 'required', message: 'Father name is requried.' },
      { type: 'pattern', message: 'Invalid qualification!.' },
      { type: 'maxlength', message: 'Maximum length 60 digits.' },
    ],
    'mother_profession': [
      { type: 'required', message: 'Profession/Occupation is requried.' },
      { type: 'pattern', message: 'Invalid input!' },
      { type: 'maxlength', message: 'Maximum length 60 digits.' },
    ],
    'mother_phone': [
      { type: 'required', message: 'Contact number is requried.' },
      { type: 'pattern', message: 'This entry can only contain numbers from 0 to 9.' },
      { type: 'minlength', message: 'Invalid contact number.' },
      { type: 'maxlength', message: 'Maximum length 10 digits.' },
    ],
    'mother_email': [
      { type: 'pattern', message: 'Invalid mail address ex: yourname@domain.com' },
    ],
  };

  public regFormContactMessages = {
    'email': [
      { type: 'required', message: 'this field is requried.' },
      { type: 'pattern', message: 'Invalid mail address ex: yourname@domain.com' },
    ],
    'address': [
      { type: 'required', message: 'This field is requried.' },
    ],
    'city': [
      { type: 'required', message: 'This field is requried.' },
    ],
    'pincode': [
      { type: 'required', message: 'This field is requried.' },
    ],
    'country': [
      { type: 'required', message: 'This field is requried.' },
    ],
    'phone': [
      { type: 'required', message: 'Please provide contact number for Father or Mother !'},
    ]
  };

  constructor() {
    console.log('Init validator provider');
  }

  appStatusAreEqual(formGroup: FormGroup) {
    let valid = true;
    var admissionNo = formGroup.controls['admissionNo']
    var aadhaarNo = formGroup.controls['aadhaarNo']
    if ((admissionNo.value === '' || admissionNo.value === null) && (aadhaarNo.value === '' || aadhaarNo.value === null)) {
      valid = false;
    }

    if (valid) {
      return null;
    }
    return {
      appStatusAreEqual: true
    };
  }

}