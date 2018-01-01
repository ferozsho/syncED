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
      { type: 'minlength', message: 'Aadhaar must be at least 12 digit number.' }
    ],
    'applicantName': [
      { type: 'required', message: 'Applicant name is requried.' },
      { type: 'minlength', message: 'Invalid, provide the full applicant name.' },
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
