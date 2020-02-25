import { Component, OnInit } from "@angular/core";
import { OtherPatientsService } from "src/app/other-patients/other-patients.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, BehaviorSubject } from "rxjs";
import { Mutliple, Type } from "src/app/other-patients/other-patients.model";

const typeColumn = ["Cash", "Card"];
@Component({
  selector: "app-other-patients",
  templateUrl: "./other-patients.component.html",
  styleUrls: ["./other-patients.component.css"]
})
export class OtherPatientsComponent implements OnInit {
  PatientForm1: FormGroup;
  private selectedBed: string;
  multiplePayment1: Mutliple[] = [];
  multiplePayment: any = [];
  constructor(
    private _http: OtherPatientsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.multiplePayment1[0] = new Mutliple();
    this.PatientForm1 = fb.group({
      advance: [null]
      // 'mode': [null],
    });
  }

  ngOnInit() {
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
    }
    this.values[0] = "Cash";

    this.createTypesList();
    this.showOtherpatients();
    this.showOfBeds();
  }

  showOfBeds() {
    this._http.getBeds().subscribe(data => {
      this.BEDS = data.floors;
      // this.WARDS=data.wards
      console.log(" data " + JSON.stringify(data));
    });
  }

  showFloors() {
    this._http.getFloors(this.floor1).subscribe(data => {
      this.WARDS = data;
      console.log(" floor " + JSON.stringify(data));
    });
  }
  getadvanceamount() {
    this.X = this.advance;
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

    this.X = null;
    //  this.showrow=false
    //  this.row = true
  }
  p: number = 1;
  count: string = "2";
  public loading = false;
  other: any = [];
  advance: number;
  showOtherpatients() {
    this.loading = true;
    this._http.getotherpatient(this.count).subscribe(data => {
      this.loading = false;
      this.other = data;
      console.log(" other patient list " + JSON.stringify(data));
    });
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
      console.log(this.Colors);
    });
  }

  closeResult: string;

  umr: string;
  regId: string;
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

  Bills: any = [];
  getBills(data) {
    this._http.getAllBills(data.regId).subscribe(response => {
      this.Bills = response;

      console.log(this.Bills);
      console.log(response);
    });
  }

  noofclicks: any = 0;
  referenceNumber: string;
  save(value: any) {
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

        this.showOtherpatients();
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
  room: string;
  roomtype(event) {
    console.log(event);
    this.room = event;
    console.log(this.room);
  }

  tdate: any;
  bed: any;

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

  showrow: boolean = false;
  showrow1: boolean = true;

  addMore1(event) {
    this.showrow = true;
    this.Xamount = false;

    this.showrow1 = false;

    if (this.multiplePayment1.length <= 1)
      this.multiplePayment1.push(new Mutliple());
    // if (sale.quantity==null){
    //   this.toastr.error("please enter quanity")
    // }
    else {
      this.toastr.error("only two payment types allowed");
    }
  }
  removeSaleItem1(index) {
    this.Xamount = true;

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
