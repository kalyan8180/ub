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
export class OtherPatientsService {
  headers = new Headers();
  ServerUrl = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  getAllBills(regId): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/pdf/" + regId);
  }
  getotherpatient(count): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/patient/otherpatientDetails/" + count
    );
  }
  getFloors(floor1): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/roomdetails/" + floor1);
  }
  postCreate(regId, param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(
      this.ServerUrl + "v1/patient/advanceAmount/" + regId,
      param
    );
  }
  getRedbus(floor, ward): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bed/room/" + floor + "/" + ward);
  }
  getBeds(): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/bed/floors/ward");
  }

  post(parm): Observable<any> {
    console.log("Post" + JSON.stringify(parm));

    return this._http.post(this.ServerUrl + "v1/patient/extend", parm);
  }
}
