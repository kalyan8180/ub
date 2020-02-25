import { Component, OnInit } from '@angular/core';
import { OspEditService } from "src/app/osp-edit/osp-edit.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-osp-edit',
  templateUrl: './osp-edit.component.html',
  styleUrls: ['./osp-edit.component.css']
})
export class OspEditComponent implements OnInit {

  constructor(private _http: OspEditService,private toastr: ToastrService) { }

  ngOnInit() {
  }
  regNo:string
  date:number
  billno:string
  patientname:string
  mobileNo:number
  Register:any=[]
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
    this._http.deleteservice(ser.masterOspServiceId)
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

    this.date=null
    this.Register=[]
  }
}
