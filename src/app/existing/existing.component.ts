import { Component, OnInit } from "@angular/core";
import { ExistingService } from "src/app/existing/existing.service";
import moment from "moment/src/moment";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Mutliple, Type } from "src/app/existing/existing.model";
import { Observable, BehaviorSubject } from "rxjs";

const typeColumn = ["Cash", "Card", "Due"];
@Component({
  selector: "app-existing",
  templateUrl: "./existing.component.html",
  styleUrls: ["./existing.component.css"]
})
export class ExistingComponent implements OnInit {
  name: any;
  tdate: string;
  pdf: any;

  closeResult: string;
  key: string;
  reverse: boolean = false;
  totalamount: any;
  Tamount: number;
  advance: number;
  insurance: any;
  patReg: boolean;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  a: boolean = false;
  regFee: number;
  amount: any;
  modeOfPayment: any;
  typeOfCharge: any;
  PatientAll = [];
  firstName: string;
  lastName: string;
  umr: any;
  insuranceCompany: any;
  regId: any;
  regDate: any;
  city: string;
  state: string;
  regValidity: any;
  title: string;
  motherName;
  string;
  middleName: string;
  aliasName: string;
  dob: string;
  companyCode: string;
  companyFee: number;
  gender: string;
  RegisterForm: FormGroup;
  maritialStatus: string;
  address: string;
  bloodGroup: string;
  occupation: string;
  nationality: string;
  religion: string;
  pType: string;
  consultant: string;
  mobile: string;
  email: string;
  rePatientType: string;
  reConsultant: string;
  responsiblePersonName: string;
  responsiblePerson: string;
  multiplePayment1: Mutliple[] = [];
  multiplePayment: any = [];
  constructor(
    private _http: ExistingService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.multiplePayment1[0] = new Mutliple();
    this.RegisterForm = fb.group({
      firstName: [null],
      lastName: [null],
      aliasName: [null],
      area: [null, Validators.required],
      city: [null, Validators.required],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      motherName: [null],
      address: [null, Validators.required],
      regValidity: [null],
      regDate: [null],
      appNo: [null, [Validators.required, Validators.minLength(2)]],
      regId: [null],
      pin: [null, Validators.pattern("^[0-9]{6}$")],
      bloodGroup: [null, Validators.required],
      nationality: [null, Validators.required],
      religion: [null, Validators.required],
      pType: [null, Validators.required],
      source: [null, Validators.required],
      state: [null, Validators.required],
      refName: [null, Validators.required],
      refAdd: [null, Validators.required],
      refPhone: [null, Validators.required],
      mobile: [null, Validators.required],
      regfee: [null, Validators.required],
      telephone: [null, Validators.required],
      q_id: [null],
      regFee: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      typeOfCharge: [null],
      modeOfPayment: [null],
      title: [null],
      occupation: [null],
      middleName: [null],
      maritialStatus: [null],
      consultant: [null],
      insurance: [null],
      insuranceCompany: [null],
      email: [
        null,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ],
      " comun": [null],
      umr: [null],
      floor1: [null],
      bed: [null],
      idate: [null],
      Aamount: [null],
      eamount: [null],
      tdate: [null],
      responsiblePersonName: [null],
      responsiblePerson: [null]
    });
  }

  regId1: string;
  source: any;
  Id: any = [];
  showId() {
    this.refnew = null;
    this.refName = null;
    this.refAdd = null;
    this.refPhone = null;
    this._http.getrefnames(this.source).subscribe(response => {
      this.Id = response;

      console.log("Id" + JSON.stringify(response));
    });
  }
  public loading = false;

  bed: string;
  Aamount: string;
  eamount: string;
  idate: string;
  companyName: string;
  ngOnInit() {
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;
      // this.cash=true
    }

    this.values[0] = "Cash";

