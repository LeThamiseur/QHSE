import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSituationComponent } from './add-situation/add-situation.component';
import { DetailSituationComponent } from './detail-situation/detail-situation.component';
import { EditSituationComponent } from './edit-situation/edit-situation.component';
import { SituationListComponent } from './situation-list/situation-list.component';
import { SituationDRoutingModule } from './situation-d-routing.module';
import { NavbarModule } from '../../navigation/navbar.module';



@NgModule({
  declarations: [
    AddSituationComponent,
    DetailSituationComponent,
    EditSituationComponent,
    SituationListComponent
  ],
  imports: [
    CommonModule,
    SituationDRoutingModule,
    NavbarModule
  ]
})
export class SituationDModule { }
