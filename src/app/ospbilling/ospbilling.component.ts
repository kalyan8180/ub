import { Component, OnInit } from "@angular/core";
import { Service, Mutliple, Type } from "src/app/ospbilling/ospbilling.model";
import { OspbillingService } from "src/app/ospbilling/ospbilling.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import moment from "moment/src/moment";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, BehaviorSubject } from "rxjs";
import { SaleDetail } from "../wardonline/wardonline.model";

const typeColumn = ["Cash", "Card", "Due"];
@Component({
  selector: "app-ospbilling",
  templateUrl: "./ospbilling.component.html",
  styleUrls: ["./ospbilling.component.css"]
})
export class OspbillingComponent implements OnInit {
  closeResult: string;
  RegisterForm: FormGroup;
  authorisedBy: string;
  authorisedComment: any;
  ospSave: boolean;
  total: number = 0;
  errorInfo: boolean = false;
  constructor(
    private router: Router,
    private _http: OspbillingService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.Register[0] = new Service();
    this.multiplePayment1[0] = new Mutliple();
    this.RegisterForm = fb.group({
      patientName: [null],
      mobile: [null],
      refferedById: [null],
      dob: [null],
      enteredDate: [null],
      paymentType: [null],
      gender: [null],
      years: [null],
      months: [null],
      days: [null]
    });
  }

