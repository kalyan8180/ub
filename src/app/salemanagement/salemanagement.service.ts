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
export class SalemanagementService {
  headers = new Headers();
  ServerUrl = environment.baseUrl;
  constructor(private _http: HttpClient) {}
  // https://jsonplaceholder.typicode.com/posts

  // getdetails(): Observable<any> {
  //   return this._http.get(this.ServerUrl + "v1/sales/create", {});
  // }
  getBill(): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/sales/create", {});
  }
  getPatient(regId: string): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/patient/" + regId);
  }

  getMed(medName): Observable<any> {
    return this._http.get(
      this.ServerUrl + "v1/sales/return/findMed/" + medName
    );
  }

  //  getBatch(medName): Observable<any>{

  //   return this._http.get( this.ServerUrl + 'v1/sales/batch/'+ medName,
  //  );
  //  }

  // http://cricapi.com/api/cricketScore

  // getscores(): Observable<any> {
  //   return this._http.get("http://cricapi.com/api/cricketScore");
  // }
  getBatch(param): Observable<any> {
    return this._http.post(this.ServerUrl + "v1/sales/batch", param);
  }

  getpatientdetails(umrNo): Observable<any> {
    return this._http.get(this.ServerUrl + "v1/sales/patient/details/" + umrNo);
  }

  post(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.ServerUrl + "v1/sales/create", param);
  }

  getMedicineDetails(param): Observable<any> {
    return this._http.post(this.ServerUrl + "v1/sales/batch/avilable", param);
  }

  postCreate(param): Observable<any> {
    return this._http.post(this.ServerUrl + "v1/sales/getmrp", param);
  }
  getMrp(param): Observable<any> {
    return this._http.post(this.ServerUrl + "v1/sales/getMedPro", param);
  }

  // getMedicineDetails(batchNo,medName): Observable<any>{
  //   return this._http.get(this.ServerUrl + 'v1/sales/batch/avilable/'+batchNo+'/'+medName);

  // }
}
