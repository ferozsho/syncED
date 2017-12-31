import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegFormPage } from './reg-form';

@NgModule({
  declarations: [
    RegFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RegFormPage),
  ],
})

export class RegFormPageModule {}
