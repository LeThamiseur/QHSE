import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPprComponent } from './list-ppr/list-ppr.component';
import { AddPprComponent } from './add-ppr/add-ppr.component';
import { AuthGuard } from '../../../guard/auth.guard';

const routes: Routes = [
  {
    path:'ppr', component: ListPprComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'ppr/add_ppr', component: AddPprComponent, canActivate: [AuthGuard.canActivate]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PprRoutingModule { }
