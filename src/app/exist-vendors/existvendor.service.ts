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
export class ExistvendorService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) {



  }

  getVendors(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/vendor/getAll');
  }


  edit(vendorId, param): Observable<any> {

    return this._http.put(this.ServerUrl + 'v1/pharmacist/vendor/update/' + vendorId, param);
  }
}

