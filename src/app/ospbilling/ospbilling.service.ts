import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OspbillingService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }

  getdetails(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/osp/create');
  }

  getcost(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/osp/getcost ', param);
  }
  createservice(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/osp/create', param);
  }
}
