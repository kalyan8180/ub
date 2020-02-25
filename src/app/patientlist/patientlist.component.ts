import { Component, OnInit } from "@angular/core";
import { PatientlistService } from "src/app/patientlist/patientlist.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Mutliple, Type } from "src/app/patientlist/patientlist.model";
import { Observable, BehaviorSubject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

const typeColumn = ["Cash", "Card"];
@Component({
  selector: "app-patientlist",
  templateUrl: "./patientlist.component.html",
  styleUrls: ["./patientlist.component.css"]
})
export class PatientlistComponent implements OnInit {
  closeResult: string;
  PatientForm: FormGroup;
  PatientForm1: FormGroup;
  private selectedBed: string;
  advance: number;
  mode: any;
  // fileuri:any
  key: string;
  reverse: boolean = false;
  multiplePayment1: Mutliple[] = [];
  multiplePayment: any = [];
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  a: boolean = false;
  constructor(
    private _http: PatientlistService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.multiplePayment1[0] = new Mutliple();
    (this.PatientForm = fb.group({
      regFee: [null],
      ConsultantFee: [null],
      Consultant: [null],
      cashamount: [null],
      cardamount: [null]
    })),
      (this.PatientForm1 = fb.group({
        advance: [null],
        mode: [null],

        cashamount: [null],
        cardamount: [null]
      }));
  }
  showExel() {
    this.spinner.show();
    // this.loading = true;
    this._http.getExcel(this.count).subscribe(data => {
      this.spinner.hide();
      // this.loading = false

      window.open(data.fileuri);
    });
  }
  p: number = 1;
  umr: string;
  open(basic1, data) {
    this.umr = data.umr;
    this.regId = data.regId;
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
  BEDS = [];
  WARDS = [];

  openBed(floor, data) {
    this.regId = data.regId;
    this.modalService
      .open(floor, {
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

  getColor(status) {
    switch (status) {
      case "ALLOCATE":
        return "green";
      case "DISCHARGING":
        return "blue";
      case "OCCUPIED":
        return "red";
    }
  }
  Colors = [];
  availColors: any[];
  floor1: string;
  roomType: string;
  bedColor(n) {
    this.roomType = n.roomType;
    this.availColors = [];
    this._http.getRedbus(this.floor1, this.roomType).subscribe(data => {
      this.Colors = data;
      data.map(d => {
        if (d.status == "ALLOCATE") {
          this.availColors.push(d);
        }
      });
      console.log(" data " + JSON.stringify(data));
      //console.log(this.Colors);
    });
  }

  openEdit(edit, data) {
    this.regId = data.regId;
    // this.regFee=data.regFee
    // this.ConsultantFee=data.ConsultantFee
    // this.Consultant=data.Consultant
    this.modalService
      .open(edit, {
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
  showReports(basic2) {
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  showFloors() {
    this._http.getFloors(this.floor1).subscribe(data => {
      this.WARDS = data;
      console.log(" floor " + JSON.stringify(data));
    });
  }
  Plist: any = [];
  disable: boolean = false;
  cash: boolean = false;
  card: boolean = false;

  ngOnInit() {
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;
      // this.cash=true
    }
    this.values[0] = "Cash";

    this.createTypesList();
    this.showInPatients();
    this.showOfBeds();
    this.showDoctors();
  }

  showInPatients() {
    this.spinner.show();
    this._http.getInpatient(this.count).subscribe(data => {
      this.spinner.hide();
      this.Plist = data;
      console.log(" inpatient list " + JSON.stringify(data));
    });
  }
  getadvanceamount() {
    this.cardamount = this.advance;
    this.cashamount = this.advance;
    this.X = this.advance;
  }

  fileuri: any;
  cardamount: number;
  cashamount: number;
  amount: any;
  getcashamount() {
    this.amount = +this.advance;
    console.log(this.amount);
    this.cashamount = this.amount - this.cardamount;
  }
  getcardamount() {
    this.amount = +this.advance;

    this.cardamount = this.amount - this.cashamount;
  }

  referenceNumber: string;
  save(value: any) {
    // this.multiplePayment1.map(

    //   sale => {
    //     if (sale.payType === 'Cash') {

    //       this.multiplePayment.push({
    //         "payType": "Cash",
    //         "amount": this.cashamount
    //       })
    //     }
    //   }

    // );
    //  this.multiplePayment1.map(
    //  sale=> {if(sale.payType==='Due')
    //  {

    //    this.multiplePayment.push({"payType":"Due",
    //     "amount":this.dueamount})
    //  }}

    //   );
    // this.multiplePayment1.map(

    //   sale => {
    //     if (sale.payType === 'Card') {

    //       this.multiplePayment.push({
    //         "payType": "Card",
    //         "amount": this.cardamount
    //       })
    //     }
    //   }

    // );
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
    let par = {
      amount: this.advance,
      // "mode": this.mode,
      referenceNumber: this.referenceNumber,
      multiplePayment: this.multiplePayment
      // "multiMode": [
      //   {
      //     "mode": "cash",
      //     "amount": (this.cashamount)
      //   },
      //   {
      //     "mode": "card",
      //     "amount": (this.cardamount?this.cardamount:0).toString()
      //   }],
    };

    this._http.postCreate(this.regId, par).subscribe(
      data => {
        console.log("data**" + JSON.stringify(data));

        this.showInPatients();
        // this.resetpay()
        window.open(data.fileuri);

        // location.reload();
      },
      err => {
        this.toastr.error("Payment is  not done");
      },
      () => {
        this.toastr.success("Payment is done sucessfully");
        // location.reload()
      }
    );
  }

  showOfBeds() {
    this._http.getBeds().subscribe(data => {
      this.BEDS = data.floors;
      // this.WARDS=data.wards
      console.log(" data " + JSON.stringify(data));
    });
  }

  count: string = "2";
  room: string;
  roomtype(event) {
    console.log(event);
    this.room = event;
    console.log(this.room);
  }

  public loading = false;
  tdate: any;
  bed: any;
  regId: any;
  roomChange() {
    let parm = {
      toDate: this.tdate,
      regId: this.regId,
      room: this.selectedBed
    };

    this._http.post(parm).subscribe(
      data => {
        console.log("data**" + JSON.stringify(data));
      },

      err => {
        this.toastr.error("Room details not updated");
      },
      () => {
        this.toastr.success("Room details updated");
        location.reload();
      }
    );
  }
  regFee: string;

  pType: string;
  getFeedetails(data) {
    //alert(data.regId);
    this._http.getFeeDetails(data.regId).subscribe(response => {
      this.regFee = response.regFee ? response.regFee : 0;
      this.ConsultantFee = response.ConsultantFee ? response.ConsultantFee : 0;
      this.Consultant = response.Consultant;
      //alert(response.Consultant);
      this.pType = response.type;
      this.room = response.room;
      //console.log(response);
      // if(response.regFee==null||response.ConsultantFee==null)
      //   {
      //     this.regFee="0"
      //     this.ConsultantFee="0"
      //   }
    });
  }
  // regFee:string
  ConsultantFee: string;
  Consultant: string;
  Doctors = [];
  showDoctors() {
    this._http.getDoctorDetails().subscribe(data => {
      this.Doctors = data; // set full name in each doctor
      //   this.Doctors = data.map(d=> {
      //   d['fullname'] = d.firstName?d.firstName:'';
      //   d['fullname'] = d['fullname']+ d.middleName?d.middleName:'';
      //   d['fullname'] = d['fullname']+ d.lastName?d.lastName:'';
      // });
    });
  }
  private temp: string;
  userdetails(event) {
    // alert(event);
    var searchTerm = "-";
    var indexOfFirst = event.indexOf(searchTerm);
    this.temp = event.substring(indexOfFirst + 1);
    //alert(this.temp);
  }

  consultationdetails() {
    let par = {
      userId: this.temp,
      patType: this.pType,
      ward: this.room
    };

    this._http.getConsultationFee(par).subscribe(data => {
      this.ConsultantFee = data.Fee;
      console.log("data**" + JSON.stringify(data));
    });
  }
  dischargeType: string;

  discharge(dischargeType) {
    this.loading = true;
    this._http.getType(this.dischargeType).subscribe(response => {
      this.loading = false;
      this.Plist = response;

      console.log(this.Plist);
      console.log(response);
    });
  }
  showNotes(data) {
    this._http.getservices(data.regId).subscribe(response => {
      window.open(response.fileuri);
    });
  }

  resetpay() {
    let types = [];

    typeColumn.forEach(type => {
      // if current type in array of chosen
      let selected = this.values.includes(type);
      // push current type with its status
      types.push(new Type(type, selected));
    });
    this.types$.next(types);
    this.PatientForm1.reset();
    this.referenceNumber = null;
    this.multiplePayment1.length = 1;
    this.multiplePayment1[0].payType = "Cash";
    // // if (this.multiplePayment1[0].payType = "Cash") {
    // //   this.disable = true
    // //   // this.cash=true
    // // }
    this.secondrowremove();
    this.cashamount = null;
    this.cardamount = null;
    this.X = null;
    //  this.showrow=false
    //  this.row = true
  }
  showDetailreport(data) {
    this._http.getDetailedReport(data.regId).subscribe(response => {
      window.open(response.fileuri);
    });
  }
  Bills = [];

  getBills(data) {
    this.spinner.show();

    this._http.getAllBills(data.regId).subscribe(response => {
      this.spinner.hide();
      this.Bills = response;

      console.log(this.Bills);
      console.log(response);
    });
  }
  Consultantx: string;
  editDetails() {
    let par = {
      consultant: this.Consultantx,
      regId: this.regId,
      regFee: +this.regFee,
      consultantFee: +this.ConsultantFee
    };

    this._http.editfeedetails(par).subscribe(
      data => {
        console.log(data);
      },
      err => {
        this.toastr.error("Fee  Details Not updated");
      },
      () => {
        this.toastr.success("Fee Details  updated");
        location.reload();
      }
    );
  }

  showrow: boolean = false;
  showrow1: boolean = true;

  addMore1(event) {
    this.disable = false;
    this.disable = false;
    this.showrow = true;
    this.Xamount = false;

    this.disable = false;
    this.showrow1 = false;
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = true;
        if (this.cashamount == this.advance) {
          this.cardamount = 0;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = true;
          if (this.cardamount == this.advance) {
            this.cashamount = 0;
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
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = false;
        if (this.cashamount <= this.advance) {
          this.cashamount = this.advance;
          this.cardamount = this.advance;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = false;
          if (this.cardamount <= this.advance) {
            this.cashamount = this.advance;
            this.cardamount = this.advance;
          }
        }
      }),
      this.multiplePayment1.splice(index, 1);
  }

  Xamount = true;
  X: number;
  Y: number = 0;
  amount2() {
    if (this.X > this.advance) {
      this.X = 0;
    }

    this.Y = this.advance - this.X;
  }
  amount1() {
    if (this.Y > this.advance) {
      this.Y = 0;
    }
    this.X = this.advance - this.Y;
  }
  row: boolean = true;
  secondrow() {
    this.row = false;
  }
  secondrowremove() {
    this.row = true;
    this.X = this.advance;
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
