import { Component, OnInit } from "@angular/core";
import { OutpatientlistService } from "./outpatientlist.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { filter } from "rxjs/operators";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-outpatientlist",
  templateUrl: "./outpatientlist.component.html",
  styleUrls: ["./outpatientlist.component.css"]
})
export class OutpatientlistComponent implements OnInit {
  closeResult: string;
  doctor: string;
  reports = [];
  Date: string;
  consulting: string;

  constructor(
    private _http: OutpatientlistService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.showOutpatients();
    this.showData();
    this.showDoctors();
  }
  count: string = "2";
  array = [];
  showData() {
    this._http.getData().subscribe(response => {
      this.array = response;
    });
  }

  date1: string;
  p: number = 1;
  olist = [];

  key: string;
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  a: boolean = false;
  public loading = false;

  showOutpatients() {
    this.spinner.show();
    this._http.getOutpatient(this.count).subscribe(data => {
      this.spinner.hide();
      this.olist = data;
      console.log(" outpatient list " + JSON.stringify(data));
    });
  }
  showExel() {
    this.spinner.show();
    this._http.getExcel(this.count).subscribe(data => {
      this.spinner.hide();

      window.open(data.fileuri);
    });
  }

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
  room: string;
  pType: string;
  getFeedetails(data) {
    this._http.getFeeDetails(data.regId).subscribe(response => {
      this.regFee = response.regFee;
      this.ConsultantFee = response.ConsultantFee;
      this.Consultant = response.Consultant;
      this.pType = response.type;
      this.room = response.room;
      console.log(response);
    });
  }
  regFee: string;
  ConsultantFee: string;
  Consultant: string;
  regId: string;
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

  openvisit(basic3, data) {
    this.regId = data.regId;

    this.modalService
      .open(basic3, {
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
  private temp: string;
  userdetails(event) {
    console.log(event);
    var searchTerm = "-";
    var indexOfFirst = event.indexOf(searchTerm);

    console.log(indexOfFirst);
    this.temp = event.substring(indexOfFirst + 1);
    console.log(this.temp);
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

  showNotes(data) {
    this._http.getservices(data.regId).subscribe(response => {
      window.open(response.fileuri);
    });
  }

  Bills = [];
  validTill: string;
  visitsLeft: string;
  getrevisitdetails(data) {
    this.visitsLeft = null;
    this.validTill = null;
    this._http.revisitValidity(data.regId).subscribe(
      response => {
        this.validTill = response.validTill;
        this.visitsLeft = response.visitsLeft;
        console.log(response);
        return this.visitsLeft;
      },

      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }
  getblankpres() {
    let param = {};
    this._http.blankprescription(this.regId, param).subscribe(
      response => {
        window.open(response.fileuri);
        console.log(response);
      },

      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }

  getBills(data) {
    this.spinner.show();
    this._http.getAllBills(data.regId).subscribe(response => {
      this.spinner.hide();
      this.Bills = response;

      console.log(this.Bills);
      console.log(response);
    });
  }

  sim = [];
  save() {
    let parm = {
      consultant: this.consulting,
      // "date":this.date1,
      date: moment(this.date1).format("YYYY-MM-DD")
    };
    this._http.postList(parm).subscribe(data => {
      this.olist = data;
      // olist:filter

      console.log(data);
      console.log("data**" + JSON.stringify(data));
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
}