    this.createTypesList();
    // this.showAllPatients();
    this.showOfBeds();
    // this.showOfPatients()
  }

  open1(content1) {
    this.modalService
      .open(content1, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  open(basic, data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.umr = data.umr;
    this.marketingName = data.marketingName;
    this.companyCode = data.companyCode;
    this.companyFee = data.companyFee;
    this.companyName = data.companyName;
    this.passportNo = data.passportNo;
    this.issueDate = data.issueDate;
    this.issuedAt = data.issuedAt;
    // console.log(data.vPatientRegistration[0].insuranceCompany);
    this.insuranceCompany = data.vPatientRegistration[0].insuranceCompany;
    if (this.insuranceCompany != undefined || this.insuranceCompany != null) {
      this.insurance = "Yes";
    }
    this.responsiblePerson = data.responsiblePerson;
    this.responsiblePersonName = data.responsiblePersonName;
    this.area = data.area;
    this.pin = data.pin;
    this.telephone = data.telephone;
    this.expiryDate = data.expiryDate;
    this.country = data.country;
    this.modeOfCommunication = data.modeOfCommunication;
    this.title = data.title;
    this.middleName = data.middleName;
    this.aliasName = data.aliasName;
    this.motherName = data.motherName;
    this.regId = data.vPatientRegistration[0].regId;
    this.regDate = data.vPatientRegistration[0].regDate;
    this.regValidity = data.vPatientRegistration[0].regValidity;
    this.dob = moment(data.dob).format("YYYY-MM-DD");
    this.gender = data.gender;
    this.maritialStatus = data.maritialStatus;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.bloodGroup = data.bloodGroup;
    this.occupation = data.occupation;
    this.nationality = data.nationality;
    this.pType = data.vPatientRegistration[0].pType;
    this.religion = data.religion;
    this.consultant = data.consultant;
    this.mobile = data.mobile;
    this.email = data.email;
    if (data.refDetails != null) {
      this.source = data.refDetails.source;
      this.refName = data.refDetails.refName;
      this.refAdd = data.refDetails.refAdd;
      this.refPhone = data.refDetails.refPhone;
    }

    this.responsiblePersonName = data.responsiblePersonName;
    (this.responsiblePerson = data.responsiblePerson), console.log(this.email);

    console.log(data.consultant);
    console.log(data.vPatientRegistration[0].regId);
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  p: number = 1;
  // p: number[] = [];
  Patient2 = [];
  logNamespace: number = 0;
  page: number = 0;
  size: number = 10;
  // showAllPatients() {
  //   this.loading = true;
  //   let paramup = {
  //     "filename": "Patient"
  //   }
  //   this._http.getAllPatient()
  //     // this._http.getAllPatient(this.page,this.size)
  //     .subscribe(
  //     data => {
  //       this.loading = false;

  //       this.PatientAll = data[1];
  //       this.Patient2 = data[0]
  //       console.log(" data " + JSON.stringify(data));

  //     },

  //   );

  // }
  // responsiblePersonName: string
  // responsiblePerson: string
  marketingName: string;
  telephone: number;
  modeOfCommunication: string;
  area: string;
  country: string;
  pin: number;
  passportNo: string;
  issueDate: any;
  issuedAt: any;
  expiryDate: any;
  submitForm2(value: any) {
    // let param = {
    //   "address": this.address,
    //   "email": this.email,
    //   "mobile": +(this.mobile),

    // }

    let param = {
      title: this.title,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      dob: this.dob,
      motherName: this.motherName,
      bloodGroup: this.bloodGroup,
      gender: this.gender,
      nationality: this.nationality,
      religion: this.religion,
      occupation: this.occupation,
      aliasName: this.aliasName,
      patientTypeName: this.pType,
      marketingName: this.marketingName,
      mobile: this.mobile,

      telephone: this.telephone,
      email: this.email,
      modeOfCommunication: this.modeOfCommunication,
      address: this.address,
      area: this.area,
      city: this.city,
      state: this.state,
      country: this.country,
      maritialStatus: this.maritialStatus,
      refName: {},
      responsiblePerson: this.responsiblePerson,
      responsiblePersonName: this.responsiblePersonName,
      pin: this.pin,
      consultant: this.consultant,
      passportNo: this.passportNo,
      issueDate: this.issueDate,
      issuedAt: this.issuedAt,
      expiryDate: this.expiryDate,
      companyName: this.companyName,
      companyCode: this.companyCode,
      companyFee: this.companyFee
    };

    console.log(param);

    this._http.edit(this.umr, this.regId, param).subscribe(data => {
      console.log(this.umr);
      console.log("existing" + JSON.stringify(data));
    });

    location.reload();
    this.toastr.success("data updated");
    // this.router.navigate(['/existing'])
  }
  room: string;
  roomtype(event) {
    console.log(event);
    this.room = event;
    console.log(this.room);
  }
  consultationdetails() {
    let par = {
      userId: this.temp,
      patType: this.pType,
      ward: this.room
    };

    this._http.getConsultationFee(par).subscribe(data => {
      this.regFee = data.Fee;
      console.log("data**" + JSON.stringify(data));
      this.calamount();
    });
  }

  onInsuranceChange(event) {
    if (event == undefined) {
      this.insuranceCompany = null;
    } else {
      this.insuranceCompany = event.insuranceCompany;
      alert(this.insuranceCompany);
    }
  }
  roomtemp = [];

  new(basic1, data) {
    this.regId = data.vPatientRegistration[0].regId;

    this.pType = data.vPatientRegistration[0].pType;

    this.consultant = data.consultant;
    this.mobile = data.mobile;
    this.email = data.email;
    console.log(this.email);
    console.log(data.consultant);

    this.modalService
      .open(basic1, { ariaLabelledBy: "modal-basic-title", size: "lg" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  creset() {
    // alert(this.pType)
    if (this.pType == "OUTPATIENT") {
      this.room = "";
      (this.idate = ""), (this.tdate = "");
      (this.selectedBed = ""), (this.Aamount = "");
      this.eamount = "";
    }
  }

  cancelreset() {
    this.multiplePayment1[0].payType = "Cash";

    this.multiplePayment1.length = 1;
    this.values[0] = "Cash";

    // this.createTypesList()
    // let types=[]

    //   typeColumn.forEach((type) => {
    //       // if current type in array of chosen
    //       let selected = this.values.includes(type);
    //       // push current type with its status
    //       types.push(new Type(type, selected));
    //     });
    //       this.types$.next(types)
    //       this.types$
    //  this.multiplePayment1.length=1
    // this.regFee = null
    // this.Aamount = null
    this.secondrowremove();
    this.X = null;
    this.RegisterForm.reset();
    this.Tamount = null;
    this.cashamount = null;
    this.cardamount = null;
    this.dueamount = null;
    this.refAdd = null;
    this.refName = null;
    this.referenceNumber = null;
    this.refName = null;
  }
  referenceNumber: string;
  onReferralChange(event) {
    // alert(event.refName)
    if (event == undefined) {
      this.refName = null;
      this.refAdd = null;
      this.refPhone = null;
    }
    this.refnew = event.refName;
  }
  private selectedBed: string;
  noofclicks: any = 0;
  newRegister(value: any) {
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
    // this.multiplePayment1.map(
    //   sale => {
    //     if (sale.payType === 'Due') {

    //       this.multiplePayment.push({
    //         "payType": "Due",
    //         "amount": this.dueamount
    //       })
    //     }
    //   }

    // );
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
    this.noofclicks = this.noofclicks + 1;
    if (this.noofclicks > 0 && this.noofclicks == 1) {
      this.patReg = true;

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
      if (this.source == null) {
        (this.source = ""),
          (this.refName = ""),
          (this.refAdd = ""),
          (this.refPhone = 0);
      } else if (
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

      if (this.refName == null) {
        this.refName = this.refnew;
      }

      let param = {
        refName: {
          source: this.source,
          refName: this.refName,
          phone: this.refPhone,
          adr: this.refAdd
        },
        insuranceCompany: this.insuranceCompany,
        rePatientType: this.pType,
        reConsultant: this.consultant,

        roomBookingDetails: [
          {
            fromDate: this.idate,
            toDate: this.tdate,
            bedNo: this.selectedBed,
            advanceAmount: this.Aamount,
            estimateAmount: this.eamount
          }
        ],
        referenceNumber: this.referenceNumber,
        multiplePayment: this.multiplePayment,
        // "multimode": [
        //   {
        //     "mode": "Cash",
        //     "amount":this.cashamount
        //   },
        //   {
        //     "mode": "Card",
        //     "amount":this.cardamount
        //   }
        // ],
        patientPayment: [
          {
            amount: this.regfee,
            typeOfCharge: "Reg Fees"
          },
          {
            amount: +this.regFee,
            typeOfCharge: "Doctor Fee",
            modeOfPaymant: this.modeOfPayment
          }
        ]
      };

      console.log(param);

      console.log(this.umr);
      this._http.newRegisterForm(this.umr, param).subscribe(
        data => {
          this.pdf = data;
          console.log("data" + JSON.stringify(data));

          window.open(data.fileuri);
          // location.reload()
          // location.reload();
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
          this.toastr.success("Patient Enrollement  Done");
        }
      );
    } else this.patReg = true;
  }

  calamount() {
    this.Tamount =
      +(this.regFee ? this.regFee : 0) +
      +(this.Aamount ? this.Aamount : 0) +
      +(this.regfee ? this.regfee : 0);
    this.cashamount = this.Tamount;
    this.cardamount = this.Tamount;
    this.dueamount = this.Tamount;
    this.X = this.Tamount;
  }
  cashamount: any;
  cardamount: any;
  dueamount: any;
  getcashamount() {
    this.cashamount =
      (this.Tamount ? this.Tamount : 0) -
      (this.cardamount ? this.cardamount : 0);
  }

  getacardamount() {
    this.cardamount =
      (this.Tamount ? this.Tamount : 0) -
      (this.cashamount ? this.cashamount : 0);
  }

  showFloors() {
    this._http.getFloors(this.floor1).subscribe(data => {
      this.WARDS = data;
      console.log(" floor " + JSON.stringify(data));
    });
  }

  printAdmissionSlip() {
    let pregid = this.pdf.regId;

    this._http.getAdminSlip(pregid).subscribe(data => {
      console.log("data**" + JSON.stringify(data));
      window.open(data.fileuri);
    });
  }

  Patient = [];

  showOfPatients() {
    this._http.getPatient().subscribe(data => {
      this.Patient = data;
      this.regidpr = data[4].nextRegId;
      console.log(" data " + JSON.stringify(data));
    });
  }
  name1: string;
  refnew: string;
  refName: string;
  refAdd: string;
  refPhone: number;
  showRefDetails() {
    this._http.getRefDetails(this.source, this.refnew).subscribe(data => {
      this.refName = data.refName;
      this.refAdd = data.refAdd;
      this.refPhone = data.refPhone;
      console.log(" referal " + JSON.stringify(data));
    });
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
    }
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

  openReferal(referal) {
    this.modalService
      .open(referal, { ariaLabelledBy: "modal-basic-title", size: "lg" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  BEDS: any = [];
  regidpr: string;
  WARDS: any = [];
  showOfBeds() {
    this._http.getBeds().subscribe(data => {
      this.BEDS = data.floors;

      console.log((this.regidpr = data.nextRegId));
      // this.WARDS=data.wards
      console.log(" data " + JSON.stringify(data));
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
  Colors: any = [];
  floor1: string;
  availColors: any[];
  roomType: string;
  bedColor(n) {
    this.roomType = n.roomType;
    this.availColors = [];
    this._http.getRedbus(this.floor1, this.roomType).subscribe(data => {
      data.map(d => {
        if (d.status == "ALLOCATE") {
          this.availColors.push(d);
        }
      });
      this.Colors = data;
      console.log(" data " + JSON.stringify(data));
      console.log(this.Colors);
    });
  }
  temp: string;
  userdetails(consultant) {
    console.log(event);
    var searchTerm = "-";
    var indexOfFirst = consultant.indexOf(searchTerm);

    console.log(indexOfFirst);
    this.temp = consultant.substring(indexOfFirst + 1);
    console.log(this.temp);
  }

  printBlank() {
    let par = {
      consultant: this.consultant,
      umr: this.umr
    };
    let pregid = this.pdf.regId;

    this._http.postBlank(par, pregid).subscribe(data => {
      console.log("data**" + JSON.stringify(data));

      window.open(data.fileuri);
      location.reload();
    });
  }

  Patient3 = [];
  Array = [];
  getReg() {
    this._http.getRegister(this.regId1).subscribe(
      response => {
        this.PatientAll = response[1];
        this.Patient3 = response[0];
        this.insComp = response[4];
        this.Patient2 = response[3];

        console.log("Array" + JSON.stringify(response));
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }
  x: any = [];
  insComp: any = [];
  // y : any = [];
  getUmr() {
    this._http.getUmrnumber(this.umr1).subscribe(
      response => {
        this.PatientAll = response[1];
        this.Patient3 = response[0];
        // this.x = response[4];
        this.insComp = response[4];
        this.Patient2 = response[3];
        console.log("Array" + JSON.stringify(response));
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }
  getName() {
    this._http.getPatientname(this.name1).subscribe(
      response => {
        this.PatientAll = response[1];
        this.Patient3 = response[0];
        this.insComp = response[4];
        this.Patient2 = response[3];
        console.log("Array" + JSON.stringify(response));
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }
  getMob() {
    this._http.getMobilenumber(this.mobile1).subscribe(
      response => {
        this.PatientAll = response[1];
        this.Patient3 = response[0];
        this.insComp = response[4];
        this.Patient2 = response[3];
        console.log("Array" + JSON.stringify(response));
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }

  mobile1: string;
  umr1: string;
  reset() {
    this.PatientAll = [];
    this.regId1 = null;
    this.name1 = null;
    this.mobile1 = null;
    this.umr1 = null;
  }
  back() {
    // this.showAllPatients()
    this.regId1 = null;
    this.name1 = null;
    this.mobile1 = null;
    this.umr1 = null;
  }

  disable: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  due: boolean = false;
  showrow: boolean = false;
  showrow1: boolean = true;
  addMore1(event) {
    this.disable = false;
    this.showrow = true;
    this.Xamount = false;

    this.disable = false;
    this.showrow1 = false;
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = true;
        if (this.cashamount == this.Tamount) {
          this.cardamount = 0;
          this.dueamount = 0;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = true;
          if (this.cardamount == this.Tamount) {
            this.cashamount = 0;
            this.dueamount = 0;
          }
        }
      });

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Due") {
        this.due = true;
        if (this.dueamount == this.Tamount) {
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
    this.disable = true;
    this.Xamount = true;
    // this.multiplePayment1[0].amount = this.amount
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = false;
        if (this.cashamount <= this.Tamount) {
          this.cashamount = this.Tamount;
          this.cardamount = this.Tamount;
          this.dueamount = this.Tamount;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = false;
          if (this.cardamount <= this.Tamount) {
            this.cashamount = this.Tamount;
            this.cardamount = this.Tamount;
            this.dueamount = this.Tamount;
          }
        }
      }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Due") {
          this.due = false;
          if (this.dueamount <= this.Tamount) {
            this.cashamount = this.Tamount;
            this.cardamount = this.Tamount;
            this.dueamount = this.Tamount;
          }
        }
      }),
      this.multiplePayment1.splice(index, 1);
  }

  getduecardamount() {
    if (this.dueamount) {
      this.cardamount = this.Tamount - (this.dueamount ? this.dueamount : 0);
    }
  }

  getduecashamount() {
    if (this.dueamount) {
      this.cashamount = this.Tamount - (this.dueamount ? this.dueamount : 0);
    }
  }

  getcashDueamount() {
    if (this.cashamount) this.dueamount = this.Tamount - this.cashamount;
  }

  getcardDueamount() {
    if (this.cardamount) this.dueamount = this.Tamount - this.cardamount;
  }

  regfee: number;
  Xamount = true;
  X: number;
  Y: number = 0;
  amount2() {
    if (this.X > this.Tamount) {
      this.X = 0;
    }

    this.Y = this.Tamount - this.X;
  }
  amount1() {
    if (this.Y > this.Tamount) {
      this.Y = 0;
    }

    this.X = this.Tamount - this.Y;
  }
  row: boolean = true;
  secondrow() {
    this.row = false;
  }
  secondrowremove() {
    this.row = true;
    this.X = this.Tamount;
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

  getregfee(data) {
    this.umr = data.umr;
    this._http.getRegFee(this.umr).subscribe(response => {
      this.regfee = response[0].regFees;
      this.calamount();
      console.log("Array" + JSON.stringify(this.regfee));
    });
  }
}
