import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../guard/auth.guard';
import { DuerListComponent } from './duer-list/duer-list.component';

const routes: Routes = [
  {
    path:'DUER', component:DuerListComponent, canActivate: [AuthGuard.canActivate]
  },
  // {
  //   path:'acc_inc/ficheD', component: DeclarationFormComponent, canActivate: [AuthGuard.canActivate]
  // },
  // {
  //   path:'acc_inc/declaration/:id', component: DeclarationComponent, canActivate: [AuthGuard.canActivate]
  // },
  // {
  //   path:'acc_inc/edit_declaration/:id', component: EditDeclarationComponent, canActivate: [AuthGuard.canActivate]
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DuerRoutingModule { }
