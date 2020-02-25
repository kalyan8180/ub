import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  ServerUrl = environment.baseUrl
  credentials: string = localStorage.getItem('currentUser');
  token: any;
  constructor(private _http: HttpClient) {
    if (this.credentials) {
      this.token = JSON.parse(this.credentials).token;

    }

  }

  postCreate(param): Observable<any> {

    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/patient/create', param);
    ;
  }


  getrefnames(source): Observable<any> {

    return this._http.get(this.ServerUrl + 'v1/patient/refdetails/' + source);
  }

  getAdminSlip(REGID): Observable<any> {

    return this._http.get(this.ServerUrl + 'v1/patient/slip/' + REGID);
  }
  getPatient(): Observable<any> {

    return this._http.get(this.ServerUrl + 'v1/patient/create');
  }

  postBlank(param, Id): Observable<any> {

    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/patient/blank/' + Id, param);
    ;
  }
  getConsultationFee(param): Observable<any> {

    console.log("get" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/patient/fee/docFee', param);
    ;
  }




  getBeds(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/bed/floors/ward');
  }
  getFloors(floor1): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/roomdetails/' + floor1);
  }

  getRedbus(floor, ward): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/bed/room/' + floor + '/' + ward);
  }

  getRefDetails(refSource, refName): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/refInfo/' + refSource + '/' + refName);
  }


}