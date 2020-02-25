import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CountService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }
  getArray(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/admin/getyears');
  }
  postArray(userId, parm): Observable<any> {
    console.log("Post" + JSON.stringify(parm));
    return this._http.post(this.ServerUrl + 'v1/admin/getmonthwise/' + userId + '/', parm, );

  }

  postnew(parm): Observable<any> {
    console.log("Post" + JSON.stringify(parm));
    return this._http.post(this.ServerUrl + 'v1/admin/getPatientpost', parm, );

  }


}