export class grnDetails {
  saleQty: string;
  detailedQty: string;
  medicineName: string;
  closingQty: string;
  modifiedQty: number;
  Modify: number;
  constructor(
    detailedQty: string,
    saleQty: string,
    closingQty: string,
    Modify: number,
    modifiedQty: number
  ) {
    this.detailedQty = detailedQty;
    this.saleQty = saleQty;

    this.closingQty = closingQty;
    this.Modify = Modify;
    this.modifiedQty = modifiedQty;
  }
}
