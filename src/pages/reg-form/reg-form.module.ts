import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegFormPage } from './reg-form';
import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    RegFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RegFormPage),
  ],
  providers: [
    Device
  ],
})

export class RegFormPageModule {}
