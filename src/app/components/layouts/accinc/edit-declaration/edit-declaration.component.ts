import { Component, Input, OnInit } from '@angular/core';
import { Accinc } from '../../../../models/accinc';
import { AccincService } from '../../../../services/accinc.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-declaration',
  templateUrl: './edit-declaration.component.html',
  styleUrl: './edit-declaration.component.css'
})
export class EditDeclarationComponent implements OnInit{

  @Input() accinc!: Accinc;
  msg = '';

  constructor(private accincservice: AccincService, private route: ActivatedRoute, private location: Location){}

  ngOnInit(): void {
    this.getAcc();

    this.route.params.subscribe(params => {
      const id = `${this.accinc?.id}`; // Récupère l'ID des paramètres de la route
      this.accincservice.getAccincByID(id).subscribe(data => {
        this.accinc = data;
      });
    });
  }

  getAcc(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.accincservice.getAccincByID(id)
      .subscribe(accinc => this.accinc = accinc);
  }

    goBack(): void {
      this.location.back();
    }

    // update declaration function
    save():void {
      this.accincservice.updateAccinc(this.accinc).subscribe(response => {
        console.log('Déclaration mise à jour avec succès', response);
        if (response){this.msg='Déclaration mise à jour avec succès'}
      }, error => {
        console.error('Error lors la mise à jour de la declaration', error);
        if (error){this.msg='Error lors la mise à jour de la declaration'};
      }
        )
    }

}
