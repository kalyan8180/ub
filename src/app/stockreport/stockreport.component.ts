import { Component, OnInit } from "@angular/core";
import { StockreportService } from "src/app/stockreport/stockreport.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { grnDetails } from "src/app/stockreport/stockreport.model";
@Component({
  selector: "app-stockreport",
  templateUrl: "./stockreport.component.html",
  styleUrls: ["./stockreport.component.css"]
})
export class StockreportComponent implements OnInit {
  constructor(
    private _http: StockreportService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.showData();
  }
  Medicines = [];
  Grndetails = [];
  minDate = new Date();
  showData() {
    this._http.getData().subscribe(response => {
      this.Medicines = response;
      console.log("medicines" + JSON.stringify(response));
    });
  }
  batch: string;
  expiredate: any;
  medicinename: string;
  onChange(event) {
    // data.soldBy=null;
    this.medicinename = event.medicinename;
  }
  save() {
    this.Grndetails = [];
    let par = {
      medicineName: this.medicinename,
      batch: this.batch,

      expDate: moment(this.expiredate).format("YYYY-MM-DD")
    };

    this._http.postDetails(par).subscribe(
      data => {
        console.log("data**" + JSON.stringify(data));

        data.map(res => {
          let grn: grnDetails = new grnDetails(
            res.detailedQty,
            res.saleQty,

            res.closingQty,
            0,
            0
          );
          this.Grndetails.push(grn);
        });
      },

      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }
  calcAmount(g) {
    if (g.Modify) {
      g.modifiedQty = parseInt(g.detailedQty) + g.Modify;
    }
  }

  update() {
    let par = {
      medicineName: this.medicinename,
      batch: this.batch,

      expDate: moment(this.expiredate).format("YYYY-MM-DD"),
      modifiedQty: this.Grndetails[0].modifiedQty
    };

    this._http.updateDetails(par).subscribe(
      data => {
        console.log("data**" + JSON.stringify(data));
      },

      // err => {
      //   this.toastr.error(
      //     err["error"] ? err["error"].message : "Error Occured!"
      //   );
      // },
      () => {
        this.toastr.success("updated scucess");
      }
    );
  }

  // reset() {
  //   this.Grndetails = [];
  //   this.Medicines = [];
  //   this.expiredate = null;
  //   this.batch = null;
  // }
}
