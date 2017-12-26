import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolListPage } from './school-list';

@NgModule({
  declarations: [
    SchoolListPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolListPage),
  ],
})
export class SchoolListPageModule {}
