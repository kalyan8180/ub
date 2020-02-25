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
export class ServicesService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }


  postCreate(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/service/create', param);
  }


  getService(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/service/getservices');
  }
  getId(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/service/getid');
  }

  getserviceslist(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/service/getservicelist')
  }

  // edit(serviceId,param){     
  //   return this._http.put(this.ServerUrl + 'v1/service/update'+serviceId,param,{
  //     headers: this.headers
  //     })



  //    .map(res => res.json());
  // }
}

