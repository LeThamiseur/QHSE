import { Component, OnInit } from '@angular/core';
import { DangRiskService } from '../../../../services/dang-risk.service';
import { SituationD } from '../../../../models/situation-D';

@Component({
  selector: 'app-risque-p',
  templateUrl: './risque-p.component.html',
  styleUrls: ['./risque-p.component.css']
})
export class RisquePComponent implements OnInit {

  situationDList: SituationD[] = [];

  constructor(private dangRiskSevice: DangRiskService) {}

  ngOnInit(): void {
    this.dangRiskSevice.getDangRisk(this.situationDList).subscribe(data => {
      this.situationDList = data;
      this.sortRisksByPriority();
    });
  }

  // Pour le style
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

  sortRisksByPriority(): void {
    this.situationDList.forEach(situation => {
      situation.risques.sort((a, b) => {
        const priorityA = this.getPriorityValue(a.frequence, a.gravity);
        const priorityB = this.getPriorityValue(b.frequence, b.gravity);
        return priorityB - priorityA;
      });
    });
  }

  getPriorityValue(frequency: number, gravity: number): number {
    const product = frequency * gravity;
    if (product >= 1 && product <= 3) {
      return 1; // Vert
    } else if (product >= 4 && product <= 6) {
      return 2; // Jaune
    } else if (product >= 7 && product <= 9) {
      return 3; // Orange
    } else {
      return 4; // Rouge
    }
  }
}
