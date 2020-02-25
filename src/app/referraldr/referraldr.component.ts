import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { ReferraldrlistService } from 'src/app/referraldrlist/referraldrlist.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr'
import { ReferraldrService } from './referraldr.service';

@Component({
  selector: 'app-referraldr',
  templateUrl: './referraldr.component.html',
  styleUrls: ['./referraldr.component.css']
})
export class ReferraldrComponent implements OnInit {
  ReferaldrForm : FormGroup;

email:string;
phoneno:string;
address:string;
doctorname:string;
referal:string;

  constructor(private fb:FormBuilder,private _http:ReferraldrService,private router: Router,private toastr: ToastrService) { 

    this.ReferaldrForm=fb.group({
      'email':[null],
      'phoneno':[null],
    
      'address':[null],
      'doctorname':[null],
      'referal':[null],
      

    })
  }

  ngOnInit() {
  }

  
  save(value:any)
  
  {


    
    let par = {
      "source":this.referal,
      "refName":this.doctorname,
      "refAdd":this.address,
      "refPhone":this.phoneno,
     
  }
  this._http.postCreate(par)
     .subscribe(
     data => {

    console.log("data**" + JSON.stringify(data));
    
  
      },
      );

      this.router.navigate(['/referraldrlist'])
      this.toastr.success("Referral Name registered  sucessfully ")

}
reset()
{
  this.ReferaldrForm.reset()
}
refresh() {
 location.reload();
}

}