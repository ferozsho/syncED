import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RestProvider {

  //apiUrl: string = "http://synced.intellibiz.in/api/schools";
  apiUrl: string = "http://localhost/synced/api/schools";
  private _trackData: trackData = {}

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
          reject(err.message);
        } else {
          if (err.status) {
            reject(err.error.error);
          }
          reject(err.message);
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
            reject(err.message);
          } else {
            if (err.status) {
              reject(err.error.message);
            }
            reject(err.message);
          }
        });
    });
  }

  postNewAdminssion(targetData: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/admissions', targetData,
        {
          headers: { 'Content-Type': 'application/json', 'X-API-KEY':'synced-9908313427' }
        }).subscribe(res => {
          resolve(res)
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject(err.message);
          } else {
            if (err.status) {
              reject(err.error.message);
            }
            reject(err.message);
          }
        })
    });
  }

  trackApplication(siteID: number, trackData: any) {
    let newAPI = this.apiUrl;
    this._trackData = trackData;

    if (this._trackData.admissionNo != null && this._trackData.aadhaarNo != null &&
      (this._trackData.admissionNo != '' && this._trackData.aadhaarNo != '')) {
      newAPI = this.apiUrl + '/trackApplication?admissionNo=' + this._trackData.admissionNo + '&aadhaarNo=' + this._trackData.aadhaarNo;
    } else {
      if (this._trackData.aadhaarNo != '' && this._trackData.aadhaarNo != null) {
        newAPI = this.apiUrl + '/trackApplication?aadhaarNo=' + this._trackData.aadhaarNo;
      }
      if (this._trackData.admissionNo != '' && this._trackData.admissionNo != null) {
        newAPI = this.apiUrl + '/trackApplication?admissionNo=' + this._trackData.admissionNo;
      }
    }
    
    newAPI = newAPI + '&siteID=' + siteID;
    console.log('Loading track information from server: ' + newAPI);
    
    return new Promise((resolve, reject) => {
      this.http.get(newAPI, {
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': 'synced-9908313427' }
      })
        .subscribe(data => {
          resolve(data);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            reject(err.message);
          } else {
            if (err.status) {
              reject(err.error.message);
            }
            reject(err.message);
          }
        });
    });
  }

}

interface trackData {
  admissionNo?: string,
  aadhaarNo?: string
}