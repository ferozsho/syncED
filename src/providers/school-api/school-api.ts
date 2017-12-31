import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SchoolApi {

  statusAPI: string;
  
  constructor(public http: HttpClient) {
    console.log('Start School API Provider');
  }

}
