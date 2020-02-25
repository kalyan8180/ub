import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) {

  }


  getData(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/doctor/getAll');
  }



  postCreate(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/doctor/prescription', param);
    ;
  }


  post(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/doctor/create/notes', param);
  }


  getNotes(regNo): Observable<any> {
    return this._http.post(this.ServerUrl + 'v1/doctor/notes/' + regNo, {});
  }


}
