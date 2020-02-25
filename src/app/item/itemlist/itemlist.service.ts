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
export class ItemlistService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }



  getAllMed(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/medicine/getAll');
  }


  postCreate(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.put(this.ServerUrl + 'v1/pharmacist/medicine/update', param);
  }
}
