import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { ItemledgerreportService } from './itemledgerreport.service';
import { AnonymousSubject } from 'rxjs/Rx';
import * as moment from 'moment';
@Component({
  selector: 'app-itemledgerreport',
  templateUrl: './itemledgerreport.component.html',
  styleUrls: ['./itemledgerreport.component.css']
})
export class ItemledgerreportComponent implements OnInit {
  reports: any = [];
  medicinename: any;
  fromDate: any;
  toDate: any;
  ItemreportForm: FormGroup;

  constructor(private _http: ItemledgerreportService, private fb: FormBuilder) {

    this.ItemreportForm = fb.group({

      'medicinename': [null],
      'fromDate': [null],
      'toDate': [null],

    })
  }

  ngOnInit() {
    this.showData()
  }

  medicinenamef(event) {
    this.medicinename = event.medicinename
  }



  showData() {
    this._http.getAll()
      .subscribe(
      response => {


        // response[8].forEach(r => r['fullName'] = r.firstName +' ' +(r.middleName?r.middleName:' ') + ' '+r.lastName +'-'+r.userId);

        this.reports = response;
        console.log("reports" + JSON.stringify(response));

      }, );
  }

  All = []
  save(value: any) {

    let par = {
      "medicinename": this.medicinename,
      "fromDate": moment(this.fromDate).format('YYYY-MM-DD'),
      "toDate": moment(this.toDate).format('YYYY-MM-DD'),

    }
    this._http.postCreate(par)
      .subscribe(

      data => {
        this.All = data;
        //  this.ambulanceNO = data.ambulanceNO;
        console.log("data**" + JSON.stringify(data));
      },

    );
  }

  reset() {
    this.ItemreportForm.reset();
    // this.Register = []; 
    // this.Register[0] = new Service();
  }
}