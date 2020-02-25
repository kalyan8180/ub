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
export class PharmacylistService {
  ServerUrl = environment.baseUrl;
  headers = new Headers();
  constructor(private _http: HttpClient) {}
  getPharmacydetails(regNo): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/sales/oneSalesList/" + regNo);
  }
  editbill(regNo, param): Observable<any> {
    return this._http.post(
      this.ServerUrl + "v1/sales/ippharmacy/return/" + regNo,
      param
    );
  }
  getPharmacypdf(regNo): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/sales/ippharmacy/report/" + regNo
    );
  }
  getExcel(regNo): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/sales/ippharmacy/" + regNo);
  }
}
