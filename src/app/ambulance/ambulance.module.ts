import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';



import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoadingBarModule, LoadingBarService} from "ngx-loading-bar";

// import { LoadingModule } from 'ngx-loading';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatPaginatorModule} from '@angular/material/paginator';
// import {NgxPaginationModule} from 'ngx-pagination';
// import { MatPaginatorModule } from '@angular/material';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
 // <-- import the module
// import {DataTableModule} from "angular-6-datatable";
import { MatTableModule,MatSortModule} from '@angular/material';

import { SelectDropDownModule } from 'ngx-select-dropdown';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {

  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter
} from '@angular/material';

import { AmbulanceRoutingModule } from "src/app/ambulance/ambulance-routing.module";
import { AmbulanceComponent } from "src/app/ambulance/ambulance.component";

@NgModule({
  imports: [CommonModule, 
    NgSelectModule,

SelectDropDownModule,
   
    MatAutocompleteModule,
Ng2SearchPipeModule,

    CommonModule,
FormsModule,
NgxMaterialTimepickerModule,
MatCheckboxModule,
   MatNativeDateModule,
    MatGridListModule,
    MatDatepickerModule,
   
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,

    RouterModule,
    FormsModule,
    HttpModule,
    // LoadingModule,
    LoadingBarModule,
    MatPaginatorModule,
    MatTableModule,MatSortModule,
    LoadingBarHttpClientModule,
MatCardModule,
MatRadioModule, AmbulanceRoutingModule],
  declarations: [AmbulanceComponent]
})
export class AmbulanceModule {}