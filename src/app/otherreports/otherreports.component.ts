import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr'
import { Service, Nikhil, } from "./otherreports.model";
import { Patient } from "./otherreports.model";
import { FormGroup } from "@angular/forms";
import { LabService } from "src/app/lab/lab.service";
import { OtherreportsService } from 'src/app/otherreports/otherreports.service';



@Component({
  selector: 'app-otherreports',
  templateUrl: './otherreports.component.html',
  styleUrls: ['./otherreports.component.css']
})
export class OtherreportsComponent implements OnInit {

closeResult: string;
  Register:Service[] = [];
  hello: Nikhil;
    constructor(private _http: OtherreportsService,private modalService: NgbModal,private toastr: ToastrService) {
    
          
          this.hello = new Nikhil();
        }
  
        onMedicineChange(event, ser) { 
          if(event==undefined)
            {
              ser.amount =null
              ser.netAmount =null
              ser.discount =null
            }
          ser.chargeName = event.serviceName;
         
        }
Lab=[];
serviceName:string
serviceId:string
discount:number
  ngOnInit() {
   
    this.showLabServices()
   
  }



showLabServices()
{
  this._http.getServices()
  .subscribe(
  response => {
  
this.Lab=response
console.log(this.Lab)
    console.log("services" + JSON.stringify(response));

  },);
}

addMore(event) { 
  this.Register.push(new Service());      
}


Price=[]

regid:string
paymentType:string
Cost=[];
show(ser)
{
  this.Lab.map(lab => { 
  this.Register.map(ser => {
  
    if(lab.serviceName == ser.chargeName) { 
      lab['disabled'] = true;
    } else { 
      lab['disabled'] = false;
    }
    });
  });
  this._http.getCost(ser.chargeName,this.hello.regid)
  .subscribe(
    response=>{

 ser.amount= +(response.cost)
 console.log(ser.amount)
  },
(err)=>{
  // this.toastr.error("Only For OUTPATIENT")
}
);
 
}

patient: Patient = new Patient();
save(value:any,)
{

  let param=
  {
    
   
	 "regId":this.hello.regid,

   "paymentType":this.paymentType,
   "refBillDetails":  this.Register,

  //  "chargeName":this.serviceName,
  //  "amount":this.ser.amount,
  //  "discount":this.ser.discount,
  //  "netAmount":this.serviceName,


// this.Register
}

  

  this._http.postCreate(param)
  .subscribe(
  data => {

    console.log("data**" + JSON.stringify(data));
     window.open(data.fileuri);
    
        location.reload(); 

   },
  
   (err) => {
    
          this.toastr.error(err['error']?err['error'].message:'Error Occured!');
                 
            console.log(err.error)
                  },
            () =>{
              this.toastr.success("bill  generated sucessfully");
            

         
            }
  );

  }


  reset() { 
    this.hello = new Nikhil();
   this.patient =new Patient();
    this.Register = []; 
    this.Register[0] = new Service();
   }
   
  type:string

cost:any
 
   private getDismissReason(reason: any): string {
   
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
 
     
   }
 

  //  showPdf(regid,invoice)
  //  {
  //    alert(this.invoice)
  //    this._http.getInvoice(this.regid,this.invoice)
  //    .subscribe(
  //   data => {
  //     window.open(data.fileuri);
      
  //        location.reload();
  //      console.log("data" + JSON.stringify(data));
    
  //    },
 
     
  //   );
  
    
  //  }
   Medicine=[]
// hai(i)
// {
//    this.Medicine.push( { "serviceName":this.serviceName,
//    "discount":+(this.Lab[i].discount),
//    })

//    console.log(this.Medicine)
//   }



 
  removeSaleItem(index) { 
    let reg = this.Register[index];
    this.Lab.map(lab => { 
      if(lab.serviceName == reg.chargeName) { 
        lab['disabled'] = false;
      }
    });
    this.Register.splice(index, 1);    
  }

  findPatient(event) { 
    this._http.getPatient(this.hello.regid).subscribe( user => { 
      this.patient.name = user.name;
      this.patient.type = user.type;
      this.Register[0] = new Service();
    }, 
    );
  }


  calcAmount(ser) { 
    ser.netAmount = ser.amount-(ser.discount);
    
  }


private total = 0;
  open1(basic) {
    this.total = 0;
    this.Register = this.Register.filter(sale => Object.keys(sale).length !== 0);
    this.Register.map(reg => this.total = this.total + reg.netAmount);

     this.modalService.open(basic, {ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
 
  
   open2(basic2) {
   

     this.modalService.open(basic2, {ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
 
  
}