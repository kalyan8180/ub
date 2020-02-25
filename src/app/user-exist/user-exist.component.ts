import { Component, OnInit, ViewChild } from "@angular/core";
import { UserExistService } from "src/app/user-exist/user-exist.service";
import { Router } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Pipe, PipeTransform } from "@angular/core";
import { Validators } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-user-exist",
  templateUrl: "./user-exist.component.html",
  styleUrls: ["./user-exist.component.css"],
  providers: [UserExistService]
})
export class UserExistComponent implements OnInit {
  // @ViewChild(MatSort) MatSort: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // dataSources;
  // displayedColumns = ['userid','fullname','role','restpwd'];
  checkConfirmPass(pass) {
    this.match = pass;
  }

  public loading = false;
  key: string;
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  a: boolean = false;
  User = [];
  type = "text";
  match: string;
  hintans2: string;
  hint2: string;
  hintans1: string;
  hint1: string;
  confirmTxnpassword: string;
  txnpassword: string;
  confirmPassword: string;
  qualification: string;
  password: string;
  middleName: string;
  closeResult: string;
  Alluser: any = [];
  UserExist: FormGroup;
  UserExist1: FormGroup;
  password1: string;
  confirmPassword1: string;
  dataSource: MatTableDataSource<UserExistComponent>;
  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private _http: UserExistService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    // const users: UserExistComponent[] = [];
    // for (let i = 1; i <= 100; i++)

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
    this.UserExist1 = fb1.group({
      password1: [null],
      confirmPassword1: [null]
    });
    this.UserExist = fb.group({
      userId: [null],
      firstName: [null],
      middleName: [null],
      lastName: [null],
      userName: [null],
      role: [null],
      refName: [null],
      location: [null],
      email: [
        null,
        Validators.pattern("^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$")
      ],
      personalContactNumber: [null],
      workContactNumber: [null],
      description: [null],
      hintans2: [null],

      hint2: [null],
      hintans1: [null],
      hint1: [null],
      confirmTxnpassword: [null],
      txnpassword: [null],
      confirmPassword: [null],

      password: [null],

      department: [null],
      specialization: [null],
      qualification: [null]
    });
  }
  userId: any;
  firstName: string;
  lastName: string;
  role: string;
  location: string;
  email: string;
  userName: string;
  refName: string;
  personalContactNumber: any;
  workContactNumber: any;
  description: string;
  pin: any;
  department: string;
  specialization: string;
  // qualification:string
  ngOnInit() {
    this.showAll();
    // this.dataSource.sort=this.sort;
  }

  open(basic, data) {
    // alert(data.specUserJoin[0].docSpec.specName)

    this.userId = data.userId;
    this.firstName = data.firstName;
    this.middleName = data.middleName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.location = data.location;
    this.email = data.email;
    this.userName = data.userName;
    this.personalContactNumber = data.personalContactNumber;
    this.workContactNumber = data.workContactNumber;
    this.refName = data.refName;
    this.password = data.passwordStuff.password;
    this.confirmPassword = data.passwordStuff.confirmPassword;
    this.txnpassword = data.passwordStuff.txnPassword;
    this.confirmTxnpassword = data.passwordStuff.confirmTxnPassword;
    this.hint1 = data.passwordStuff.hintQuestion1;
    this.hint2 = data.passwordStuff.hintQuestion2;
    this.hintans1 = data.passwordStuff.hintAnswer1;
    this.hintans2 = data.passwordStuff.hintAnswer2;
    this.pin = data.pin;
    this.description = data.description;
    if (data.doctorDetails != null) {
      this.qualification = data.doctorDetails.qualification;
      this.specialization = data.doctorDetails.specilization;
    }
    //  specUserJoin►0►docSpec►specName
    //  if(data.specialization!=null)
    //   {
    //     this.specialization = data.doctorDetails.specilization

    //   }

    // if(data.specUserJoin[0]!=null)
    //   {
    //     this.specialization=data.specUserJoin[0].docSpec.specName
    //   }
    console.log("test" + this.specialization);
    this.department = data.department;
    this.modalService
      .open(basic, {
        ariaLabelledBy: "modal-basic-title",
        backdrop: "static",
        keyboard: false,
        size: "lg"
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

  // specialization:string
  showAll() {
    this.spinner.show();
    this._http.getAllUsers().subscribe(data => {
      this.spinner.hide();
      this.Alluser = data;
      console.log("all data" + JSON.stringify(data));
    });
  }

  submitForm(value: any) {
    //alert("hi")
    // alert(this.Temp)
    // if(this.role==='ADMIN')
    //   {
    //     this.Temp=[]
    //   }

    let param = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      personalContactNumber: this.personalContactNumber,
      workContactNumber: this.workContactNumber,
      userName: this.userName,
      pin: this.pin,
      department: this.department,
      email: this.email,
      refName: this.refName,
      location: this.location,
      description: this.description,
      roleName: this.role,
      passwordStuff: {
        password: this.password,
        confirmPassword: this.confirmPassword,
        txnPassword: this.txnpassword,
        confirmTxnPassword: this.confirmTxnpassword,
        hintQuestion1: this.hint1,
        hintAnswer1: this.hintans1,
        hintQuestion2: this.hint2,
        hintAnswer2: this.hintans2
      },

      doctorDetails: {
        specilization: this.specialization,
        qualification: this.qualification
      }

      // "doctorSpecialization": [{'spec':this.specialization}]
    };

    console.log(this.password);

    this._http.edit(this.userId, param).subscribe(
      data => {
        console.log("edit****" + JSON.stringify(data));
      },
      err => {
        this.toastr.error("user data not  updated");
      },
      () => {
        this.toastr.success("user data updated");
        //  location.reload()
        this.showAll();
      }
    );
  }

  submitForm2(value: any) {
    //alert("hi")
    if (this.role === "ADMIN") {
      this.Temp = [];
    }
    let param = {
      userId: this.userId,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      personalContactNumber: this.personalContactNumber,
      workContactNumber: this.workContactNumber,
      userName: this.userName,
      pin: this.pin,
      department: this.department,
      email: this.email,
      refName: this.refName,
      location: this.location,
      description: this.description,
      roleName: this.role,
      passwordStuff: {
        password: this.password1,
        confirmPassword: this.confirmPassword1,
        txnPassword: this.txnpassword,
        confirmTxnPassword: this.confirmTxnpassword,
        hintQuestion1: this.hint1,
        hintAnswer1: this.hintans1,
        hintQuestion2: this.hint2,
        hintAnswer2: this.hintans2
      },
      doctorDetails: {
        specilization: this.specialization,
        qualification: this.qualification
      }

      //       "doctorSpecialization":
      //  this.Temp
    };

    console.log(this.password1);
    console.log(this.confirmPassword1);

    this._http.edit(this.userId, param).subscribe(
      data => {
        console.log("password****" + JSON.stringify(data));
      },
      err => {
        this.toastr.error("password not  updated");
      },
      () => {
        this.toastr.success("password updated");
        location.reload();
      }
    );
  }

  inActive(data) {
    this._http.getUser(data.userId).subscribe(data => {
      console.log("data" + JSON.stringify(data));
    });
    this.toastr.success("Deactivated successfully");
  }

  Active(data) {
    this._http.putUser(data.userId).subscribe(data => {
      console.log("data" + JSON.stringify(data));
    });
    this.toastr.success("Activated successfully");
  }
  p: number = 1;
  onEdit(basic1, data) {
    console.log(this.password);
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.middleName = data.middleName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.location = data.location;
    this.email = data.email;
    this.userName = data.userName;
    this.personalContactNumber = data.personalContactNumber;
    this.workContactNumber = data.workContactNumber;
    this.refName = data.refName;
    // this.password=data.passwordStuff.password
    // this.confirmPassword=data.passwordStuff.confirmPassword;
    this.txnpassword = data.passwordStuff.txnPassword;
    this.confirmTxnpassword = data.passwordStuff.confirmTxnPassword;
    this.hint1 = data.passwordStuff.hintQuestion1;
    this.hint2 = data.passwordStuff.hintQuestion2;
    this.hintans1 = data.passwordStuff.hintAnswer1;
    this.hintans2 = data.passwordStuff.hintAnswer2;
    this.pin = data.pin;
    this.description = data.description;
    this.specialization = data.specialization;
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

  // refresh()
  // {
  //   location.reload()
  // }

  resetpassword() {
    this.UserExist1.reset();
  }

  getColor(status) {
    switch (status) {
      case "ACTIVE":
        return "green";
      case "INACTIVE":
        return "blue";
    }
  }
  Temp: any = [{}];

  // Temp=[{"spec":this.specialization}]
  push() {
    //  if(this.specialization!=null)
    //   {
    //     this.Temp.push({"spec":this.specialization})
    //   }
    //   if(this.specialization==null){
    //     this.Temp=[]
    //     this.Temp.push({"spec":this.specialization})
    //   }
    //this.Temp=[{}]
    this.Temp[0] = { spec: this.specialization };
    console.log(this.Temp);
  }

  // reset()
  // {
  //   this.UserExist1.reset()
  // }
}
