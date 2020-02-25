export class NewReturn { 
    location: string;
    billNo: string;
    regId:string
    paymentType: string;
    total?: number;
    refSalesReturns:SaleDetail[]=[];
}

export class Mutliple{
    // payType:string="Cash";
    payType:string;
    amount:number
}

export class Type {
    text: string;
    allowed: boolean;
    
    constructor (text: string, allowed: boolean) {
      this.text = text;
      this.allowed = allowed;
    }
}

export class SaleDetail { 
    saleId:string
    medicineName: string;
    mrp?: number;
    batchNo?: string;
    discount?: number;
    org_quantity?: number;
    quantity: number;
    amount: number;
    gst?: number;
    expDate:number
    constructor( saleId:string,medicineName: string, mrp: number, batchNo: string, discount: number, org_quantity:number, quantity: number, amount: number, gst: number,expireDate:number) { 
       
       this.saleId=saleId
        this.medicineName = medicineName;
        this.mrp = mrp;
        this.batchNo = batchNo;
        this.discount = discount;
        this.org_quantity = org_quantity;
        this.quantity = quantity;
        this.amount = amount;
        this.gst = gst;
        this.expDate =expireDate
    }
}

export class BillDetail { 
    billNo: string;
    billDate: string;
    name: string;
    regId: string;
    mobile: number;
    location: string;
   paymentType: string;
}
//{"location":"Miyapur","billNo":"BL0000009","refSalesReturns":[{"amount":1200,"quantity":1,"medicineName":"Asprin"},{"amount":1200,"quantity":1,"medicineName":"Asprin"}]}