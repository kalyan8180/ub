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
export class PaymentvoucherService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) { }
  getId(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/voucher/create');
  }
  getAll(count): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/Voucher/' + count);
  }

  edit(paymentNo, param): Observable<any> {

    return this._http.put(this.ServerUrl + 'v1/voucher/updatevoucher/' + paymentNo, param);
  }

  getPdf(paymentNo): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/pdf/' + paymentNo);
  }

}
