import { Component } from '@angular/core';
import { Equipement } from '../../../../models/equipement';
import { EquipementService } from '../../../../services/equipement.service';
import { Dotation } from '../../../../models/dotation';

@Component({
  selector: 'app-add-dotation',
  templateUrl: './add-dotation.component.html',
  styleUrl: './add-dotation.component.css'
})
export class AddDotationComponent {
  equipementList : Equipement [] = [];
  selectedEquipements: number[] = [];
  dotationData: Dotation = new Dotation()

  constructor(private equipementService : EquipementService) {}

  ngOnInit(): void {
    // affiche la liste des équipements
        this.equipementService.getEquipementList(this.equipementList).subscribe(data => {
          this.equipementList = data;
        });
      }

      onSelect(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        this.selectedEquipements = Array.from(selectElement.selectedOptions).map(option => Number(option.value));

      }

      getEquipementDesignation(id: number): string {
        const equipement = this.equipementList.find(e => Number(e.id) === id);
        return equipement ? equipement.designation : '';
      }

      onSubmit(): void {
        this.dotationData.id_Equi = this.selectedEquipements;
        console.log('Selected Equipement IDs', this.selectedEquipements);

        this.equipementService.addDotation(this.dotationData).subscribe(response => {
          console.log('dotation enregistrée', response);
          this.dotationData = new Dotation();
        }, error =>{
          console.error('Erreur', error)
        })
        // const selectedEquipementIds = this.selectedEquipements;
        // console.log('Selected Equipement IDs', selectedEquipementIds);

        // Ajoutez votre logique de soumission ici, par exemple :
        // Envoyez les IDs sélectionnés à votre service ou API
      }
}
