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
export class ItemService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }





  postCreate(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/pharmacist/medicine/listcreate', param);
  }

  getItem(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/medicine/create');
  }
}

