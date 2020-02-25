import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { BedallocationComponent } from './bedallocation.component';

const routes: Routes = [
    { path: "", component:BedallocationComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BedallocationRoutingModule { }