import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { VendorService } from "src/app/vendor/vendor.service";
import { Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
import { Router } from "@angular/router";
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],

})
export class VendorComponent implements OnInit {
  minDate = new Date();
  Vendordisable = false;
  VendorForm:FormGroup;
  Vendor=[]
  vendorId:any;
  vendorType: string
  businessType:string
  vendorName:string
  globalId:string
  
  regName:string
  amount:number
  panNo:string
  deliveryDays:number
  paymentTerms:string
  suppliers:string
  adress1:string
  adress2:string
  area:string
  city:string
  country:string
  pinCode:number
  contactPerson:string
  mail:string
  bankName:string
  bankBranch:string
  branchAdress:string
  accountNo:string;
  accountType:string;
  gstNo:string;
  state:string
  mobile:string;
  registered_date:any;
  ifscCode:string;
  micrCode:string
  beneficiaryBankName:string;
  fax:string;
    constructor(private fb:FormBuilder,private _http:VendorService,private toastr: ToastrService,private router:Router) {
  
  
  
  
      this.VendorForm = fb.group({
        
        
        'vendorType': [null],
        'businessType': [null],
        'vendorName': [null],
        'globalId': [null],
      
        'regName': [null],
        'amount':[null] ,
        'panNo':[null] ,
        'gstNo': [null],
        'deliveryDays':[null],
        'paymentTerms':[null] ,
     'registered_date':[null],
   'fax':[null],
      
        'suppliers':[null],
        'adress1': [null],
        'adress2':[null] ,
        'area':[null],
        'city': [null],
        'state':[null] ,
        'country':[null],
        'pinCode': [null],
        'contactPerson':[null] ,
        'mobile':[null] ,
      
        'mail':[null] ,
        'bankName': [null],
        'bankBranch':[null] ,
        'branchAdress':[null],
        'accountNo':[null] ,
        'accountType': [null],
        'ifscCode':[null],
        'micrCode':[null],
        'beneficiaryBankName':[null]
          })
      }
  
    ngOnInit() {
    this.showAll()
    }
   
    // get vendorName()
    // {
    //   return this.VendorForm.get('vendorName')
    // }
    items = [1];
    count = 1;
    addRow() {
      this.count++;
      this.items.push(this.count);
    }
    delRow() {
      this.count--;
      this.items.pop();
    }
  
  
  
  submitted =false
  
    save(value: any)
    {
      this.submitted=true
      if (!this.VendorForm.valid) {
        return;
    }
    //  alert("Vendor Registered Sucessfully");
     let par = {
     
      
        
                "vendorType":this.vendorType,
                "businessType":this.businessType,
                "vendorName":this.vendorName,
              
                "regName":this.regName,
               
                "panNo":this.panNo,
                "gstNo":this.gstNo,
                "deliveryDays":this.deliveryDays,
                "paymentTerms":this.paymentTerms,
                
                "suppliers":this.suppliers,
                "adress1":this.adress1,
                "adress2":this.adress2,
                "area":this.area,
                "city":this.city,
                "state":this.state,
                "country":this.country,
                "pinCode":this.pinCode,
                "contactPerson":this.contactPerson,
                "mobile":this.mobile,
                "fax":this.fax,
                "mail":this.mail,
                "bankName":this.bankName,
                "bankBranch":this.bankBranch,
                "branchAdress":this.branchAdress,
                "accountNo":this.accountNo,
                "accountType":this.accountType,
                "ifscCode":this.ifscCode,
                "micrCode":this.micrCode,
                "beneficiaryBankName":this.beneficiaryBankName
                
      
                
      }
  
     
  
  
  
  
  console.log(this.bankName);
  
     this._http.postCreate(par)
       .subscribe(
       data => {
        this.Vendordisable = true;
         console.log("data**" + JSON.stringify(data));
      
  
        
          //  location.reload();
       
        },
        (err) => {
          this.toastr.error(err['error'] ? err['error'].message : 'Error Occured!');
        },
      ()=>
      {
      
        this.toastr.success("vendor added")
location.reload()
      }
     );
    //  this.router.navigate(['/existvendor']
  // this.toastr.success("vendor added")
  // this.showAll()
  // window.location.reload();
  // this.router.navigate(['/existvendor'])
   }
  
   showAll()
   {
     this._http.getVendor()
     .subscribe(
    data => {
       
  this.Vendor=data
  // console.log(this.Vendor.vendorId)
  // console.log(this.Vendor.regId)
  // let vendorId=this.Vendor.vendorId;
  // let regNo=this.Vendor.regId;
       console.log("data" + JSON.stringify(data));
    
     },
    );
  
    
   }
  
  
  
   reset() 

   {
     this.submitted=false
     this.VendorForm.reset();
   }
  }
  