import { Component } from '@angular/core';
import { Equipement } from '../../../../models/equipement';
import { EquipementService } from '../../../../services/equipement.service';

@Component({
  selector: 'app-add-equip',
  templateUrl: './add-equip.component.html',
  styleUrl: './add-equip.component.css'
})
export class AddEquipComponent {

  formData: Equipement = new Equipement();
  msg = ''

  constructor(private equipementService : EquipementService){}

  addEquip(){
    this.equipementService.addEquipement(this.formData).subscribe(response => {
      console.log('Data sent successfully', response);
      this.formData = new Equipement()
      this.msg = 'Equipement enregistré avec succes';
    }, (error:any) => {
      console.error('Error sending data', error);
    })
  };

}
