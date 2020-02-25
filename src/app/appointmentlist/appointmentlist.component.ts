import { Component, OnInit } from '@angular/core';
import { AppointmentlistService } from './appointmentlist.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.css']
})
export class AppointmentlistComponent implements OnInit {

  AppointmentForm : FormGroup;
   
  appointmentId:string;
  shift:string;
  toTime: string;
  fromTime: string;
  appiointmentDate: any;
 
  patientName: string;

  constructor(private fb:FormBuilder,private _http:AppointmentlistService,private toastr: ToastrService) {
    this.AppointmentForm=fb.group({
      'appointmentId':[null],
      'patientName':[null],
      'doctorName':[null],
      'shift':[null],
      
      
      'appiointmentDate':[null],
      'fromTime':[null],
      'toTime':[null],
     

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