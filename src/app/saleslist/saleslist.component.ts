import { Component, OnInit } from "@angular/core";
import { MDetails } from "src/app/saleslist/saleslist.model";
import { SaleslistService } from "src/app/saleslist/saleslist.service";
import { ToastrService } from "ngx-toastr";

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-saleslist",
  templateUrl: "./saleslist.component.html",
  styleUrls: ["./saleslist.component.css"]
})
export class SaleslistComponent implements OnInit {
  closeResult: string;
  total: number;
  mrp: number;
  paymentType: string;
  p: number = 1;
  MedicinName: any;
  // batches: any;
  batchNo: any;
  // mDetails: any;
  count: string = "2";
  key: string;
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  a: boolean = false;
  constructor(
    private _http: SaleslistService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}
  Edit: MDetails[] = [];
  ngOnInit() {
    this.showAll();
  }

  calcAmount(data) {
    data["amount"] = data.quantity * data.mrp;
    if (data.discount) data["amount"] -= data["amount"] * data.discount / 100.0;
  }

  afterEdit: any[];
  open2(basic2) {
    // this.afterEdit = [];
    // need to filter/compare the beforeEdit and Edit array objects
    // this.Edit.forEach( (sale, index) => {
    //   if(!compareObjects(sale, this.beforEdit[index])) {
    //     this.afterEdit.push(sale);
    //   }
    // });

    if (this.afterEdit.length == 0) {
      // toastr messagw warning " No Sale Details are Modified"
      return;
    }

    this.Edit.map(reg => (this.total = this.total + reg.amount));
    this.total = Math.round(this.total);
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
  Medicines = [];

  beforEdit: any[];
  open(basic, data) {
    this._http.getMed(data.billNo).subscribe(data => {
      this.Edit = [];
      this.beforEdit = [];
      this.Medicines = data[0];

      data[1][0].map(item => {
        let mDetails: MDetails = new MDetails();
        // this.MedicinName=data
        mDetails.medicineName = item.medicineName;
        mDetails.batch = item.batchNo;
        mDetails.expiryDt = item.expireDate;
        mDetails.quantity = item.quantity;
        mDetails.mrp = item.mrp;

        mDetails.availablequantity = item.availablequantity;
        mDetails.discount = item.discount;
        mDetails.amount = item.amount;
        mDetails.gst = item.gst;
        this.Edit.push(mDetails);
      });
      this.beforEdit = this.Edit;
    });

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
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  public loading = false;

  All = [];

  showAll() {
    // this.loading = true;
    this.spinner.show();

    this._http.getAll(this.count).subscribe(data => {
      this.spinner.hide();
      //  this.loading = false;

      this.All = data;
      console.log(" data " + JSON.stringify(data));
    });
  }

  setMedicineDetails(data) {
    this._http.getMedicineDetails(data.batchNo, data.medicineName).subscribe(
      response => {
        console.log("Medicines" + JSON.stringify(response));
        data.mrp = response.mrp;
        data.availablequantity = response.Available;
        data.expiryDt = response.ExpDate;
        data.gst = response.Gst;
        if (data.quantity > data.availablequantity) {
          data.quantity = 0;
          data.quantity_error = true;

          return;
        }
        data.quantity_error = false;
        data["amount"] = data.quantity * data.mrp;
        if (data.discount)
          data["amount"] -= data["amount"] * data.discount / 100.0;
      },
      err => {
        this.toastr.error("No Medicines available for this batch");
        data.mrp = null;
        data.availablequantity = null;
        data.expiryDt = null;
        data.gst = null;
        data.discount = null;
        data.amount = null;
        data.quantity = null;
      }
    );
  }

  onMedicineChange(event, data) {
    if (event == undefined) {
      data.quantity = null;
      data.mrp = null;
      data.expiryDt = null;
      data.gst = null;
      data.discount = null;
      data.amount = null;
      data.batchNo = null;
    }
    data.medName = event.medicineName;
  }
  batches = [];
  setBatches(data) {
    this._http.getBatch(data.medicineName).subscribe(response => {
      // this.batches= data
      data.batches = response.map(item => item.batch);
      this.batchNo = data.batches[0];
      // this.setMedicineDetails(data);
      console.log("batches" + JSON.stringify(response));
    });
  }

  //  Med=[]
  // showMed(data){
  //   this._http.getMed(data.billNo)
  //   .subscribe(
  //     data =>{

  //       this.Med = data
  //       console.log(" data " + JSON.stringify(data));
  //     }
  //   )

  // }
  showPdf(data) {
    this._http.getPdf(data.billNo).subscribe(response => {
      window.open(response.billNo);
      //  console.log(response)
    });
  }
}
