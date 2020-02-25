import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { RegisterService } from "src/app/registration/register.service";
import { FormBuilder } from "@angular/forms";
import { ItemService } from "src/app/item/item.service";
import { Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
import { RouterModule, Routes } from '@angular/router';
import { Router } from "@angular/router";
import {Service} from "src/app/item/item.model";
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  public loading = false;
  saleUnits: number;
 Medi =[];
  ItemForm: FormGroup
  medicineId:string;
itemLevel:string;


manufacturer:string

vendorPackage:string;


strengthUnits:string;

quantityPerDay:string

minPurchaseQuantity:number
maxPurchaseQuantity:number;
brand:string;
drugType:string;
name:string;
batchNo:string
  insertedDate: any;
  modifiedDate: any;
  constructor(private fb:FormBuilder, private _http:ItemService,private toastr: ToastrService,private router: Router) {
    this.refMedicine[0] = new Service();
    this.ItemForm =fb.group({
      
      'insertedDate':[null],
         'modifiedDate':[null],
            'saleUnits': [null],
      
       
          
          'itemLevel':[null],
         
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
      
        ngOnInit() {
          this.showMedi()
        }
      
        refMedicine:Service[] = [];
      
        addMore(event) { 
          this.refMedicine.push(new Service());      
        }
        removeSaleItem(index) { 
        
          this.refMedicine.splice(index, 1);    
        }
      
      
        save(value: any)
        {
       
         let par = {
          
            // "modifiedDate":this.modifiedDate,
           
            // "insertedDate":this.insertedDate,
            
           
            "refMedicine":this.refMedicine
          
          }
         
      
      
      
      
      
      
         this._http.postCreate(par)
           .subscribe(
           data => {
         
          console.log("data**" + JSON.stringify(data));
          
        
            },
       
(err) => {
  this.toastr.error(err['error']?err['error'].message:'Error Occured!');

  },
  ()=>
  {
  
    this.toastr.success("item added successfull ")
location.reload()
  }
         );
      
//       this.toastr.success("item added sucessfully")
// this.router.navigate(['/itemlist'])
// location.reload();
       }
      
       showMedi()
       { 
         
        this.loading = true;
         this._http.getItem()
         .subscribe(
         response => {
          this.loading = false;
           
       this.Medi=response;
      
           console.log("medicine" + JSON.stringify(response));
          
         },);
       }
       
      reset(){
        this.ItemForm.reset();
        this.refMedicine[0] = new Service();
      }
      
      }
      