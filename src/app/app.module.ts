import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgModule, ChangeDetectorRef } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AppComponent } from "./app.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingBarModule, LoadingBarService } from "ngx-loading-bar";
import {MatExpansionModule} from '@angular/material/expansion';
// import { LoadingModule } from 'ngx-loading';
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatGridListModule } from "@angular/material/grid-list";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Navigation } from "./navigation/navigation.component";
import { MatPaginatorModule } from "@angular/material/paginator";
// import {NgxPaginationModule} from 'ngx-pagination';
// import { MatPaginatorModule } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
// <-- import the module
// import {DataTableModule} from "angular-6-datatable";
import { MatTableModule, MatSortModule } from "@angular/material";
import { UserExistComponent } from "./user-exist/user-exist.component";
import { AppointmentComponent } from "src/app/appointment/appointment.component";
import { AppointmentlistComponent } from "src/app/appointmentlist/appointmentlist.component";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { HotkeyModule } from "angular2-hotkeys";

import {
  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter
} from "@angular/material";
import { NgxSpinnerModule } from "ngx-spinner";
import { RegistrationComponent } from "./registration/registration.component";

// import { VendorComponent } from "src/app/vendor/vendor.component";
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { RegisterService } from "src/app/registration/register.service";

import { ExistingComponent } from "./existing/existing.component";
// import { UserComponent } from "src/app/user/user.component";
import { ExistVendorsComponent } from "src/app/exist-vendors/exist-vendors.component";
import { VendorService } from "src/app/vendor/vendor.service";
import { ProcurmentComponent } from "src/app/procurment/procurment.component";
import { ItemComponent } from "src/app/item/item.component";
import { ItemlistComponent } from "src/app/item/itemlist/itemlist.component";
import { InvoiceComponent } from "src/app/item/itemlist/invoice/invoice.component";
import { ItemlistService } from "src/app/item/itemlist/itemlist.service";
import { ProcurmentService } from "src/app/procurment/procurment.service";
import { ProlistComponent } from "src/app/prolist/prolist.component";
import { ProlistService } from "src/app/prolist/prolist.service";
import { InvoiceService } from "src/app/item/itemlist/invoice/invoice.service";
import { SalemanagementService } from "src/app/salemanagement/salemanagement.service";
import { SalemanagementComponent } from "src/app/salemanagement/salemanagement.component";
import { ReturnComponent } from "src/app/return/return.component";
import { RefundComponent } from "src/app/refund/refund.component";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { NgxPaginationModule } from "ngx-pagination";
import { Topnavbar } from "./topnavbar/topnavbar.component";
import { appRoutes } from "./app.routes";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { ToastrModule } from "ngx-toastr";
import { DashboardComponent } from "../app/dashboard/dashboard.component";
import { NurseComponent } from "src/app/nurse/nurse.component";
import { NurseService } from "src/app/nurse/nurse.service";
import { LabComponent } from "src/app/lab/lab.component";
import { LabService } from "src/app/lab/lab.service";
import { DoctorComponent } from "src/app/doctor/doctor.component";

import { DoctorService } from "src/app/doctor/doctor.service";
import { LabAdminComponent } from "src/app/lab-admin/lab-admin.component";
import { LabAdminService } from "src/app/lab-admin/lab-admin.service";

import { ServicesComponent } from "src/app/services/services.component";
import { ServicesService } from "src/app/services/services.service";

