import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSituationComponent } from './add-situation/add-situation.component';
import { DetailSituationComponent } from './detail-situation/detail-situation.component';
import { EditSituationComponent } from './edit-situation/edit-situation.component';
import { SituationListComponent } from './situation-list/situation-list.component';
import { AuthGuard } from '../../../guard/auth.guard';



const routes: Routes = [
  {
    path:'SD', component : SituationListComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'SD/nv_situation', component : AddSituationComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'SD/detail_situ/:id', component : DetailSituationComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'SD/edit_situ/:id', component : EditSituationComponent, canActivate: [AuthGuard.canActivate]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SituationDRoutingModule { }
