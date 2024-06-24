import { Component, OnInit } from '@angular/core';
import { UTrav } from '../../../../models/u-trav';
import { UniteTravService } from '../../../../services/unite-trav.service';

@Component({
  selector: 'app-unit-trav-list',
  templateUrl: './unit-trav-list.component.html',
  styleUrl: './unit-trav-list.component.css'
})
export class UnitTravListComponent implements OnInit {

  uniteTravList: UTrav[] = [];

  constructor(private uniteTravService: UniteTravService) { }

  ngOnInit(): void {
    this.uniteTravService.getUniteTravail().subscribe(data => {
      this.uniteTravList = data;
    });
  }

  // uniteTravList : UTrav [] = [
  //     {
  //       id: 1,
  //       nom_UT: "Unité A",
  //       id_DocU: 1
  //     },
  //     {
  //       id :2,
  //       nom_UT: "Unité B",
  //       id_DocU: 1
  //     }

  // ]
}
