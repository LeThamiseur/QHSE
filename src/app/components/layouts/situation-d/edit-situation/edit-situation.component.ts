import { Component, Input } from '@angular/core';
import { SituationD } from '../../../../models/situation-D';
import { DangRiskService } from '../../../../services/dang-risk.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-situation',
  templateUrl: './edit-situation.component.html',
  styleUrl: './edit-situation.component.css'
})
export class EditSituationComponent {

  @Input() situationD!: SituationD;
  msg = '';

  constructor(private dangerRiskService: DangRiskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getDang();

    this.route.params.subscribe(params => {
      const id = `${this.situationD.id}`; // Récupère l'ID des paramètres de la route
      this.dangerRiskService.getDangRById(id).subscribe(data => {
        this.situationD = data;
      });
    });
  }


  getDang(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.dangerRiskService.getDangRById(id)
      .subscribe(data => this.situationD = data);
  }

  save(): void {
    this.dangerRiskService.updateDang(this.situationD).subscribe(response => {
      console.log('Danger mis à jour avec succès', response);
        if (response){this.msg='Danger mis à jour avec succès'}
      }), (error: any) => {
        console.error('Error lors la mise à jour du Danger', error);
        if (error){this.msg='Error lors la mise à jour du danger'};
      }

  }

}
