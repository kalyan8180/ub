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
export class AmbulancelistService {
  ServerUrl = environment.baseUrl
  save(patAmbulanceId: (patAmbulanceId: any) => any, param: { "regNo": any; "billAmount": any; "paidTo": any; "amountStatus": any; "toTime": any; }): any {
    throw new Error("Method not implemented.");
  }

  constructor(private _http: HttpClient) { }
  getAllPatient(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/ambulance/getAll');
  }


  edit(patAmbulanceId, param): Observable<any> {

    return this._http.put(this.ServerUrl + 'v1/ambulance/update/' + patAmbulanceId, param);
  }
}