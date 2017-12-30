import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {

  isApp: boolean;
  apiUrl: string = "http://synced.intellibiz.in/api/schools/schlist";
  //apiUrl: string = "http://localhost/synced/api/schools/schlist";

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider : ' + this.apiUrl);
  }

  getSchoolList() {
    //X-API-KEY : synced-9908313427
    console.log('Loading From Server: ' + this.apiUrl);

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '?X-API-KEY=synced-9908313427').subscribe(data => {
        resolve(data);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          reject("Client-Side Error: " + err.message);
        } else {
          reject("Server-Side Error: " + err.message);
        }
      });
    });

  }

}
