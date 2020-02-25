import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { AmbulancelistComponent } from './ambulancelist.component';


const routes: Routes = [
    { path: "", component:AmbulancelistComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AmbulancelistRoutingModule { }