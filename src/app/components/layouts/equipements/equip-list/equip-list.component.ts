import { Component } from '@angular/core';
import { Equipement } from '../../../../models/equipement';
import { EquipementService } from '../../../../services/equipement.service';

@Component({
  selector: 'app-equip-list',
  templateUrl: './equip-list.component.html',
  styleUrl: './equip-list.component.css'
})
export class EquipListComponent {
  equipementList : Equipement [] = [];
  filteredEquipementList : Equipement [] = [];

  constructor(private equipementService : EquipementService) {}

  ngOnInit(): void {
// affiche la liste des équipements
    this.equipementService.getEquipementList(this.equipementList).subscribe(data => {
      this.equipementList = data;
      this.filteredEquipementList = this.equipementList
    });
  }

  // Delete equipement
  delete(equip: Equipement): void {
    this.equipementList = this.equipementList.filter(eqp => eqp !== equip);
    this.equipementService.deleteEquip(equip.id).subscribe();
  }

  // recherche de déclaration en fonction du critère de recherche
  filterResults(text: string) {
    if (!text) {
      this.filteredEquipementList=this.equipementList;
      return;
    }
    this.filteredEquipementList = this.equipementList.filter(
      accInc => accInc?.abreviation.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
                accInc?.designation.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    )
  }


}
