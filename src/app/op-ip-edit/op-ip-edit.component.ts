import { Component, OnInit } from '@angular/core';
import { OpIpEditService } from "src/app/op-ip-edit/op-ip-edit.service";
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-op-ip-edit',
  templateUrl: './op-ip-edit.component.html',
  styleUrls: ['./op-ip-edit.component.css']
})
export class OpIpEditComponent implements OnInit {

  constructor(private _http: OpIpEditService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  billno: string
  patientname: string
  mobileNo: number
  date: any
  labRegId: string
  regNo: string
  Register: any = []
  showDetails() {
    this._http.getDetails(this.billno)
      .subscribe(
      response => {
        this.regNo = response[0][0].regNo
        this.date = response[0][0].date
        this.patientname = response[0][0].name
        this.mobileNo = response[0][0].mobileNo
        this.Register = response[1]
        console.log("services" + JSON.stringify(response));

      }, );
  }


  deleteservice(ser) {
    this._http.deleteservice(ser.labRegId)
      .subscribe(
      response => {

        this.showDetails()
        this.Register=response
        console.log("services" + JSON.stringify(response));

      },


      (err) => {

        this.toastr.error(err['error'] ? err['error'].message : 'Error Occured!');

      },
      () => {
        this.toastr.success("Deleted  service sucessfully");
      }
      );
  }

  reset()
  {
    this.billno=null
    this.mobileNo=null
    this.patientname=null
    this.regNo=null
    this.date=null
    this.Register=[]
  }
}
