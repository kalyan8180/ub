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
export class NurseService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }
  headers = new Headers();

  getData(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/nurse/getAll');
  }

  post(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/doctor/create/notes', param);
    ;
  }

  getNotes(regNo): Observable<any> {
    return this._http.post(this.ServerUrl + 'v1/doctor/notes/' + regNo, {});
  }

  post1(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/doctor/create/pharmacyNotes', param);
  }
}
