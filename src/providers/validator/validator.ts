import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class ValidatorProvider {

  public statusAppValidationMessages = {
    'admissionNo': [
      { type: 'minlength', message: 'Admission must be at least 5 digist number.' }
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
      { type: 'required', message: 'Applicant name is requried.' },
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
  };

  constructor() {
    console.log('Init validator provider');
  }

  validEmailAddress(control: FormControl) {
    return new Promise(resolve => {
      let emailPartten = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailPartten.test(control.value)) {
        resolve({ aadhaarNo: true });
      } else {
        resolve(null);
      }  
    })
  }

  appStatusAreEqual(formGroup: FormGroup) {
    let valid = true;
    if (formGroup.controls['admissionNo'].value === '' && formGroup.controls['aadhaarNo'].value === '') {
      valid = false;
    }

    if (valid) {
      return null;
    }

    return {
      areAnyEqual: true
    };
  }
 
}
