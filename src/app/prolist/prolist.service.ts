import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { getPreviousOrParentNode } from '@angular/core/src/render3/instructions';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProlistService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }


  // getProcLi(): Observable<any> {
  //   return this._http.get(this.ServerUrl + 'v1/pharmacist/procurement/getAll');

  // }
  getPdetails(procId): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/getProcList/' + procId);

  }


  getProcList(count): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/procurement/getCombine/' + count);

  }
  getReports(procId): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/procurement/getReport/' + procId);

  }

  editApprove(procId, param): Observable<any> {
    return this._http.put(this.ServerUrl + 'v1/pharmacist/procurement/approve/' + procId, param);
  }


  edit(param): Observable<any> {
    return this._http.put(this.ServerUrl + 'v1/pharmacist/procurement/update', param);
  }

}
