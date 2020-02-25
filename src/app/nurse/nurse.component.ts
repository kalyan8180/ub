import { Component, OnInit } from '@angular/core';
import { NurseService } from "src/app/nurse/nurse.service";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  closeResult: string;
 
  Nur = []
  NurseForm :FormGroup;
  p: number = 1;
  constructor(private _http:NurseService,private modalService: NgbModal,private fb:FormBuilder,private toastr: ToastrService) {

    this.NurseForm=fb.group({
      'note':new FormControl('',),
      'note1':new FormControl('',)
    })
   }
regNo:string
  ngOnInit() {
    this.showData();
  }

  open(basic,data) {
    this.regNo=data.regNo;
   
       this.modalService.open(basic, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false , size: 'lg' }).result.then((result) => {
         this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
     }
     reports : any=[];
     openModal(basic2, data) {
       if(data.report) {
         data.report.forEach(element => {
           for(let key in element) { 
             this.reports.push({name:key, link:element[key]});
           }
         });
       }

         this.modalService.open(basic2, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false , size: 'lg' }).result.then((result) => {
           this.closeResult = `Closed with: ${result}`;
         }, (reason) => {
           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
         });
       }
     show1(basic1,data) {
   
     this.regNo=data.regNo;
         this.modalService.open(basic1, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false , size: 'lg' }).result.then((result) => {
           this.closeResult = `Closed with: ${result}`;
         }, (reason) => {
           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
         });
       }
  

 private getDismissReason(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } 
     else {
      return  `with: ${reason}`;
    }

    
  }
  showData()
  {
    this._http.getData()
    .subscribe(
    response => {
      
this.Nur=response;
 
      console.log("nurse" + JSON.stringify(response));
     
    },);
  }




note:string
note1:string
  save1(value:any)
  {
    let param=
    
      {
        "regId":this.regNo,
        "writeNotes":this.note
      }
    

    this._http.post(param)
    .subscribe(
    data => {

      console.log("note**" + JSON.stringify(data));
  
     } );
this.toastr.success("note updated")
location.reload(

)
}

savePha(value:any)
{
  let param=
  
    {
      "regId":this.regNo,
      "pharmacyNotes":this.note1
    }
  

  this._http.post1(param)
  .subscribe(
  data => {

    console.log("note**" + JSON.stringify(data));

   } );
this.toastr.success("note updated")
location.reload()
}


showNotes(data)
{
 
  this._http.getNotes(data.regNo)
  .subscribe(
  response => {
  
    console.log("note" + JSON.stringify(response));
    window.open(response.fileuri);
  },);
}
}
