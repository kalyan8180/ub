import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReferraldrlistService {
  ServerUrl = environment.baseUrl

  constructor(private _http: HttpClient) { }

  getAll(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/referrallist');
  }
}