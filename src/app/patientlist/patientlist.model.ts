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