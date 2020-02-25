import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { BillComponent } from './bill.component';

const routes: Routes = [
    { path: "", component:BillComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BillRoutingModule { }