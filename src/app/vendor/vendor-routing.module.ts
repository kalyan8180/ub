import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VendorComponent } from './vendor.component';

const routes: Routes = [
    { path: "", component:VendorComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class VendorRoutingModule { }