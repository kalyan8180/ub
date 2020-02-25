import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AmbulanceComponent } from './ambulance.component';

const routes: Routes = [
    { path: "", component:AmbulanceComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AmbulanceRoutingModule { }