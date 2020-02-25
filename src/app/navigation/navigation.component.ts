/**
 * Created by andrew.yang on 2/6/2017.
 */
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { TempService } from "src/app/temp.service";

@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html"
})
export class Navigation implements OnInit {
  image: any = [];
  userPages: any = [];
  subscription: any;
  private menuPages: object;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private temp: TempService
  ) {
   
    this.subscription = this.authenticationService.getRole().subscribe(role => {
      setTimeout(() => (this.userPages = this.menuPages[role]), 0);
    });
    
    this.menuPages = {
      ADMIN: [
        {
          link: "./dashboard",
          name: "Dashboard",
          icon: "fa fa-tachometer fa-lg"
        },
        { link: "./bl", name: "Ward View", icon: "fa fa-users fa-lg" },
        {
          link: "./wardonline",
          name: "Ward Online Issues",
          icon: "fa fa-users fa-lg"
        },

        {
          link: "./ambulance",
          name: "Ambulance",
          icon: "fa fa-plus-square fa-lg"
        },

        {
          link: "./ambulancelist",
          name: "Ambulance List",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./checkup",
          name: "Check-up",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./healthchekup",
          name: "MasterHealth-Chekup",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./appointment",
          name: "Appointment",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./appointmentlist",
          name: "Appointment List",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./paymentvocher",
          name: "Payment Voucher",
          icon: "fa fa-money fa-lg"
        },
        {
          link: "./pvlist",
          name: "Payment Voucher List",
          icon: "fa fa-money fa-lg"
        },

        {
          link: "./register",
          name: "Patient Registration",
          icon: "fa fa-users fa-lg"
        },
        {
          link: "./existing",
          name: "Existing Patients",
          icon: "fa fa-user fa-lg"
        },
        {
          link: "./patientlist",
          name: "Inpatient List",
          icon: "fa fa-users fa-lg"
        },
        { link: "./op", name: "Outpatient List", icon: "fa fa-users fa-lg" },
        {
          link: "./olist",
          name: "Other Patient List",
          icon: "fa fa-users fa-lg"
        },

        {
          link: "./user",
          name: "User Registration",
          icon: "fa fa-plus-square fa-lg"
        },
        { link: "./userreg", name: "Existing Users", icon: "fa fa-user fa-lg" },

        {
          link: "./vendor",
          name: "Vendor Registration",
          icon: "fa fa-plus-circle fa-lg"
        },
        {
          link: "./existvendor",
          name: "Vendor List",
          icon: "fa fa-list-ol fa-lg"
        },
        { link: "./grn", name: "GRN Entry", icon: "fa fa-shopping-cart fa-lg" },
        {
          link: "./proclist",
          name: "GRN List",
          icon: "fa fa-shopping-cart fa-lg"
        },
        {
          link: "./item",
          name: "Item Master",
          icon: "fa fa-info-circle fa-lg"
        },
        { link: "./itemlist", name: "Item List", icon: "fa fa-info fa-lg" },
        {
          link: "./invoice",
          name: "Invoice Payments",
          icon: "fa fa-money fa-lg"
        },

        {
          link: "./sale",
          name: "Sale Management",
          icon: "fa fa-line-chart fa-lg"
        },
        {
          link: "./slist",
          name: "Sale Management list",
          icon: "fa fa-line-chart fa-lg"
        },
        {
          link: "./return",
          name: "Return Management",
          icon: "fa fa-retweet fa-lg"
        },
        { link: "./refund", name: "Return List", icon: "fa fa-repeat fa-lg" },
        {
          link: "./ipphlist",
          name: "IP Pharmacy List",
          icon: "fa fa-line-chart fa-lg"
        },
        { link: "./nurse", name: "Nurse", icon: "fa fa-stethoscope fa-lg" },
        { link: "./doctor", name: "Doctor", icon: "fa fa-user-md fa-lg" },

        {
          link: "./admindoctorview",
          name: "Doctor Statistics",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./monthlyprogress",
          name: "MonthlyProgress ",
          icon: "fa fa-user-md fa-lg"
        },
        //  {link: './count', hide:true, name: 'Doctor Statistics', icon:'fa fa-user-md fa-lg'},
        { link: "./osp", name: "OSP Billing", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./ospbillinglist",
          name: "OSP Billing List",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./osp-edit",
          name: "OSP Cancellation",
          icon: "fa fa-credit-card fa-lg"
        },
        { link: "./lab", name: "OP/IP Billing", icon: "fa fa-flask fa-lg" },
        {
          link: "./op-ip",
          name: "OP/IP Cancellation",
          icon: "fa fa-flask fa-lg"
        },
        { link: "./Labadm", name: "Lab Admin", icon: "fa fa-lock fa-lg" },
        { link: "./services", name: "Services", icon: "fa fa-cogs fa-lg" },
        {
          link: "./serviceslist",
          name: "Services List",
          icon: "fa fa-list-ul fa-lg"
        },

        {
          link: "./otherreports",
          name: "OP Billing",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./duebills",
          name: "Due Bills",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./bill",
          name: " IP Final Billing",
          icon: "fa fa-credit-card fa-lg"
        },
        { link: "./report", name: "Reports", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./referraldr",
          name: "Referral Dr",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./referraldrlist",
          name: "Referral Dr List",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./inventorystatus",
          name: "Inventory Reports",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./itemledgerreport",
          name: "Item Ledger Report",
          icon: "fa fa-credit-card fa-lg"
        }
        // {
        //   link: "./stock",
        //   name: "Stock Report",
        //   icon: "fa fa-credit-card fa-lg"
        // }
      ],

      DOCTOR: [
        { link: "./doctor", name: "Doctor", icon: "fa fa-user-md fa-lg" }
      ],
      NURSE: [
        { link: "./nurse", name: "Nurse", icon: "fa fa-stethoscope fa-lg" }
      ],
      EMPLOYEE: [
        {
          link: "./register",
          name: "Patient Registration",
          icon: "fa fa-users fa-lg"
        }
      ],
     
      // LAB: [
      //   { link: "./lab", name: "Lab", icon: "fa fa-flask fa-lg" },
      //   { link: "./Labadm", name: "Lab Admin", icon: "fa fa-lock fa-lg" },
      //   { link: "./services", name: "Services", icon: "fa fa-cogs fa-lg" },
      //   {
      //     link: "./checkup",
      //     name: "Check-up",
      //     icon: "fa fa-plus-square fa-lg"
      //   },
      //   {
      //     link: "./healthchekup",
      //     name: "MasterHealth-Chekup",
      //     icon: "fa fa-credit-card fa-lg"
      //   },
      //   {
      //     link: "./serviceslist",
      //     name: "Services List",
      //     icon: "fa fa-list-ul fa-lg"
      //   }
      // ],


      LAB: [
        { link: "./patientlist", name: "Inpatientlist", icon: "fa fa-users fa-lg"},
        { link: "./op", name: "Outpatient List", icon: "fa fa-users fa-lg" },
        { link: "./olist",name: "Other Patient List",icon: "fa fa-users fa-lg"},
        { link: "./Labadm", name: "Lab Admin", icon: "fa fa-lock fa-lg" },
      ],

      

      "FRONT OFFICE": [
        {
          link: "./register",
          name: "Patient Registration",
          icon: "fa fa-users fa-lg"
        },
        { link: "./bl", name: "Ward View", icon: "fa fa-users fa-lg" },
        {
          link: "./existing",
          name: "Existing Patients",
          icon: "fa fa-user fa-lg"
        },
        { link: "./op", name: "Outpatient List", icon: "fa fa-users fa-lg" },
        {
          link: "./patientlist",
          name: "Inpatientlist",
          icon: "fa fa-users fa-lg"
        },
        {
          link: "./checkup",
          name: "Check-up",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./healthchekup",
          name: "MasterHealth-Chekup",
          icon: "fa fa-credit-card fa-lg"
        },
        // {link:'./op', name: 'Outpatient List', icon:'fa fa-users fa-lg'},
        { link: "./lab", name: "OP/IP Billing", icon: "fa fa-flask fa-lg" },
        { link: "./osp", name: "OSP Billing", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./ospbillinglist",
          name: "OSPBilling List",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./duebills",
          name: "Due Bills",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./checkup",
          name: "Check-up",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./bill",
          name: " IP Final Billing",
          icon: "fa fa-credit-card fa-lg"
        },
        // {link:'./otherreports', name: 'OP Billing', icon:'fa fa-credit-card fa-lg'},
        {
          link: "./referraldr",
          name: "Referral Dr",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./referraldrlist",
          name: "Referral Dr List",
          icon: "fa fa-credit-card fa-lg"
        },

        { link: "./services", name: "Services", icon: "fa fa-cogs fa-lg" },
        {
          link: "./serviceslist",
          name: "Services List",
          icon: "fa fa-list-ul fa-lg"
        },

        { link: "./report", name: "Reports", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./appointment",
          name: "Appointment",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./appointmentlist",
          name: "Appointment List",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./paymentvocher",
          name: "Payment Voucher",
          icon: "fa fa-money fa-lg"
        }
      ],
      "FRONT OFFICE GRN": [
        {
          link: "./register",
          name: "Patient Registration",
          icon: "fa fa-users fa-lg"
        },
        { link: "./bl", name: "Ward View", icon: "fa fa-users fa-lg" },
        {
          link: "./existing",
          name: "Existing Patients",
          icon: "fa fa-user fa-lg"
        },
        {
          link: "./checkup",
          name: "Check-up",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./healthchekup",
          name: "MasterHealth-Chekup",
          icon: "fa fa-credit-card fa-lg"
        },
        { link: "./op", name: "Outpatient List", icon: "fa fa-users fa-lg" },
        {
          link: "./patientlist",
          name: "Inpatientlist",
          icon: "fa fa-users fa-lg"
        },
        // {link:'./op', name: 'Outpatient List', icon:'fa fa-users fa-lg'},
        { link: "./lab", name: "OP/IP Billing", icon: "fa fa-flask fa-lg" },
        { link: "./osp", name: "OSP Billing", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./ospbillinglist",
          name: "OSPBilling List",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./checkup",
          name: "Check-up",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./duebills",
          name: "Due Bills",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./bill",
          name: " IP Final Billing",
          icon: "fa fa-credit-card fa-lg"
        },
        // {link:'./otherreports', name: 'OP Billing', icon:'fa fa-credit-card fa-lg'},
        {
          link: "./referraldr",
          name: "Referral Dr",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./referraldrlist",
          name: "Referral Dr List",
          icon: "fa fa-credit-card fa-lg"
        },

        { link: "./services", name: "Services", icon: "fa fa-cogs fa-lg" },
        {
          link: "./serviceslist",
          name: "Services List",
          icon: "fa fa-list-ul fa-lg"
        },

        { link: "./report", name: "Reports", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./appointment",
          name: "Appointment",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./appointmentlist",
          name: "Appointment List",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./paymentvocher",
          name: "Payment Voucher",
          icon: "fa fa-money fa-lg"
        },
        { link: "./grn", name: "GRN Entry", icon: "fa fa-shopping-cart fa-lg" },
        {
          link: "./proclist",
          name: "GRN List",
          icon: "fa fa-shopping-cart fa-lg"
        }
      ],

      PHARMACY: [
        { link: "./report", name: "Reports", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./patientlist",
          name: "Inpatientlist",
          icon: "fa fa-users fa-lg"
        },
        {
          link: "./checkup",
          name: "Check-up",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./healthchekup",
          name: "MasterHealth-Chekup",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./wardonline",
          name: "Ward Online Issues",
          icon: "fa fa-users fa-lg"
        },
        {
          link: "./sale",
          name: "Sale Management",
          icon: "fa fa-line-chart fa-lg"
        },
        {
          link: "./slist",
          name: "Sale Management list",
          icon: "fa fa-line-chart fa-lg"
        },
        {
          link: "./return",
          name: "Return Management",
          icon: "fa fa-retweet fa-lg"
        },
        {
          link: "./item",
          name: "Item Master",
          icon: "fa fa-info-circle fa-lg"
        },

        { link: "./itemlist", name: "Item List", icon: "fa fa-money fa-lg" },
        { link: "./grn", name: "GRN Entry", icon: "fa fa-shopping-cart fa-lg" },
        // // {
        //   link: "./proclist",
        //   name: "GRN List",
        //   icon: "fa fa-shopping-cart fa-lg"
        // },
        {
          link: "./vendor",
          name: "Vendor Registration",
          icon: "fa fa-plus-circle fa-lg"
        },
        {
          link: "./existvendor",
          name: "Vendor List",
          icon: "fa fa-list-ol fa-lg"
        },

        {
          link: "./ipphlist",
          name: "IP Pharmacy List",
          icon: "fa fa-line-chart fa-lg"
        },

        { link: "./refund", name: "Return list", icon: "fa fa-repeat fa-lg" },
        {
          link: "./duebills",
          name: "Due Bills",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./itemledgerreport",
          name: "Item Ledger Report",
          icon: "fa fa-credit-card fa-lg"
        }
      ],

      "PHARMACY ADMIN": [
        { link: "./report", name: "Reports", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./patientlist",
          name: "Inpatientlist",
          icon: "fa fa-users fa-lg"
        },
        {
          link: "./checkup",
          name: "Check-up",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./healthchekup",
          name: "MasterHealth-Chekup",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./wardonline",
          name: "Ward Online Issues",
          icon: "fa fa-users fa-lg"
        },
        {
          link: "./sale",
          name: "Sale Management",
          icon: "fa fa-line-chart fa-lg"
        },
        {
          link: "./slist",
          name: "Sale Management list",
          icon: "fa fa-line-chart fa-lg"
        },
        {
          link: "./return",
          name: "Return Management",
          icon: "fa fa-retweet fa-lg"
        },
        {
          link: "./item",
          name: "Item Master",
          icon: "fa fa-info-circle fa-lg"
        },

        { link: "./itemlist", name: "Item List", icon: "fa fa-money fa-lg" },
        { link: "./grn", name: "GRN Entry", icon: "fa fa-shopping-cart fa-lg" },
        {
          link: "./proclist",
          name: "GRN List",
          icon: "fa fa-shopping-cart fa-lg"
        },
        {
          link: "./vendor",
          name: "Vendor Registration",
          icon: "fa fa-plus-circle fa-lg"
        },
        {
          link: "./existvendor",
          name: "Vendor List",
          icon: "fa fa-list-ol fa-lg"
        },

        {
          link: "./ipphlist",
          name: "IP Pharmacy List",
          icon: "fa fa-line-chart fa-lg"
        },

        { link: "./refund", name: "Return list", icon: "fa fa-repeat fa-lg" },
        {
          link: "./duebills",
          name: "Due Bills",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./itemledgerreport",
          name: "Item Ledger Report",
          icon: "fa fa-credit-card fa-lg"
        }
      ],
      "VNC ADMIN": [
        {
          link: "./dashboard",
          name: "Dashboard",
          icon: "fa fa-tachometer fa-lg"
        },
        {
          link: "./updatepayment",
          name: "UpdatePaymentType",
          icon: "fa fa-tachometer fa-lg"
        },
        {
          link: "./checkup",
          name: "Check-up",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./healthchekup",
          name: "MasterHealth-Chekup",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./admin-cancel",
          name: "PatientCancellation",
          icon: "fa fa-users fa-lg"
        },
        { link: "./bl", name: "Ward View", icon: "fa fa-users fa-lg" },
        {
          link: "./wardonline",
          name: "Ward Online Issues",
          icon: "fa fa-users fa-lg"
        },
        {
          link: "./ambulance",
          name: "Ambulance",
          icon: "fa fa-plus-square fa-lg"
        },

        {
          link: "./ambulancelist",
          name: "Ambulance List",
          icon: "fa fa-plus-square fa-lg"
        },
        {
          link: "./appointment",
          name: "Appointment",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./appointmentlist",
          name: "Appointment List",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./paymentvocher",
          name: "Payment Voucher",
          icon: "fa fa-money fa-lg"
        },
        {
          link: "./pvlist",
          name: "Payment Voucher List",
          icon: "fa fa-money fa-lg"
        },

        {
          link: "./register",
          name: "Patient Registration",
          icon: "fa fa-users fa-lg"
        },
        {
          link: "./existing",
          name: "Existing Patients",
          icon: "fa fa-user fa-lg"
        },
        {
          link: "./patientlist",
          name: "Inpatient List",
          icon: "fa fa-users fa-lg"
        },
        { link: "./op", name: "Outpatient List", icon: "fa fa-users fa-lg" },
        {
          link: "./olist",
          name: "Other Patient List",
          icon: "fa fa-users fa-lg"
        },

        {
          link: "./user",
          name: "User Registration",
          icon: "fa fa-plus-square fa-lg"
        },
        { link: "./userreg", name: "Existing Users", icon: "fa fa-user fa-lg" },

        {
          link: "./vendor",
          name: "Vendor Registration",
          icon: "fa fa-plus-circle fa-lg"
        },
        {
          link: "./existvendor",
          name: "Vendor List",
          icon: "fa fa-list-ol fa-lg"
        },
        { link: "./grn", name: "GRN Entry", icon: "fa fa-shopping-cart fa-lg" },
        {
          link: "./proclist",
          name: "GRN List",
          icon: "fa fa-shopping-cart fa-lg"
        },
        {
          link: "./item",
          name: "Item Master",
          icon: "fa fa-info-circle fa-lg"
        },
        { link: "./itemlist", name: "Item List", icon: "fa fa-info fa-lg" },
        {
          link: "./invoice",
          name: "Invoice Payments",
          icon: "fa fa-money fa-lg"
        },

        {
          link: "./sale",
          name: "Sale Management",
          icon: "fa fa-line-chart fa-lg"
        },
        {
          link: "./slist",
          name: "Sale Management list",
          icon: "fa fa-line-chart fa-lg"
        },
        {
          link: "./return",
          name: "Return Management",
          icon: "fa fa-retweet fa-lg"
        },
        { link: "./refund", name: "Return List", icon: "fa fa-repeat fa-lg" },
        {
          link: "./ipphlist",
          name: "IP Pharmacy List",
          icon: "fa fa-line-chart fa-lg"
        },
        { link: "./nurse", name: "Nurse", icon: "fa fa-stethoscope fa-lg" },
        { link: "./doctor", name: "Doctor", icon: "fa fa-user-md fa-lg" },

        {
          link: "./admindoctorview",
          name: "Doctor Statistics",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./monthlyprogress",
          name: "MonthlyProgress ",
          icon: "fa fa-user-md fa-lg"
        },
        //  {link: './count', hide:true, name: 'Doctor Statistics', icon:'fa fa-user-md fa-lg'},
        { link: "./osp", name: "OSP Billing", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./ospbillinglist",
          name: "OSP Billing List",
          icon: "fa fa-user-md fa-lg"
        },
        {
          link: "./osp-edit",
          name: "OSP Cancellation",
          icon: "fa fa-credit-card fa-lg"
        },
        { link: "./lab", name: "OP/IP Billing", icon: "fa fa-flask fa-lg" },
        {
          link: "./op-ip",
          name: "OP/IP Cancellation",
          icon: "fa fa-flask fa-lg"
        },
        { link: "./Labadm", name: "Lab Admin", icon: "fa fa-lock fa-lg" },
        { link: "./services", name: "Services", icon: "fa fa-cogs fa-lg" },
        {
          link: "./serviceslist",
          name: "Services List",
          icon: "fa fa-list-ul fa-lg"
        },

        {
          link: "./otherreports",
          name: "OP Billing",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./duebills",
          name: "Due Bills",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./bill",
          name: " IP Final Billing",
          icon: "fa fa-credit-card fa-lg"
        },
        { link: "./report", name: "Reports", icon: "fa fa-credit-card fa-lg" },
        {
          link: "./referraldr",
          name: "Referral Dr",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./referraldrlist",
          name: "Referral Dr List",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./inventorystatus",
          name: "Inventory Reports",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./itemledgerreport",
          name: "Item Ledger Report",
          icon: "fa fa-credit-card fa-lg"
        },
        {
          link: "./stock",
          name: "Stock Report",
          icon: "fa fa-credit-card fa-lg"
        }
      ]
    };
  }

  ngOnInit() {
    this.image = this.temp.getPLogo();
  }

  getNavigationPages(userRole: string) {
    return this.menuPages[userRole];
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
