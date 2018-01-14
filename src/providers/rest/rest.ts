import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RestProvider {

  //apiUrl: string = "http://synced.intellibiz.in/api/schools";
  apiUrl: string = "http://localhost/synced/api/schools";

  constructor(private http: HttpClient) {
    console.log('Rest Provider Conncected:', this.apiUrl)
  }

  getSchoolList() {
    let newAPI = this.apiUrl + '/schlist'
    console.log('Loading schools from server: ' + newAPI);
    return new Promise((resolve, reject) => {
      this.http.get(newAPI, {
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': 'synced-9908313427' }
      }).subscribe(data => {
          resolve(data)
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          reject("Cnt.Response: " + err.message);
        } else {
          if (err.status) {
            reject("Srv.Error: " + err.error.error);
          }
          reject("Srv.Error: " + err.message);
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
      this.http.get(newAPI, {
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': 'synced-9908313427' }
      })
        .subscribe(data => {
          resolve(data);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject("Cnt.Response: " + err.message);
          } else {
            if (err.status) {
              reject("Srv.Error: " + err.error.error);
            }
            reject("Srv.Error: " + err.message);
          }
        });
    });
  }

  postNewAdminssion(targetData: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/admissions', targetData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-API-KEY':'synced-9908313427' }
        }).subscribe(res => {
          resolve(res)
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject("Cnt.Response: " + err.message);
          } else {
            if (err.status) {
              reject("Srv.Error: " + err.error.message);
            }
            reject("Srv.Error: " + err.message);
          }
        })
    });
  }
}
