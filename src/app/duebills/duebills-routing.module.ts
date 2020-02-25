import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { DuebillsComponent } from './duebills.component';

const routes: Routes = [
    { path: "", component:DuebillsComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class DueBillsRoutingModule { }