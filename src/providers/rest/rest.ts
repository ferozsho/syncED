import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {

  apiUrl: string = "http://synced.intellibiz.in/api/schools";
  //apiUrl: string = "http://localhost/synced/api/schools";

  constructor(private http: HttpClient) {
    console.log('Rest Provider Conncected:', this.apiUrl);
  }

  getSchoolList() {
    let newAPI = this.apiUrl + '/schlist';
    console.log('Loading schools from server: ' + newAPI);

    return new Promise((resolve, reject) => {
      this.http.get(newAPI)
        .subscribe(data => {
          resolve(data);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject("Client response: " + err.message);
          } else {
            if (err.status) {
              reject("Server response: " + err.error.error);
            }
            reject("Server response: " + err.message);
          }
        });
    });

  }

  getSchoolClasses(siteID: number, apiClassesUrl: string) {
    let newAPI = apiClassesUrl;
    if (newAPI) {
      newAPI = newAPI + 'classes';
    } else {
      newAPI = this.apiUrl + '/classes?siteID=' + siteID;
    }
    console.log('Loading classes from server: ' + newAPI);
    return new Promise((resolve, reject) => {
      this.http.get(newAPI)
        .subscribe(data => {
          resolve(data);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject("Client response: " + err.message);
          } else {
            if (err.status) {
              reject("Server response: " + err.error.error);
            }
            reject("Server response: " + err.message);
          }
        });
    });
  }

  postNewAdminssion(deviceInfo: any, formData: any) {
    let targetData = {
      'deviceInfo': deviceInfo,
      'formData': formData
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/admissions', targetData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).subscribe(res => {
          resolve(res)
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject("Client response: " + err.message);
          } else {
            if (err.status) {
              reject("Server response: " + err.error.error);
            }
            reject("Server response: " + err.message);
          }
        })
    });
  }
}
