import { Component, OnInit } from "@angular/core";
import { PharmacylistService } from "src/app/pharmacylist/pharmacylist.service";
import { SaleDetail, NewReturn } from "src/app/pharmacylist/pharmacylist.model";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-pharmacylist",
  templateUrl: "./pharmacylist.component.html",
  styleUrls: ["./pharmacylist.component.css"]
})
export class PharmacylistComponent implements OnInit {
  closeResult: string;

  constructor(
    private _http: PharmacylistService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // this.showAllpharmacylist()
  }
  private newReturn: NewReturn = new NewReturn();
  // Phlist:any=[]
  regNo: string;
  regIdAvailable = false;
  returnSales: any = [];
  private total;
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

  showPdf() {
    this._http.getPharmacypdf(this.regNo).subscribe(data => {
      window.open(data.fileuri);
    });
  }
  showAllpharmacylist() {
    // this.Phlist=[]

    this.newReturn = new NewReturn();
    this._http.getPharmacydetails(this.regNo).subscribe(
      data => {
        this.regIdAvailable = true;
        // this.Phlist =data

        // this.Phlist.map(sale => this.total=((this.total)+(sale.NetAmount)));
        console.log(" data " + JSON.stringify(data));
        data[1].map(res => {
          let saleDetail: SaleDetail = new SaleDetail(
            res.saleId,
            res.date,
            res.BillNo,
            res.patientName,
            res.MedId,
            res.MedName,
            +res.mrp,
            res.Quantity,
            0,
            res.discount,
            res.Paid,
            0,
            res.NetAmount,
            res.batch,
            res.previousPaymentType
          );
          this.newReturn.refSalesReturns.push(saleDetail);
        });
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      }
    );
  }
  calcAmount(data) {
    if (data.quantity < 0 || data.quantity > data.org_quantity) {
      data.quantity = 0;
      data.quantity_error = true;
      return;
    }
    data.quantity_error = false;
    data["amount"] = data["quantity"] * data.mrp;
    if (data.discount && data.discount > 0)
      data["amount"] -= (data["amount"] * data.discount) / 100.0;
  }
  reset() {
    this.regNo = null;
    this.newReturn.refSalesReturns = [];
    // this.showAllpharmacylist()
  }
  saveInProgress = false;
  save() {
    this.saveInProgress = true;
    this.newReturn.refSalesReturns = this.returnSales;
    this._http.editbill(this.regNo, this.newReturn).subscribe(
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
        this.toastr.success("return data updated");
      }
    );
  }
  showExel() {
    this._http.getExcel(this.regNo).subscribe(data => {
      window.open(data.fileuri);
    });
  }
}
