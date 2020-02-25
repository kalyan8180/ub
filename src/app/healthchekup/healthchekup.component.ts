import { Component, OnInit } from "@angular/core";
import { HealthchekupService } from "src/app/healthchekup/healthchekup.service";
import {
  Mutliple,
  NewSale,
  Patient,
  Service,
  Type
} from "./healthchekup.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, BehaviorSubject } from "rxjs";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
const typeColumn = ["Cash", "Card", "Due", "Insurance", "Paid In KPHB"];
@Component({
  selector: "app-healthchekup",
  templateUrl: "./healthchekup.component.html",
  styleUrls: ["./healthchekup.component.css"]
})
export class HealthchekupComponent implements OnInit {
  masterCheckupId: any;
  medicines: any;
  // date: any;

  maxDate = new Date();
  closeResult: string;
  billDate: string;
  newSale: NewSale;
  patient: Patient = new Patient();

  multiplePayment1: Mutliple[] = [];
  cost: number;
  masterServiceName: any;
  constructor(
    private _http: HealthchekupService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.newSale = new NewSale();
    this.multiplePayment1[0] = new Mutliple();
    this.Register[0] = new Service();
  }

  referenceNumber: string;
  disable: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  due: boolean = false;

  Options = ["Cash", "Card", "Due", "Insurance", "Paid In KPHB"];
  ngOnInit() {
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;
    }
    this.values[0] = "Cash";
    this.prepareNewBill();
    this.createTypesList();
  }

  test1(c) {
    if (c.payType == "Cash") {
      this.cash = true;
      this.card = false;
      this.due = false;
    } else if (c.payType == "Card") {
      this.card = true;
      this.cash = false;
      this.due = false;
    } else {
      this.due = true;
      this.card = false;
      this.cash = false;
    }
  }
  test(c) {
    if (c.payType === "Cash") {
      if (this.multiplePayment.length >= 1)
        if (this.cashamount == this.total) {
          this.cardamount = this.total - this.cashamount;
          this.dueamount = this.total - this.cashamount;
        } else {
          this.cashamount = this.total;
          this.cardamount = this.total - this.cashamount;
          this.dueamount = this.total - this.cashamount;
        }
      this.cash = true;
      this.card = false;
      this.due = false;
    } else if (c.payType === "Card") {
      if (this.multiplePayment.length >= 1)
        if (this.cardamount == this.total) {
          this.cashamount = this.total - this.cardamount;
          this.dueamount = this.total - this.cardamount;
        } else {
          this.cardamount == this.total;
          this.cashamount = this.total - this.cardamount;
          this.dueamount = this.total - this.cardamount;
        }
      this.card = true;
      this.cash = false;
      this.due = false;
    } else {
      if (this.multiplePayment.length >= 1)
        if (this.dueamount == this.total) {
          this.cashamount = this.total - this.dueamount;
          this.cardamount = this.total - this.dueamount;
        } else {
          this.dueamount == this.total;
          this.cashamount = this.total - this.dueamount;
          this.cardamount = this.total - this.dueamount;
        }
      this.due = true;
      this.cash = false;
      this.card = false;
    }
  }

  Register: Service[] = [];

  findPatient(event) {
    this._http.getPatient(this.newSale.regId).subscribe(
      user => {
        this.patient.name = user.name;
        this.patient.mobile = user.mobile;
        this.patient.type = user.type;
        this.newSale.location = user.location;
        // if (this.patient.type == "OUTPATIENT") {
        //   var typeColumn = ["Cash", "Card"];
        // }
        // this.createTypesList();
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }
  addMore(event) {
    this.Register.push(new Service());
  }
  value: any;
  dis: number = 0;
  tdisamount: any;
  tamount: any;
  discount: any;
  discountchange() {
    if (this.value ? this.value : 0 && this.tdisamount ? this.tdisamount : 0) {
      this.calculatedisamount();
      this.amount1();
      this.amount2();
    }
  }

  calculatedisamount() {
    if (this.value == "%") {
      this.tamount = this.total;
      this.tamount -= (this.tamount * this.dis) / 100.0;
      this.tdisamount = Math.round(this.tamount ? this.tamount : 0);
      this.amount1();
      this.amount2();
      if (this.tdisamount) this.discount = this.total - this.tdisamount;
    } else if (this.value == "amt") {
      this.tamount = this.total;
      this.tamount =
        (this.tamount ? this.tamount : 0) - (this.dis ? this.dis : 0);
      this.tdisamount = Math.round(this.tamount ? this.tamount : 0);
      this.amount1();
      this.amount2();
      if (this.tdisamount) this.discount = this.total - this.tdisamount;
    }
  }
  Price = [];

  regid: string;
  paymentType: string = "Cash";
  Cost = [];
  package: string;
  onMedicineChange(event, ser) {
    if (event == undefined) {
      ser.masterServiceName = null;
      ser.cost = null;
    }
    ser.masterServiceName = event.masterServiceName;
    this.package = ser.masterServiceName;
  }
  show(ser) {
    let par = {
      serviceName: ser.masterServiceName
    };

    this._http.getcost(par).subscribe(response => {
      ser.cost = +response[0].cost;

      console.log("response" + JSON.stringify(response));
    });
  }
  multiplePayment: any = [];
  authorisedBy: string;
  saveprogress = false;
  reason: any;
  noofClick: number = 0;
  save() {
    this.noofClick = this.noofClick + 1;
    if (this.noofClick > 0 && this.noofClick == 1) {
      this.saveprogress = true;

      if (this.newSale.regId == null) {
        (this.newSale.name = this.patient.name),
          (this.newSale.mobileNo = +this.patient.mobile);
      }
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
        patientName: this.patient.name,
        regId: this.newSale.regId,
        totalAmount: this.tdisamount,
        cost: this.total,
        discount: this.discount,
        location: this.patient.location,
        mobileNo: this.patient.mobile,

        authorisedBy: this.authorisedBy,
        referenceNumber: this.referenceNumber,

        multiplePayment: this.multiplePayment,

        masterCheckUpHelper: this.Register
      };
      this._http.postCreate(param).subscribe(
        data => {
          console.log("data**" + JSON.stringify(data));
          window.open(data.fileuri);

          // location.reload();

          this.saveprogress = false;
        },

        err => {
          this.toastr.error(
            err["error"] ? err["error"].message : "Error Occured!"
          );
          this.saveprogress = false;
          this.multiplePayment = [];
        },
        () => {
          this.saveprogress = false;
          this.toastr.success("Bill successfull ");

          // location.reload();
        }
      );
      this.clear((this.reason = "Cross click"));
    } else {
      this.saveprogress = true;
    }
  }
  clear(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  // removeSaleItem(index) {
  //   this.Details.splice(index, 1);
  // }
  Details = [];

  prepareNewBill() {
    // this.refSales[0] = new SaleDetail();

    this._http.getBill().subscribe(response => {
      // this.dropdown = response;
      this.Details = response;

      // this.Details[0] = response;
      // this.dropdown = response;
      console.log("Details" + JSON.stringify(response));
    });
  }

  reset() {
    this.patient = new Patient();
    this.Register = [];
    this.Register[0] = new Service();
  }

  type: string;
  invoice: string;
  // cost: number;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  Xamount = true;
  payment = false;
  showrow: boolean = false;
  showrow1: boolean = true;
  addMore1(event) {
    this.showrow = true;
    this.Xamount = false;

    this.disable = false;
    this.showrow1 = false;
    this.payment = true;

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = true;

        if (this.cashamount == this.total) {
          this.cardamount = this.total - this.cashamount;
          this.dueamount = this.total - this.cashamount;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = true;

          if (this.cardamount == this.total) {
            this.cashamount = this.total - this.cardamount;
            this.dueamount = this.total - this.cardamount;
          }
        }
      });

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Due") {
        this.due = true;

        if (this.dueamount == this.total) {
          this.cashamount = this.total - this.dueamount;
          this.cardamount = this.total - this.dueamount;
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
    this.disable = true;
    this.Xamount = true;
    this.X = this.total;
    // this.multiplePayment1[0].amount = this.total
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = false;
        if (this.cashamount <= this.total) {
          this.cashamount = this.total;
          // this.cardamount = this.total
          // this.dueamount = this.total
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = false;
          if (this.cardamount <= this.total) {
            // this.cashamount = this.total
            this.cardamount = this.total;
            // this.dueamount = this.total
          }
        }
      }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Due") {
          this.due = false;
          if (this.dueamount <= this.total) {
            // this.cashamount = this.total
            // this.cardamount = this.total
            this.dueamount = this.total;
          }
        }
      }),
      this.multiplePayment1.splice(index, 1);
  }

  removeSaleItem(index) {
    let reg = this.Register[index];
    this.Details[1].map(sale => {
      if (sale.masterServiceName == reg.masterServiceName) {
        sale["disabled"] = false;
      }
    });
    this.Register.splice(index, 1);
  }
  // calcAmount(ser) {

  //     ser.total = ser.quantity * ser.amount;
  //   }
  //   if (ser.discount) {
  //     ser.total = ser.total - ser.discount;
  //   }
  // }
  private total = 0;
  open1(basic) {
    this.total = 0;
    this.dis = 0;

    this.Register = this.Register.filter(
      sale => Object.keys(sale).length !== 0
    );
    this.Register.map(
      ser => (this.total = this.total + (ser.cost ? ser.cost : 0))
    );
    // this.Register.map(ser => (this.total = this.total + ser.cost));
    this.cashamount = this.total;
    this.cardamount = this.total;
    this.dueamount = this.total;
    this.calculatedisamount();
    this.X = this.total;
    this.multiplePayment1[0].amount = this.total;

    this.modalService

      .open(basic, {
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

  open2(basic2) {
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

  cardamount: number;
  cashamount: number;
  amount: any;
  dueamount: number;

  getduecardamount() {
    this.amount = this.total;
    if (this.dueamount) {
      this.cardamount = this.amount - this.dueamount;
    }
  }

  getduecashamount() {
    this.amount = this.total;
    if (this.dueamount) {
      this.cashamount = this.amount - this.dueamount;
    }
  }
  getcashamount() {
    this.amount = this.total;
    console.log(this.amount);
    this.cashamount = this.amount - this.cardamount;
  }

  getcardamount() {
    this.amount = this.total;

    this.cardamount = this.amount - this.cashamount;
  }

  getcashDueamount() {
    this.amount = this.total;
    if (this.cashamount) this.dueamount = this.amount - this.cashamount;
  }

  getcardDueamount() {
    this.amount = this.total;
    if (this.cardamount) this.dueamount = this.amount - this.cardamount;
  }
  total_error: boolean = false;

  calamount(c) {
    // if(this.multiplePayment1.length>1)
    //   {

    // this.disable=true

    this.multiplePayment1[0].amount =
      +this.total -
      +(this.multiplePayment1[1].amount ? this.multiplePayment1[1].amount : 0);

    this.multiplePayment1[1].amount =
      +this.total - this.multiplePayment1[0].amount;
    // if(c.amount>this.total)
    //   {
    //     this.total_error=true
    //     this.multiplePayment1[1].amount=0
    //     this.multiplePayment1[0].amount=this.total
    //     return
    //   }
    //   this.total_error=false
    // }
  }

  // cancelreset(){
  //   this.multiplePayment1[0] = new Mutliple()

  //   this.multiplePayment1[0].payType = "Cash"
  //   this.multiplePayment1.splice(1, 1)
  //   this.Y=0
  // }
  X: number;
  Y: number = 0;
  total1: number = 0;
  amount2() {
    this.total1 = this.tdisamount;
    if (this.X > this.total1) {
      this.X = 0;
    }
    this.Y = this.total1 - this.X;
  }
  amount1() {
    this.total1 = this.tdisamount;
    if (this.Y > this.total1) {
      this.Y = 0;
    }
    this.X = this.total1 - this.Y;
  }
  row: boolean = true;
  secondrow() {
    this.row = false;
  }
  secondrowremove() {
    this.row = true;
    this.X = this.tdisamount;
    this.Y = 0;
  }
  values: Array<string> = [];

  types$ = new BehaviorSubject([]);
  // An array for looping selectors in template
  options = Array.from({ length: 1 });
  // An array for collect all chosen values

  changed(data, optI) {
    // alert(data)
    // Change chosen data in chosen list with index of selector

    this.values[optI] = data;
    // Reform the chosen list
    this.createTypesList();
  }

  /**
   * The method which form all option types according to chosen values
   */
  private createTypesList() {
    // if (this.patient.type == "OUTPATIENT") {
    //   var typeColumn = ["Cash", "Card", "Insurance", "Paid In KPHB"];
    // } else {
    //   var typeColumn = ["Cash", "Card", "Due", "Insurance", "Paid In KPHB"];
    // }

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

  paymenttype: string;
  paytype(event) {
    this.paymenttype = event.payType;
    console.log(this.paymenttype);
  }
  open3(content, data) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  Array = [];
  showLink(data) {
    let param = {
      masterServiceName: this.package
    };
    this._http.getItems(param).subscribe(data => {
      this.Array = data;
    });

    console.log(param);
  }
}
