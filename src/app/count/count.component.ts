import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
// import { AdmindoctorviewService } from "src/app/admindoctorview/admindoctorview.service";
import { CountService } from "src/app/count/count.service";
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { s } from '@angular/core/src/render3';
@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit, OnDestroy {
  year:string;
  closeResult: string;
  constructor(private _router: Router, private route: ActivatedRoute, private _http:CountService,private fb:FormBuilder,private modalService: NgbModal,private toastr: ToastrService) { }
  array:object = [];
  sub: any;
  userId: string;
  ngOnInit() {
    this.showData();
    this.sub = this.route.params.subscribe(params => {
    this.userId = params['id']; 
    if(!this.userId) {
      this._router.navigate(['/admindoctorview']);
    }  
   });
  
    
  }



ngOnDestroy() {
 this.sub.unsubscribe();
}

statistics: object = [];

fetchStatistics(event: any)
    {
      // this.year
      let parm = {
        "year":event.value,
      }
      
      this._http.postArray(this.userId,parm)
      .subscribe(
        data =>
        {
          this.statistics = data;
          console.log(data);
        },
      );
    }
  showData(){
    this._http.getArray()
    .subscribe(
      response =>{
        this.array=response;
        console.log(response);
        // console.log("array" + JSON.stringify(response));
       
      },
    );

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
    
    
}