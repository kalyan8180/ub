import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormControl, NgModel } from "@angular/forms";
import { Validators } from "@angular/forms";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Output, EventEmitter, AfterViewInit } from "@angular/core";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material";
import { HttpModule } from "@angular/http";
import { Router, NavigationEnd, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { RegisterService } from "src/app/registration/register.service";
import moment from "moment/src/moment";
import { error } from "protractor";
import { ToastrService } from "ngx-toastr";
import { Mutliple, Type } from "src/app/registration/registration.model";
import { Observable, BehaviorSubject } from "rxjs";
import { TempService } from "src/app/temp.service";

const typeColumn = ["Cash", "Card", "Due"];
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  // date = new FormControl(new Date());
  // serializedDate = new FormControl((new Date()).toISOString());
  minDate = new Date();
  pdf: any;
  check: boolean = false;
  Patient = [];
  // selectedbed:string
  occupation: string;
  insuranceCompany: string;
  date1: string;
  regFee: number = 50;
  country: string;
  email: string;
  marketingName: string;
  firstName: string;
  lastName: string;
  aliasName: string;
  q_id: string;
  area: string;
  maritialStatus: string;
  closeResult: string;
  modeOfCommunication: string;
  city: string = "Hyderabad";
  gender: string;
  insurance: string;
  pin: any;
  dob: any;
  motherName: string;
  address: string;
  regValidity: string;
  // regDate: string;
  appNo: string;
  regId: any;
  bloodGroup: string;
  nationality: string = "Indian";
  religion: string;
  pType: string;
  state: string = "Telangana";
  source: string;
  refName: string;
  refAdd: string;
  refPhone: number;
  mobile: any;
  telephone: any;
  typeOfCharge: any;
  modeOfPayment: any;
  title: any;
  middleName: string;
  consultant: string;
  issuedAt: string;
  passportNo: any;
  companyCode: string;
  companyName: string;
  companyFee: any;
  comun: string;
  issueDate: any;
  expiryDate: any;
  tdate: any;
  fileuri: any;
  idate: any;
  bed: string;
  Aamount: any;
  eamount: any;
  responsiblePerson: string;
  responsiblePersonName: string;
  resp: string;
  Modal = false;
  // totalfee:number=0
  referenceNumber: string;
  // nationality="Indian";

  private selectedBed: string;
  value: any;
  disable: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  due: boolean = false;
  disablebutton: boolean = false;
  titleName: any = [];
  multiplePayment1: Mutliple[] = [];
  multiplePayment: any = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _http: RegisterService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private temp1: TempService
  ) {
    this.multiplePayment1[0] = new Mutliple();
    this.router.events.subscribe(evt => {
      this.router.routeReuseStrategy.shouldReuseRoute = function(
        future: ActivatedRouteSnapshot,
        curr: ActivatedRouteSnapshot
      ) {
        if (
          future.url.toString() === "register" &&
          curr.url.toString() === future.url.toString()
        ) {
          return false;
        }
        return future.routeConfig === curr.routeConfig;
      };
    });
    this.RegisterForm = fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null],
      aliasName: [null],
      insurance: [null],
      area: [null, Validators.required],
      city: [null, Validators.required],
      gender: [null, Validators.required],

      dob: [null, Validators.required],
      motherName: [null],
      address: [null, Validators.required],
      regValidity: [null],
      regDate: [null],
      appNo: [null],
      regId: [null],
      years: [null],
      months: [null],
      days: [null],
      pin: [null, Validators.pattern("^[0-9]{6}$")],
      bloodGroup: [null],
      nationality: [null, Validators.required],
      religion: [null],
      pType: [null, Validators.required],
      source: [null],
      state: [null, Validators.required],
      refName: [null],
      refAdd: [null],
      refPhone: [null],
      mobile: [null, Validators.required],
      telephone: [null],
      responsiblePerson: [null],
      responsiblePersonName: [null],
      q_id: [null],
      regFee: [null],

      typeOfCharge: [null],
      modeOfPayment: [null],
      title: [null],
      occupation: [null],
      middleName: [null],
      maritialStatus: [null],
      consultant: [null],
      email: [
        null,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ],
      " comun": [null],
      passportNo: [null],
      issuedAt: [null],
      issueDate: [null],
      expiryDate: [null],
      companyName: [null],
      companyFee: [null],
      companyCode: [null],
      floor1: [null],
      bed: [null],
      idate: [null],
      tdate: [null],
      Aamount: [null],
      eamount: [null],
      resp: [null],
      doctorFee: [null],
      refnew: [null],
      age: [null],
      // 'cardamount': [null],
      // 'cashamount': [null],
      refwalkin: [null]
    });
  }
  age: any;
  refnew: string;
  doctorFee: number;
  dueamount: number;
  public modalCloseService: NgbModalRef;
  RegisterForm: FormGroup;
  ngOnInit() {
    this.titleName = this.temp1.gettitles();
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;
      // this.cash=true
    }
    this.values[0] = "Cash";

    this.createTypesList();
    this.showOfPatients();
    this.showOfBeds();
  }
  getduecardamount() {
    if (this.dueamount) {
      this.cardamount = this.amount - (this.dueamount ? this.dueamount : 0);
    }
  }

  getduecashamount() {
    if (this.dueamount) {
      this.cashamount = this.amount - (this.dueamount ? this.dueamount : 0);
    }
  }

  getcashDueamount() {
    if (this.cashamount) this.dueamount = this.amount - this.cashamount;
  }

  getcardDueamount() {
    if (this.cardamount) this.dueamount = this.amount - this.cardamount;
  }
  regDate = new Date();

  refwalkin: string;
  submitted = false;
  save(value: any) {
    if (!this.RegisterForm.valid) {
      return;
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
    if (this.source === "Walkin") {
      this.refName = "Walkin";
    }

    // alert(this.refwalkin)
    if (this.refName == null) {
      this.refName = this.refwalkin;
    }
    if (this.source == null) {
      (this.source = ""),
        (this.refName = ""),
        (this.refAdd = ""),
        (this.refPhone = 0);
    }

    if (this.refPhone == null) {
      this.refPhone = 0;
    }
    //       else if(this.source!=null&&this.refName!=null)
    //       {
    // this.refName= this.refnew
    //       }
    else if (
      this.source != null &&
      this.refName != null &&
      this.refAdd == null &&
      this.refPhone == null
    ) {
      (this.refAdd = ""), (this.refPhone = 0);
    } else if (
      this.source != null &&
      this.refName == null &&
      this.refAdd == null &&
      this.refPhone == null
    ) {
      (this.refName = ""), (this.refAdd = ""), (this.refPhone = 0);
    }

    if (this.middleName == null) {
      this.middleName = "";
    }
    let par = {
      // "source": this.source,
      // "refName": this.refName,
      // "refAdd": this.refAdd,
      // "refPhone": this.refPhone,

      title: this.title,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      dob: moment(this.dob).format("YYYY-MM-DD"),
      motherName: this.motherName,
      bloodGroup: this.bloodGroup,
      gender: this.gender,
      nationality: this.nationality,
      religion: this.religion,
      occupation: this.occupation,
      aliasName: this.aliasName,
      patientTypeName: this.pType,

      marketingName: this.q_id,
      mobile: this.mobile,
      telephone: this.telephone,
      email: this.email,
      responsiblePerson: this.responsiblePerson,
      responsiblePersonName: this.responsiblePersonName,
      maritialStatus: this.maritialStatus,
      modeOfCommunication: this.comun,
      address: this.address,
      area: this.area,
      city: this.city,
      state: this.state,

      country: this.country,
      pin: this.pin,
      consultant: this.consultant,

      passportNo: this.passportNo,
      issueDate: this.issueDate,
      issuedAt: this.issuedAt,
      expiryDate: this.expiryDate,

      companyName: this.companyName,
      companyCode: this.companyCode,
      companyFee: this.companyFee,
      refName: {
        source: this.source,
        refName: this.refName,
        phone: this.refPhone,
        adr: this.refAdd
      },
      vPatientRegistration: [
        {
          appNo: this.appNo,

          regDate: this.regDate,
          regValidity: this.regValidity,
          insuranceCompany: this.insuranceCompany,
          referenceNumber: this.referenceNumber,
          roomBookingDetails: [
            {
              fromDate: this.tdate,
              toDate: this.idate,
              bedNo: this.selectedBed,
              advanceAmount: this.Aamount,
              estimateAmount: this.eamount
            }
          ],
          // "multimode": [
          //   {
          //     "mode": "cash",
          //     "amount": +(this.cashamount)
          //   },
          //   {
          //     "mode": "card",
          //     "amount": +(this.cardamount)
          //   }],

          multiplePayment: this.multiplePayment,
          patientPayment: [
            {
              typeOfCharge: "Reg Fees",
              amount: +this.regFee,
              modeOfPaymant: this.modeOfPayment
            },

            {
              typeOfCharge: "Doctor Fee",
              amount: +this.doctorFee,
              modeOfPaymant: this.modeOfPayment
            }
          ]
        }
      ]
    };

    console.log(this.regDate);
    console.log(this.comun);

    this._http.postCreate(par).subscribe(
      data => {
        this.pdf = data;
        console.log(this.insuranceCompany);
        console.log("data**" + JSON.stringify(data));

        // window.location.href = data.fileuri;
        window.open(data.fileuri);

        //  location.reload();
      },

      err => {
        //  if(err.status==500)
        //   {
        //     this.toastr.error
        //   }
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        ); //"Patient Already Created")
        this.multiplePayment = [];
      },

      () => {
        this.toastr.success("Patient Registered Sucessfully");
      }
    );
  }

  close(event) {
    this.RegisterForm.controls["firstName"].markAsUntouched();
    this.RegisterForm.controls["lastName"].markAsUntouched();
    this.RegisterForm.controls["aliasName"].markAsUntouched();
    this.RegisterForm.controls["area"].markAsUntouched();

    this.RegisterForm.controls["city"].markAsUntouched();
    this.RegisterForm.controls["gender"].markAsUntouched();
    this.RegisterForm.controls["bloodGroup"].markAsUntouched();
    this.RegisterForm.controls["address"].markAsUntouched();

    this.RegisterForm.controls["regValidity"].markAsUntouched();
    this.RegisterForm.controls["regDate"].markAsUntouched();
    this.RegisterForm.controls["appNo"].markAsUntouched();
    this.RegisterForm.controls["regId"].markAsUntouched();
    this.RegisterForm.controls["pin"].markAsUntouched();

    this.RegisterForm.controls["nationality"].markAsUntouched();
    this.RegisterForm.controls["pType"].markAsUntouched();
    this.RegisterForm.controls["state"].markAsUntouched();
    this.RegisterForm.controls["modeOfCommunication"].markAsUntouched();
    this.RegisterForm.controls["source"].markAsUntouched();
    this.RegisterForm.controls["refName"].markAsUntouched();
    this.RegisterForm.controls["refAdd"].markAsUntouched();
    this.RegisterForm.controls["mobile"].markAsUntouched();
    this.RegisterForm.controls["email"].markAsUntouched();
    this.RegisterForm.controls["refPhone"].markAsUntouched();
    this.RegisterForm.controls[" passportNo"].markAsUntouched();
    this.RegisterForm.controls["issuedAt"].markAsUntouched();
    this.RegisterForm.controls["companyName"].markAsUntouched();
    this.RegisterForm.controls["companyFee"].markAsUntouched();
    this.RegisterForm.controls["companyCode"].markAsUntouched();
    this.RegisterForm.controls["telephone"].markAsUntouched();
    this.RegisterForm.controls["comun"].markAsUntouched();
  }

  showrow: boolean = false;
  showrow1: boolean = true;
  addMore1(event) {
    this.showrow = true;
    this.Xamount = false;

    this.disable = false;
    this.showrow1 = false;

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = true;
        if (this.cashamount == this.amount) {
          this.cardamount = 0;
          this.dueamount = 0;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = true;
          if (this.cardamount == this.amount) {
            this.cashamount = 0;
            this.dueamount = 0;
          }
        }
      });

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Due") {
        this.due = true;
        if (this.dueamount == this.amount) {
          this.cashamount = 0;
          this.cardamount = 0;
        }
      }
    });
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
    this.disable = true;
    this.Xamount = true;
    // this.multiplePayment1[0].amount = this.amount
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = false;
        if (this.cashamount <= this.amount) {
          this.cashamount = this.amount;
          this.cardamount = this.amount;
          this.dueamount = this.amount;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = false;
          if (this.cardamount <= this.amount) {
            this.cashamount = this.amount;
            this.cardamount = this.amount;
            this.dueamount = this.amount;
          }
        }
      }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Due") {
          this.due = false;
          if (this.dueamount <= this.amount) {
            this.cashamount = this.amount;
            this.cardamount = this.amount;
            this.dueamount = this.amount;
          }
        }
      }),
      this.multiplePayment1.splice(index, 1);
  }

  reset() {
    this.submitted = false;
    this.RegisterForm.reset();
  }

  // print()
  //  {
  //   window.print();
  // }

  public popHandler: any = {};
  open(basic) {
    this.submitted = true;
    if (!this.RegisterForm.valid) {
      return;
    }
    this.consultationdetails();
    this.amount =
      +this.doctorFee + +this.regFee + +(this.Aamount ? this.Aamount : 0);
    this.calamount();
    this.cashamount = this.amount;
    this.cardamount = this.amount;
    this.dueamount = this.amount;
    this.X = this.amount;
    let nodeName = Object.keys(basic._def.references)[0];
    this.popHandler[nodeName] = this.modalService.open(basic, {
      ariaLabelledBy: "modal-basic-title",
      backdrop: "static",
      keyboard: false
    });
    this.popHandler[nodeName].result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  username: Object = {};

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  onInsuranceChange(event) {
    if (event == undefined) {
      this.insuranceCompany = null;
    } else {
      this.insuranceCompany = event.insuranceCompany;
      // alert(this.insuranceCompany);
    }
  }
  open1(content1) {
    this.modalService
      .open(content1, {
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

  showOfPatients() {
    let paramup = {
      filename: "Patient"
    };
    this._http.getPatient().subscribe(data => {
      console.log(data[3]);
      this.Patient = data;
      console.log(this.Patient[5].umr);
      let umr = this.Patient[5].umr;
      let regid = this.Patient[4].nextRegId;
      let insuranceCompany = this.Patient[6].insuranceCompany;
      console.log(" data " + JSON.stringify(data));

      console.log(umr);

      data[3].forEach(
        r =>
          (r["fullName"] =
            r.firstName +
            " " +
            (r.middleName ? r.middleName : " ") +
            " " +
            r.lastName +
            "-" +
            r.userId)
      );

      data[3].map(item => {
        //  console.log(this.username[item.doctorId] = item.userId);
        //  console.log(this.userId = this.username[item.doctorId].userId);
      });
    });
  }
  // userId:string
  room: string;

  roomtype(event) {
    console.log(event);
    this.room = event;
    console.log(this.room);
  }
  private temp: string;
  userdetails(event) {
    console.log(this.consultant);
    this.consultant = event.fullName;
    console.log(event.fullName);
    var searchTerm = "-";
    var indexOfFirst = this.consultant.indexOf(searchTerm);

    console.log(indexOfFirst);
    this.temp = this.consultant.substring(indexOfFirst + 1);
    console.log(this.temp);
  }
  consultationdetails() {
    let par = {
      userId: this.temp,
      patType: this.pType,
      ward: this.room
    };

    this._http.getConsultationFee(par).subscribe(data => {
      this.doctorFee = data.Fee;
      console.log("data**" + JSON.stringify(data));

      this.calamount();
    });
  }

  openBed(floor) {
    this.modalService
      .open(floor, { ariaLabelledBy: "modal-basic-title", size: "lg" })
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
  showOfBeds() {
    this._http.getBeds().subscribe(data => {
      this.BEDS = data.floors;
      // this.WARDS=data.wards
      console.log(" data " + JSON.stringify(data));
    });
  }

  getchoose(selectedBed) {
    switch (selectedBed) {
      case "selectedBed!=null":
        return "green";
      case "selectedBed==null":
        return "red";
    }
  }
  showFloors() {
    this._http.getFloors(this.floor1).subscribe(data => {
      this.WARDS = data;
      console.log(" floor " + JSON.stringify(data));
    });
  }

  showRefDetails() {
    this._http.getRefDetails(this.source, this.refnew).subscribe(data => {
      this.refName = data.refName;
      this.refAdd = data.refAdd;
      this.refPhone = data.refPhone;
      console.log(" referal " + JSON.stringify(data));
    });
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
    // alert(this.roomType)
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
  //  Id=this.Patient[4].nextRegId

  printBlank() {
    let pregid = this.pdf.regId;
    let par = {
      // "consultant":this.consultant,
      // "umr":this.Patient[5].umr
    };

    this._http.postBlank(par, pregid).subscribe(data => {
      console.log("data**" + JSON.stringify(data));

      window.open(data.fileuri);
      // location.reload()
    });
  }

  printAdmissionSlip() {
    let pregid = this.pdf.regId;

    this._http.getAdminSlip(pregid).subscribe(data => {
      console.log("data**" + JSON.stringify(data));
      window.open(data.fileuri);
    });
  }

  Id: any = [];
  showId() {
    this.refName = null;
    this.refAdd = null;
    this.refPhone = null;
    this._http.getrefnames(this.source).subscribe(response => {
      this.Id = response;

      console.log("Id" + JSON.stringify(response));
    });
  }

  onReferralChange(event) {
    // alert(event.refName)
    if (event == undefined) {
      this.refName = null;
      this.refAdd = null;
      this.refPhone = null;
    }
    this.refnew = event.refName;
  }
  resetRef() {
    this.refnew = null;
    this.refAdd = null;
    this.refName = null;
    this.refPhone = null;
    this.source = null;
  }

  //   calculateDob(age)
  //   {
  //     var dat = moment(age).format('DD/MM/YYYY');
  //     console.log(dat)
  //   }

  //   calculateAge(event){

  //     var  d1=moment(event).format('DD/MM/YYYY')
  //    console.log(d1)
  //   //  var month = moment(d1).format('MM');
  //   //  var day   = moment(d1).format('DD');
  //   //  var year  = moment(d1).format('YYYY');

  //   //  console.log(year + ''   + month+ ''+  day )
  //      var   agedays = moment().subtract(this.dob, 'days')
  //     var months = moment().subtract(this.dob ,  'months')

  //    this.age = moment().diff(this.dob, 'years');
  //   //  this.age = moment(d1).diff(this.dob, 'months');
  //   //  this.age = moment(d1).diff(this.dob, 'days');

  //   // console.log( this.age = moment().diff(this.dob, 'days'));
  //   //  console.log(this.age = moment().diff(this.dob, 'months'));
  //       if(this.age<0)
  //         {
  //           this.age  = agedays + "daysss"
  //         }
  //   //  this.dob=moment(this.age).format('DD-MM-YYYY');
  //   //  var agedays=moment().diff(this.dob, 'days')

  //   // console.log("agedays" + agedays)
  // var uddob= moment().subtract(this.age,'years')
  // // uddob.subtract(0, 'months');
  // // uddob.subtract(0, 'days');
  // let uuu=moment(uddob).format('DD/MM/YYYY')
  //   console.log( this.age +'years'+ months+'months'+agedays+'days')
  //   // console.log(d1)
  //   console.log(this.age)
  //   console.log("year" + uddob )
  //   console.log("uuuu" + uuu)
  //   }
  // calculate(event) {

  //   var ageDifMs = Date.now() -event.getTime();
  //   var ageDate = new Date(ageDifMs); // miliseconds from epoch
  //   console.log(ageDifMs)
  //   console.log(ageDate)
  //   return Math.abs(ageDate.getUTCFullYear() - 1970);

  // }
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
  refresh() {
    if (this.popHandler) {
      let arr = this.popHandler;
      Object.keys(this.popHandler).forEach(key => arr[key].close());
    }
    this.router.navigate(["/register"]);

    //location.reload()
  }

  cardamount: number;
  cashamount: number;
  amount: any;
  calamount() {
    this.amount =
      +(this.doctorFee ? this.doctorFee : 0) +
      +(this.regFee ? this.regFee : 0) +
      +(this.Aamount ? this.Aamount : 0);
    this.cashamount = this.amount;
    this.cardamount = this.amount;
    this.dueamount = this.amount;
    this.X = this.amount;
  }
  getcashamount() {
    this.amount =
      +this.doctorFee + +this.regFee + +(this.Aamount ? this.Aamount : 0);
    console.log(this.amount);
    this.cashamount = +this.amount - (this.cardamount ? this.cardamount : 0);
  }

  genderfucntion(title) {
    switch (title) {
      case "Mr":
        return (this.gender = "Male");
      case "Ms":
        return (this.gender = "Female");
      case "Baby":
        return (this.gender = "Female");
      case "Master":
        return (this.gender = "Male");
      case "Baby Boy Of":
        return (this.gender = "Male");

      case "Baby Girl Of":
        return (this.gender = "Female");

      case "Mrs":
        return (this.gender = "Female");
    }
  }

  getcardamount() {
    this.amount =
      +this.doctorFee + +this.regFee + +(this.Aamount ? this.Aamount : 0);

    this.cardamount = +this.amount - (this.cashamount ? this.cashamount : 0);
  }

  Xamount = true;
  X: number;
  Y: number = 0;
  amount2() {
    if (this.X > this.amount) {
      this.X = 0;
    }

    this.Y = this.amount - this.X;
  }
  amount1() {
    if (this.Y > this.amount) {
      this.Y = 0;
    }
    this.X = this.amount - this.Y;
  }
  row: boolean = true;
  secondrow() {
    this.row = false;
  }
  secondrowremove() {
    this.row = true;
    this.X = this.amount;
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
