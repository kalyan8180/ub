export class Service {
    serviceName: string
    price: number
    quantity: number = 1
    discount: number = 0;
    amount: number
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