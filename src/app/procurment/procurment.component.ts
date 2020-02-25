import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ProcurmentService } from "src/app/procurment/procurment.service";
import { Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
// import { Router } from "@angular/router";
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Details } from "src/app/procurment/procurment.model";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-procurment',
  templateUrl: './procurment.component.html',
  styleUrls: ['./procurment.component.css']
})
export class ProcurmentComponent implements OnInit {
  closeResult: string;
  maxDate = new Date();
  public loading = false;
ProForm:FormGroup
ProForm1:FormGroup
Proc=[]
mstr_procurement_id:string
date_of_procurement=new Date()
// date_of_procurement:string
status:string="Not Approved"
VendorName:string
procurement_type:string
po_num:string

currency:string="INR"
Amount:number
cost:number
mrp:number
samples:string
quantity:any
expdate:any;
date:any;
batchno:string
medicinename:string
location:string="Miyapur"
gst:number
detail: Details[] = [];
minDate = new Date();
  constructor(private fb:FormBuilder,private _http:ProcurmentService,private modalService: NgbModal,private toastr: ToastrService,private router:Router,private spinner: NgxSpinnerService) { 


  //   this.router.events.subscribe((evt) => {
  //     this.router.routeReuseStrategy.shouldReuseRoute = function (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
  //       if (future.url.toString() === 'user' && curr.url.toString() === future.url.toString()) {
  //         return false;
  //       }
  //       return (future.routeConfig === curr.routeConfig);
  //     };
    
  // });
  this.detail[0] = new Details()

    this.ProForm= fb.group({
      

     
        
  
        'mstr_procurement_id':[null],
        'date_of_procurement':[null],
        'status':[null],
        'VendorName':[null],
        'procurement_type':[null],
        'po_num':[null],
        'in_num':[null],
        'currency':[null],
        'Amount':[null],
  
   
        'expdate':[null],
        'date':[null],
   
        'medicinename':[null,Validators.pattern('[a-zA-Z ]*')],
        'location':[null,[Validators.required]],
  
          })
         
       this.ProForm1=fb.group(
{
  'name':[null],
  'itemLevel':[null],
  'batchNo':[null],
  'manufacturer':[null],
  'vendorPackage':[null],
  'brand':[null],
  'drugType':[null],
  'strengthUnits':[null],
  'saleUnits':[null],
  'minPurchaseQuantity':[null],
  'maxPurchaseQuantity':[null],
  'quantityPerDay':[null],
 

}

         
       )
  }
  minPurchaseQuantity: any;
  maxPurchaseQuantity: any;
  quantityPerDay: any;
  saleUnits: any;
  brand: any;
  drugType: any;
  strengthUnits: any;
  vendorPackage: any;
  manufacturer: any;
  batchNo: any;
  itemLevel: any;
  draft1:string="NO"
  draft:string="YES"
  in_num:number
  discount:number
  ngOnInit() {
    this.showProc()
    this.showid()
    this.showAll()
  }
 
today = new Date();


private getDismissReason(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }

    
  }

   discountvaluee:number=0
  discountvalue:number=0
  gsttotalAmount:number=0
  gsttotal:number=0
  totalround:number=0
  totalnodis=0
  rounddis:number=0
