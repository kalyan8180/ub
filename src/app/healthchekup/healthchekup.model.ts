export class Mutliple {
  // payType:string="Cash";
  payType: string;
  amount: number = 0;
}

export class NewSale {
  name: string;
  mobileNo: number;
  regId: string;

  discount: number;

  authorisedBy: string;
  location: string = "Miyapur";
  // paymentType:string;
  referenceNumber: string;
  // multimode:any=[]
  total: number;

  //multiplePayment1: Mutliple[];
  //multiplePayment = [];
  refSales = [];
}
export class Patient {
  name: string;
  mobile: number;
  regId: string;
  type: string;
  location: string = "Miyapur";
  date: "new Date()";
}
export class Service {
  masterServiceName: string;
  cost: number;
  discount: number = 0;
  total: number;
  amount: number;
}
export class Type {
  text: string;
  allowed: boolean;

  constructor(text: string, allowed: boolean) {
    this.text = text;
    this.allowed = allowed;
  }
}
