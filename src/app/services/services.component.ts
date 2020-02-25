import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "src/app/registration/register.service";
import { FormBuilder } from "@angular/forms";
import { ServicesService } from "src/app/services/services.service";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Addservice, servicesList } from "src/app/services/services.model";
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from "@angular/router";
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServicesComponent implements OnInit {
  closeResult: string;
  Service = [];
  ServiceForm: FormGroup
  serviceId: string;
  serviceName: string;
  department: string;
  cost: number;
  fromDate: number;
  tillDate: number;
  patientType: string;
  inHouse: string;
  serviceType:string;
  specimenType:string

  services: Addservice[] = [];
  constructor(private router: Router, private fb:FormBuilder, private _http:ServicesService, private modalService: NgbModal,private toastr: ToastrService) { 
    // this.router.routeReuseStrategy.shouldReuseRoute = function(){
    //   return false;
    // }

    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //      // trick the Router into believing it's last link wasn't previously loaded
    //      this.router.navigated = false;         
    //      // if you need to scroll back to top, here is the right place
    //      window.scrollTo(0, 0);
    //   }
    // });
    //this.services[0] = new Addservice();  
    this.ServiceForm= fb.group({
      'serviceName':[null, [Validators.required, Validators.minLength(1),Validators.maxLength(50)]],
      'department':[null,Validators.required],
      // 'cost':[null, Validators.pattern(/^-?(0|[0-9]\d*)?$/)],
      'fromDate':[null],
      'tillDate':[null],
      // 'patientType':[null,Validators.required],
      'inHouse':[null,Validators.required],
      'serviceType':[null],
  'specimenType':[null]
      
    })
  }

  ngOnInit() {
    this.showService()
    this.showId()
 
    this.serachlist()
  }
  availableServices:string[] = [];

  checkDuplicate(sname) { 
  
 
    if(this.availableServices.indexOf(sname) >= 0) {
      // toast messsage
      this.toastr.error("service already added")
      this.serviceName = null;
    }
  }
  allPriceFilled: boolean = false;

  validateCharges() { 
    if(this.services) {
      this.allPriceFilled = this.services.filter(s => { 
        if(parseInt(''+s.cost) != NaN && parseInt(''+s.cost) >=0)
          return true;
        else 
          return false;
      }
      ).length == this.services.length;
    }
    if(!this.allPriceFilled) {
      this.toastr.error("Please enter valid cost for all fields!")
    }
  }

  pTypeId:string
  save(value: any)
  {

    //this.services = this.services.filter(sale => Object.keys(sale).length !== 0);
    if(this.services.length == 0) {
      this.toastr.error("services charges not added!");
      return;
    }
    // alert("Service Created Successfully");
    let par = {
      "serviceName":this.serviceName,
      "department":this.department,
      // "cost":this.cost,
      "fromDate":this.fromDate,
      "tillDate":this.tillDate,
      // "patientType":this.patientType,
      "inHouse":this.inHouse,
      "specimenType":this.specimenType,
      "serviceType":this.serviceType,
      addService:this.services
  }
  this._http.postCreate(par)
     .subscribe(
     data => {
   
    console.log("data**" + JSON.stringify(data));
    
  
      },
(err)=>{
this.toastr.error("services not added")
},
     ()=>{
      this.toastr.success("services added")
      location.reload()
     }
   );
   
  
  //  this._http.edit(this.serviceId,par)
  //  .subscribe(
  //  data => {

  //    console.log("edit****" + JSON.stringify(data));

  //    location.reload();
  //  },


  //  );


 }
 

 serachlist()
 {
   this._http.getserviceslist()
   .subscribe(
     resposne=>{
       this.availableServices=resposne.serviceName
     }
   )
 }
 showService()
 {
   this._http.getService()
   .subscribe(
   response => {
     
 this.Service=response;
 console.log(this.Service);

     console.log("service" + JSON.stringify(response));
   
   },);
 }


 /* 
 addMore(event) { 
 
  this.services.push( new Addservice());  

}
*/


removeSaleItem(index) { 
     
  this.services.splice(index, 1);        
}

 open(basic) {
      if(this.services.length == 0) {
       let index = 0;
        this.patientTypes.forEach((p) => { 
          if(p === 'INPATIENT') {
            this.roomTypes.forEach(r => {
              this.services[index] = new Addservice(p, r, 0,this.serviceType);
              index ++;
            });
          } else if(p === 'OUTPATIENT') {
            this.services[index] = new Addservice(p, 'NA', 0,this.serviceType);
            index ++;
          } else if(p === 'OSP') {
            this.services[index] = new Addservice(p, 'NA', 0,this.serviceType);
            index ++;
          }        
        });
      }
      this.modalService.open(basic, { ariaLabelledBy: 'modal-basic-title',size:'lg',backdrop: 'static', keyboard: false }).result.then((result) => {
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
Id: any;
roomTypes: string[] = [];
patientTypes: string[] = [];

 showId()
 {
   this._http.getId()
   .subscribe(
   response => {
     
 this.Id=response.srvicreId;
 this.roomTypes = response.roomType;
 this.patientTypes = response.patientType;

     console.log("service" + JSON.stringify(response));
    

   },);
 }
 reset()
 {
   this.ServiceForm.reset()
 }
//  refresh() {
//   location.reload();
// }

 }


 

