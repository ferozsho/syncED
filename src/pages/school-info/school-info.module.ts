import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolInfoPage } from './school-info';

@NgModule({
  declarations: [
    SchoolInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolInfoPage),
  ],
})
export class SchoolInfoPageModule {}
