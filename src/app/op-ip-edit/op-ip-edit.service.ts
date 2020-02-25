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
export class OpIpEditService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) {


  }

  getDetails(billno): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/lab/cancel/find/' + billno);
  }

  deleteservice(labRegId): Observable<any> {
    return this._http.delete(this.ServerUrl + 'v1/lab/deleteService/' + labRegId);
  }

}
