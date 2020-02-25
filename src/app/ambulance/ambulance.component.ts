import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { AmbulanceService } from 'src/app/ambulance/ambulance.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr'
import { ViewChild } from "@angular/core";





@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css']
})
export class AmbulanceComponent implements OnInit {
  ambulanceId:any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  disableBtn: boolean = false;
  nextAmbId: string;

  AmbulanceForm: FormGroup;
  patName: any;
  fromLocation: any;
  toLocation: any;
  mobileNo: any;
  fromTime: any;
  driverName: any;
  // ambulanceNO: string;
  formData: any;
 
  constructor(private modalService: NgbModal,private _http:AmbulanceService,private fb:FormBuilder,private router: Router,private toastr: ToastrService,) { 
    this.AmbulanceForm=fb.group({
      'patName':[null],
      'fromLocation':[null],
      'toLocation':[null],
      'mobileNo':[null],
      'fromTime':[null],
      'driverName':[null],
      'ano':[null],


    });
  //   this.loginForm = fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //     driverName:['',Validators.required]
  // });
    
  }
  ano:string
  ngOnInit() {
    this.showId()
  }


  // refresh()
  // {
  //   location.reload()
  // }
  save(value: any)  
  {
    this.disableBtn = true;
    this.submitted=true
    if (!this.AmbulanceForm.valid) {
      
      
      return;
  }


    // alert(this.ano)
    // alert("Services registered Successfully");
    // let data = input.value;
    // this.formData = input.value;
    let par = {
      "patName":this.patName,
      "fromLocation":this.fromLocation,
      "toLocation":this.toLocation,
      "mobileNo":this.mobileNo,
      "fromTime":this.fromTime,
      "driverName":this.driverName,
      "ambulanceNo":this.ano
  }
  this._http.postCreate(par)
     .subscribe(
     data => {
  //  this.ambulanceNO = data.ambulanceNO;
    console.log("data**" + JSON.stringify(data));
    
  
      },
      (err) => {
        this.toastr.error("Ambulance not  registered  ")

      },
      () => {

        this.toastr.success("Ambulance  registered  sucessfully")
        this.router.navigate(['/ambulancelist'])
      }

      );
   
  //  this.router.navigate(['/ambulancelist'])
  //  this.toastr.success("Ambulance  registered  sucessfully ")
 }
  Id=[]
  showId() {
    this._http.getId()
      .subscribe(
        response => {

          this.Id = response;
          console.log("Id" + JSON.stringify(response));
          console.log(this.Id[1].nextAmbId);
        });
  }

   reset()
  {
    this.submitted=false
    this.AmbulanceForm.reset()
  }
  // reset1(){
  //   this.loginForm.reset()
   
  //   this.submitted = false;
    
  // }

  refresh() {
   location.reload();
  }

  get f() { return this.loginForm.controls; }
  
      onSubmit() {
          this.submitted = true;
  
          // stop here if form is invalid
          if (this.loginForm.invalid) {
              return;
          }
        
  let param={
    'drivername':this.driverName
  }
  console.log(param)
      }
  
  }
 