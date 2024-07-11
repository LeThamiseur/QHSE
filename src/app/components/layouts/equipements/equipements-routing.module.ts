import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipListComponent } from './equip-list/equip-list.component';
import { AddEquipComponent } from './add-equip/add-equip.component';
import { DetailComponent } from './detail/detail.component';
import { EditEquipComponent } from './edit-equip/edit-equip.component';
import { AuthGuard } from '../../../guard/auth.guard';


const routes: Routes = [
  {
    path:'equipement', component: EquipListComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'equipement/addEquip', component: AddEquipComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'equipement/detail/:id', component: DetailComponent, canActivate: [AuthGuard.canActivate]
  },
  {
    path:'equipement/edit_equip/:id', component: EditEquipComponent, canActivate: [AuthGuard.canActivate]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EquipementsRoutingModule { }
