import { Component, OnInit } from "@angular/core";
import { RegisterService } from "src/app/registration/register.service";
import { ReturnService } from "src/app/return/return.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { NewReturn, BillDetail, SaleDetail } from "./return.model";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-return",
  templateUrl: "./return.component.html",
  styleUrls: ["./return.component.css"]
})
export class ReturnComponent implements OnInit {
  private newReturn: NewReturn = new NewReturn();
  private billDetail: BillDetail = new BillDetail();
  closeResult: string;

  constructor(
    private _http: ReturnService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  saveInProgress = false;

  ngOnInit() {}

  returnSales: any = [];
  private total;
  private totalfix;
  open(basic) {
    this.total = 0;
    this.returnSales = this.newReturn.refSalesReturns.filter(
      sale => Object.keys(sale).length !== 0
    );
    // this.newReturn.refSalesReturns = this.newReturn.refSalesReturns.filter(sale => Object.keys(sale).length !== 0);
    // this.newReturn.refSalesReturns.map(reg => this.total = this.total + reg.amount);

    this.returnSales = this.returnSales.filter(sale => sale.quantity > 0); //new line added by anji
    if (this.returnSales.length == 0) {
      //new line added by anji
      this.toastr.warning("Atleast one medicine to be returned!"); //new line added by anji
      return; //new line added by anji
    }

    this.returnSales.map(sale => (this.total = this.total + sale.amount)); //new line added by anji
    this.totalfix = this.total.toFixed(2);
    this.modalService
      .open(basic, { ariaLabelledBy: "modal-basic-title" })
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
  getBillDetails(event) {
    this.newReturn = new NewReturn();
    this.billDetail.name = "";
    this.billDetail.billDate = "";
    this.billDetail.regId = "";
    this.billDetail.mobile = null;
    this.billDetail.location = "";
    this.billDetail.paymentType = "";
    this._http.getDetails(this.billDetail.billNo).subscribe(
      response => {
        if (response.length == 0) {
          return;
        }
        this.billDetail.name = response[0].name;
        this.newReturn.location = this.billDetail.location =
          response[0].location;
        this.billDetail.billDate = response[0].date;
        this.billDetail.regId = response[0].regId;
        this.newReturn.regId = response[0].regId;
        this.billDetail.mobile = response[0].mobileNo;
        this.newReturn.billNo = response[0].billNo;
        this.billDetail.paymentType = response[0].paymentType;
        if (this.billDetail.paymentType === "Due") {
          this.newReturn.paymentType = "Due";
        } else {
          this.newReturn.paymentType = "Cash";
        }

        // response[0].paymentType

        response.map(res => {
          let saleDetail: SaleDetail = new SaleDetail(
            res.saleNo,
            res.medicineName,
            res.mrp,
            res.batchNo,
            res.discount,
            res.quantity,
            0,
            0,
            res.gst,
            res.expireDate
          );
          this.newReturn.refSalesReturns.push(saleDetail);
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

  calcAmount(sale) {
    if (sale.quantity < 0 || sale.quantity > sale.org_quantity) {
      sale.quantity = 0;
      sale.quantity_error = true;
      return;
    }
    sale.quantity_error = false;
    sale["amount"] = sale["quantity"] * sale.mrp;
    if (sale.discount && sale.discount > 0)
      sale["amount"] -= (sale["amount"] * sale.discount) / 100.0;
  }
  noofClick: number = 0;
  save() {
    this.saveInProgress = true;
    this.noofClick = this.noofClick + 1;
    if (this.noofClick > 0 && this.noofClick == 1) {
      this.saveInProgress = true;
      this.newReturn.refSalesReturns = this.returnSales;
      this._http.editBill(this.newReturn).subscribe(
        data => {
          console.log("edit****" + JSON.stringify(data));
          if (data.fileuri == null) {
            location.reload();
            this.toastr.success("return data updated");
          } else {
            window.open(data.fileuri);
            location.reload();
          }
          this.saveInProgress = false;
        },

        err => {
          this.toastr.error("error");
          this.saveInProgress = false;
        },
        () => {
          this.saveInProgress = false;
        }
      );
    } else {
      this.saveInProgress = true;
    }
  }
}
