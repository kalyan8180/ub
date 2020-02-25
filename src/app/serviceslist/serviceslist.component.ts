import { Component, OnInit } from '@angular/core';
import { ServiceslistService } from "src/app/serviceslist/serviceslist.service";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { EditService } from "src/app/serviceslist/serviceslist.model";
@Component({
  selector: 'app-serviceslist',
  templateUrl: './serviceslist.component.html',
  styleUrls: ['./serviceslist.component.css']
})
export class ServiceslistComponent implements OnInit {

List=[]
Edit:EditService[]=[]
  closeResult: string;
  // serviceName: string;
  // department:string;
  // cost:number;
  // fromDate:number;
  // tillDate:number;
  // patientType:string;
  // inHouse:string;
  ServiceForm: FormGroup;
  department:string
  dataSource: MatTableDataSource<ServiceslistComponent>;
  serviceId: any;
  constructor(private _http:ServiceslistService,private modalService: NgbModal,private fb: FormBuilder,private toastr: ToastrService, private router: Router) { 
    this.ServiceForm = fb.group({
      'serviceId':[null],
      'serviceName': [null],
      'department': [null],
      'fromDate': [null],
      'tillDate': [null],
      'inHouse': [null],
      'patientType': [null],
      'cost': [null],
     
  
  });
}

  ngOnInit() {
    this.showService()
  }
  
  serviceName:string
  serviceType:string
  open(basic,data) {

    // alert(data.serviceType)
    // this.serviceId=data.serviceId,
    // this.serviceName=data.serviceName,
    // this.department=data.department,
    // this.cost=data.cost,
    // this.fromDate=data.fromDate,
    // this.tillDate=data.tillDate,
    // this.patientType=data.patientType,
    // this.inHouse=data.inHouse,
this.department=data.department
this.serviceName=data.serviceName
this.serviceType=data.serviceType
    this._http.editdetails(data.serviceName)
    .subscribe(
    response => {
      this.Edit=[]
      response.map(item => { 
      
        let details: EditService=new EditService();
       details.serviceId=item.serviceId
       details.serviceName=item.serviceName
       details.patientType=item.patientType
       details.cost=item.cost
       details.department=item.department
       details.roomtype=item.roomtype
      this.Edit.push(details);
    //  console.log(details)
    //  console.log("editarray55555" +  this.Edit)
     });
      // console.log("edit7777777777" + JSON.stringify(response));
    
    },);
   
    
    this.modalService.open(basic, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
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
      return `with: ${reason}`;
    }


  }
  p: number = 1;

  showService()
  {
    this._http.getServices()
    .subscribe(
    response => {
      
  this.List=response;
  
      console.log("List" + JSON.stringify(response));
    
    },);
  }
  // Array=[]
  // editService(data)
  // {

  //   this._http.editdetails(data.serviceName)
  //   .subscribe(
  //   response => {
     
  //     response.map(item => { 
    
  //       let details:EditService = new EditService();
  //      details.serviceId=item.serviceId
  //      details.serviceName=item.serviceName
  //      details.patientType=item.patientType
  //      details.cost=item.cost
  //      details.department=item.department
  //      details.roomtype=item.roomtype
  //     this.Edit.push(details);
     
     
  //    });
  //     console.log("edit" + JSON.stringify(response));
    
  //   },);
  //  }


  
  save(value:any){
    let param={
    "serviceName":this.serviceName,
    "department":this.department,
    "serviceType":this.serviceType,
    "addService":this.Edit
  
    }
    this._http.edit(this.serviceName,param)
      .subscribe(
      data => {
      
        console.log("serviceslist" + JSON.stringify(data));

      },


      (err)=>{
        this.toastr.error(err['error']?err['error'].message:'Error Occured!');
        },
            
        
        ()=>{

              this.toastr.success("services updated")
             location.reload()
             }
    );

     

  }
//   reset()
//  {
//    this.ServiceForm.reset()
 
//   }
  // refresh() {
  //   location.reload();
  // }


  now: Date=new Date();

  minDate :NgbDateStruct = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
  maxDate :NgbDateStruct={year: this.now.getFullYear()+1, month: this.now.getMonth()+1, day: this.now.getDate()}
}