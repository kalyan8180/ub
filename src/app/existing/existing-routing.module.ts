import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExistingComponent } from './existing.component';

const routes: Routes = [
    { path: "", component:ExistingComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ExistingRoutingModule { }