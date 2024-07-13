import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../navigation/navbar.module';
import { FormsModule } from '@angular/forms';
import { DuerListComponent } from './duer-list/duer-list.component';
import { DuerRoutingModule } from './duer-routing.module';



@NgModule({
  declarations: [
    DuerListComponent,
  ],
  imports: [
    CommonModule,
    DuerRoutingModule,
    NavbarModule,
    FormsModule
  ]
})
export class DuerModule { }
