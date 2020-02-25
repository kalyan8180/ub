import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup } from "@angular/forms";

import { map, startWith } from 'rxjs/operators';
import { FormControl } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr'
import { DuebillsService } from './duebills.service';
import { resetApplicationState } from '@angular/core/src/render3/instructions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable, BehaviorSubject } from 'rxjs';
import { Type } from "src/app/duebills/duebills.model";
import { Mutliple } from "src/app/return/return.model";

const typeColumn = ["Cash", "Card", "Due"];
@Component({
  selector: 'app-duebills',
  templateUrl: './duebills.component.html',
  styleUrls: ['./duebills.component.css']
})
export class DuebillsComponent implements OnInit {
  closeResult: string;

  UMRno: any;
  mobileno: any;
  name: any;
  type: any;
  InventoryForm: FormGroup;
  dueType: any;
  Payment: any="Cash";
  regNo: any;
  billNo: any;
  saleDate: any;
  regno: any;

  typeas: any;
  cashamount: any;
  cardamount: any;
  total: any;
  // DueFor: any;
  dueFor: any;
  umr: any;

  constructor(private fb: FormBuilder, private _http: DuebillsService, private toastr: ToastrService, private modalService: NgbModal,private router: Router) {

    this.multiplePayment1[0] = new Mutliple();
    this.InventoryForm = fb.group({
      'UMRno': [null],
      'mobileno': [null],
      'name': [null],
      'type': [null],
      'typeas': [null],
      'patientregid': [null],
      'umr': [null],
      'patientName': [null],
      'dueFor': [null],
    })

  }

  ngOnInit() {
    this.multiplePayment1[0].payType = "Cash"
    if (this.multiplePayment1[0].payType = "Cash") {
      // this.disable = true
      // this.cash=true
    }
    this.values[0]="Cash"

    this.createTypesList();
    this.showAll()
  }

  // findPatient()
  //  {


  //   this._http. getpatient(this.UMRno)
  //    .subscribe(

  //         response => {



  //           this.mobileno=response[0].mobileNo
  //           this.name=response[0].pName


  //           console.log("UMR" + JSON.stringify(response));


  //        });



  //  }




  // findbyPatient()
  // {


  //  this._http. getreg()
  //   .subscribe(

  //        response => {






  //          console.log("UMRno" + JSON.stringify(response));


  //       });



  // }

  //  Doc:[any];
  //  saveas()

  //  {



  //    let par = {
  //      "dueType":this.type,

  //  }
  //  this._http.postCreate(this.UMRno,par)
  //     .subscribe(
  //     data => {
  //       this.Doc = data;

  //    console.log("data**" + JSON.stringify(data));



  //      },

  //   );

  //     }

  saveas() {



    let par = {
      "dueType": this.type,

    }
    this._http.postref(par)
      .subscribe(
      data => {
        this.alist = data;

        console.log("data**" + JSON.stringify(data));



      },

    );

  }
  multiplePayment1: Mutliple[] = []; multiplePayment:any=[]
  referenceNumber:string
  save(value: any) {

    //  if(this.regno!=null)
    //  {
    //    this.type=this.typeas
    //  }


    if(this.multiplePayment1.length>1){
      this.multiplePayment= [
        {
        "payType": this.multiplePayment1[0].payType,
        "amount": this.X
      },
      
      {
        
      "payType": this.multiplePayment1[1].payType,
      "amount": this.Y
    },]
  }
  else{
    this.multiplePayment= [
      {
      "payType": this.multiplePayment1[0].payType,
      "amount": this.X
    },]
  }
    let par = {

      "dueFor": this.dueFor,
      "mode": this.Payment,
      "amount": this.amount,
      "referenceNumber":this.referenceNumber,
      "netAmount":this.netAmount,
      "discount":this.discount,
      "multiplePayment":this.multiplePayment

    }

    this._http.post(this.billno, par)
      .subscribe(
      data => {

        console.log("data**" + JSON.stringify(data));
        window.open(data.fileuri)
       
      },
 
      (err) => {
        this.toastr.error(err['error']?err['error'].message:'Error Occured!');
        
        },
        ()=>
        {
     
          this.toastr.success("paid sucessfully ")
        location.reload()
        }
    );
  }


  discount:number=0

  billno: number
  amount: number
  open(basic, data) {
    this.billno = data.billno
    this.amount = parseInt(data.amount)
    this.dueFor = data.dueFor
    this.X=this.amount
    if(this.discount==0)
      {
        this.netAmount=this.amount
      }
    this.modalService.open(basic, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  netAmount:number
  calculateNetamount()
  {
this.netAmount=(this.amount?this.amount:0)-(this.discount?this.discount:0)
if(this.netAmount)
this.X=this.netAmount
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
  filter:any
  reset() {
    this.InventoryForm.reset()
    this.regNo = null
    this.billno = null
    this.saleDate = null
    this.amount = null
    // this.alist = null
    this.filter =null

  }






  getcashamount() {


    console.log(this.amount)
    this.cashamount = (this.amount - (this.cardamount))
  }

  //    getcardamount()
  //    {

  //        this.amount= this.total

  //  this.cardamount=(this.amount-(this.cashamount))
  //    }

  getcardamount() {


    this.cardamount = (this.amount - (this.cashamount))
  }




  alist = []
  showAll() {
    this._http.getfull()
      .subscribe(
      data => {
        this.alist = data
        console.log(" data " + JSON.stringify(data));
      }
      )


  }



  addMore1(event) {
 
    this.Xamount=false
    
    if (this.multiplePayment1.length <= 1)
  
      this.multiplePayment1.push(new Mutliple());
    // if (sale.quantity==null){
    //   this.toastr.error("please enter quanity")
    // }
    else {
      this.toastr.error("only two payment types allowed")
    }
  
  }
  Xamount=true
  removeSaleItem1(index) {
    
    this.Xamount=true
    
      this.multiplePayment1.splice(index, 1);
  }
  


  X: number;
  Y: number = 0
  amount2() {
if(this.netAmount)

  {
    if(this.X>this.netAmount)
      {
       
       this.X=0
      }
    this.Y = (this.netAmount)-(this.X)
  }

  else{
    if(this.X>this.amount)
      {
       
       this.X=0
      }
    this.Y = (this.amount)-(this.X)
  }
 
  }
  amount1() {
if(this.netAmount){
  if(this.Y>this.netAmount)
    {
     
     this.Y=0
    }
  this.X = (this.netAmount)-(this.Y)
}
else{

  if(this.Y>this.amount)
    {
     
     this.Y=0
    }
  this.X = (this.amount)-(this.Y)
}

  }
resetcancel()
{
  this.router.navigate(['/duebills'])
}

row:boolean=true
  secondrow()
  {
    this.row=false
  }
  secondrowremove()
{
  this.row=true
  this.X=this.amount
  this.Y=0
}
values: Array<string> = [];

types$ = new BehaviorSubject([]);
// An array for looping selectors in template
options = Array.from({length: 1});
// An array for collect all chosen values



changed(data, optI){
  // Change chosen data in chosen list with index of selector
 
  this.values[optI] = data;
  // Reform the chosen list
  this.createTypesList();
}



/**
 * The method which form all option types according to chosen values
 */
private createTypesList() {
  let types = [];
  // For all types check if they were chosen
  typeColumn.forEach((type) => {
    // if current type in array of chosen
    let selected = this.values.includes(type);
    // push current type with its status
    types.push(new Type(type, !selected));
  });

  // Send messages to mat-option in our template 
  this.types$.next(types);
}
}