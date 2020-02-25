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
export class ProcurmentService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }



  getAllMed(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/medicine/getAll');
  }

  postCreate(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/pharmacist/procurement/create', param);
    ;
  }

  getProc(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/procurement/create');
  }



  getManf(name) {

    return this._http.get(this.ServerUrl + 'v1/pharmacist/batch/manufacturer/' + name, {

    })


  }

  getDraftDetails(in_num): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/procurement/draft/' + in_num);
  }


  getId(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/medicine/create');
  }

  post(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/pharmacist/medicine/create', param);
    ;
  }
  postLink(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(
      this.ServerUrl + 'v1/pharmacist/get/latestmedicines',
      param
    );
  }
}
