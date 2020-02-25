import { Component, OnInit } from '@angular/core';
import { DoctorService } from "src/app/doctor/doctor.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

p:number=1
  constructor(private _http:DoctorService,private modalService: NgbModal,private fb:FormBuilder,private toastr: ToastrService) {


    this.DoctorForm =fb.group({
      
      'phys':new FormControl('', ),
      'inv':new FormControl('', ),
      'pati':new FormControl('', ),
      'dosage':new FormControl('', ),
      'pres':new FormControl('', ),
      'recom':new FormControl('', ),
      'med':new FormControl('',),
      'note':new FormControl('',)
      })
         }
      
      
         recom:string
         pres:string
         phys:string;
         med:string
         inv:string
         dosage:string
         pati:string;
      Doc=[]
      closeResult:string
      DoctorForm:FormGroup
        ngOnInit() {
          this.showData()
          
        }
      
        showData()
        {
          this._http.getData()
          .subscribe(
          response => {
            
       this.Doc=response
       
            console.log("medicine" + JSON.stringify(response));
           
          },);
        }
        
        open(basic1,data) {
          this.regNo=data.regNo;
          
             this.modalService.open(basic1, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false , size: 'lg' }).result.then((result) => {
               this.closeResult = `Closed with: ${result}`;
             }, (reason) => {
               this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
             });
           }
           open1(basic,data) {
            this.regNo=data.regNo;
            
               this.modalService.open(basic, {ariaLabelledBy: 'modal-basic-title', size:'lg',backdrop: 'static', keyboard: false}).result.then((result) => {
                 this.closeResult = `Closed with: ${result}`;
               }, (reason) => {
                 this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
               });
             }
             report:any
      
            //  open2(basic2,data) {
            // this.report=data.report
              
            //      this.modalService.open(basic2, {ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {
            //        this.closeResult = `Closed with: ${result}`;
            //      }, (reason) => {
            //        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            //      });
            //    }
        
      
         private getDismissReason(reason: any): string {
          
            if (reason === ModalDismissReasons.ESC) {
              return 'by pressing ESC';
            } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
              return 'by clicking on a backdrop';
            } else {
              return  `with: ${reason}`;
            }
        
            
          }
      
          regNo:string
          save(value:any)
          {
            let param=
            {
              
                "regId":this.regNo,
              
                "presentillness":this.pres,
                "physicalExamination":this.phys,
                "investigationAdviced":this.inv,
                "medicationNameDosage":this.med,
                "patientInstruction":this.pati,
                "recommendation":this.recom,
          
            }
      
            this._http.postCreate(param)
            .subscribe(
            data => {
       
              console.log("data**" + JSON.stringify(data));
          
             } );
      
            }
      
      
      note:string
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
      
           this.toastr.success("Note updated")
          // this.showData() 
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

      }