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
export class OutpatientlistService {
  headers = new Headers();
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient) {

  }
  getExcel(count): Observable<any> {
    console.log("test" + this.ServerUrl + 'v1/patient/excel/outPatient/')
    return this._http.get(this.ServerUrl + 'v1/patient/excel/outPatient/' + count, );

  }

  revisitValidity(regId): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/revisits/' + regId)
  }
  blankprescription(regId, param): Observable<any> {
    return this._http.post(this.ServerUrl + 'v1/patient/revisits/' + regId, param)
  }
  editfeedetails(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/patient/consultant/change', param, );
  }
  getOutpatient(count): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/outPatient/' + count, );

  }
  getDoctorDetails(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/consultant', );

  }

  getConsultationFee(param): Observable<any> {

    console.log("get" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + 'v1/patient/fee/docFee', param);
    ;
  }

  getFeeDetails(regId): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/consultant/change/' + regId)
  }
  getAllBills(regId): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/pdf/' + regId)
  }


  getservices(regId): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/patientlab/' + regId, );

  }
  getData(): Observable<any> {
    return this._http.get(this.ServerUrl + 'v1/patient/consultant', );

  }
  postList(parm): Observable<any> {
    console.log("Post" + JSON.stringify(parm));
    return this._http.post(this.ServerUrl + 'v1/patient/listbyconsultant', parm, );

  }
}