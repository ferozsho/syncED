import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AndroidFullScreen } from "@ionic-native/android-full-screen";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';
import { RestProvider } from '../providers/rest/rest';
import { ValidatorProvider } from '../providers/validator/validator';
import { schoolHttpInterceptor } from './../providers/rest/interceptor';
import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false //scroll issue on ios device ref: https://github.com/ionic-team/ionic/issues/6228
    }),
    IonicStorageModule.forRoot({
      name: 'synced',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    BrowserAnimationsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFullScreen,
    RestProvider,
    ValidatorProvider,
    Device,
    { provide: HTTP_INTERCEPTORS, useClass: schoolHttpInterceptor, multi: true},
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
