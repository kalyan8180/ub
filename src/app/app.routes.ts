import { UserExistComponent } from "./user-exist/user-exist.component";

import { RegistrationComponent } from "./registration/registration.component";

import { ExistingComponent } from "./existing/existing.component";
import { UserComponent } from "src/app/user/user.component";
import { ExistVendorsComponent } from "src/app/exist-vendors/exist-vendors.component";

import { ProcurmentComponent } from "src/app/procurment/procurment.component";
import { ItemComponent } from "src/app/item/item.component";
import { ItemlistComponent } from "src/app/item/itemlist/itemlist.component";
import { InvoiceComponent } from "src/app/item/itemlist/invoice/invoice.component";

import { ProlistComponent } from "src/app/prolist/prolist.component";
import { SalemanagementComponent } from "src/app/salemanagement/salemanagement.component";

import { ReturnComponent } from "src/app/return/return.component";
import { RefundComponent } from "src/app/refund/refund.component";
import { VendorComponent } from "src/app/vendor/vendor.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NurseComponent } from "./nurse/nurse.component";
import { LabComponent } from "src/app/lab/lab.component";

import { DoctorComponent } from "src/app/doctor/doctor.component";
import { LabAdminComponent } from "src/app/lab-admin/lab-admin.component";

import { ServicesComponent } from "src/app/services/services.component";
import { ServicesService } from "src/app/services/services.service";

import { ServiceslistComponent } from "src/app/serviceslist/serviceslist.component";
import { ServiceslistService } from "src/app/serviceslist/serviceslist.service";
import { BillComponent } from "src/app/bill/bill.component";
import { LoginComponent } from "./login/login.component";
// import { AuthGuard } from './guards/auth.guard';

