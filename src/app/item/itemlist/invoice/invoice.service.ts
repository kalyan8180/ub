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
export class InvoiceService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }


  getProc(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pharmacist/invoice/getApproved');
  }

  postCreate(procurementId, param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/pharmacist/invoice/pay/' + procurementId, param);
  }
}
