import { Component, OnInit } from '@angular/core';
import { ExistvendorService } from "src/app/exist-vendors/existvendor.service";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-exist-vendors',
  templateUrl: './exist-vendors.component.html',
  styleUrls: ['./exist-vendors.component.css']
})
export class ExistVendorsComponent implements OnInit {
  Vendor = []
 
  constructor(private _http: ExistvendorService, private modalService: NgbModal, private fb: FormBuilder,

    private toastr: ToastrService
  ) { 


    

  
      
      this.VendorForm = fb.group({
        'vendorId':[null],
        'vendorType': [null],
        'businessType':[null],
        'vendorName':[null],
        'globalId':[null],
        
        'regName':[null],
        'amount':[null],
        'panNo':[null],
        'deliveryDays':[null],
        'paymentTerms':[null],
        'suppliers':[null],
        'adress1':[null],
        'adress2':[null],
        'area':[null],
        'city':[null],
        'country':[null],
        'pinCode':[null],
        'contactPerson':[null],
        'mail':[null],
        'bankName':[null],
        'bankBranch':[null],
        'branchAdress':[null],
        'accountNo':[null],
        'accountType':[null],
        'gstNo':[null],
        'state':[null],
        'mobile':[null],
        'registered_date':[null],
        'ifscCode':[null],
        'micrCode':[null],
        'beneficiaryBankName':[null],
        'fax':[null],
        'closeResult': [null],
  
      })
  }

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
  closeResult: string;
  VendorForm: FormGroup;
  ngOnInit() {
    this.showAll()
  }

  p: number = 1;
  showAll() {
    this._http.getVendors()
      .subscribe(
        data => {

          this.Vendor = data;
          console.log("all data" + JSON.stringify(data));

        });


  }

  open(basic, data) {
    
this.vendorType=data.vendorType,
this.businessType=data.businessType,
this.vendorName=data.vendorName,
this.vendorId=data.vendorId,
this.regName=data.regName,

this.panNo=data.panNo,
this.gstNo=data.gstNo,
this.deliveryDays=data.deliveryDays,
this.paymentTerms=data.paymentTerms,

this.suppliers=data.suppliers,
this.adress1=data.adress1,
this.adress2=data.adress2,
this.area=data.area,
this.city=data.city,
this.state=data.state,
this.country=data.country,
this.pinCode=data.pinCode,
this.contactPerson=data.contactPerson,
this.mobile=data.mobile,
this.fax=data.fax,
this.mail=data.mail,
this.bankName=data.bankName,
this.bankBranch=data.bankBranch,
this.branchAdress=data.branchAdress,
this.accountNo=data.accountNo,
this.accountType=data.accountType,
this.ifscCode=data.ifscCode,
this.micrCode=data.micrCode,
this.beneficiaryBankName=data.beneficiaryBankName
this.modalService.open(basic, { ariaLabelledBy: 'modal-basic-title', size: 'lg',backdrop: 'static', keyboard: false }).result.then((result) => {
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



save(value: any)
{

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

 





this._http.edit(this.vendorId, par)
.subscribe(
data => {
  console.log(this.vendorId)
  console.log("existing" + JSON.stringify(data));

  
   
    },

 );

 this.toastr.success("vendor data updated")
}
refresh()
{
  location.reload()
}

}