import { PatientlistComponent } from "src/app/patientlist/patientlist.component";
import { LabresultComponent } from "src/app/labresult/labresult.component";
import { ReportComponent } from "./report/report.component";
import { OutpatientlistComponent } from "./outpatientlist/outpatientlist.component";
import { AmbulanceComponent } from "./ambulance/ambulance.component";
import { AmbulancelistComponent } from "./ambulancelist/ambulancelist.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { AppointmentlistComponent } from "./appointmentlist/appointmentlist.component";
import { InventoryreportsComponent } from "src/app/inventoryreports/inventoryreports.component";
import { PaymentvocherComponent } from "src/app/paymentvocher/paymentvocher.component";
import { ReferraldrComponent } from "src/app/referraldr/referraldr.component";
import { ReferraldrlistComponent } from "src/app/referraldrlist/referraldrlist.component";
import { OtherreportsComponent } from "src/app/otherreports/otherreports.component";
import { AdmindoctorviewComponent } from "src/app/admindoctorview/admindoctorview.component";
import { CountComponent } from "src/app/count/count.component";
import { DuebillsComponent } from "src/app/duebills/duebills.component";
import { OspbillingComponent } from "src/app/ospbilling/ospbilling.component";
import { OspbillinglistComponent } from "src/app/ospbillinglist/ospbillinglist.component";
import { AuthGuard } from "src/app/inventoryreports/guards/auth.guard";
import { PaymentvoucherComponent } from "src/app/paymentvoucher/paymentvoucher.component";
import { SaleslistComponent } from "src/app/saleslist/saleslist.component";
import { BedallocationComponent } from "src/app/bedallocation/bedallocation.component";
import { WardonlineComponent } from "src/app/wardonline/wardonline.component";
import { PharmacylistComponent } from "src/app/pharmacylist/pharmacylist.component";
import { ItemledgerreportComponent } from "src/app/itemledgerreport/itemledgerreport.component";
import { OpIpEditComponent } from "src/app/op-ip-edit/op-ip-edit.component";
import { OtherPatientsComponent } from "src/app/other-patients/other-patients.component";
import { MonthlyprogressComponent } from "src/app/monthlyprogress/monthlyprogress.component";
import { OspEditComponent } from "src/app/osp-edit/osp-edit.component";
import { AdminCancelComponent } from "src/app/admin-cancel/admin-cancel.component";
import { UpdatepaymentComponent } from "src/app/updatepayment/updatepayment.component";
import { StockreportComponent } from "./stockreport/stockreport.component";
import { HealthchekupComponent } from "src/app/healthchekup/healthchekup.component";
import { CheckupComponent } from "src/app/checkup/checkup.component";
export const appRoutes = [
  { path: "", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "osp-edit", component: OspEditComponent, canActivate: [AuthGuard] },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "itemledgerreport",
    component: ItemledgerreportComponent,
    canActivate: [AuthGuard]
  },
  // { path: 'register', component: RegistrationComponent, canActivate: [AuthGuard] },
  {
    path: "register",
    loadChildren: "../app/registration/registration.module#RegistrationModule",
    canActivate: [AuthGuard]
  },
  {
    path: "existing",
    loadChildren: "../app/existing/existing.module#ExistingModule",
    canActivate: [AuthGuard]
  },
  // {
  //     path: "existvendor",
  //     loadChildren:
  //     "../app/exist-vendors/exist-vendors.module#ExistvendorsModule",
  //     canActivate: [AuthGuard]
  // },
  // { path: 'existing', component: ExistingComponent, canActivate: [AuthGuard] },
  {
    path: "user",
    loadChildren: "../app/user/user.module#UserModule",
    canActivate: [AuthGuard]
  },

  {
    path: "vendor",
    loadChildren: "../app/vendor/vendor.module#VendorModule",
    canActivate: [AuthGuard]
  },
  {
    path: "wardonline",
    loadChildren: "../app/wardonline/wardonline.module#WardonlineModule",
    canActivate: [AuthGuard]
  },

  // {
  //     path: "userreg",
  //     loadChildren:
  //     "../app/user-exist/user-exist.module#UserexistModule",
  //     canActivate: [AuthGuard]
  // },
  // { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  {
    path: "ipphlist",
    component: PharmacylistComponent,
    canActivate: [AuthGuard]
  },
  { path: "userreg", component: UserExistComponent, canActivate: [AuthGuard] },
  // { path: 'vendor', component: VendorComponent, canActivate: [AuthGuard] },
  {
    path: "existvendor",
    component: ExistVendorsComponent,
    canActivate: [AuthGuard]
  },
  { path: "grn", component: ProcurmentComponent, canActivate: [AuthGuard] },
  { path: "item", component: ItemComponent, canActivate: [AuthGuard] },
  {
    path: "itemlist",
    component: ItemlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "invoice",
    component: InvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "proclist",
    component: ProlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "sale",
    component: SalemanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "return",
    component: ReturnComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "refund",
    component: RefundComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "olist",
    component: OtherPatientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse",
    component: NurseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "lab",
    component: LabComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "op-ip",
    component: OpIpEditComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "Labresult",
    component: LabresultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admindoctorview",
    loadChildren:
      "../app/admindoctorview/admindoctorview.module#AdminviewModule",
    canActivate: [AuthGuard]
  },
  // {
  //     path: 'admindoctorview', component: AdmindoctorviewComponent, canActivate: [AuthGuard]
  // },
  {
    path: "Labadm",
    component: LabAdminComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "services",
    component: ServicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "pvlist",
    component: PaymentvoucherComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "bl",
    component: BedallocationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "serviceslist",
    component: ServiceslistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bill",
    component: BillComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "patientlist",
    component: PatientlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "slist",
    component: SaleslistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "report",
    component: ReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "op",
    component: OutpatientlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "ambulance",
    component: AmbulanceComponent,
    canActivate: [AuthGuard]
  },
  { path: "duebills", component: DuebillsComponent, canActivate: [AuthGuard] },

  { path: "osp", component: OspbillingComponent, canActivate: [AuthGuard] },

  // {

  // path: 'count/:id', component:CountComponent , canActivate: [AuthGuard]
  // },
  {
    path: "count",
    component: CountComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "ambulancelist",
    component: AmbulancelistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "appointment",
    component: AppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "appointmentlist",
    component: AppointmentlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "inventorystatus",
    component: InventoryreportsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "paymentvocher",
    component: PaymentvocherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "otherreports",
    component: OtherreportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "referraldr",
    component: ReferraldrComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "referraldrlist",
    component: ReferraldrlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor",
    component: DoctorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "ospbillinglist",
    component: OspbillinglistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "monthlyprogress",
    component: MonthlyprogressComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "admin-cancel",
    component: AdminCancelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "updatepayment",
    component: UpdatepaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "stock",
    component: StockreportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "healthchekup",
    component: HealthchekupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "checkup",
    component: CheckupComponent,
    canActivate: [AuthGuard]
  }
];
