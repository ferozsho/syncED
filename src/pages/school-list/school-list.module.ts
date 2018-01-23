import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolListPage } from './school-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SchoolListPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolListPage),
    PipesModule,
  ],
})
export class SchoolListPageModule {}
