import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../guard/auth.guard';
import { AccListComponent } from './acc-list/acc-list.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { DeclarationFormComponent } from './declaration-form/declaration-form.component';
import { EditDeclarationComponent } from './edit-declaration/edit-declaration.component';

const routes: Routes = [
  {
    path:'acc_inc', component:AccListComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'acc_inc/ficheD', component: DeclarationFormComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'acc_inc/declaration/:id', component: DeclarationComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'acc_inc/edit_declaration/:id', component: EditDeclarationComponent, canActivate: [AuthGuard.canActivate]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AccIncRoutingModule { }
