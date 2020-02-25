import { Component, OnInit } from '@angular/core';
import { PaymentvoucherService } from "src/app/paymentvoucher/paymentvoucher.service";
import { FormGroup } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { ToastrService } from 'ngx-toastr'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-paymentvoucher',
  templateUrl: './paymentvoucher.component.html',
  styleUrls: ['./paymentvoucher.component.css']
})
export class PaymentvoucherComponent implements OnInit {

  closeResult: string;
  bank: any;
  checkDate: any;
  paymentType: any;
  checkNo: any;
  voucherAmount: any;
  paymentDate: any;
  paidTo: any;
  voucherType: any;
  otherName: any;
  raisedBy: any;
  paymentNo: any;
  PaymentForm:FormGroup
  remarks: any;
  constructor(private modalService: NgbModal,private fb:FormBuilder,private _http:PaymentvoucherService,private toastr: ToastrService,private router:Router) { 
    this.PaymentForm=fb.group({
      'paymentNo':[null],
      'bank':[null],
      'checkDate':[null],
      'paymentType':[null],
      'checkNo':[null],
      'remarks':[null],
      'voucherAmount':[null],
      'paymentDate':[null],
      'name':[null],
      'paidTo':[null],
      'voucherType':[null],
      'raisedBy':[null],
      'otherName':[null],
      
    })
  }
 
  key: string;
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  a: boolean = false;
  ngOnInit() {

    this.showAll()
    this.showId()
  }
  

  pdf(data){
    this._http.getPdf(data.paymentNo)
    .subscribe(
       
      data =>{
        data.paymentNo=data;
        console.log(data);
        window.open(data.voucherNo)
  },);
  }
  Id=[]
  showId() {
    this._http.getId()
      .subscribe(
        response => {

          this.Id = response;
          console.log("Id" + JSON.stringify(response));
          console.log(this.Id[1].nextId);
        });
  }
  count:string="2"
  All=[]
  showAll(){
    this._http.getAll(this.count)
    .subscribe(
      data =>{
        this.All = data
        console.log(" data " + JSON.stringify(data));
      }
    )

}

  open(basic,data) {
    this.paymentNo=data.paymentNo;
    this.bank=data.bank;
    this.paidTo=data.paidTo;
    this.checkDate=data.checkDate;
    this.paymentType=data.paymentType;
    this.checkNo=data.checkNo;
    this.voucherAmount=data.voucherAmount;
    this.paymentDate=data.paymentDate;
    this.voucherType=data.voucherType;
    this.raisedBy=data.raisedBy;
    this.otherName=data.otherName;

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
  save(value: any){
    let param = {
      "bank":this.bank,
      "checkDate":this.checkDate,
      "paymentType":this.paymentType,
      "checkNo":this.checkNo,
      "voucherAmount":this.voucherAmount,
      "paymentDate":this.paymentDate,
      "paidTo":this.paidTo,
      "voucherType":this.voucherType,
      "raisedBy":this.raisedBy,
      "otherName":this.otherName,
      "remarks":this.remarks
   
    }
    console.log(param)


    this._http.edit(this.paymentNo, param)
      .subscribe(
      data => {
        console.log(this.paymentNo);
        console.log("data**" + JSON.stringify(data));
    window.open(data.fileuri);
    location.reload();
      },

    );
   // this.toastr.success("Voucher List  updated")
  }
  
//    refresh()
//  {
//    location.reload()
//  }
  
}
