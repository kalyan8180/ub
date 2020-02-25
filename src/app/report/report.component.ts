import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { FormGroup, FormBuilder } from '@angular/forms';
 import * as moment from 'moment';
 import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private _http:ReportService,private fb :FormBuilder,private toastr: ToastrService) {

    this.ReportForm = fb.group({
  
     
      'fromDate':[null],
      'toDate':[null],
      'soldBy':[null],
      'reportName':[null] ,
      'hours':[null],
      'minutes':[null],
   'period':[null],
   'hours1':[null],
   'minutes1':[null],
   'period1':[null]
    })
  }
period1="PM"
  fromDate:any
toDate:any
soldBy:string
reportName:string
hours:string="12"
minutes:string="00"
hours1:string="11"
minutes1:string="59"
  ngOnInit() {
    this.showData()
   
  }
  
  ReportForm: FormGroup;
reports=[]

// (ngModelChange)="onDataChange($event)" 
// onDataChange(newdate) {
//   const _ = moment();
//   const date = moment(newdate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()})
//   this.fromDate = date.toDate();
//   console.log({hours: _.hour(), minutes:_.minute() , seconds:_.second()})
// }
period="AM"

functionh(hours)
{

  if(hours>12)
    {
      this.hours="12";
      this.ReportForm.patchValue({'hours':this.hours});
    
      
    }
}
function(minutes)
{

 if(minutes>59)
  {
    this.minutes="00"
    this.ReportForm.patchValue({'minutes':this.minutes});
  }
}


functionh1(hours1)
{
  if(hours1>12)
    {
      this.hours1="12";
      this.ReportForm.patchValue({'hours1':this.hours1});
    
      
    }
}
function1(minutes1)
{

 if(minutes1>59)
  {
    this.minutes1="00"
    this.ReportForm.patchValue({'minutes1':this.minutes1});
  }
}

  showData()
  {
    this._http.getData()
    .subscribe(
    response => {
      
 
      response[1].forEach(r => r['fullName'] = r.firstName +' ' +(r.middleName?r.middleName:' ') + ' '+r.lastName +'-'+r.userId);

 this.reports=response;
      console.log("reports" + JSON.stringify(response));
     
    },);
  }

  onChange(event){
    // data.soldBy=null;
    this.soldBy = event.fullName;
  }

  save(value: any)
   {

    //2010-12-26 00:00:00
    // +" " +"19:30:00"
    // .toJSON().substring(0,10)
  // this.fromDate.setHours(this.fromDate.getHours()+5);
  //   this.fromDate.setMinutes(this.fromDate.getMinutes()+30);
  //   this.toDate.setHours(this.toDate.getHours()+5);
  //   this.toDate.setMinutes(this.toDate.getMinutes()+30);
    // this.toDate.setHours(this.toDate.getHours()+19);
    // this.toDate.setMinutes(this.toDate.getMinutes()+30);

    let par = {
  
      // "fromDate":this.fromDate.toJSON().substring(0,10) ,
      // "toDate":this.toDate.toJSON().substring(0,10),
      "fromDate":moment(this.fromDate).format('YYYY-MM-DD'),
      "toDate":moment(this.toDate).format('YYYY-MM-DD'),
      "fromTime": this.hours+':'+this.minutes+':'+"00"+' '+this.period,
      "toTime":this.hours1+':'+this.minutes1+':'+"00"+' '+this.period1,
      "soldBy":this.soldBy,
      "reportName":this.reportName    
      
    }

    this._http.postDetails(par)
      .subscribe(
      data => {

        console.log("data**" + JSON.stringify(data));
     window.open(data.fileuri)
       },

       (err) => {
        
                this.toastr.error(err['error'] ? err['error'].message : 'Error Occured!');
        
              },
              () => {
        
        
              }
    );
  }

// calculateage(){

//   var dob = this.fromDate
//   var today = new Date();
 
//    var age = today.getFullYear()-dob.getFullYear();

// console.log(dob.getFullYear())
// console.log(age)
// }


}
