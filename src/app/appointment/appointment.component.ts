import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { AppointmentService } from "src/app/appointment/appointment.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  DoctorForm : FormGroup;
  Appointmentid:string;
  toTime:string;
  patientName:string;
  Dr:string;
  ad:string;
  fromTime:string;
  doctor:string;
  date:string;
  slot:string;
  datapicker:string;
  doctorName:string;

  // specialization:string;
  specilization:string;
  Doctor=[];
  loading: boolean;
  closeResult: string;
  slott:string
  shift: any;
  MNo:any;
  email:string;
  
  constructor(private fb:FormBuilder,private router: Router,private _http:AppointmentService,private modalService: NgbModal,private toastr: ToastrService) {
  
    this.DoctorForm=fb.group({
      'doctor':[null],
      'date':[null],
      'slot':[null],
   // 'Dr':new FormCo 'date':[null],
      'doctorName':[null],
      'specilization':[null],
     
      'patientName':[null],
      'fromTime':[null],
      'toTime':[null],
      'slott':[null],
      'MNo':[null],
      'email':[null],
    })
   }
  
  ngOnInit() {
    // this.showId()
    this.showData()
  
  }

   Id:any=[]
  showId() {
  this._http. getDoctors(this.specilization)
   .subscribe(
       
        response => {
        
    
          this.Id = response;
          

          console.log("Id" + JSON.stringify(response));
        //  console.log(this.Id[1].specilization);
          
       });
 }
  App=[]
  showData(){
    this._http.getApp()
      .subscribe(
        response => {

          this.App = response;
          console.log("App" + JSON.stringify(response));
           console.log(this.App[0].nextAppointmentId);
           let Data=this.App[0].nextAppointmentId
        });
  }
 


 
 
   save(value: any)
  
   {

    if(!this.DoctorForm.valid){

      console.log(20)
      return;
      
    
      
    }
    let par = {
      "doctorName":this.doctor,
      "appointmentDate":this.date,
      "shift":this.slot,
     }
     this._http.postCreate(par)
.subscribe(
 data => {

this.Doctor=data
    console.log(this.Doctor)
      console.log("data**" + JSON.stringify(data));
       },
     );
  }
  status:any
  getColor(status) { 
    switch (status) {
      case 'NOT-ALLOCATED':
        return 'green';
        case 'ALLOCATED':
        return 'red';
     
    }
  }
  open(basic,data) {
    this.doctorName = data.doctorName;
    this.date = data.date;
    this.slott= data.shift;
   
    this.fromTime=data.fromTime
    this.toTime=data.toTime
    this.modalService.open(basic, {ariaLabelledBy: 'modal-basic-title',size:"lg"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  submitForm(value: any)
 {
      let param = {
        "patientName":this.patientName,
        "doctorName":this.Doctor[1][0].doctorName,
        "shift":this.slot,
        "appiointmentDate":this.Doctor[1][0].date,
        "fromTime":this.fromTime,
        "toTime":this.toTime,
        "appointmentId":this.App[0].nextAppointmentId,
        "mobileNo":this.MNo,
        "email":this.email,
      }
      console.log(param)
        this._http.postSave(param)
        .subscribe(
         data => {
        
         
            
              console.log("data**" + JSON.stringify(data));
               },
              
              );
              this.router.navigate(['/appointmentlist'])
              this.toastr.success("Appointment  registered  sucessfully ")
          }
          reset()
          {
            this.DoctorForm.reset()
          }
          refresh() {
            location.reload();
           }

}