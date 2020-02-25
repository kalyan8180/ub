import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";
import "rxjs/Rx";
import { HttpClientModule } from "@angular/common/http";
import "rxjs/add/operator/map";
import { HttpModule } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class ExistingService {
  ServerUrl = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  //  getAllPatient(page,size): Observable<any> {
  //  const params={
  //    page:page,
  //    size:size
  //  }

  //   return this._http.get(this.ServerUrl + 'v1/patient/getAll',{ params: params });
  // }

  //  getAllPatient(): Observable<any> {

  //   return this._http.get(this.ServerUrl + 'v1/patient/getAll');
  // }

  getAdminSlip(REGID): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/slip/" + REGID);
  }
  edit(umr, regid, param): Observable<any> {
    return this._http.put(
      this.ServerUrl + "v1/patient/updateAll/" + umr + "/" + regid,
      param
    );
  }

  newRegisterForm(umr, param): Observable<any> {
    return this._http.post(
      this.ServerUrl + "v1/registration/patient/" + umr,
      param
    );
  }

  getFloors(floor1): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/roomdetails/" + floor1);
  }
  getBeds(): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bed/floors/ward");
  }

  getRedbus(floor, ward): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bed/room/" + floor + "/" + ward);
  }

  getRefDetails(refSource, refName): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/refInfo/" + refSource + "/" + refName
    );
  }
  getrefnames(source): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/refdetails/" + source);
  }

  getPatient(): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/create");
  }

  postBlank(param, regidpr): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(
      this.ServerUrl + "v1/patient/blank/" + regidpr,
      param
    );
  }

  getConsultationFee(param): Observable<any> {
    console.log("get" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + "v1/patient/fee/docFee", param);
  }

  getRegister(regId): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/oneExistingPatient/" + regId
    );
  }
  getUmrnumber(umr): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/oneExistingPatientbyUmr/" + umr
    );
  }
  getPatientname(name): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/oneExistingPatientbyName/" + name
    );
  }
  getMobilenumber(mobile): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/oneExistingPatientbyMobile/" + mobile
    );
  }

  getRegFee(umr): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/regfee/" + umr);
  }
}
