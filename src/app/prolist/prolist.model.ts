export class MDetails {
  mrp: number;
  costPrice: number;

  quantity: number;
  freeSample: string;
  batch: string;
  discount: number;
  itemName: string;
  manufacturedDate: string;
  expDate: string;
  gst: number;
  packSize: number;
}

export class MedicineDetails {
  draft: string;
  procurementId: string;
  location: string;
  vendorName: string;
  invoiceNo: string;
  poNo: string;
  status: string;
  procurementType: string;
  currency: string;
  role: string;
  refMedicineDetails: MDetails[] = [];
}
