import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRisqueComponent } from './add-risque/add-risque.component';
import { RisquePComponent } from './risque-p/risque-p.component';
import { EditRisqueComponent } from './edit-risque/edit-risque.component';
import { AuthGuard } from '../../../guard/auth.guard';


const routes: Routes = [
  {
    path:'RP', component : RisquePComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'RP/nv_risque/:dangerId/add-risk', component : AddRisqueComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'RP/edit_risq/:dangerId/:riskId', component : EditRisqueComponent, canActivate: [AuthGuard.canActivate]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RpRoutingModule { }
