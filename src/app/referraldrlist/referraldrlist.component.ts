import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { fbind } from 'q';
import { ToastrService } from 'ngx-toastr';
import { ReferraldrlistService } from './referraldrlist.service';



@Component({
  selector: 'app-referraldrlist',
  templateUrl: './referraldrlist.component.html',
  styleUrls: ['./referraldrlist.component.css']
})
export class ReferraldrlistComponent implements OnInit {
  ReferaldrForm : FormGroup;

  source:string;
  refName:string;
  refAdd:string;
  refPhone:string;
  refId:string;

constructor(private fb:FormBuilder,private _http:ReferraldrlistService,private toastr: ToastrService) { 

    this.ReferaldrForm=fb.group({
      'source':[null],
      'refName':[null],
    
      'refAdd':[null],
      'refPhone':[null],
      'refId':[null],
     
      

    })
   }

  ngOnInit() {
    this.showAll()
  }
  All=[]
  showAll(){
    this._http.getAll()
    .subscribe(
      data =>{
        this.All = data
        console.log(" data " + JSON.stringify(data));
      }
    )

}
}