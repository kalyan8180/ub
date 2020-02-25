import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { BillService } from "src/app/bill/bill.service";
import { FormControl } from "@angular/forms";
import { Bill, edit, Mutliple, Type } from "src/app/bill/bill.model";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { SaleDetail } from "../salemanagement/salesmanagement.model";
import { Observable, BehaviorSubject } from "rxjs";

const typeColumn = ["Cash", "Card", "Due"];
@Component({
  selector: "app-bill",
  templateUrl: "./bill.component.html",
  styleUrls: ["./bill.component.css"]
})
export class BillComponent implements OnInit {
  dischargeStatus: any;
  BillForm: FormGroup;
  Edit: edit[] = [];
  bill: Bill[] = [];
  newBill: Bill;
  returnf: number;
  totalPaidAmount: any;
  totalNetAmt: any;
  multiplePayment1: Mutliple[] = [];
  closeResult: string;
  // data.quantity:number=1
  constructor(
    private fb: FormBuilder,
    private _http: BillService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.multiplePayment1[0] = new Mutliple();
    this.BillForm = fb.group({
      regId: new FormControl(""),
      amount: [null],
      procedure: [null]
    });
  }

  Xamount = true;
  addMore1(event) {
    // if (sale.quantity!=null)
    //
    this.Xamount = false;
    this.disable = false;
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = true;
        if (this.cashamount == this.netAmountf) {
          this.cardamount = 0;
          this.dueamount = 0;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = true;
          if (this.cardamount == this.netAmountf) {
            this.cashamount = 0;
            this.dueamount = 0;
          }
        }
      });

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Due") {
        this.due = true;
        if (this.dueamount == this.netAmountf) {
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
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = false;
        if (this.cashamount <= this.netAmountf) {
          this.cashamount = this.netAmountf;
          this.cardamount = this.netAmountf;
          this.dueamount = this.netAmountf;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = false;
          if (this.cardamount <= this.netAmountf) {
            this.cashamount = this.netAmountf;
            this.cardamount = this.netAmountf;
            this.dueamount = this.netAmountf;
          }
        }
      }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Due") {
          this.due = false;
          if (this.dueamount <= this.netAmountf) {
            this.cashamount = this.netAmountf;
            this.cardamount = this.netAmountf;
            this.dueamount = this.netAmountf;
          }
        }
      }),
      this.multiplePayment1.splice(index, 1);
  }

  p: number = 1;
  Array = [];
  regId: string;
  dicount: number;
  item: any = [];
  disable: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  due: boolean = false;
  //  pType=this.Array[0][0].pType
  ngOnInit() {
    this.dischargeStatus;
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;
      // this.cash=true
    }
    this.values[0] = "Cash";
    this.createTypesList();
    this.multiplePayment1[0].payType = "Cash";
  }
  revoke() {
    this._http.revoke(this.regId).subscribe(
      data => {},
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {
        this.toastr.success("Patient is revoked ");
        // location.reload()
      }
    );
  }
  blockedStatus: string;
  referenceNumber: string;
  status = false;
  advanceamount: any;
  pType: string;
  money = new Map<String, String>();
  regIdAvailable = false;
  showBillDetails(regId) {
    this._http.getData(this.regId).subscribe(
      data => {
        this.bill[0] = new Bill();
        this.regIdAvailable = true;
        this.totalPaidAmount = data[3][0].totalPaidAmount;
        this.totalNetAmt = data[3][0].totalNetAmt;
        this.advanceamount = data[3][0].advanceAmount;
        this.blockedStatus = data[0][0].blockedStatus;
        this.dischargeStatus = data[4][0].dischargeStatus;
        console.log(this.advanceamount);
        this.Edit = [];
        this.procedure = "";
        this.Array = data;
        //  data[2].map(list=> {if(list.serviceType==='Doc Fee')
        //  {
        //    console.log(this.Array[2].push(list.serviceName=list.serviceName+'-'+list.roomtype))
        //  }})
        data[1].map(item => {
          let mDetails: edit = new edit();
          mDetails.chargeBillId = item.chargeBillId;
          mDetails.chargeName = item.serviceName;
          mDetails.amount = item.amount;
          mDetails.mrp = item.mrp;
          mDetails.quantity = item.quantity;
          mDetails.discount = item.discount;
          mDetails.netAmount = item.netAmount;
          mDetails.paid = item.paid;
          console.log("bill" + this.Edit.push(mDetails));
        });

        this.item = data.name;
        this.pType = this.Array[0][0].pType;
        console.log(" data " + JSON.stringify(data));

        console.log(data.length);
        console.log(data[2].name);
        // this.toastr.error(data.message)
        // this.toastr.error(data);
      },

      err => {
        this.status = true;
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
        console.log(err.error);
      }

      // ()=>
      // {

      //   this.toastr.success("Patient Registered Sucessfully")

      // }
    );
  }

  //   cardamount:any
  //   cashamount:any
  // ccamount:any
  //   getcashamount()
  //   {

  //       this.ccamount= this.netAmountf
  // console.log(this.ccamount)
  // this.cashamount=(this.ccamount-(this.cardamount ? this.cardamount : 0))
  //   }

  //   getcardamount()
  //   {

  //       this.ccamount=this.netAmountf

  // this.cardamount=(this.ccamount-(this.cashamount ? this.cashamount : 0))
  //   }

  showAppBill(regId) {
    this._http.getAppBill(this.regId).subscribe(data => {
      window.open(data.fileuri);
      location.reload();
    });
  }

  showDischarge(regId) {
    let param = {};
    this._http.dischargeSlip(this.regId, param).subscribe(data => {
      window.open(data.fileuri);
      location.reload();
    });
  }
  showDetailBill(regId) {
    this._http.getDetaillBill(this.regId).subscribe(data => {
      window.open(data.fileuri);
      // location.reload();
    });
  }

  saveInProgress = false;

  save() {
    this.noofClicks = this.noofClicks + 1;
    if (this.noofClicks > 0 && this.noofClicks == 1) {
      this.saveInProgress = true;

      this.bill = this.bill.filter(sale => Object.keys(sale).length !== 0);
      let param = {
        regId: this.regId,
        procedure: this.procedure,
        refBillDetails: this.bill
      };
      this.saveInProgress = true;
      this._http.billPay(this.regId, param).subscribe(
        data => {
          console.log("Bill****" + JSON.stringify(data));
          this.saveInProgress = false;
        },
        err => {
          this.toastr.error(
            err["error"] ? err["error"].message : "Error Occured!"
          );
          this.saveInProgress = false;
        },
        () => {
          this.saveInProgress = false;
          this.toastr.success("Bill successfull ");
          location.reload();
        }
      );
    } else {
      this.saveInProgress = true;
    }
  }
  // pro() {
  //   let param ={
  //     "procedureName":this.procedure
  //   }
  //   this._http.savePro(this.regId,param)
  //   .subscribe(
  //     data =>{
  //       console.log("pro"+JSON.stringify(data));
  //     }
  //   );
  // }  getcardamount

  discountf: number;
  netAmountf: number;
  procedure: string;
  multiplePayment: any = [];
  paymentType: string;
  noofClick: number = 0;
  noofClicks: number = 0;
  disablebutton: any;
  discharge() {
    this.noofClick = this.noofClick + 1;
    if (this.noofClick > 0 && this.noofClick == 1) {
      this.disablebutton = true;
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
        netAmount: this.netAmountf,
        discount: this.discountf,
        paymentType: this.paymentType,
        amount: this.add,
        procedure: this.procedure,
        referenceNumber: this.referenceNumber,
        returnAmount: this.returnf,

        multiplePayment: this.multiplePayment

        // "multimode":[
        //   {
        //     "mode":"Cash",
        //     "amount":+(this.cashamount)
        //   },
        //   {
        //     "mode":"Card",
        //     "amount":this.cardamount
        //   }
        // ]
      };

      this._http.raiseDischarge(this.regId, param).subscribe(
        data => {
          window.open(data.fileuri);

          location.reload();
        },
        err => {
          this.toastr.error(
            err["error"] ? err["error"].message : "Error Occured!"
          );
        },
        () => {
          this.toastr.success("Patient Discharged ");
          // location.reload()
        }
      );
    } else {
      this.disablebutton = true;
    }
  }

  Bill = [];
  hai(i, data) {
    this.Bill.push({
      chargeBillId: data.chargeBillId,
      billNo: data.billNo,
      amount: data.amount,
      discount: +data.discount,
      quantity: data.quantity,
      netAmount: data.amount - data.amount * (data.discount / 100),
      insertedBy: data.insertedBy,
      insertedDate: data.insertedDate,
      paid: data.paid,
      refBillDetails: data.refBillDetails,
      regId: data.regId,
      serviceName: data.serviceName
    });
    console.log(this.Bill);
    console.log(JSON.stringify(this.Bill));
  }

  BillPay = [];

  serivcecharge: object = {};
  name: string;
  amount: number;
  chargeName: string;

  onServiceChange(event, data) {
    if (event == undefined) {
      data.mrp = null;
      data.quantity = null;
      data.discount = null;
      data.netAmount = null;
    }
    data.mrp = null;
    data.quantity = null;
    data.discount = 0;
    data.netAmount = null;

    data.chargeName = event.serviceName;

    this._http.getMed(data.chargeName, this.regId).subscribe(response => {
      data.mrp = response.cost;
      console.log(" test" + JSON.stringify(response));
      console.log(data.mrp);

      data["amount"] = data.quantity * data.mrp;
      //  if(data.discount || data.discount<=0)
      data["netAmount"] =
        data["amount"] - (data["amount"] * data.discount) / 100.0;
    });
  }

  open(basic) {
    // if(this.bill[0].chargeName==null) {
    //   this.toastr.error("Please Add Services");
    // this.bill = [];
    // this.bill[0] = new Bill();
    //   return;
    // }
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

  edit2(editpopup) {
    this.modalService
      .open(editpopup, {
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

  private add: number = 0;

  private total: number = 0;
  private total2: number = 0;
  payment(basic2) {
    this.total = 0;
    this.total2 = 0;

    this.bill = this.bill.filter(sale => Object.keys(sale).length !== 0);

    this.bill.map(reg => (this.total = this.total + reg.netAmount));

    this.Edit.map(sale => {
      if (sale.paid === "NO") {
        this.total2 = this.total2 + sale.netAmount;
      }
    });
    //  if(isNaN(this.add))
    //  {
    //    this.add=+(this.total)
    //  }
    //  else {

    // this.add =Math.round(((this.total?this.total:0)+(this.total2?this.total2:0))-((this.advanceamount?this.advanceamount:0)))

    // this.add =(parseInt(this.totalNetAmt?this.totalNetAmt:0))-(((parseInt(this.totalPaidAmount?this.totalPaidAmount:0))-((parseInt(this.advanceamount?this.advanceamount:0)))

    // this.add = this.total+this.total2

    this.add =
      Math.round(this.totalNetAmt ? this.totalNetAmt : 0) -
      (parseInt(this.advanceamount ? this.advanceamount : 0) +
        parseInt(this.totalPaidAmount ? this.totalPaidAmount : 0));

    this.modalService
      .open(basic2, {
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

  new(basic1) {
    this.modalService
      .open(basic1, {
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  calrnaamount() {
    if (
      parseInt(this.advanceamount ? this.advanceamount : 0) +
        parseInt(this.totalPaidAmount ? this.totalPaidAmount : 0) >=
      parseInt(this.totalNetAmt ? this.totalNetAmt : 0)
    ) {
      this.returnf =
        parseInt(this.advanceamount ? this.advanceamount : 0) +
        parseInt(this.totalPaidAmount ? this.totalPaidAmount : 0) -
        Math.round(this.totalNetAmt ? this.totalNetAmt : 0);
      this.netAmountf = 0;
      this.X = this.netAmountf;
    } else {
      this.netAmountf = this.add - this.discountf;
      this.cashamount = this.netAmountf;
      this.X = this.netAmountf;
    }
  }
  // caldiscount()
  // {
  //   if((this.add)>=((this.advanceamount?this.advanceamount:0))){
  //   this.netAmountf=((this.add?this.add:0)-(this.discountf?this.discountf:0))
  //   }
  //   else
  //   this.netAmountf=0
  //   // this.returnf=-((this.add?this.add:0))
  //   if((this.add)>=((this.advanceamount?this.advanceamount:0)))
  //   this.returnf=0
  //   else
  //   this.returnf=((this.advanceamount?this.advanceamount:0))-(this.add)
  // }
  addMore(event) {
    this.bill.push(new Bill());
  }

  removeSaleItem(index) {
    this.bill.splice(index, 1);
  }

  editbill() {
    let param = {
      updateCharge: this.Edit
    };

    this._http.editbill(this.regId, param).subscribe(
      data => {
        // window.open(data.fileuri);
        //    location.reload();
        //   data[1].map(item => {
        //     let mDetails:edit = new edit();
        //     mDetails.chargeBillId=item.chargeBillId
        //   mDetails.chargeName=item.serviceName
        //   mDetails.amount=item.amount
        //   mDetails.mrp=item.mrp
        //  mDetails.quantity=item.quantity
        //   mDetails.discount=item.discount
        //   mDetails.netAmount=item.netAmount
        //  mDetails.paid=item.paid
        //   console.log("bill" + this.Edit.push(mDetails));
        //  });
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
        console.log(err.error);
      },
      () => {
        this.toastr.success("Details Edited ");
      }
    );
  }
  advancepdf() {
    this._http.getAdvance(this.regId).subscribe(data => {
      window.open(data.regId);

      location.reload();
    });
  }

  block() {
    let flag = "true";
    this._http.blockPatient(this.regId, flag).subscribe(
      data => {},
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {
        this.toastr.success("Patient is blocked ");
        // location.reload()
      }
    );
  }
  Unblock() {
    let flag = "false";
    this._http.blockPatient(this.regId, flag).subscribe(
      data => {},
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {
        this.toastr.success("Patient is Unblocked ");
        // location.reload()
      }
    );
  }
  calcAmount1(data) {
    if (data.paid === "NO") {
      data.amount = data.mrp * data.quantity;
      data.netAmount = data.amount - data.amount * (data.discount / 100);
    }
  }

  calcAmount(data) {
    data["amount"] = data.quantity * data.mrp;
    // if(data.discount || data.discount<=0)
    data["netAmount"] =
      data["amount"] - (data["amount"] * data.discount) / 100.0;

    // if(data.discount && data.discount > 0)
  }
  // data['netAmount']= data['amount']-(data['amount']*(data.discount)/100.0);

  cardamount: number;
  cashamount: number;
  totalamount: any;
  dueamount: number;

  getduecardamount() {
    this.totalamount = this.netAmountf;
    if (this.dueamount) {
      this.cardamount =
        this.totalamount - (this.dueamount ? this.dueamount : 0);
    }
  }

  getduecashamount() {
    this.totalamount = this.netAmountf;
    if (this.dueamount) {
      this.cashamount =
        this.totalamount - (this.dueamount ? this.dueamount : 0);
    }
  }
  getcashamount() {
    this.totalamount = this.netAmountf;
    console.log(this.amount);
    this.cashamount = this.totalamount - this.cardamount;
  }

  getcardamount() {
    this.totalamount = this.netAmountf;

    this.cardamount = this.totalamount - this.cashamount;
  }

  getcashDueamount() {
    this.totalamount = this.netAmountf;
    if (this.cashamount) this.dueamount = this.totalamount - this.cashamount;
  }

  getcardDueamount() {
    this.totalamount = this.netAmountf;
    if (this.cardamount) this.dueamount = this.totalamount - this.cardamount;
  }

  X: number;
  Y: number = 0;
  amount2() {
    this.total = this.netAmountf;

    if (this.X > this.total) {
      this.X = 0;
    }

    this.Y = this.total - this.X;
  }
  amount1() {
    this.total = this.netAmountf;
    if (this.Y > this.total) {
      this.Y = 0;
    }

    this.X = this.total - this.Y;
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
}
