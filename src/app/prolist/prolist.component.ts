import { Component, OnInit } from "@angular/core";
import { ProlistService } from "src/app/prolist/prolist.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MDetails, MedicineDetails } from "./prolist.model";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-prolist",
  templateUrl: "./prolist.component.html",
  styleUrls: ["./prolist.component.css"]
})
export class ProlistComponent implements OnInit {
  Proclist = [];
  ProForm: FormGroup;
  closeResult: string;
  constructor(
    private fb: FormBuilder,
    private _http: ProlistService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.ProForm = fb.group({
      masterProcurementId: [null],
      procurementId: [null],
      status: [null],
      procurementType: [null],
      vendorName: [null],
      location: [null],
      currency: [null],
      invoiceNo: [null]
    });
  }

  masterProcurementId: string;
  procurementId: string;
  status: string;
  procurementType: string;
  vendorName: string;
  location: string;
  currency: string;
  itemName: string;
  batch: string;
  manufacturedDate: any;
  expDate: any;
  quantity: number;
  freeSample: any;
  mrp: number;
  costPrice: number;
  packing: string;
  packSize: number;
  draft: string;
  ngOnInit() {
    // this.showProcList()
    this.showProcList2();
  }
  MedicinName = [];
  open(basic, c) {
    // this.location=c.location
    // this.vendorName =c.vendor
    this._http.getPdetails(c.procId).subscribe(data => {
      this.MedicinName = data;
      this.medDetails = new MedicineDetails();
      data.map(item => {
        this.medDetails.draft = "No";
        this.medDetails.invoiceNo = item.invoiceNo;
        this.medDetails.status = item.status;
        this.medDetails.procurementType = item.procurementType;
        this.medDetails.procurementId = item.procurementId;
        this.medDetails.poNo = item.poNo;
        this.medDetails.vendorName = item.vendorName;
        this.medDetails.currency = item.currency;
        this.medDetails.location = item.location;
        // this.medDetails.masterProcurementId=item.masterProcurementId
        this.medDetails.location = item.location;
        this.medDetails.currency = item.currency;
        this.medDetails.invoiceNo = item.invoiceNo;
        this.medDetails.status = item.status;
        this.medDetails.role = item.role;
        let mDetails: MDetails = new MDetails();
        mDetails.quantity = item.quantity;
        mDetails.batch = item.batch;
        mDetails.costPrice = item.costPrice;
        mDetails.itemName = item.itemName;
        mDetails.manufacturedDate = item.manufacturedDate;
        mDetails.expDate = item.expDate;
        mDetails.discount = item.discount;
        mDetails.mrp = item.mrp;
        mDetails.gst = item.gst;
        mDetails.packSize = item.packSize;
        mDetails.freeSample = item.freeSample;
        this.medDetails.refMedicineDetails.push(mDetails);
        console.log();
      });

      /* 
  this.invoiceNo =data.invoiceNo
    // this.poNo =this.Details[0].poNo
    this.tax=this.Details[0].tax
    this.costPrice = this.Details[0].costPrice
    this.mrp=this.Details[0].mrp
    this.freeSample=this.Details[0].freeSample
    this.quantity=this.Details[0].quantity
    this.expDate=this.Details[0].expDate
    this.manufacturedDate=this.Details[0].manufacturedDate
    this.batch=this.Details[0].batch
    this.masterProcurementId=this.Details[0].masterProcurementId
    this.ProcurementId=this.Details[0].procurementId
    this.status=this.Details[0].status
    this.procurementType=this.Details[0].procurementType

    // this.location=data.location
    this.currency=data.currency
    this.itemName=this.Details[0].itemName
    this.packing =data.packing
    */
      console.log("Details" + JSON.stringify(data));

      this.modalService
        .open(basic, {
          ariaLabelledBy: "modal-basic-title",
          size: "lg",
          backdrop: "static",
          keyboard: false
        })
        .result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    });
  }
  public loading = false;
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  // showProcList() {
  //   this.loading = true;
  //   this._http.getProcLi()
  //     .subscribe(
  //       response => {
  //         this.loading = false;
  //         this.Proclist = response;
  //         console.log(response[0].procurementId)
  //         console.log("proculist" + JSON.stringify(response));

  //       });
  // }
  list = [];
  open2(basic2, c) {
    this.procId = c.procId;
    this.modalService
      .open(basic2, {
        ariaLabelledBy: "modal-basic-title",
        backdrop: "static",
        keyboard: false
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  count: string = "2";
  showProcList2() {
    this.spinner.show();
    this._http.getProcList(this.count).subscribe(response => {
      this.spinner.hide();
      this.list = response;
      console.log(response[0].procurementId);
      console.log("proculist2" + JSON.stringify(response));
    });
  }
  medDetails: MedicineDetails = null;

  // showDetails(c)
  // {
  //   this._http.getPdetails(c.procId)
  //   .subscribe(
  //     response=>{
  //       // this.Details =response
  //       console.log("Details" + JSON.stringify(response))
  //     }
  //   )
  // }

  getReport(c) {
    this._http.getReports(c.procId).subscribe(response => {
      window.open(response[0].fileuri);
    });
  }

  p: number = 1;
  procId: string;
  save() {
    let par = {};
    this._http.editApprove(this.procId, par).subscribe(
      data => {
        console.log("edit****" + JSON.stringify(data));
        window.open(data.fileuri);
        // location.reload();
      },

      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );

        console.log(err.error);
      },
      () => {
        this.toastr.success("Approved");

        location.reload();
      }
    );

    // window.open(data.fileuri)
    // this.router.navigate(['/invoice'])
  }

  discount: number;
  gst: number;
  invoiceNo: string;
  poNo: string;
  tax: number;
  // packing:string
  edit() {
    let param = this.medDetails;

    this._http.edit(param).subscribe(
      data => {
        console.log("data**" + JSON.stringify(data));
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );

        console.log(err.error);
      },
      () => {
        this.toastr.success("details updated");
      }
    );
  }

  refresh() {
    location.reload();
  }
}
