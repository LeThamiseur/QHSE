import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRisqueComponent } from './add-risque/add-risque.component';
import { RpRoutingModule } from './rp-routing.module';
import { NavbarModule } from '../../navigation/navbar.module';
import { RisquePComponent } from './risque-p/risque-p.component';
import { EditRisqueComponent } from './edit-risque/edit-risque.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddRisqueComponent,
    RisquePComponent,
    EditRisqueComponent
  ],
  imports: [
    CommonModule,
    RpRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RpModule { }
