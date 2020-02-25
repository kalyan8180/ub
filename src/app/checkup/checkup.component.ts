import { Component, OnInit } from "@angular/core";
import { CheckupService } from "src/app/checkup/checkup.service";
import { FormBuilder } from "@angular/forms";
import { Service, NewSale } from "./checkup.model";
import { FormGroup, Validators } from "@angular/forms";
import { Patient } from "../lab/lab.model";
@Component({
  selector: "app-checkup",
  templateUrl: "./checkup.component.html",
  styleUrls: ["./checkup.component.css"]
})
export class CheckupComponent implements OnInit {
  newSale: NewSale;
  Register: any = [];
  disableBtn: boolean = false;
  constructor(private _http: CheckupService) {
    this.newSale = new NewSale();
    this.Register[0] = new Service();
  }

  ngOnInit() {
    this.showDetails();
  }
  addMore(event) {
    this.Register.push(new Service());
  }
  removeSaleItem(index) {
    let reg = this.Register[index];
    // this.Details[1].map(sale => {
    //   if (sale.serviceName == reg.serviceName) {
    //     sale["disabled"] = false;
    //   }
    // });
    this.Register.splice(index, 1);
  }

  onServiceNameSelect(event, ser) {
    if (event == undefined) {
      ser.serviceName = null;
    } else {
      ser.serviceName = event.serviceName;
    }
  }

  Details = [];
  showDetails() {
    this._http.getBill().subscribe(response => {
      this.Details = response;

      console.log("response" + JSON.stringify(response[1]));
    });
  }
  serviceNameList: any = [];
  pushServiceNames() {
    this.serviceNameList = this.Register.serviceName;
    console.log(this.serviceNameList);
  }
  save() {
    this.disableBtn = true;
    let param = {
      masterServiceName: this.newSale.masterServiceName,
      cost: this.newSale.cost,
      addCheckUp: this.Register
    };
    this._http.postCreate(param).subscribe(data => {
      console.log("data**" + JSON.stringify(data));
    });
  }
  reset() {
    // this.Register[0] = new Service();
    // this.newSale = new NewSale();
    // this.newSale = new NewSale();
    // this.Register = [];
    window.location.reload();
  }
}
