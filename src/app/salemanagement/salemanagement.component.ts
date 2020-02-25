import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SalemanagementService } from "src/app/salemanagement/salemanagement.service";
import { from } from "rxjs";
import { groupBy, mergeMap, toArray } from "rxjs/operators";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { FormArray } from "@angular/forms";
// import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import { Observable, BehaviorSubject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
const typeColumn = ["Cash", "Card", "Due"];

import { ToastrService } from "ngx-toastr";
import {
  SaleDetail,
  NewSale,
  Medicine,
  Patient,
  Temp,
  Mutliple,
  Type
} from "./salesmanagement.model";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TempService } from "src/app/temp.service";

// import {BatchPipe} from './batch.pipe'
// import { SaleDetail } from './../wardonline/wardonline.model';
// import { SaleDetail } from 'src/app/pharmacylist/pharmacylist.model';
// import { SaleDetail } from 'src/app/wardonline/wardonline.model';
@Component({
  selector: "app-salemanagement",
  templateUrl: "./salemanagement.component.html",
  styleUrls: ["./salemanagement.component.css"]
})
export class SalemanagementComponent implements OnInit {
  @ViewChild("basic") input: ElementRef;

  refSales: SaleDetail[] = [];
  multiplePayment1: Mutliple[] = [];
  newSale: NewSale;

  saveInProgress = false;
  // pay:Payment
  // medicines: Medicine[] = [];
  medicines = [];

