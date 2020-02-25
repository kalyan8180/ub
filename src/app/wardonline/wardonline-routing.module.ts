import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WardonlineComponent } from './wardonline.component';

const routes: Routes = [
    { path: "", component:WardonlineComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class WardonlineRoutingModule { }