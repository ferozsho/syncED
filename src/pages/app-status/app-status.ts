import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-app-status',
  templateUrl: 'app-status.html',
})
export class AppStatusPage {

  public statusApp: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.statusApp = this.formBuilder.group({
      admissionNo: ['', Validators.required],
      aadhaarNo: [''],
    });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppStatusPage');
  }

  onSearchSubmit() {
    console.log(this.statusApp.value)
  }

  doCancel() {
    
  }

}
