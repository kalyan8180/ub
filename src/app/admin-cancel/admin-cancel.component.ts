import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { AdminCancelService } from "src/app/admin-cancel/admin-cancel.service";
import { ToastrService } from 'ngx-toastr'
import { Validators } from "@angular/forms";
@Component({
  selector: 'app-admin-cancel',
  templateUrl: './admin-cancel.component.html',
  styleUrls: ['./admin-cancel.component.css']
})
export class AdminCancelComponent implements OnInit {
  AdminForm: FormGroup;
  constructor( private fb: FormBuilder,private _http:AdminCancelService,private toastr: ToastrService) {
    this.AdminForm = fb.group({
      
            'reg': [null],
            'reason': [null],
           
    })
   }
   reg:string
   reason:string
  ngOnInit() {
  }
  submitted = false;
  save(value: any) {
    
    
        this.submitted=true
        if (!this.AdminForm.valid) {
          return;
      }
      let param=
      {
        
        "regNo":this.reg,
        "reasonForCancel":this.reason
      }

      this._http.post(param)
      .subscribe(
      data => {
        console.log("data**" + JSON.stringify(data));
      },

      (err) => {
      
        this.toastr.error(err['error'] ? err['error'].message : 'Error Occured!');//"Patient Already Created")

      },

      () => {

        this.toastr.success("Reg# Cancelled")

      }
      );



    }
reset()
{
  this.submitted=false
  this.AdminForm.reset();
}
}
