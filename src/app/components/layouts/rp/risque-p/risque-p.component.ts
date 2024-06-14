import { Component } from '@angular/core';
import { DangRiskService } from '../../../../services/dang-risk.service';
import { SituationD } from '../../../../models/situation-D';

@Component({
  selector: 'app-risque-p',
  templateUrl: './risque-p.component.html',
  styleUrl: './risque-p.component.css'
})
export class RisquePComponent {

  situationDList : SituationD [] =[];


  constructor(private dangRiskSevice : DangRiskService){}

  ngOnInit(): void {
    this.dangRiskSevice.getDangRisk(this.situationDList).subscribe(data => {
      this.situationDList = data;
    });
  }

  onDeleteRisk(dangerId: string, riskId: string): void {
    this.dangRiskSevice.deleteRisk(dangerId, riskId).subscribe(() => {
      console.log('Risque supprimé avec succès');
      // Mettre à jour la liste après suppression
      this.situationDList = this.situationDList.map(situation => {
        if (situation.id === dangerId) {
          situation.risques = situation.risques.filter(risk => risk.id !== riskId);
        }
        return situation;
      });
    });
  }

}
