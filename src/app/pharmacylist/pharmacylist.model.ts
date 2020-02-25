export class NewReturn {
  location: string = "Miyapur";
  billNo: string;
  regId: string;
  paymentType: string = "Cash";
  total?: number;
  refSalesReturns: SaleDetail[] = [];
}

export class Mutliple {
  // payType:string="Cash";
  payType: string;
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
export class SaleDetail {
  saleId: string;
  billNo: string;
  date: any;
  paymentType: string;
  batchNo?: string;
  NetAmount: number;
  MedId: string;
  medicineName: string;
  mrp?: number;
  discount: number;
  org_quantity?: number;
  quantity: number;
  Paid: string;
  amount: number;
  patientName: string;
  constructor(
    saleId: string,

    date: any,
    billNo: string,
    patientName: string,
    MedId: string,
    MedName: string,
    mrp: number,
    org_quantity: number,
    Quantity: number,
    discount: number,
    Paid: string,
    amount: number,
    NetAmount: number,
    batchNo: string,
    paymentType: string
  ) {
    this.saleId = saleId;
    this.date = date;
    this.medicineName = MedName;
    this.paymentType = paymentType;
    this.mrp = +mrp;
    this.batchNo = batchNo;
    this.billNo = billNo;
    this.quantity = Quantity;
    this.org_quantity = org_quantity;
    this.patientName = patientName;
    this.NetAmount = NetAmount;
    this.MedId = MedId;
    this.Paid = Paid;
    this.discount = discount;
    this.amount = amount;
  }
}
