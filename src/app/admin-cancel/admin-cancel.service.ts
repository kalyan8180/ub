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
export class AdminCancelService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }

  post(parm): Observable<any> {
    console.log("Post" + JSON.stringify(parm));
    return this._http.post(this.ServerUrl + 'v1/patient/cancel', parm, );

  }
}
