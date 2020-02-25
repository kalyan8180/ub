import { Component, OnInit } from '@angular/core';
import { WardonlineService } from "src/app/wardonline/wardonline.service";
import { SaleDetail, NewSale } from "src/app/wardonline/wardonline.model";
import { ToastrService } from 'ngx-toastr'

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-wardonline',
  templateUrl: './wardonline.component.html',
  styleUrls: ['./wardonline.component.css']
})
export class WardonlineComponent implements OnInit {
  closeResult: string;
  disableBtn: boolean = false;
  constructor(private _http: WardonlineService,private toastr: ToastrService,private modalService: NgbModal) {
    this.refSales[0] = new SaleDetail();
    this.newSale = new NewSale(); 
  }

  refSales: SaleDetail[] = [];
  newSale: NewSale;
  ngOnInit() {
  this.prepareNewBill()
  }
  billNo: string;
medicines=[]
  prepareNewBill()
  {
    this.refSales[0] = new SaleDetail();
    this.newSale = new NewSale(); 
    this._http.getBill()
    .subscribe(
    response => {
     this.billNo=response[0].billNo ;
    
     this.medicines=response
    //  response.map(item => {
    //    this.medicines.push(new Medicine(item.batch, item.medName, item.mrp, item.expDate, item.gst));
    //    this.medicinePriceMap[item.medName] = item.mrp;
    //    this.medicineMap[item.medName] = {'gst':item.gst, 'mrp':item.mrp, 'batchNo': item.batch};
    //   });
    });
  }
  showModal(basic: any) { 
    // if(this.refSales.map(sale =>{if(sale.amount==0)
    //   {
    //     this.toastr.error("Amount is 0")
    //     this.refSales = []; 
    // this.refSales[0] = new SaleDetail();
    //   }}))
   this.disableBtn = true;
    this.refSales = this.refSales.filter(sale => Object.keys(sale).length !== 0);
    if(this.refSales.length == 0) { 
      this.toastr.error("Please fill Medicine Details!");
      this.refSales = []; 
      this.refSales[0] = new SaleDetail();
      return;
    }
  
    let total = 0;
    this.refSales.map(sale => total =((total?total:0)+(sale.amount?sale.amount:0)));
    this.newSale.total = Math.round((total?total:0));
    this.newSale.refSales = this.refSales; 
    
  this.modalService.open(basic, {ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false}).result.then((result) => {
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


  setBatches(sale)
  {

    let par={
      

        "med":sale.medicineName
          
          
        
    }
    this._http.getBatch(par)
    .subscribe(
    response => {
      sale.quantity =null
      sale.mrp = null
      sale.Available =null
      sale.expDate =null
      sale.gst =null
      sale.discount =null
      sale.amount =null
      sale.batches = response.map(item => item.batch);
      sale.batchNo = sale.batches[0];
      this.setMedicineDetails(sale);
      this.calcAmount(sale)
     console.log("batches" + JSON.stringify(response));


    },
    
  
  );
  
  }
   
  setMedicineDetails(sale)
  {

    let par={
      

        "med":sale.medicineName,
        "batch":sale.batchNo
          
          
        
    }
    this._http.getMedicineDetails(par)
    .subscribe(
    response => {
     
     console.log("Medicines" + JSON.stringify(response));
    
     sale.mrp =((response.mrp)/(response.packSize)).toFixed(2);
     sale.Available=response.Available;
     sale.expDate=response.ExpDate
     sale.gst = response.Gst
     sale.packSize = response.packSize
     if( sale.quantity > sale.Available){
      sale.quantity = 0;
      sale.quantity_error = true;
    
      return;
    }
    sale.quantity_error = false;
    
    if(sale.packSize){
      sale['amount'] = (sale.quantity)*(sale.mrp);
    }
  
          if(sale.discount){
            sale['amount'] -= sale['amount']*(sale.discount)/100.0;
          }
        
    },
    (err) => {
      this.toastr.error("No Medicines available for this batch")
      sale.mrp = null
      sale.Available =null
      sale.expDate =null
      sale.gst =null
      sale.discount =null
      sale.amount =null
      sale.quantity =null
    }
  );
  }
  calcAmount(sale) { 
    
          if( sale.quantity > sale.Available){
            sale.quantity = 0;
            sale.quantity_error = true;
            return;
          }
          sale.quantity_error = false;
          if(sale.packSize){
            sale['amount'] = ((sale.quantity)*(sale.mrp));
          }
       
        
          if(sale.discount)
            
          sale['amount'] -= sale['amount']*(sale.discount)/100.0;
    
          
        }


    onMedicineChange(event, sale) { 
      if(event==undefined)
        {
          sale.quantity =null
          sale.mrp = null
          sale.Available =null
          sale.expDate =null
          sale.gst =null
          sale.discount =null
          sale.amount =null
          sale.batchNo = null
          sale.packSize =null
        }
      sale.medicineName = event.medName;
    }


    save()
    {
     
      
     this._http.post(this.newSale)
       .subscribe(
       data => {
         console.log("data**" + JSON.stringify(data));  

        window.open(data.fileuri);
        //  location.reload();  
       
         //
         //this.router.navigate(['/sale']);
        },
      
        (err) => {
          
             this.toastr.error(err['error']?err['error'].message:'Error Occured!');
  
   },
                  () =>{
                    this.toastr.success("sales created sucessfully");
                    location.reload()
                  }
      );
         
   } 

   removeSaleItem(index) { 
    let sale= this.refSales[index];  
    this.medicines.map(m => {
      if(m.medName == sale.medicineName){ 
        m['disabled'] = false;
      }
    });      
    this.refSales.splice(index, 1);        
  }

   addMore(event) { 
    // if (sale.quantity!=null)
      
       
        if(Object.keys(this.refSales[this.refSales.length - 1]).length > 0)
        this.refSales.push( new SaleDetail());  
        // if (sale.quantity==null){
        //   this.toastr.error("please enter quanity")
        // }
  }
}
