import { Component } from '@angular/core';
import { Accinc } from '../../../../models/accinc';
import { AccincService } from '../../../../services/accinc.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-declaration-form',
  templateUrl: './declaration-form.component.html',
  styleUrl: './declaration-form.component.css'
})
export class DeclarationFormComponent {

  formData: Accinc = new Accinc();
  msg= '';
  isError = false; 


  constructor (private accincService: AccincService){
  }

  // Clear the form
  resetForm(formDirective: NgForm) {
    this.formData = new Accinc();
    formDirective.resetForm();
  }



 // Method to add accident/incident
 addAccInc(formDirective: NgForm) {
  console.log('Sending data:', this.formData);  //  pour voir les données envoyées

  this.accincService.addAccident(this.formData)
    .subscribe(response => {
      console.log('Data sent successfully', response);
      this.resetForm(formDirective);
      this.msg = 'Déclaration enregistrée avec succès';
      this.isError = false;
    }, (error: any) => {
      console.error('Error sending data', error);
      this.msg = 'Erreur lors de l\'envoi des données';
      this.isError = true;
    });
}

}
