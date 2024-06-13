import { Component } from '@angular/core';
import { Accinc } from '../../../../models/accinc';
import { AccincService } from '../../../../services/accinc.service';

@Component({
  selector: 'app-declaration-form',
  templateUrl: './declaration-form.component.html',
  styleUrl: './declaration-form.component.css'
})
export class DeclarationFormComponent {

  formData: Accinc = new Accinc();
  msg= '';


  constructor (private accincService: AccincService){
  }




  addAccInc(){
    this.accincService.addAccident(this.formData)
    .subscribe(response => {
      console.log('Data sent successfully', response);
      this.formData = new Accinc()
    this.msg = 'Déclaration enregistrée avec succes';
    }, (error:any) => {
      console.error('Error sending data', error);
    });
    }

}
