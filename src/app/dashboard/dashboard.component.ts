import { Component, OnInit } from '@angular/core';
import { DashboardService } from "src/app/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _http:DashboardService) { }

  ngOnInit() {
    this.showData()
  }

  doctor:string
  patients:string
  vendor:string
  outpatient:string
  showData()
  {
    this._http.getData()
    .subscribe(
    response => {
      

 
      console.log("dashboard" + JSON.stringify(response));
     this.doctor=response.doctorcount
     this.patients=response.INPATIENT
     this.vendor=response.vendors
     this.outpatient=response.OUTPATIENT
    },);
  }
}
