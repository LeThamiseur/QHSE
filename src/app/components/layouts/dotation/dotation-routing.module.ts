import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DotationListComponent } from './dotation-list/dotation-list.component';
import { AddDotationComponent } from './add-dotation/add-dotation.component';
import { DotationBackComponent } from './dotation-back/dotation-back.component';
import { EditDotationComponent } from './edit-dotation/edit-dotation.component';
import { VoirDotationComponent } from './voir-dotation/voir-dotation.component';
import { AuthGuard } from '../../../guard/auth.guard';


const routes: Routes = [
  {
    path:'dotation', component : DotationListComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'dotation/nv_dotation', component : AddDotationComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'dotation/retour_dotation', component : DotationBackComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'dotation/edit_dotation/:id', component : EditDotationComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'dotation/voir_dotation/:id', component : VoirDotationComponent, canActivate: [AuthGuard.canActivate]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DotationRoutingModule { }
