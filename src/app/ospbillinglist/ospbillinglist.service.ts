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
export class OspbillinglistService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }
  getAll(count): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/osp/ospfilter/' + count);
  }
  getPdf(ospServiceId): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/osp/pdf/' + ospServiceId);
  }
}