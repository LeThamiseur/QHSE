import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRisqueComponent } from './add-risque/add-risque.component';
import { RisquePComponent } from './risque-p/risque-p.component';
import { EditRisqueComponent } from './edit-risque/edit-risque.component';


const routes: Routes = [
  {
    path:'RP', component : RisquePComponent
  },
  {
    path:'RP/nv_risque/:dangerId/add-risk', component : AddRisqueComponent
  },
  {
    path:'RP/edit_risq/:dangerId/:riskId', component : EditRisqueComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RpRoutingModule { }
