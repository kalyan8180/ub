import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { AppointmentComponent } from './appointment.component';


const routes: Routes = [
    { path: "", component:AppointmentComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AppointmentRoutingModule { }