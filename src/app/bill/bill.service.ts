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
export class BillService {
  ServerUrl = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  revoke(regId): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bill/patient/revoke/" + regId);
  }
  blockPatient(regId, flag): Observable<any> {
    return this._http.post(
      this.ServerUrl + "v1/patient/block/" + regId + "/" + flag,
      {}
    );
  }
  getData(regId): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bill/create/" + regId);
  }

  getAppBill(regId): Observable<any> {
    return this._http.post(this.ServerUrl + "v1/bill/approximate/" + regId, {});
  }
  getDetaillBill(regId): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bill/detailed/" + regId, {});
  }

  raiseDischarge(regId, param): Observable<any> {
    return this._http.post(
      this.ServerUrl + "v1/bill/charge/discharge/" + regId,
      param
    );
  }

  dischargeSlip(regId, param): Observable<any> {
    return this._http.post(
      this.ServerUrl + "v1/bill/dischargeslip/" + regId,
      param
    );
  }

  // billPay(param) {
  //   console.log("Post"+JSON.stringify(param));

  //    return this._http.post('http://localhost:8084/v1/bill/charge/pay',param, {
  //        headers: this.headers
  //    })
  //     .map(res => res.json());
  //    ;
  //  }

  billPay(regId, param): Observable<any> {
    console.log("post" + JSON.stringify(param));
    return this._http.post(
      this.ServerUrl + "v1/bill/charge/pay/" + regId,
      param
    );
  }

  editbill(regId, param): Observable<any> {
    console.log("post" + JSON.stringify(param));
    return this._http.post(
      this.ServerUrl + "v1/bill/charge/update/" + regId,
      param
    );
  }

  getMed(serviceName, regId): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/bill/service/getCost/" + serviceName + "/" + regId
    );
  }
  getAdvance(regId): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bill/advancefinalbill/" + regId);
  }
}
