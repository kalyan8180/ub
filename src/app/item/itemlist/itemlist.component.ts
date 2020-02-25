import { Component, OnInit } from '@angular/core';
import { ItemlistService } from "src/app/item/itemlist/itemlist.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],

})
export class ItemlistComponent implements OnInit {
  Medicine = []
  public loading = false;
  closeResult: string;
  ItemForm: FormGroup
  constructor(private _http: ItemlistService,private modalService: NgbModal, private toastr: ToastrService,private fb:FormBuilder,private spinner: NgxSpinnerService) {


    this.ItemForm =fb.group({
      
      
         
      'saleUnits': [null],

 
    
  
      'medicineId':[null],
    'manufacturer':[null],

    'vendorPackage':[null],
  'batchNo':[null],

  
    'strengthUnits':[null],

    'quantityPerDay':[null],
 
   
 
    'minPurchaseQuantity':[null],
    'maxPurchaseQuantity':[null],
    'brand':[null],
    'drugType':[null],
    'name':[null]
    })


   }
  p: number = 1;
  ngOnInit() {
    this.showAll()
  }

  brand:string
  name:string
  medicineId:string


 itemLevel:string
  drugType:string
  strengthUnits:number
  saleUnits:number
  quantityPerDay:string
  minPurchaseQuantity:number
  maxPurchaseQuantity:number
  batchNo:string
  manufacturer:string
  vendorPackage:string
  open(basic,data) {

    // alert(data.drugType)
    this.itemLevel=data.itemLevel
    this.brand=data.brand,
  this.name=data.name
 this.manufacturer=data.manufacturer
 this.batchNo=data.batchNo
    this.medicineId=data.medicineId
    this.saleUnits =data.saleUnits
    this.strengthUnits=data.strengthUnits
    this.minPurchaseQuantity =data.minPurchaseQuantity
    this.maxPurchaseQuantity =data.maxPurchaseQuantity
    this.vendorPackage=data.vendorPackage
    this.drugType =data.drugType
       this.modalService.open(basic, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false , size: 'lg' }).result.then((result) => {
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
  showAll() {
   this.spinner.show()
    this._http.getAllMed()
      .subscribe(
        data => {
        this.spinner.hide()
          this.Medicine = data;
          console.log("all data" + JSON.stringify(data));

        });


  }

  save()
  {
 
   let par = {
    "medicineId":this.medicineId,
      "itemLevel":this.itemLevel,
      "name":this.name,
      "batchNo":this.batchNo,
      "manufacturer":this.manufacturer,
      "vendorPackage":this.vendorPackage,
      "brand":this.brand,
      "drugType":this.drugType,
      
      "strengthUnits":this.strengthUnits,
      "saleUnits":this.saleUnits,
      "quantityPerDay":this.quantityPerDay,
      "minPurchaseQuantity":this.minPurchaseQuantity,
      "maxPurchaseQuantity":this.maxPurchaseQuantity
    }
   

   this._http.postCreate(par)
     .subscribe(
     data => {
   
    console.log("data**" + JSON.stringify(data));
    this.toastr.success("details updated")
  
      },

   );



 }
 refresh()

 {
   location.reload()
 }
}
