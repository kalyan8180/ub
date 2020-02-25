import { Component, OnInit } from '@angular/core';
// import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { s } from '@angular/core/src/render3';
import { ActivatedRoute } from '@angular/router';
import { AdmindoctorviewService } from "src/app/admindoctorview/admindoctorview.service";
@Component({
  selector: 'app-admindoctorview',
  templateUrl: './admindoctorview.component.html',
  styleUrls: ['./admindoctorview.component.css']
})

export class AdmindoctorviewComponent implements OnInit {
  closeResult: string;
  userId: string;
  sub: any;
  constructor(private route: ActivatedRoute,private _http:AdmindoctorviewService,private fb:FormBuilder,private toastr: ToastrService,private modalService: NgbModal,) { }
  Doc:[any]
  ngOnInit() {
    this.showData();
    // this.sub = this.route.params.subscribe(params => {
    //   this.userId = params['id'];    
    // });
   
  }
  showData(){
    this._http.getList()
    .subscribe(
      response => {
        this.Doc=response
        console.log(response);
      },);

     


     
  }
  New=[]
  showDetails(s)
  {
    // alert(this.userId)
    let par={
      
        "userId":this.userId,
        "year":s.year,
        "month":s.monthNo
      
    }
    this._http.postnew(par)
    .subscribe(
      response =>{
      this.New=response
       
      },
    );
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false , size: 'lg' }).result.then((result) => {
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
  

  date=[]
  back()
  {
    this.opentable=false
  }
    opentable=false
  showAll(data){


    this.userId=data.userId
    this._http.getAll(this.userId)
  
    .subscribe(
     
      response =>{
        this.opentable=true
   this.date=response
        console.log(response);
      },
    );
  }
  

  
}