import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MonthlyprogressService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }
  // Overall List
  getCount(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/admin/getpatientwisecount');
  }
  // Doctor Year Month
  postCreate(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/admin/getpwisecountfiltermy', param);


  }
  // Doctor
  postAll(par): Observable<any> {
    console.log("Post" + JSON.stringify(par));

    return this._http.post(this.ServerUrl + 'v1/admin/getpatientwisecountfilter', par);


  }
}
