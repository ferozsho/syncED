import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppStatusPage } from './app-status';

@NgModule({
  declarations: [
    AppStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(AppStatusPage),
  ],
})
export class AppStatusPageModule {}
