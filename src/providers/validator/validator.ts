import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class ValidatorProvider {

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
