export  class Bill {
    quantity:number;
    discount:number;
    mrp:number;
    chargeName:string;
    amount:number;
    netAmount:number;
    multiplePayment1:Mutliple[];
  
    total:number
}


export class Type {
    text: string;
    allowed: boolean;
    
    constructor (text: string, allowed: boolean) {
      this.text = text;
      this.allowed = allowed;
    }
}
export class Mutliple{
    // payType:string="Cash";
    payType:string;
    amount:number
}
export class edit{
    chargeBillId:string
  amount:number
mrp:number;
chargeName:number;
quantity:number;
discount:number;
netAmount:number;
paid:string
total2:number=0
type:string

    }
  