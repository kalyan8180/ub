import { Component, OnInit } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { error } from "protractor";
import { Mutliple, Type } from "src/app/updatepayment/updatepayment.model";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, BehaviorSubject } from "rxjs";

import { UpdatepaymentService } from "src/app/updatepayment/updatepayment.service";
const typeColumn = ["Cash", "Card", "Due"];
@Component({
  selector: "app-updatepayment",
  templateUrl: "./updatepayment.component.html",
  styleUrls: ["./updatepayment.component.css"]
})
export class UpdatepaymentComponent implements OnInit {
  UpdateForm: FormGroup;
  billNo: string;
  cardamount: number;
  cashamount: number;
  totalamount: any;
  dueamount: number;
  discountf: number;
  netAmountf: number;
  procedure: string;
  multiplePayment: any = [];
  paymentType: string;

  billType: string;
  multiplePayment1: Mutliple[] = [];
  closeResult: string;
  All = [];
  disable: boolean;
  cash: boolean;
  card: boolean;
  due: boolean;
  constructor(
    private modalService: NgbModal,
    private _http: UpdatepaymentService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.UpdateForm = fb.group({
      billNo: [null],
      billType: [null]
    });
    this.multiplePayment1[0] = new Mutliple();
  }

  ngOnInit() {
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;
      // this.cash=true
    }
    this.values[0] = "Cash";
    this.createTypesList();
    this.multiplePayment1[0].payType = "Cash";
  }
  save(value: any) {
    let par = {
      billType: this.billType,
      billNo: this.billNo
    };
    this._http.postCreate(par).subscribe(data => {
      this.All = data;
      console.log(this.All);
      console.log("data**" + JSON.stringify(data));
    });
  }
  finalamount: number;
  open(basic, data) {
    this.finalamount = data.finalAmount;
    this.X = this.finalamount;
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
  private add: number = 0;

  private total: number = 0;
  private total2: number = 0;
  Xamount = true;

  addMore1(event) {
    // if (sale.quantity!=null)
    //
    this.Xamount = false;
    this.disable = false;
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = true;
        if (this.cashamount == this.finalamount) {
          this.cardamount = 0;
          this.dueamount = 0;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = true;
          if (this.cardamount == this.finalamount) {
            this.cashamount = 0;
            this.dueamount = 0;
          }
        }
      });

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Due") {
        this.due = true;
        if (this.dueamount == this.finalamount) {
          this.cashamount = 0;
          this.cardamount = 0;
        }
      }
    });
    if (this.multiplePayment1.length <= 1)
      this.multiplePayment1.push(new Mutliple());
    else {
      // if (sale.quantity==null){
      //   this.toastr.error("please enter quanity")
      // }
      this.toastr.error("only two payment types allowed");
    }
  }

  removeSaleItem1(index) {
    this.disable = false;
    this.Xamount = true;
    this.total = this.finalamount;
    this.X = this.total;
    // this.multiplePayment1.map(sale => {
    //   if (sale.payType === "Cash") {
    //     this.cash = false;

    //     if (this.cashamount <= this.finalamount) {
    //       this.cashamount = this.finalamount;
    //       this.cardamount = this.finalamount;
    //       this.dueamount = this.finalamount;
    //     }
    //   }
    // }),
    //   this.multiplePayment1.map(sale => {
    //     if (sale.payType === "Card") {
    //       this.card = false;
    //       if (this.cardamount <= this.finalamount) {
    //         this.cashamount = this.finalamount;
    //         this.cardamount = this.finalamount;
    //         this.dueamount = this.finalamount;
    //       }
    //     }
    //   }),
    //   this.multiplePayment1.map(sale => {
    //     if (sale.payType === "Due") {
    //       this.due = false;
    //       if (this.dueamount <= this.finalamount) {
    //         this.cashamount = this.finalamount;
    //         this.cardamount = this.finalamount;
    //         this.dueamount = this.finalamount;
    //       }
    //     }
    //   }),
    this.multiplePayment1.splice(index, 1);
  }

  X: number;
  Y: number = 0;
  amount2() {
    this.total = this.finalamount;

    if (this.X > this.finalamount) {
      this.X = 0;
    }

    this.Y = this.finalamount - this.X;
  }
  amount1() {
    this.total = this.finalamount;
    if (this.Y > this.finalamount) {
      this.Y = 0;
    }

    this.X = this.finalamount - this.Y;
  }
  row: boolean = true;
  secondrow() {
    this.row = false;
  }
  secondrowremove() {
    this.row = true;
    this.X = this.total;
    this.Y = 0;
  }
  values: Array<string> = [];

  types$ = new BehaviorSubject([]);
  // An array for looping selectors in template
  options = Array.from({ length: 1 });
  // An array for collect all chosen values

  changed(data, optI) {
    // Change chosen data in chosen list with index of selector

    this.values[optI] = data;
    // Reform the chosen list
    this.createTypesList();
  }

  /**
   * The method which form all option types according to chosen values
   */
  private createTypesList() {
    let types = [];
    // For all types check if they were chosen
    typeColumn.forEach(type => {
      // if current type in array of chosen
      let selected = this.values.includes(type);
      // push current type with its status
      types.push(new Type(type, !selected));
    });

    // Send messages to mat-option in our template
    this.types$.next(types);
  }
  noofClicks: number = 0;
  btnDisable: any = false;
  update() {
    this.noofClicks = this.noofClicks + 1;
    if (this.noofClicks == 1) {
      this.btnDisable = true;
      if (this.multiplePayment1.length > 1) {
        this.multiplePayment = [
          {
            payType: this.multiplePayment1[0].payType,
            amount: this.X
          },

          {
            payType: this.multiplePayment1[1].payType,
            amount: this.Y
          }
        ];
      } else {
        this.multiplePayment = [
          {
            payType: this.multiplePayment1[0].payType,
            amount: this.X
          }
        ];
      }
      let param = {
        dueFor: this.billType,
        date: this.All[0].date,
        multiplePayment: this.multiplePayment
      };
      this._http.discharge(this.billNo, param).subscribe(
        data => {
          console.log("data**" + JSON.stringify(data));
        },
        err => {
          //  if(err.status==500)
          //   {
          //     this.toastr.error
          //   }
          this.toastr.error(
            err["error"] ? err["error"].message : "Error Occured!"
          ); //"Patient Already Created")
        },

        () => {
          this.toastr.success("Payment Updated Sucessfully");
        }
      );
    } else {
      this.btnDisable = true;
    }
  }
}
