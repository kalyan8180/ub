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
export class SaleslistService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }
  //Overall List
  getAll(count): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/sales/saleslist/' + count);
  }
  //displaying  Medicine Name
  getMed(billNo): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/sales/getMedByBillNo/' + billNo);
  }
  //pdf
  getPdf(billNo): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/sales/pdf/' + billNo);
  }
  getBatch(medName): Observable<any> {

    return this._http.get(this.ServerUrl + 'v1/sales/batch/' + medName,
    );
  }
  getMedicineDetails(batchNo, medName): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/sales/batch/avilable/' + batchNo + '/' + medName);

  }
}
