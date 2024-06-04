import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSituationComponent } from './add-situation/add-situation.component';
import { DetailSituationComponent } from './detail-situation/detail-situation.component';
import { EditSituationComponent } from './edit-situation/edit-situation.component';
import { SituationListComponent } from './situation-list/situation-list.component';



const routes: Routes = [
  {
    path:'SD', component : SituationListComponent
  },
  {
    path:'SD/nv_situation', component : AddSituationComponent
  },
  {
    path:'SD/detail_situ', component : DetailSituationComponent
  },
  {
    path:'SD/edit_situ', component : EditSituationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SituationDRoutingModule { }
