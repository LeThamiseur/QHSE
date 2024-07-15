import { Component, OnInit } from '@angular/core';
import { DuerService } from '../../../../services/docU.service';
import { UniteTravService } from '../../../../services/unite-trav.service';
import { DocU } from '../../../../models/docU';

@Component({
  selector: 'app-duer-list',
  templateUrl: './duer-list.component.html',
  styleUrls: ['./duer-list.component.css']
})
export class DuerListComponent implements OnInit {
  tasksWithDangers: any[] = [];
  uniteTravList: any[] = [];

  constructor(private docUService: DuerService, private unitService: UniteTravService) { }

  ngOnInit(): void {
    this.unitService.getTasksWithDangers().subscribe(data => {
      this.tasksWithDangers = data;
      this.sortRisksByPriority(); // Appel du tri après récupération des données
    });

    this.unitService.getUniteTravail().subscribe(data => {
      this.uniteTravList = data;
    });
  }

  getUniteTravName(id_UT: number): string {
    const unite = this.uniteTravList.find(ut => ut.id === id_UT);
    return unite ? unite.nom_UT : 'Unknown';
  }

  getPriorityColor(frequence: number, gravite: number): string {
    const resultat = frequence * gravite;
    if (resultat >= 1 && resultat <= 3) {
      return 'priority-low'; // Vert pour priorité basse
    } else if (resultat >= 4 && resultat <= 6) {
      return 'priority-medium'; // Jaune pour priorité moyenne
    } else if (resultat >= 7 && resultat <= 9) {
      return 'priority-high'; // Orange pour priorité élevée
    } else {
      return 'priority-urgent'; // Rouge pour priorité urgente
    }
  }

  sortRisksByPriority(): void {
    this.tasksWithDangers.forEach((task: any) => {
      task.dangers.forEach((danger: any) => {
        danger.risques.sort((a: any, b: any) => this.getPriorityValue(b) - this.getPriorityValue(a));
      });
    });
  }

  getPriorityValue(risk: any): number {
    const frequence = Number(risk.frequence);
    const gravite = Number(risk.gravity);
    const resultat = frequence * gravite;

    if (resultat >= 1 && resultat <= 3) {
      return 1; // Vert pour priorité basse
    } else if (resultat >= 4 && resultat <= 6) {
      return 2; // Jaune pour priorité moyenne
    } else if (resultat >= 7 && resultat <= 9) {
      return 3; // Orange pour priorité élevée
    } else {
      return 4; // Rouge pour priorité urgente
    }
  }
}
