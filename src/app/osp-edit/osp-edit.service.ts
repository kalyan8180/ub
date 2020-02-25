import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OspEditService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) {


  }
  deleteservice(masterOspServiceId): Observable<any> {
    return this._http.delete(this.ServerUrl + 'v1/osp/delete/service/' + masterOspServiceId);
  }



  getDetails(billno): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/osp/cancel/find/' + billno);
  }

}
