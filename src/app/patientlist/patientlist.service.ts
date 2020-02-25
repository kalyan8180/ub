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
export class PatientlistService {
  ServerUrl = environment.baseUrl;
  headers = new Headers();
  constructor(private _http: HttpClient) {}
  getExcel(count): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/excel/inpatient/" + count
    );
  }
  // localhost:8084/v1/getDetailedReport/{regId}

  // localhost:8084/v1/getDetailedAdvanceReport/{regId}
  getRedbus(floor, ward): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bed/room/" + floor + "/" + ward);
  }
  getFeeDetails(regId): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/consultant/change/" + regId
    );
  }

  getBeds(): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bed/floors/ward");
  }

  getConsultationFee(param): Observable<any> {
    console.log("get" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + "v1/patient/fee/docFee", param);
  }
  getInpatient(count): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/patientDetails/" + count
    );
  }

  getDoctorDetails(): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/consultant");
  }

  getAllBills(regId): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/pdf/" + regId);
  }

  postCreate(regId, param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(
      this.ServerUrl + "v1/patient/advanceAmount/" + regId,
      param
    );
  }
  getFloors(floor1): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/roomdetails/" + floor1);
  }

  getservices(regId): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/patientlab/" + regId);
  }

  post(parm): Observable<any> {
    console.log("Post" + JSON.stringify(parm));

    return this._http.post(this.ServerUrl + "v1/patient/extend", parm);
  }

  getType(dischargeType): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/discharge/" + dischargeType
    );
  }
  editfeedetails(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(
      this.ServerUrl + "v1/patient/consultant/change",
      param
    );
  }

  getDetailedReport(regid): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/getDetailedReport/" + regid);
  }
}
