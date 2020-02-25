import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { httpFactory } from '@angular/http/src/http_module';
import { AmbulancelistService } from './ambulancelist.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { fbind } from 'q';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-ambulancelist',
  templateUrl: './ambulancelist.component.html',
  styleUrls: ['./ambulancelist.component.css']
})
export class AmbulancelistComponent implements OnInit {
  closeResult: string;
  // sId:any;
  regNo:any;
  billAmount:any;
  paidTo:any;
  toTime:any;
  amountStatus:any;

 alist=[]

AmbulanceForm: FormGroup;

  constructor(private modalService: NgbModal,private _http:AmbulancelistService,private fb: FormBuilder,private toastr: ToastrService) { 
    this.AmbulanceForm = fb.group({
      // 'sId':[null],
      'regNo':[null],
      'billAmount':[null],
      'paidTo':[null],
      'toTime':[null],
      'amountStatus':[null],
      'patAmbulanceId':[null]
      
    })
  }
 
  ngOnInit() {
    this.showAll()
  }
  showAll(){
    this._http.getAllPatient()
    .subscribe(
      data =>{
        this.alist = data
        console.log(" data " + JSON.stringify(data));
      }
    )

    
  }

  open(basic,data) {
    this.patAmbulanceId=data.patAmbulanceId
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
  patAmbulanceId:string
  save(value: any){
    let param = {
      "regNo":this.regNo,
      "billAmount":this.billAmount,
      "paidTo":this.paidTo,
      "amountStatus":this.amountStatus,
      "toTime":this.toTime,
    }
    console.log(param)


    this._http.edit(this.patAmbulanceId, param)
      .subscribe(
      data => {
        console.log(this.patAmbulanceId)
        console.log("existing" + JSON.stringify(data));

      },

    );
    this.toastr.success("Ambulance data updated")

  }
  refresh()
{
  location.reload()
}

  // patAmbulanceId(patAmbulanceId: any, param: { "regNo": any; "billAmount": any; "paidTo": any; "amountStatus": any; "toTime": any; }): any {
  //   throw new Error("Method not implemented.");
  // }
  
}