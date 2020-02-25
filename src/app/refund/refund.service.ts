import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/Rx";
import { HttpClientModule } from "@angular/common/http";
import "rxjs/add/operator/map";
import { HttpModule } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class RefundService {
  ServerUrl = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  // getRefund(): Observable<any> {

  //       return this._http.get( this.ServerUrl + 'v1/sales/refund/create');

  //     }
  getAll(days): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/sales/return/list/" + days);
  }

  getPdf(billNo): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/sales/return/pdf/" + billNo);
  }
}
