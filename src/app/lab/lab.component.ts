import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LabService } from "src/app/lab/lab.service";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Service, Nikhil } from "./lab.model";
import { Patient, Mutliple, Type } from "./lab.model";
import { Observable, BehaviorSubject } from "rxjs";

//const typeColumn = ["Cash", "Card", "Due", "Insurance", "Paid In KPHB"];
const typeColumn = ["Cash", "Card", "Due"];
@Component({
  selector: "app-lab",
  templateUrl: "./lab.component.html",
  styleUrls: ["./lab.component.css"]
})
export class LabComponent implements OnInit {
  closeResult: string;
  Register: Service[] = [];
  hello: Nikhil;

  multiplePayment1: Mutliple[] = [];

  constructor(
    private _http: LabService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.multiplePayment1[0] = new Mutliple();
    this.hello = new Nikhil();
  }

  Lab = [];

  referenceNumber: string;
  serviceName: string;
  serviceId: string;
  // discount: number;
  disable: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  due: boolean = false;

  Options = ["Cash", "Card", "Due", "Insurance", "Paid In KPHB"];
  ngOnInit() {
    this.multiplePayment1[0].payType = "Cash";
    // this.multiplePayment1[0].amount=0
    // this.multiplePayment1[1].amount=1
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;

      // this.cash=true
    }

    this.values[0] = "Cash";

