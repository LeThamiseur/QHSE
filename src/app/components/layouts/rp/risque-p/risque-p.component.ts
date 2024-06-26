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

//  pour le style
  getPriorityClass(frequency: number, gravity: number): string {
    const product = frequency * gravity;
    if (product >= 1 && product <= 3) {
      return 'acceptable';
    } else if (product >= 4 && product <= 6) {
      return 'moyen';
    } else if (product >= 7 && product <= 9) {
      return 'eleve';
    } else {
      return 'inacceptable';
    }
  }

  getPriority(frequency: number, gravity: number): string {
    const product = frequency * gravity;
    if (product >= 1 && product <= 3) {
      return 'Acceptable';
    } else if (product >= 4 && product <= 6) {
      return 'Moyen';
    } else if (product >= 7 && product <= 9) {
      return 'Elevé';
    } else {
      return 'Inacceptable';
    }
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
