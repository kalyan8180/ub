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
export class ServiceslistService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }



  // getServices(): Observable<any> {
  //   return this._http.get(this.ServerUrl + 'v1/service/getservices',)

  // }
  // edit(serviceId,param) : Observable<any>{    

  //   return this._http.put(this.ServerUrl + 'v1/service/update/'+serviceId,param,
  //    )

  //   }
  //  localhost:8084/v1/service/list



  getServices(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/service/list', )

  }

  editdetails(serviceName): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/service/getService/' + serviceName)
  }

  edit(serviceName, param): Observable<any> {
    return this._http.post(this.ServerUrl + 'v1/service/update/' + serviceName, param)
  }



}