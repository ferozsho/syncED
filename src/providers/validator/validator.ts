import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class ValidatorProvider {

  public statusAppValidationMessages = {
    'admissionNo': [
      { type: 'minlength', message: 'Admission must be at least 5 characters long.' }
    ],
    'aadhaarNo': [
      { type: 'minlength', message: 'Aadhaar must be at least 10 characters long.' }
    ],
    'findout_fill': [
      { type: 'areAnyEqual', message: 'Please enter either Enrolment or Aadhaar number.' }
    ],
  };

  constructor() {
    console.log('Hello ValidatorProvider Provider');

  }

  validAadhaarNo(control: FormControl) {
    return new Promise(resolve => {
      let emailPartten = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailPartten.test(control.value)) {
        resolve({ aadhaarNo: true });
      } else {
        resolve(null);
      }  
    })
  }

  areAnyEqual(formGroup: FormGroup) {
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
