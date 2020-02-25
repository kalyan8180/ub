import { Component, OnInit } from '@angular/core';
import { InventoryreportsService } from "src/app/inventoryreports/inventoryreports.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-inventoryreports',
  templateUrl: './inventoryreports.component.html',
  styleUrls: ['./inventoryreports.component.css']
})
export class InventoryreportsComponent implements OnInit {
  InventoryForm: FormGroup;
  fromDate: string;
  toDate: string;
  // reset: any;
  constructor(private _http:InventoryreportsService,private fb :FormBuilder) { 
    this.InventoryForm = fb.group({
      'fromDate':[null],
      'toDate':[null]
    })
  }

  ngOnInit() {
  }
  
  save(value: any)
  {
    let par = {
      "fromDate":this.fromDate,
      "toDate":this.toDate,
    }
    this._http.post(par)
       .subscribe(
       data => {
   
      console.log("data**" + JSON.stringify(data));
      window.open(data.fileuri)
    
        },
  
     );
      }
  

     reset()
     {
      this.InventoryForm.reset();
      }
  refresh()
  {
    location.reload();
  }
}
