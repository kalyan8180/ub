export class SaleDetail {
  medicineName: string;
  mrp: number;
  batchNo: string;
  // discount: number;
  push(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  quantity: number;
  amount: number;
  gst: number;
  expDate: string;
  packSize: number;

  batches?: string[];
}

export class Mutliple {
  // payType:string="Cash";
  payType: string;
  amount: number;
}

export class NewSale {
  name: string;
  mobileNo: number;
  regId: string;
  umr: string;
  discount: number;

  authorisedBy: string;
  location: string = "Miyapur";
  // paymentType:string;
  referenceNumber: string;
  // multimode:any=[]
  total: number;

  multiplePayment1: Mutliple[];
  multiplePayment = [];
  refSales: SaleDetail[];
}

export class Medicine {
  batch: string;
  medName: string;
  mrp: number;
  expDate: string;
  gst: string;
  constructor(
    batch: string,
    medName: string,
    mrp: number,
    expDate: string,
    gst: string
  ) {
    this.batch = batch;
    this.medName = medName;
    this.expDate = expDate;
    this.gst = gst;
  }
}
export class Temp {
  batch: string;
  constructor(batch: string) {
    this.batch = batch;
  }
}

export class Patient {
  name: string;
  mobile: number;
  regId: string;
  type: string;
}

export class Type {
  text: string;
  allowed: boolean;

  constructor(text: string, allowed: boolean) {
    this.text = text;
    this.allowed = allowed;
  }
}