open(basic) {
  this.totalAmount=0
  this.totalround=0
  this.totalnodis=0
  this.rounddis=0
  this.detail.map(reg => this.totalnodis = (this.totalnodis?this.totalnodis:0) + (reg.netAmount1?reg.netAmount1:0));
  this.detail.map(reg => this.totalAmount = this.totalAmount + reg.netAmount);
 
  this.totalround=Math.round(this.totalAmount)
  this.rounddis=Math.round(this.totalnodis)
  this.discountvalue=0
  this.discountvaluee=0
  this.detail.map(reg => this.discountvalue = this.discountvalue+(reg.discountf ? reg.discountf:0));
  
  this.discountvaluee=Math.round(this.discountvalue)
  this.gsttotalAmount=0
  this.gsttotal=0
  this.detail.map(reg => this.gsttotalAmount = this.gsttotalAmount+(reg.totalgst?reg.totalgst:0));
  
  this.gsttotal=Math.round(this.gsttotalAmount)
 
   this.modalService.open(basic, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false , size: 'lg' }).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }

 open1(basic1) {
  
   this.modalService.open(basic1, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false , size: 'lg' }).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }
 MedicineDetails=[];
 showLink(item) {
   let param = {
     medicineName: item.itemName
   };
   this._http.postLink(param).subscribe(response => {
     this.MedicineDetails = response;
   });
 }

 open2(content) {
   this.modalService

     .open(content, {
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
       //   .result.then(function(){
       //     //Call function to reload the list
       // }
     );
 }
 showAll() {
this.spinner.show()
  this._http.getAllMed()
    .subscribe(
      data => {
      this.spinner.hide()
        console.log("all data" + JSON.stringify(data));

      });


}

  save(value: any)

  {
  
    this.detail = this.detail.filter(sale => Object.keys(sale).length !== 0);
   let param = {
    
      "vendorName":this.VendorName,
      "location":this.location,
      "invoiceNo":this.in_num,
      "poNo":this.po_num,
      "draft":this.draft1,
			"currency":this.currency,
        "procurementType":this.procurement_type,
       
      "refMedicineDetails":
             this.detail
       
    }
    
console.log(this.medicinename)
   this._http.postCreate(param)
     .subscribe(
     data => {
       console.log("data**" + JSON.stringify(data));
    
    
       window.open(data.fileuri);
       
           
      
      },

      (err) => {
       
             this.toastr.error(err['error']?err['error'].message:'Error Occured!');
                    
               console.log(err.error)
                     },
               () =>{
                 this.toastr.success("added in to procurement");
                 location.reload();
                // this.router.navigate(['/grn'])

      
               }
   );

   

// this.toastr.success("added in to procurement")
// location.reload()
// this.router.navigate(['/proclist'])

 }



 save1(value: any)
 
   {
   
     this.detail = this.detail.filter(sale => Object.keys(sale).length !== 0);
    let param = {
     
       "vendorName":this.VendorName,
       "location":this.location,
       "invoiceNo":this.in_num,
       "poNo":this.po_num,
       "draft":this.draft,
       "currency":this.currency,
         "procurementType":this.procurement_type,
        
       "refMedicineDetails":
              this.detail
        
     }
     
 console.log(this.medicinename)
    this._http.postCreate(param)
      .subscribe(
      data => {
        console.log("data**" + JSON.stringify(data));
     
       
       },
 
       (err) => {
        
              this.toastr.error(err['error']?err['error'].message:'Error Occured!');
                     
                console.log(err.error)
                      },
                () =>{
                  this.toastr.success("save as draft");
                  //  location.reload();
 
       
                }
    );
 
    
 
 // this.toastr.success("added in to procurement")
 // location.reload()
 // this.router.navigate(['/proclist'])
 
  }
 manf:string
send(i,data)
{
  this.name=data.name
  this._http.getManf(data.name)
  .subscribe(
  response => {

 
  
    // this.batch.set(i,response.Batch);
    // this.manfacturer.set(i ,response.Manufacturer);
  
  
   console.log("Manf" + JSON.stringify(response));
   
    
 console.log("mmm" + response)

  },);
}

addMore(event) { 

  this.detail.push( new Details());      
}

removeSaleItem(index) { 
  
    
  this.detail.splice(index, 1);        
}
onMedicineChange(event, item) { 

  // if(event==undefined)
  //   {
  //     item.mrp=null;
  //      item.costPrice=null;
   
  //     item.quantity=null
  //     item.freeSample=null
  //     item.batch=null;
  //     item.discount=null
  //  this.totalround=0
      
  //     item.expDate=null
  //     item.gst=null
  
  //   }
  item.itemName = event.name;
}


totalAmount=0

  calcAmount(item) { 
    // ser.total = ser.price-ser.price*(ser.discount || 0)/100;
    
    item['netAmount'] = item.quantity*item.costPrice;
    item['discountf'] =item['netAmount']*(item.discount)/100.0;
    item['netAmount2']= item['netAmount']-item['discountf'];
    item['totalgst'] = item['netAmount2']*(item.gst)/100.0;
    item['netAmount1']= (item.quantity*item.costPrice);
    if(item.discount)
    item['netAmount'] -= item['netAmount']*(item.discount)/100.0;

    if(item.gst)
    item['netAmount'] += item['netAmount']*(item.gst)/100.0;
   
  //  this.totalAmount=item['netAmount']

  }

 showProc()
 {
this.spinner.show()
   this._http.getProc()  
   .subscribe(
   response => {
 this.spinner.hide()
 this.Proc=response;

     console.log("medicine" + JSON.stringify(response));

   },);
 }
reset () 
    {
      this.ProForm.reset();
      this.detail = []; 
      this.detail[0] = new Details()
    }

   name:string  

   Id=[]
   showid()
   {
    
     this._http.getId()  
     .subscribe(
     response => {
     
   this.Id=response;
  
       console.log("medicine" + JSON.stringify(response));
 
     },);
   }
   

   showdrafdetails()
   {
    
     this._http.getDraftDetails(this.in_num)  
     .subscribe(
     response => {
       if(response.length > 0) {
        this.detail = [];
      let cardData = response[0];
      this.VendorName = cardData.vendorName;
      this.procurement_type = cardData.procurementType;
      if(this.procurement_type == 'With PO')
        this.po_num = cardData.poNo;
      this.currency = cardData.currency;
      
      this.date_of_procurement = cardData.dateOfProcurement;
      response.map(item => { 
      
        let draftdetails:Details = new Details();      
        draftdetails.mrp=item.mrp
        draftdetails.costPrice=item.costPrice     
        draftdetails.quantity=item.quantity;
        draftdetails.freeSample=item.freeSample;
        draftdetails.batch=item.batch
        draftdetails.discount=item.discount
        draftdetails.itemName=item.itemName
        draftdetails.manufacturedDate=item.manufacturedDate
        draftdetails.expDate=item.expDate
        draftdetails.gst=item.gst
        draftdetails.gst=item.gst
        draftdetails.totalgst=item.totalgst
        draftdetails.discountf=item.discountf
        draftdetails.packSize=item.packSize
        this.calcAmount(draftdetails);
        this.detail.push(draftdetails);      
       });
      }
  },);
   }
   
  saveas(value: any)
  
    {
     
    
     let param = {
      
        "name":this.name,
        "batchNo":this.batchNo,
        "itemLevel":this.itemLevel,
        "manufacturer":this.manufacturer,
        "vendorPackage":this.vendorPackage,
          "brand":this.brand,
          "drugType":this.drugType,
          "strengthUnits":this.strengthUnits,
          "saleUnits":this.saleUnits,
          "quantityPerDay":this.quantityPerDay,
          "minPurchaseQuantity":this.minPurchaseQuantity,
            "maxPurchaseQuantity":this.maxPurchaseQuantity,
        
          
         
      }
      
  console.log()
     this._http.post(param)
       .subscribe(
       data => {
         console.log("data**" + JSON.stringify(data));
        // location.reload();
        this.ProForm1.reset()
        this.showid()
        this.showProc()
        this.showAll()
        },
  

        (err) => {
          
                this.toastr.error(err['error']?err['error'].message:'Error Occured!');
                       
                  console.log(err.error)
                        },
                  () =>{
                    this.toastr.success("medicine added sucessfully");
                  
   
               
                  }
     );
  
   }

//    keytab(event){
//     let element = event.srcElement.nextElementSibling; // get the sibling element

//     if(element == null)  // check if its null
//         return;
//     else
//         element.focus();   // focus if not null
// }
}

 
