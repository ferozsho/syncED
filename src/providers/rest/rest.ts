import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {

  apiKey: string = "X-API-KEY=synced-9908313427"
  //apiUrl: string = "http://synced.intellibiz.in/api/schools";
  apiUrl: string = "http://localhost/synced/api/schools";

  constructor(public http: HttpClient) {
    console.log('Rest Provider Conncected:', this.apiUrl);
  }

  getSchoolList() {
    //X-API-KEY : synced-9908313427
    let newAPI = this.apiUrl + '/schlist?' + this.apiKey;
    console.log('Loading schools from server: ' + newAPI);

    return new Promise((resolve, reject) => {
      this.http.get(newAPI)
        .subscribe(data => {
          resolve(data);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject("Client-side Error: " + err.message);
          } else {
            reject("Server-side Error: " + err.message);
          }
        });
    });

  }

  getSchoolClasses(siteID: number, apiClassesUrl: string) {
    let newAPI = apiClassesUrl;
    if (newAPI) {
      newAPI = newAPI + 'classes';
    } else {
      newAPI = this.apiUrl + '/classes?siteID=' + siteID + '&' + this.apiKey;
    }
    console.log('Loading classes from server: ' + newAPI);
    return new Promise((resolve, reject) => {
      this.http.get(newAPI)
        .subscribe(data => {
          resolve(data);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject("Client-side Error: " + err.message);
          } else {
            reject("Server-side Error: " + err.message);
          }
        });
    });
  }

}
