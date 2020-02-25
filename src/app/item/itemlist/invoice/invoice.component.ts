import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { InvoiceService } from "src/app/item/itemlist/invoice/invoice.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  dueAmount: number;
  closeResult: string;
Invoice=[];
invoice:string;
cost:number
location:string
paid_amount:number
payment:string
balanceAmount:number
InvoiceForm:FormGroup
procurementId:string
  constructor(private modalService: NgbModal,private _http:InvoiceService,private fb:FormBuilder,private toastr: ToastrService) {

    this.InvoiceForm= fb.group({
      
          'invoice': [null],
         'cost':[null],
         'paid_amount':[null],
         'location':[null],
         'payment':[null]
         
        });

        this.InvoiceForm.get('paid_amount').valueChanges.subscribe(val => { 
            if(val) { 
              this.dueAmount = this.cost - parseFloat(val);
            }
        });
        
      }
   

  ngOnInit() {
    this.showProc()
  }


  open(basic,data) {
    this.invoice=data.invoice;
    this.cost=data.cost;
    this.paid_amount=data.cost - data.paid_amount;
    this.dueAmount=data.dueAmount;
    this.procurementId=data.procurementId;
    console.log(this.invoice)
    console.log(this.dueAmount)
     this.modalService.open(basic, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
 
   showProc()
   {
     this._http.getProc()
     .subscribe(
      data => {
         
         this.Invoice=data;
         console.log("invoice data" + JSON.stringify(data));
      
       },);
   }
save(value:any)
{

  let param = 
    {
      "location":this.location,
     "balanceAmount":this.cost,
      "paid_amount":this.paid_amount
      
    }
            
          

     console.log(param)

console.log(this.procurementId)
    this._http.postCreate(this.procurementId,param)
      .subscribe(
      data => {

        console.log("invoice payment" + JSON.stringify(data));
       
      },

    );
    this.toastr.success("paid sucessfully")
location.reload()
}

}
