
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule, ChangeDetectorRef } from '@angular/core';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
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

import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxLoadingModule } from 'ngx-loading';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {

  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter
} from '@angular/material';






import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {NgxPaginationModule} from 'ngx-pagination'




// import { httpInterceptorProviders } from './services/http-interceptor';


import { OrderModule } from 'ngx-order-pipe';






import { ExistingRoutingModule } from "src/app/existing/existing-routing.module";
import { ExistingComponent } from "src/app/existing/existing.component";





@NgModule({
  imports: [  OrderModule,
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


MatRadioModule, ExistingRoutingModule],
  declarations: [ExistingComponent]
})
export class ExistingModule {}