import { ServiceslistComponent } from "src/app/serviceslist/serviceslist.component";
import { ServiceslistService } from "src/app/serviceslist/serviceslist.service";
import { BillComponent } from "src/app/bill/bill.component";
import { LoginComponent } from "./login/login.component";
import { AuthenticationService } from "./services/authentication.service";
import { AlertService } from "./services/alert.service";
// import { httpInterceptorProviders } from './services/http-interceptor';
import { AuthInterceptor } from "./services/http-interceptor/auth-interceptor";
import { PatientlistComponent } from "src/app/patientlist/patientlist.component";
import { LabresultComponent } from "src/app/labresult/labresult.component";
import { ReportComponent } from "./report/report.component";
import { OutpatientlistComponent } from "./outpatientlist/outpatientlist.component";
// import { BatchPipe } from './salemanagement/batch.pipe';
import { OrderModule } from "ngx-order-pipe";
import { AmbulanceComponent } from "./ambulance/ambulance.component";
import { AmbulancelistComponent } from "./ambulancelist/ambulancelist.component";
import { InventoryreportsComponent } from "src/app/inventoryreports/inventoryreports.component";
import { PaymentvocherComponent } from "src/app/paymentvocher/paymentvocher.component";
import { ReferraldrComponent } from "src/app/referraldr/referraldr.component";
import { ReferraldrlistComponent } from "src/app/referraldrlist/referraldrlist.component";
import { OtherreportsComponent } from "src/app/otherreports/otherreports.component";
import { AdmindoctorviewComponent } from "src/app/admindoctorview/admindoctorview.component";
import { AdmindoctorviewService } from "src/app/admindoctorview/admindoctorview.service";
import { CountComponent } from "src/app/count/count.component";
import { DuebillsComponent } from "src/app/duebills/duebills.component";
import { OspbillingComponent } from "src/app/ospbilling/ospbilling.component";
import { OspbillinglistComponent } from "src/app/ospbillinglist/ospbillinglist.component";
import { OspbillinglistService } from "src/app/ospbillinglist/ospbillinglist.service";
import { PaymentvoucherComponent } from "src/app/paymentvoucher/paymentvoucher.component";
import { SaleslistComponent } from "src/app/saleslist/saleslist.component";
import { BedallocationComponent } from "src/app/bedallocation/bedallocation.component";
import { PharmacylistComponent } from "src/app/pharmacylist/pharmacylist.component";
import { ItemledgerreportComponent } from "src/app/itemledgerreport/itemledgerreport.component";
import { ItemledgerreportService } from "src/app/itemledgerreport/itemledgerreport.service";
import { OpIpEditComponent } from "src/app/op-ip-edit/op-ip-edit.component";
import { OtherPatientsComponent } from "src/app/other-patients/other-patients.component";
import { MonthlyprogressComponent } from "src/app/monthlyprogress/monthlyprogress.component";
import { MonthlyprogressService } from "src/app/monthlyprogress/monthlyprogress.service";
import { MonthlyprogressPipe } from "src/app/monthlyprogress/monthlyprogress.pipe";
import { OspEditComponent } from "src/app/osp-edit/osp-edit.component";
import { AdminCancelComponent } from "./admin-cancel/admin-cancel.component";
import { UpdatepaymentComponent } from "./updatepayment/updatepayment.component";
import { StockreportComponent } from "./stockreport/stockreport.component";
import { HealthchekupComponent } from "src/app/healthchekup/healthchekup.component";
import { HealthchekupService } from "src/app/healthchekup/healthchekup.service";
import { CheckupComponent } from "src/app/checkup/checkup.component";

// import { WardonlineComponent } from "src/app/wardonline/wardonline.component";

@NgModule({
  declarations: [
    MonthlyprogressComponent,

    OspbillinglistComponent,
    HealthchekupComponent,
    SaleslistComponent,
    OtherreportsComponent,
    ReportComponent,
    LoginComponent,
    ServicesComponent,
    PaymentvocherComponent,
    ServiceslistComponent,
    DashboardComponent,
    AppComponent,
    InventoryreportsComponent,
    AppointmentComponent,
    AppointmentlistComponent,
    // WardonlineComponent,
    LabComponent,
    NurseComponent,
    DoctorComponent,
    LabAdminComponent,
    Navigation,
    Topnavbar,
    ReturnComponent,

    InvoiceComponent,
    PharmacylistComponent,

    LabresultComponent,
    ItemlistComponent,
    ProlistComponent,

    // UserComponent,
    UserExistComponent,
    // VendorComponent,
    BedallocationComponent,
    ProcurmentComponent,
    ItemComponent,
    ItemledgerreportComponent,
    SalemanagementComponent,
    RefundComponent,
    BillComponent,
    PatientlistComponent,
    OutpatientlistComponent,
    AmbulanceComponent,
    AmbulancelistComponent,
    ReferraldrComponent,
    ReferraldrlistComponent,
    CountComponent,
    DuebillsComponent,
    OspbillingComponent,
    PaymentvoucherComponent,
    ExistVendorsComponent,
    OpIpEditComponent,
    OtherPatientsComponent,
    MonthlyprogressPipe,
    OspEditComponent,
    AdminCancelComponent,
    UpdatepaymentComponent,
    StockreportComponent,
    CheckupComponent
    // StockmanagementComponent
  ],
  imports: [
    NgxSpinnerModule,
    OrderModule,
    NgSelectModule,
    NgxLoadingModule,
    MatTooltipModule,
    SelectDropDownModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDatepickerModule,
    MatExpansionModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    // LoadingModule,
    LoadingBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    LoadingBarHttpClientModule,
    MatCardModule,

    MatRadioModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }), // ToastrModule added
    NgbModule.forRoot(),
    HotkeyModule.forRoot(),

    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: "reload" })
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Navigation,
    OspbillinglistService,
    AuthenticationService,
    AlertService,
    HealthchekupService,
    ItemledgerreportService,
    NurseService,
    LabService,
    DoctorService,
    MonthlyprogressService,
    LabAdminService,

    // VendorService,
    ItemlistService,
    ProcurmentService,
    ProlistService,
    InvoiceService,
    SalemanagementService,
    ServiceslistService,
    ServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<any>) {
    dateAdapter.setLocale("en-in"); // DD/MM/YYYY
  }
}
// RegisterService,   ExistVendorsComponent,   AdmindoctorviewComponent, ExistingComponent,  AdmindoctorviewService,