  ngOnInit() {
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;
      // this.cash=true
    }
    this.values[0] = "Cash";
    this.showDetails();
    this.createTypesList();
  }
  Register: Service[] = [];
  disable: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  due: boolean = false;
  Details = [];

  show(ser) {
    let par = {
      serviceName: ser.serviceName
    };

    this._http.getcost(par).subscribe(response => {
      ser.price = +response.cost;
      ser.amount = (ser.price ? ser.price : 0) - ser.discount;
    });
  }

  addMore1(event) {
    this.disable = false;
    this.Xamount = false;
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = true;
        if (this.cashamount == this.total) {
          this.cardamount = 0;
          this.dueamount = 0;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = true;
          if (this.cardamount == this.total) {
            this.cashamount = 0;
            this.dueamount = 0;
          }
        }
      });

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Due") {
        this.due = true;
        if (this.dueamount == this.total) {
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
  Xamount = true;
  removeSaleItem1(index) {
    this.disable = true;
    this.Xamount = true;
    this.X = this.total;
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = false;
        if (this.cashamount <= this.total) {
          this.cashamount = this.total;
          this.cardamount = this.total;
          this.dueamount = this.total;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = false;
          if (this.cardamount <= this.total) {
            this.cashamount = this.total;
            this.cardamount = this.total;
            this.dueamount = this.total;
          }
        }
      }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Due") {
          this.due = false;
          if (this.dueamount <= this.total) {
            this.cashamount = this.total;
            this.cardamount = this.total;
            this.dueamount = this.total;
          }
        }
      }),
      this.multiplePayment1.splice(index, 1);
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
  public popHandlerx: any = {};
  open2(basic2) {
    let nodeName = Object.keys(basic2._def.references)[0];
    this.popHandlerx[nodeName] = this.modalService
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
  public popHandler: any = {};
  
  open1(basic) {
     this.calculatedisamount();
    this.X = this.total;
    let nodeName = Object.keys(basic._def.references)[0];
    this.popHandler[nodeName] = this.modalService
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
  calcAmount(event,ser) {
    if(ser.quantity < 1){
      ser.quantity = 1;
    }
    if (ser.quantity) {
      ser.amount = (ser.price ? ser.price : 0) * ser.quantity;
    }
    if (ser.discount) {
      ser.amount = ser.amount - ser.discount;
    }
    this.getCalculation();
  }

  calculateAge(event) {
    let d1 = moment(event).format("DD/MM/YYYY");
    let years = moment().diff(moment(d1, "DD/MM/YYYY"), "years");
    let months = moment().diff(
      moment(d1, "DD/MM/YYYY").add(years, "years"),
      "months"
    );
    let days = moment().diff(
      moment(d1, "DD/MM/YYYY")
        .add(years, "years")
        .add(months, "months"),
      "days"
    );
    this.RegisterForm.controls["years"].patchValue(years);
    this.RegisterForm.controls["months"].patchValue(months);
    this.RegisterForm.controls["days"].patchValue(days);
  }

  calcDoB(y: number = 0, m: number = 0, d: number = 0) {
    if (d > 31) {
      m = m + d / 31; //.toFixed(0);
      d = d % 31;
    }
    if (m > 11) {
      y = y + m / 12; //.toFixed(0);
      m = m % 12;
    }
    this.RegisterForm.controls["years"].patchValue(y);
    this.RegisterForm.controls["months"].patchValue(m);
    this.RegisterForm.controls["days"].patchValue(d);
    this.dob = new Date(
      moment()
        .subtract(y, "years")
        .subtract(m, "months")
        .subtract(d, "days")
    );
  }
  xArray: any;
  totalx: number = 0;
  onMedicineChange(event, ser) {
    this.discountchange();
    if (event == undefined) {
      ser.serviceName = null;
      ser.amount = null;
      ser.price = null;
      ser.discount = null;
      ser.quantity = null;
    }
    ser.serviceName = event.serviceName;  
    setTimeout(() => {this.getCalculation();}, 1000);
  }


  getCalculation()
  {
    this.total = 0;
    this.dis = 0;
    this.Register = this.Register.filter(
      sale => Object.keys(sale).length !== 0
    );
    this.Register.map(reg =>       
      (this.total = this.total + reg.amount)
      );
    this.cashamount = this.total;
    this.cardamount = this.total;
    this.dueamount = this.total;
    //this.calculatedisamount();
    this.X = this.total;
    this.tdisamount = this.total;
  }

  showDetails() {
    this._http.getdetails().subscribe(response => {
      this.Details = response;
      // console.log(this.Lab)
      console.log("services" + JSON.stringify(response));
    });
  }
  referenceNumber: string;

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
      this.persentage();
    }
    else{
this.Amount();
    }
  }
  persentage(){
    this.errorInfo = false;
    if (this.value == "%" && this.dis <= 100) {
      this.errorInfo = false;
      this.tamount = this.total;
      this.tamount -= (this.tamount * this.dis) / 100.0;
      this.tdisamount = Math.round(this.tamount ? this.tamount : 0);
      this.amount1();
      this.amount2();
      if (this.tdisamount) this.discount = this.total - this.tdisamount;
    }
    else{  
      this.errorInfo = false;          
      this.tdisamount = this.total;
    }
    
  }
  Amount(){
    if (this.value == "amt" && this.dis <= this.total) {
      this.errorInfo = false;
      this.tamount = this.total;
      this.tamount =
        (this.tamount ? this.tamount : 0) - (this.dis ? this.dis : 0);
      this.tdisamount = Math.round(this.tamount ? this.tamount : 0);
      this.amount1();
      this.amount2();
      if (this.tdisamount) this.discount = this.total - this.tdisamount;
    }
    else{
      this.errorInfo = true;
      this.tdisamount = this.total;
    }
  }
  reset() {
    this.RegisterForm.reset();
    this.Register = [];
    this.Register[0] = new Service();
  }
  addMore(event) {
    this.Register.push(new Service());
  }
  removeSaleItem(index) {
    this.Register.splice(index, 1);
    this.getCalculation();
  }
  minDate = new Date();
  patientName: string;
  mobile: any;
  refferedById: string;
  dob: any;
  enteredDate = new Date();
  paymentType: string;
  gender: string;
  // saveprogress=false
  multiplePayment1: Mutliple[] = [];
  multiplePayment: any = [];
  noofclicks: any = 0;
  save() {
    this.noofclicks = this.noofclicks + 1;
    if (this.noofclicks > 0 && this.noofclicks == 1) {
      this.ospSave = true;

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
      // this.multiplePayment1.map(

      //   sale=> {if(sale.payType==='Cash')
      // {

      //   this.multiplePayment.push({"payType":"Cash",
      //    "amount":this.cashamount})
      // }}

      //  );
      //  this.multiplePayment1.map(
      //  sale=> {if(sale.payType==='Due')
      //  {

      //    this.multiplePayment.push({"payType":"Due",
      //     "amount":this.dueamount})
      //  }}

      //   );
      //  this.multiplePayment1.map(

      //   sale=> {if(sale.payType==='Card')
      // {

      //   this.multiplePayment.push({"payType":"Card",
      //   "amount":this.cardamount})
      // }}

      //  );

      let param = {
        patientName: this.patientName,
        mobile: this.mobile,
        discount: this.discount,
        authorisedBy: this.authorisedBy,
        comments: this.authorisedComment,
        refferedById: this.refferedById,
        dob: moment(this.dob).format("YYYY-MM-DD"),
        enteredDate: moment(this.enteredDate).format("YYYY-MM-DD"),
        // "paymentType":this.paymentType,
        gender: this.gender,
        refLaboratoryRegistrations: this.Register,
        referenceNumber: this.referenceNumber,
        // "multimode":[
        //   {
        //     "mode":"cash",
        //     "amount":+(this.cashamount)
        //   },
        //   {
        //     "mode":"card",
        //     "amount":+(this.cardamount)
        //   }],

        multiplePayment: this.multiplePayment
      };

      // this.saveprogress=true
      this._http.createservice(param).subscribe(
        response => {
          window.open(response.fileuri);

          // this.router.navigate(["/osp?refresh=1"]);

          console.log(response);
        },
        err => {
          this.toastr.error(
            err["error"] ? err["error"].message : "Error Occured!"
          );
          this.multiplePayment = [];
          console.log(err.error);
        },
        () => {
          this.toastr.success("bill  generated sucessfully");

          // location.reload();
        }
      );

      setInterval(() => {
        window.location.reload();
      }, 2000);
    } else {
      this.ospSave = true;
    }
  }

  // setInterval(()=> {
  //   window.location.reload();
  // },4000);
  // }

  cardamount: number;
  cashamount: number;
  amount: any;
  dueamount: number;

  getduecardamount() {
    if (this.dueamount) {
      this.cardamount = this.total - (this.dueamount ? this.dueamount : 0);
    }
  }

  getduecashamount() {
    if (this.dueamount) {
      this.cashamount = this.total - (this.dueamount ? this.dueamount : 0);
    }
  }
  getcashamount() {
    console.log(this.amount);
    this.cashamount = this.total - this.cardamount;
  }

  getcardamount() {
    this.cardamount = this.total - this.cashamount;
  }

  getcashDueamount() {
    if (this.cashamount) this.dueamount = this.total - this.cashamount;
  }

  getcardDueamount() {
    if (this.cardamount) this.dueamount = this.total - this.cardamount;
  }

  X: number;
  Y: number = 0;
  total1: number = 0;
  amount2() {
    setTimeout(() => {
    this.total1 = this.tdisamount;
    if (this.X > this.total1) {
      this.X = 0;
    }
    this.Y = this.total1 - this.X;
  }, 1000);
  }
  amount1() {
    setTimeout(() => {
    this.total1 = this.tdisamount;
    if (this.Y > this.total1) {
      this.Y = 0;
    }
    this.X = this.total1 - this.Y;
  }, 1000);
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
  authorizationDD: any;
  changed(data, optI) {
    // Change chosen data in chosen list with index of selector

    this.values[optI] = data;
    //alert(this.values[optI]);
    // Reform the chosen list
    this.createTypesList();
    if (this.values[optI] == "Due") {
      this.authorizationDD = true;
    }
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

  paytype(event) {
    this.paymentType = event.payType;
    console.log(this.paymentType);
  }

  // refresh() {
  //   if (this.popHandlerx) {
  //     let arr = this.popHandlerx;
  //     Object.keys(this.popHandlerx).forEach(key => arr[key].close());
  //   }
  //   this.router.navigate(["/osp"]);

  //   //location.reload()
  // }
}
