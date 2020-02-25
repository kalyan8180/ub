import { Component, OnInit } from "@angular/core";
import { MonthlyprogressService } from "./monthlyprogress.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-monthlyprogress",
  templateUrl: "./monthlyprogress.component.html",
  styleUrls: ["./monthlyprogress.component.css"]
})
export class MonthlyprogressComponent implements OnInit {
  consulting: string;
  month: string;
  year: string;
  p: number = 1;
  constructor(
    private _http: MonthlyprogressService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.showAll();
  }
  // reset() {
  //   this.reset();
  // }
  // back()
  // {
  //   this.opentable=false
  // }
  //   opentable=false

  All = [];
  showAll() {
    this._http.getCount().subscribe(data => {
      this.All = data;

      console.log(" data " + JSON.stringify(data));
    });
  }
  // dataAll()
  // {
  //   let param ={
  //     "doctor":this.consulting,
  //   }
  //   this._http.postAll(param)
  //   .subscribe(
  //     data =>

  //   {

  //    this.All=data

  // console.log(data)
  // console.log("data**" + JSON.stringify(data));
  //   },

  //   );}

  public filterData(consulting: string) {
    let params = {};
    if (consulting) {
      params["doctor"] = consulting;
      this._http.postAll(params).subscribe(data => {
        this.All[1] = data;
      });
    }
  }

  // save()
  //   {
  //  let  parm = {
  //    "doctor":this.consulting,
  //    "regMonth1":this.month,
  //    "regYear1":this.year,
  //   }
  //   this._http.postCreate(parm)
  //   .subscribe(
  //     data =>

  //   {

  //    this.All=data
  //   // olist:filter

  // console.log(data)
  // console.log("data**" + JSON.stringify(data));
  //   },

  //   );}
}
