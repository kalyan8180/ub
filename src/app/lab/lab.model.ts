export class Service {
  serviceName: string;
  quantity: number = 1;
  discount: number = 0;
  total: number;
  amount: number;
}

export class Patient {
  name: string;
  type: string;
}
export class Mutliple {
  // payType:string="Cash";
  payType: string;
  amount: number = 0;
}
export class Nikhil {
  regid: string = "";
}
// export class Type {

//     allowed: boolean;

//     constructor ( allowed: boolean) {

//       this.allowed = allowed;
//     }
export class Type {
  text: string;
  allowed: boolean;

  constructor(text: string, allowed: boolean) {
    this.text = text;
    this.allowed = allowed;
  }
}
