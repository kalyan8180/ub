import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BedallocationService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }


  getFloors(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/bed/floors/ward');
  }
  getBeds(floor): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/bed/floor/' + floor);
  }


}