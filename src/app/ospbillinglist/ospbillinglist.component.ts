import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OspbillinglistService } from './ospbillinglist.service';
import { FormGroup } from "@angular/forms";
@Component({
  selector: 'app-ospbillinglist',
  templateUrl: './ospbillinglist.component.html',
  styleUrls: ['./ospbillinglist.component.css']
})
export class OspbillinglistComponent implements OnInit {
  closeResult:string;
  constructor(private _http:OspbillinglistService,private modalService: NgbModal,) { }

  ngOnInit() {
    this.showAll()
  }
  
  All=[]
  count:string="2"
  showAll(){
    this._http.getAll(this.count)
    .subscribe(
      data =>{
        this.All = data
        console.log(" data " + JSON.stringify(data));
      }
    )

}
open(data){
  this._http.getPdf(data.ospServiceId)
  .subscribe(
     
    data =>{
      data.ospServiceId=data;
      console.log(data);
      window.open(data.ospBill)
},);
}
}