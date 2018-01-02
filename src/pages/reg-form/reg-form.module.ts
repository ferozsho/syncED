import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegFormPage } from './reg-form';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    RegFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RegFormPage),
    TooltipsModule,
  ],
})

export class RegFormPageModule {}
