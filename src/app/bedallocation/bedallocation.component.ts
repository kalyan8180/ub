import { Component, OnInit } from '@angular/core';
import { BedallocationService } from './bedallocation.service';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormControl, NgModel } from "@angular/forms";
import { Http } from "@angular/http";
import moment from 'moment/src/moment';
import { HttpModule } from '@angular/http';
import { TabsetComponent } from 'ngx-bootstrap';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bedallocation',
  templateUrl: './bedallocation.component.html',
  styleUrls: ['./bedallocation.component.css']
})
export class BedallocationComponent implements OnInit {
  bType:string
  floor:string
  BedForm: (controlsConfig: { [key: string]: any; }, extra?: { [key: string]: any; }) => FormGroup;
  bedId: any;
  floorNo: any;
  staticTabs: any;
  bed: any;
  constructor(private fb: FormBuilder, private _http: BedallocationService, private modalService: NgbModal) { 
    // this.BedForm = fb.group({

    // })
  }

  ngOnInit() {
     this.showOfBeds(); 
  }
  BEDS:any=[]
  showOfBeds() {
    this._http.getFloors()
      .subscribe(
      response => {
        this.BEDS = response.floors
        // this.WARDS=data.wards
        console.log(" BEDS " + JSON.stringify(response)); 
      },
    );
   }   
  
  // WARDS=[]
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        if (!map.has(key)) {
            map.set(key, [item]);
        } else {
            map.get(key).push(item);
        }
    });
    return map;
}

  All:any=[]
  floorBeds = []
  bedRows = [];
  bedTypes =[];
  showBeds(floor) {  
    this.bedRows = [];
    this.bedTypes = [];
    this._http.getBeds(floor)
      .subscribe(
      response => {
        this.floorBeds[floor] = response;
        this.groupBy(this.floorBeds[floor], bed => bed.roomType).forEach((value, key, map) => { 
          this.bedRows[key] = value;
          this.bedRows[key]['total'] = value.length;
          this.bedRows[key]['occupied'] = value.filter(bed => bed.status == 'OCCUPIED').length;
          this.bedRows[key]['allocate'] = value.filter(bed => bed.status == 'ALLOCATE').length;
          this.bedTypes.push(key);
        });
        console.log(" floor " + JSON.stringify(response));
        // beds[floor]=
      // this.bed=response.bedName;
      },
    );
  } 
    
    getColor(status) {
      switch (status) {
        case 'ALLOCATE':
          return 'green';
        case 'DISCHARGING':
          return 'blue';
        case 'OCCUPIED':
          return 'red';
      }
    // selectTab(tabId: number) {
    //     this.staticTabs.tabs[tabId].active = true; 
    // }
    }
  }