    this.showLabServices();
    this.createTypesList();
  }

  test1(c) {
    // for(c=0;c<this.multiplePayment1.length;c++)
    //   {
    //     console.log(this.multiplePayment1[c].payType)

    //   }

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
    // if(this.cashamount==this.total&&this.cardamount==0)
    //   {
    //     this.dueamount=this.total
    //   }
    // if(this.cardamount==this.total&&this.cashamount==0)
    //   {
    //     this.dueamount=this.total
    //   }
    // if(this.dueamount==this.total&&this.cardamount==0)
    //   {
    //     this.cashamount=this.total
    //   }
    if (c.payType === "Cash") {
      // if (this.multiplePayment1.length > 0) {
      //   if (this.cashamount == 0) {
      //     this.cashamount = this.total
      //     this.dueamount = 0
      //     this.cardamount = 0
      //   }
      // }

      // this.amount=this.total
      // if(this.cashamount)
      // this.dueamount = (this.amount)-(this.cashamount)
      // this.cardamount = (this.amount) - (this.cashamount)
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
      // if (this.multiplePayment1.length > 0) {
      //   if (this.cardamount == 0) {
      //     this.cardamount = this.total
      //     this.dueamount = 0
      //     this.cashamount = 0
      //   }
      // }

      // this.amount=this.total
      // console.log(this.amount)
      // if(this.cardamount)
      //   this.dueamount = (this.amount) - (this.cardamount)

      // this.cashamount = (this.amount) - (this.cardamount)

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
      // if (this.multiplePayment1.length > 0) {
      //   if (this.dueamount == 0) {
      //     this.dueamount = this.total
      //     this.cardamount = 0
      //     this.cashamount = 0
      //   }
      // }

      // this.amount=this.total
      // if(this.dueamount){

      //   this.cardamount=(this.amount)-(this.dueamount?this.dueamount:0)

      //   this.cashamount=(this.amount)-(this.dueamount?this.dueamount:0)
      // }
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

  showLabServices() {
    this._http.getServices().subscribe(response => {
      this.Lab = response;
      console.log(this.Lab);
      console.log("services" + JSON.stringify(response));
    });
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
  array = [];
  show(ser) {
    this.Lab.map(lab => {
      this.Register.map(ser => {
        if (lab.serviceName == ser.serviceName) {
          lab["disabled"] = true;
        } else {
          lab["disabled"] = false;
        }
      });
    });
    this._http
      .getCost(ser.serviceName, this.hello.regid)
      .subscribe(response => {
        ser.amount = +response.cost;

        // ser.total = ser.price-ser.price*(ser.discount || 0)/100;
        ser.total = ser.amount - ser.discount;
      });
  }

  onMedicineChange(event, ser) {
    if (event == undefined) {
      ser.amount = null;
      ser.total = null;
      ser.discount = null;
      ser.quantity = 1;
    }
    ser.serviceName = event.serviceName;
  }
  patient: Patient = new Patient();
  multiplePayment: any = [];
  authorisedBy: string;
  saveprogress = false;
  noofclicks: number = 0;
  save() {
    this.noofclicks = this.noofclicks + 1;
    if (this.noofclicks > 0 && this.noofclicks == 1) {
      this.saveprogress = true;

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
      this.saveprogress = true;

      let param = {
        reg_id: this.hello.regid,
        invoiceNo: this.Lab[2].invoice,
        //  "paymentType":this.paymentType,
        authorisedBy: this.authorisedBy,
        referenceNumber: this.referenceNumber,
        discount: this.discount,
        //  "multimode":[
        //   {
        //     "mode":"Cash",
        //     "amount":+(this.cashamount)
        //   },
        //   {
        //     "mode":"Card",
        //     "amount":this.cardamount
        //   }

        //   ],

        multiplePayment: this.multiplePayment,

        // "multiplePayment": this.multiplePayment,

        refLaboratoryRegistrations: this.Register
      };

      // this.saveprogress=true;
      this._http.postCreate(param).subscribe(
        data => {
          console.log("data**" + JSON.stringify(data));
          window.open(data.fileuri);

          location.reload();

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

          //  location.reload();
        }
      );
    } else {
      this.saveprogress = true;
    }
  }

  reset() {
    this.hello = new Nikhil();
    this.patient = new Patient();
    this.Register = [];
    this.Register[0] = new Service();
  }

  type: string;
  invoice: string;
  cost: any;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  //  showPdf(regid,invoice)
  //  {
  //    alert(this.invoice)
  //    this._http.getInvoice(this.regid,this.invoice)
  //    .subscribe(
  //   data => {
  //     window.open(data.fileuri);

  //        location.reload();
  //      console.log("data" + JSON.stringify(data));

  //    },

  //   );

  //  }

  dropdown = [];
  showServices() {
    this._http.getservicesdropdown(this.hello.regid).subscribe(response => {
      this.dropdown = response;
      console.log(this.dropdown);
      console.log("services" + JSON.stringify(response));
    });
  }
  Medicine = [];
  // hai(i)
  // {
  //    this.Medicine.push( { "serviceName":this.serviceName,
  //    "discount":+(this.Lab[i].discount),
  //    })

  //    console.log(this.Medicine)
  //   }

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
    // this.values[0]="Cash"
    // this.values=[]
    // let types=[]

    //   typeColumn.forEach((type) => {
    //       // if current type in array of chosen
    //       let selected = this.values.includes(type);
    //       // push current type with its status
    //       types.push(new Type(type, !selected));
    //     });

    // let types=[]

    // typeColumn.forEach((type) => {
    //     // if current type in array of chosen
    //     let selected = this.values.includes(type);
    //     // push current type with its status
    //     types.push(new Type(type, selected));
    //   });
    //     this.types$.next(types)
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
    this.Lab.map(lab => {
      if (lab.serviceName == reg.serviceName) {
        lab["disabled"] = false;
      }
    });
    this.Register.splice(index, 1);
  }

  findPatient(event) {
    this._http.getPatient(this.hello.regid).subscribe(
      user => {
        this.patient.name = user.name;
        this.patient.type = user.type;
        this.Register[0] = new Service();
        // if (this.patient.type == "OUTPATIENT") {
        //   var typeColumn = ["Cash", "Card", "Insurance", "Paid In KPHB"];
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

  calcAmount(ser) {
    // ser.total = ser.price-ser.price*(ser.discount || 0)/100;
    if (ser.quantity) {
      ser.total = ser.quantity * ser.amount;
    }
    if (ser.discount) {
      ser.total = ser.total - ser.discount;
    }
  }

  private total = 0;

  open1(basic) {
    this.total = 0;
    this.Register = this.Register.filter(
      sale => Object.keys(sale).length !== 0
    );

    if (this.Register[0].serviceName != undefined) {
      this.Register.map(
        reg => (this.total = this.total + (reg.total ? reg.total : 0))
      );
      this.cashamount = this.total;
      this.cardamount = this.total;
      this.dueamount = this.total;
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
    } else {
      this.toastr.error("Please fill Service Details!");
    }
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
}
