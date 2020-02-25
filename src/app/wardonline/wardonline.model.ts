export class SaleDetail { 
    medicineName: string;
    mrp: number;
     batchNo:string;
    discount:number;
  quantity: number;
    amount: number;
    gst: number;
    expDate:string;
    packSize:number
   
    batches?:string[];
}

export class NewSale { 
    name: string; 
    location:string="Miyapur";
    total:number;
    refSales:SaleDetail[]
}
 