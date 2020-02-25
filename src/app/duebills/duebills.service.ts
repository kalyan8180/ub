import { Injectable } from '@angular/core';

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
export class DuebillsService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }
  // getpatient(UMRno): Observable<any> {
  //   return this._http.get( this.ServerUrl + 'v1/due/get/'+UMRno, 
  //    );
  // }    
  // postCreate(UMRno,param) : Observable<any> {
  //   console.log("Post"+JSON.stringify(param));

  //   return this._http.post(this.ServerUrl + 'v1/due/get/create/'+UMRno, param);
  //   ;
  // }

  post(billno, param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/due/duepay/' + billno, param);
    ;
  }




  postref(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/due/create', param);
    ;
  }

  getfull(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/due/get/duelist');
  }



}