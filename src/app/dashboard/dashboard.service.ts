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
export class DashboardService {
  ServerUrl = environment.baseUrl
  headers = new Headers();
  constructor(private _http: HttpClient) {

  }
  getData(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/user/getdoctors');
  }

}