  Batches: Temp[] = [];
  // private _hotkeysService: HotkeysService,
  // this.medicinePriceMap[item.medName] = item.mrp;
  patient: Patient = new Patient();
  closeResult: string;
  saleForm: FormGroup;
  Locations: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private _http: SalemanagementService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private temp: TempService,
    private spinner: NgxSpinnerService
  ) {
    this.multiplePayment1[0] = new Mutliple();
    this.refSales[0] = new SaleDetail();
    this.newSale = new NewSale();
  }
  multiplePayment = [];
  disable: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  due: boolean = false;
  errorInfo: boolean = false;
  error: boolean = false;
  ngOnInit() {
    this.Locations = this.temp.getLocations();
    this.multiplePayment1[0].payType = "Cash";
    if ((this.multiplePayment1[0].payType = "Cash")) {
      this.disable = true;
      // this.cash=true
    }
    this.saleForm = this.formBuilder.group({});
    this.values[0] = "Cash";
    this.createTypesList();
    this.prepareNewBill();
    //   this._hotkeysService.add(new Hotkey('ctrl+s', (event: KeyboardEvent): boolean => {
    //     if(!(this.newSale['location']) || this.newSale['location'].trim().length == 0) {
    //       this.toastr.warning("location is mandatory");
    //       return false;
    //     } else if(!this.patient.name || this.patient.name.trim().length == 0) {
    //       this.toastr.warning("name is mandatory");
    //       return false;
    //     } else if(!this.patient.mobile || this.patient.mobile.trim().length == 0) {
    //       this.toastr.warning("mobile is mandatory");
    //       return false;
    //     }
    //     this.showModal(this.input);
    //     return false; // Prevent bubbling
    // }));
  }
  Xamount = true;
  addMore1(event) {
    // if (sale.quantity!=null)
    //
    this.Xamount = false;
    this.disable = false;
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = true;
        if (this.cashamount == parseInt(this.newSale.total.toFixed(2))) {
          this.cardamount = 0;
          this.dueamount = 0;
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = true;
          if (this.cardamount == parseInt(this.newSale.total.toFixed(2))) {
            this.cashamount = 0;
            this.dueamount = 0;
          }
        }
      });

    this.multiplePayment1.map(sale => {
      if (sale.payType === "Due") {
        this.due = true;
        if (this.dueamount == parseInt(this.newSale.total.toFixed(2))) {
          this.cashamount = 0;
          this.cardamount = 0;
        }
      }
    });
    if (this.multiplePayment1.length <= 1)
      this.multiplePayment1.push(new Mutliple());
    else {
      // if (sale.quantity==null){
      //   this.toastr.error("please enter quanity")
      // }
      this.toastr.error("only two payment types allowed");
    }
  }

  addMore(event) {
    // if (sale.quantity!=null)

    if (Object.keys(this.refSales[this.refSales.length - 1]).length > 0)
      this.refSales.push(new SaleDetail());

    // if (sale.quantity==null){
    //   this.toastr.error("please enter quanity")
    // }

    // const source = from(this.refSales);
    // //group by age
    // const example = source.pipe(
    //   groupBy(person => person.medicineName),
    //   // return each item in group as array
    //   mergeMap(group => group.pipe(toArray()))
    // );

    // const subscribe = example.subscribe(val => {
    //   this.Tarray = val;

    //   console.log(val);
    // });
  }

  onMedicineChange(event, sale) {
    if (event == undefined) {
      sale.quantity = null;
      sale.mrp = null;
      sale.Available = null;
      sale.expDate = null;
      sale.gst = null;
      sale.discount = null;
      sale.amount = null;
      sale.batchNo = null;
      sale.packSize = null;
    }
    sale.medicineName = event.medName;
  }
  billNo: string;
  billDate: string;
  medicinePriceMap: object = {};
  medicineMap: object = {};
  mrpMap: object = {};
  batchMap: object = {};
  prepareNewBill() {
    this.spinner.show();
    this.refSales[0] = new SaleDetail();
    this.newSale = new NewSale();
    this._http.getBill().subscribe(response => {
      console.log(response);
      this.spinner.hide();
      this.billNo = response[0].billNo;
      this.billDate = response[0].date;
      this.medicines = response;
      //  response.map(item => {
      //    this.medicines.push(new Medicine(item.batch, item.medName, item.mrp, item.expDate, item.gst));
      //    this.medicinePriceMap[item.medName] = item.mrp;
      //    this.medicineMap[item.medName] = {'gst':item.gst, 'mrp':item.mrp, 'batchNo': item.batch};
      //   });
    });
  }
  // onKey(event: any) {

  //     }

  reset() {
    this.newSale = new NewSale();
    this.patient = new Patient();
    this.refSales = [];
    this.refSales[0] = new SaleDetail();
    // this.multiplePayment1[0]=new Mutliple()
    this.cardamount = 0;
    this.cashamount = 0;
    this.total = 0;
    this.dueamount = 0;
  }
  numericError: boolean = false;
  checkNumeric(event) {
    const pattern = /^[0-9]*$/;
    let inputChar = event.charCode;

    if (!pattern.test(event.target.value)) {
      this.numericError = true;
      event.preventDefault();
    } else {
      this.numericError = false;
    }
  }
  setIfValid(event) {
    // alert(event);
  }
  setDetails(sale: SaleDetail) {
    return; /*
      this.refSales.map(sale => { 
        this.medicines.map(m => {
        if(m.medName == sale.medicineName){ 
          m['disabled'] = true;
        } else { 
          m['disabled'] = false;
        }
        });
      }); 
      // sale.gst = this.medicineMap[sale.medicineName].gst;
      // this.getPriceBatch(sale);
      */
  }
  calcAmount(sale) {
    if (sale.quantity > sale.Available) {
      sale.quantity = 0;
      sale.quantity_error = true;
      return;
    }
    sale.quantity_error = false;
    if (sale.packSize) {
      sale["amount"] = sale.quantity * sale.mrp;
    }

    if (sale.discount)
      sale["amount"] -= (sale["amount"] * sale.discount) / 100.0;
  }

  removeSaleItem1(index) {
    this.disable = false;
    this.Xamount = true;
    this.total = this.newSale.total;
    this.X = this.total;
    this.multiplePayment1.map(sale => {
      if (sale.payType === "Cash") {
        this.cash = false;
        if (this.cashamount <= parseInt(this.newSale.total.toFixed(2))) {
          this.cashamount = parseInt(this.newSale.total.toFixed(2));
          this.cardamount = parseInt(this.newSale.total.toFixed(2));
          this.dueamount = parseInt(this.newSale.total.toFixed(2));
        }
      }
    }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Card") {
          this.card = false;
          if (this.cardamount <= parseInt(this.newSale.total.toFixed(2))) {
            this.cashamount = parseInt(this.newSale.total.toFixed(2));
            this.cardamount = parseInt(this.newSale.total.toFixed(2));
            this.dueamount = parseInt(this.newSale.total.toFixed(2));
          }
        }
      }),
      this.multiplePayment1.map(sale => {
        if (sale.payType === "Due") {
          this.due = false;
          if (this.dueamount <= parseInt(this.newSale.total.toFixed(2))) {
            this.cashamount = parseInt(this.newSale.total.toFixed(2));
            this.cardamount = parseInt(this.newSale.total.toFixed(2));
            this.dueamount = parseInt(this.newSale.total.toFixed(2));
          }
        }
      }),
      this.multiplePayment1.splice(index, 1);
  }
  value: any;
  dis: number = 0;
  tdisamount: any;
  tamount: any;
  discountchange() {
    if (this.value ? this.value : 0 && this.tdisamount ? this.tdisamount : 0) {
      this.calculatedisamount();
      this.amount1();
      this.amount2();
    }
  }
  calculatedisamount() {
    if (this.value == "%" && this.dis<=100) {
      this.tamount = this.newSale.total;
      this.tamount -= (this.tamount * this.dis) / 100.0;
      this.tdisamount = Math.round(this.tamount ? this.tamount : 0);
      this.amount1();
      this.amount2();
      this.errorInfo = false;
      if (this.tdisamount)
        this.newSale.discount = this.newSale.total - this.tdisamount;
    }
    else{
      this.error = false;
      this.errorInfo = true;
      this.tdisamount = this.newSale.total;
    }
     if (this.value == "amt") {
       if(this.dis<=this.newSale.total){
      this.tamount = this.newSale.total;
      this.tamount =
        (this.tamount ? this.tamount : 0) - (this.dis ? this.dis : 0);
      this.tdisamount = Math.round(this.tamount ? this.tamount : 0);
      this.amount1();
      this.amount2();
      this.error = false;
      this.errorInfo = false;
      if (this.tdisamount)
        this.newSale.discount = this.newSale.total - this.tdisamount;
    }
    else{
      this.errorInfo = false;
      this.error = true;
      this.tdisamount = this.newSale.total;
    }
  }
    
  }
  removeSaleItem(index) {
    let sale = this.refSales[index];
    this.medicines.map(m => {
      if (m.medName == sale.medicineName) {
        m["disabled"] = false;
      }
    });
    console.log(this.refSales[index].amount);
    let removedTotal = this.refSales[index].amount;
    let oldTotal = this.newSale.total;
    let newTotal = oldTotal - removedTotal;
    this.refSales.splice(index, 1);
    this.newSale.total = newTotal;
    this.discountchange();
  }

  findPatientumr(event) {
    this._http.getpatientdetails(this.newSale.umr).subscribe(
      user => {
        this.patient.name = user.name;
        this.patient.mobile = user.mobile;
        this.patient.type = user.type;
        // if (this.patient.type == "OUTPATIENT") {
        //   var typeColumn = ["Cash", "Card"];
        // }
        // this.createTypesList();
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }

  // getscores() {
  //   this._http.getscores().subscribe(
  //     response => {
  //       console.log(response);
  //     },
  //     err => {
  //       this.toastr.error(
  //         err["error"] ? err["error"].message : "Error Occured!"
  //       );
  //     },
  //     () => {}
  //   );
  // }

  findPatient(event) {
    this._http.getPatient(this.newSale.regId).subscribe(
      user => {
        this.patient.name = user.name;
        this.patient.mobile = user.mobile;
        this.patient.type = user.type;
        // if (this.patient.type == "OUTPATIENT") {
        //   var typeColumn = ["Cash", "Card"];
        // }
        // this.createTypesList();
      },
      err => {
        this.toastr.error(
          err["error"] ? err["error"].message : "Error Occured!"
        );
      },
      () => {}
    );
  }
calculateTotal(){  
  this.refSales = this.refSales.filter(
    sale => Object.keys(sale).length !== 0
  );
  this.refSales = this.refSales.filter(sale => sale.quantity > 0);
  if (this.refSales.length == 0) {
    this.toastr.error("Please fill Medicine Details!");

    this.refSales = [];
    this.refSales[0] = new SaleDetail();
    return;
  }
  let total = 0;
  this.dis = 0;
  this.refSales.map(
    sale => (total = (total ? total : 0) + (sale.amount ? sale.amount : 0))
  );
  this.newSale.total = Math.round(total ? total : 0);
  this.X = this.newSale.total;
    this.cashamount = parseInt(this.newSale.total.toFixed(2));
    this.cardamount = parseInt(this.newSale.total.toFixed(2));
    this.dueamount = parseInt(this.newSale.total.toFixed(2));
    this.tdisamount = this.newSale.total;
}

  showModal(basic: any) {
    // this.newSale.paymentType = "Cash";

    this.refSales = this.refSales.filter(
      sale => Object.keys(sale).length !== 0
    );
    this.refSales = this.refSales.filter(sale => sale.quantity > 0);
    if (this.refSales.length == 0) {
      // if(this.refSales.filter(sale => sale.quantity > 0))
      //   {
      //     this.toastr.error("Quantity should not be 0")
      //   }
      this.toastr.error("Please fill Medicine Details!");

      this.refSales = [];
      this.refSales[0] = new SaleDetail();
      return;
    }

    // let total = 0;
    // this.dis = 0;
    // this.refSales.map(
    //   sale => (total = (total ? total : 0) + (sale.amount ? sale.amount : 0))
    // );
    // this.newSale.total = Math.round(total ? total : 0);
     this.newSale.refSales = this.refSales;
    this.calculatedisamount();
    //this.X = this.newSale.total;
    this.cashamount = parseInt(this.newSale.total.toFixed(2));
    this.cardamount = parseInt(this.newSale.total.toFixed(2));
    this.dueamount = parseInt(this.newSale.total.toFixed(2));

    this.cardamount=0;
    this.dueamount=0;
    this.modalService
      .open(basic, {
        ariaLabelledBy: "modal-basic-title",
        backdrop: "static",
        keyboard: false
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  // Batches:any=[]

  setBatches(sale) {
    let par = {
      med: sale.medicineName
    };
    this._http.getBatch(par).subscribe(response => {
      sale.quantity = null;
      sale.mrp = null;
      sale.Available = null;
      sale.expDate = null;
      sale.gst = null;
      sale.discount = null;
      sale.amount = null;
      sale.batches = response.map(item => item.batch);
      sale.batchNo = sale.batches[0];
      this.setMedicineDetails(sale);
      this.calcAmount(sale);
      console.log("batches" + JSON.stringify(response));
    });
  }

  // setBatches(sale)
  // {
  //   this._http.getBatch(sale.medicineName)
  //   .subscribe(
  //   response => {
  //     sale.quantity =null
  //     sale.mrp = null
  //     sale.Available =null
  //     sale.expDate =null
  //     sale.gst =null
  //     sale.discount =null
  //     sale.amount =null
  //     sale.batches = response.map(item => item.batch);
  //     sale.batchNo = sale.batches[0];
  //     this.setMedicineDetails(sale);
  //     this.calcAmount(sale)
  //    console.log("batches" + JSON.stringify(response));

  //   },

  // );

  // }

  // setMedicineDetails(sale)
  // {
  //   this._http.getMedicineDetails(sale.batchNo,sale.medicineName)
  //   .subscribe(
  //   response => {

  //    console.log("Medicines" + JSON.stringify(response));

  //    sale.mrp =((response.mrp)/(response.packSize));
  //    sale.Available=response.Available;
  //    sale.expDate=response.ExpDate
  //    sale.gst = response.Gst
  //    sale.packSize = response.packSize
  //    if( sale.quantity > sale.Available){
  //     sale.quantity = 0;
  //     sale.quantity_error = true;

  //     return;
  //   }
  //   sale.quantity_error = false;

  //   if(sale.packSize){
  //     sale['amount'] = (sale.quantity)*(sale.mrp);
  //   }

  //         if(sale.discount){
  //           sale['amount'] -= sale['amount']*(sale.discount)/100.0;
  //         }

  //   },
  //   (err) => {
  //     this.toastr.error("No Medicines available for this batch")
  //     sale.mrp = null
  //     sale.Available =null
  //     sale.expDate =null
  //     sale.gst =null
  //     sale.discount =null
  //     sale.amount =null
  //     sale.quantity =null
  //   }
  // );
  // }

  setMedicineDetails(sale) {
    let par = {
      med: sale.medicineName,
      batch: sale.batchNo
    };
    this._http.getMedicineDetails(par).subscribe(
      response => {
        console.log("Medicines" + JSON.stringify(response));

        sale.mrp = (response.mrp / response.packSize).toFixed(2);
        sale.Available = response.Available;
        sale.expDate = response.ExpDate;
        sale.gst = response.Gst;
        sale.packSize = response.packSize;
        if (sale.quantity > sale.Available) {
          sale.quantity = 0;
          sale.quantity_error = true;

          return;
        }
        sale.quantity_error = false;

        if (sale.packSize) {
          sale["amount"] = sale.quantity * sale.mrp;
        }

        if (sale.discount) {
          sale["amount"] -= (sale["amount"] * sale.discount) / 100.0;
        }
      },
      err => {
        this.toastr.error("No Medicines available for this batch");
        sale.mrp = null;
        sale.Available = null;
        sale.expDate = null;
        sale.gst = null;
        sale.discount = null;
        sale.amount = null;
        sale.quantity = null;
      }
    );
  }
  noofClick: number = 0;
  save() {
    this.noofClick = this.noofClick + 1;
    if (this.noofClick > 0 && this.noofClick == 1) {
      this.saveInProgress = true;

      // if(this.refSales[length].quantity)
      //   {
      //     this.toastr.error("sale quanity ")
      //     return

      //   }
      // var groupArray = require("group-array");

      // this.newSale.refSales = groupArray(this.refSales, "medicineName");

      // this.saveInProgress = true;

      //    if(this.refSales.map(sale=>{if(sale.quantity<=0)
      //     {

      //       this.toastr.error("Quanity Should not be 0")
      //     }}
      //   )

      //   )
      //  return

      if (this.newSale.regId == null) {
        (this.newSale.name = this.patient.name),
          (this.newSale.mobileNo = +this.patient.mobile);
      }

      if (this.multiplePayment1.length > 1) {
        this.newSale.multiplePayment = [
          {
            payType: this.multiplePayment1[0].payType,
            amount: this.X
          },

          {
            payType: this.multiplePayment1[1].payType,
            amount: this.Y
          }
        ];
      } else {
        this.newSale.multiplePayment = [
          {
            payType: this.multiplePayment1[0].payType,
            amount: this.X
          }
        ];
      }
      // this.multiplePayment1.map(

      //   sale=> {if(sale.payType==='Cash')
      // {
      //   let multiplePayment:any=[]
      //   this.newSale.multiplePayment.push({"payType":"Cash",
      //    "amount":this.cashamount})
      // }}

      //  );
      //  this.multiplePayment1.map(
      //  sale=> {if(sale.payType==='Due')
      //  {
      //    let multiplePayment:any=[]
      //    this.newSale.multiplePayment.push({"payType":"Due",
      //     "amount":this.dueamount})
      //  }}

      //   );
      //  this.multiplePayment1.map(

      //   sale=> {if(sale.payType==='Card')
      // {
      //   let multiplePayment:any=[]
      //   this.newSale.multiplePayment.push({"payType":"Card",
      //   "amount":this.cardamount})
      // }}

      //  );

      //     if(this.multiplePayment1[0].payType==="Cash")
      //       {
      // let multiplePayment:any=[]
      //       this.newSale.multiplePayment.push({"payType":"Cash",
      //        "amount":this.cashamount})

      //      }

      //      if(this.multiplePayment1[1].payType==="Card")
      //       {
      //         let multiplePayment:any=[]
      //        this.newSale.multiplePayment.push({"payType":"Card",
      //        "amount":this.cardamount})

      //      }

      // if(this.multiplePayment[0].payType!=null)
      //   {
      //     this.newSale.multiplePayment=this.multiplePayment
      //   }
      // if (this.newSale.paymentType === "Cash+Card") {
      //   let multimode: any = []
      //   this.newSale.multimode.push({
      //     "mode": "cash",
      //     "amount": this.cashamount
      //   },
      //     {
      //       "mode": "card",
      //       "amount": this.cardamount.toString()
      //     })
      // }

      this._http.post(this.newSale).subscribe(
        data => {
          console.log("data**" + JSON.stringify(data));

          window.open(data.fileuri);
          location.reload();

          //
          //this.router.navigate(['/sale']);
        },

        err => {
          this.saveInProgress = false;
          this.toastr.error(
            err["error"] ? err["error"].message : "Error Occured!"
          );
          this.newSale.multiplePayment = [];
        },
        () => {
          this.saveInProgress = false;
          this.toastr.success("sales created sucessfully");
          location.reload();
        }
      );
    } else {
      this.saveInProgress = true;
    }
  }

  cardamount: number;
  cashamount: number;
  amount: any;
  dueamount: number;
  total: number;
  // currentamount(c)
  // {
  // c.amount=(this.newSale.total)-(c.amount)
  // }

  getPresentAmount(c) {
    c.amount = this.newSale.total;
  }

  // getduecashcard(c)
  // {
  //   this.amount = (this.newSale.total).toFixed(2)
  // if(c.payType==="Due")
  //   if(this.cashamount && this.cardamount)
  //     {

  //      this.cashamount=(this.amount)/3
  //      this.cardamount=(this.amount)/3
  //      this.dueamount=(this.amount)/3
  //     }

  // }
  paymenttype: string;
  paytype(event) {
    this.paymenttype = event.payType;
    console.log(this.paymenttype);
  }
  getduecardamount() {
    this.amount = this.newSale.total.toFixed(2);
    if (this.dueamount > this.amount) {
      this.total_error = true;
    }
    if (this.dueamount) {
      this.cardamount = this.amount - (this.dueamount ? this.dueamount : 0);
    }
  }

  getduecashamount() {
    this.amount = this.newSale.total.toFixed(2);
    if (this.dueamount > this.amount) {
      this.total_error = true;
    }
    if (this.dueamount) {
      this.cashamount = this.amount - (this.dueamount ? this.dueamount : 0);
    }
  }
  total_error = false;
  getcashamount() {
    this.amount = this.newSale.total.toFixed(2);
    if (this.cardamount > this.amount) {
      this.total_error = true;
    }

    console.log(this.amount);
    this.cashamount = this.amount - this.cardamount;
  }

  getcardamount() {
    this.amount = this.newSale.total.toFixed(2);
    if (this.cashamount > this.amount) {
      this.total_error = true;
    }
    this.cardamount = this.amount - this.cashamount;
  }

  getcashDueamount() {
    this.amount = this.newSale.total.toFixed(2);
    if (this.cashamount > this.amount) {
      this.total_error = true;
    }
    if (this.cashamount) this.dueamount = this.amount - this.cashamount;
  }

  getcardDueamount() {
    this.amount = this.newSale.total.toFixed(2);
    if (this.cardamount > this.amount) {
      this.total_error = true;
    }
    if (this.cardamount) this.dueamount = this.amount - this.cardamount;
  }

  X: number;
  Y: number = 0;

  amount2() {
    this.total = this.tdisamount;
    if (this.X > this.total) {
      this.X = 0;
    }

    this.Y = this.total - this.X;
  }
  amount1() {
    this.total = this.tdisamount;

    if (this.Y > this.total) {
      this.Y = 0;
    }
    this.X = this.total - this.Y;
  }
  row: boolean = true;
  secondrow() {
    this.row = false;
  }
  secondrowremove() {
    this.row = true;
    this.X = this.tdisamount;
    this.Y = 0;
  }
  values: Array<string> = [];

  types$ = new BehaviorSubject([]);
  // An array for looping selectors in template
  options = Array.from({ length: 1 });
  // An array for collect all chosen values

  changed(data, optI) {
    // Change chosen data in chosen list with index of selector

    this.values[optI] = data;
    // Reform the chosen list
    this.createTypesList();
  }

  /**
   * The method which form all option types according to chosen values
   */
  private createTypesList() {
    // if (this.patient.type == "OUTPATIENT") {
    //   var typeColumn = ["Cash", "Card"];
    // } else {
    //   var typeColumn = ["Cash", "Card", "Due"];
    // }

    let types = [];
    // For all types check if they were chosen
    typeColumn.forEach(type => {
      // if current type in array of chosen
      let selected = this.values.includes(type);
      // push current type with its status
      types.push(new Type(type, !selected));
    });

    // Send messages to mat-option in our template
    this.types$.next(types);
  }
}
