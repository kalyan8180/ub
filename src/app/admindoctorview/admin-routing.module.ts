import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdmindoctorviewComponent } from './admindoctorview.component';

const routes: Routes = [
    { path: "", component:AdmindoctorviewComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AdminviewRoutingModule { }