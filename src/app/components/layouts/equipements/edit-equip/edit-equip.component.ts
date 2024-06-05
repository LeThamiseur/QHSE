import { Component, Input } from '@angular/core';
import { Equipement } from '../../../../models/equipement';
import { EquipementService } from '../../../../services/equipement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-equip',
  templateUrl: './edit-equip.component.html',
  styleUrl: './edit-equip.component.css'
})
export class EditEquipComponent {

  @Input() equipement!: Equipement;
  msg = '';

  constructor(private equipementService: EquipementService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getEquip();

    this.route.params.subscribe(params => {
      const id = `${this.equipement?.id}`; // Récupère l'ID des paramètres de la route
      this.equipementService.getEquipByID(id).subscribe(data => {
        this.equipement = data;
      });
    });
  }

  getEquip(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.equipementService.getEquipByID(id)
      .subscribe(equip => this.equipement = equip);
  }

  save(): void {
    this.equipementService.updateEquip(this.equipement).subscribe(response => {
      console.log('Mis à jour avec succès', response);
        if (response){this.msg='Mis à jour avec succès'}
      }), (error: any) => {
        console.error('Error lors la mise à jour ', error);
        if (error){this.msg='Error lors la mise à jour '};
      }

  }

}
