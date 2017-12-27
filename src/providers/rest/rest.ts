import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestProvider {
  isApp: boolean;
  apiUrl: string;
  apiUrlLive: string = "http://synced.intellibiz.in/api/schools/schlist?X-API-KEY=synced-9908313427";
  apiUrlLocal: string = "http://localhost/synced-api/api/schools/schlist?X-API-KEY=synced-9908313427";

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
    this.isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8100'));
    if (this.isApp) {
      this.apiUrl = this.apiUrlLocal;
    } else {
      this.apiUrl = this.apiUrlLive;
    }
    console.log(this.apiUrl);
  }

  getSchoolList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

}
