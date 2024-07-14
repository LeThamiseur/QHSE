import { Component } from '@angular/core';
import { Task } from '../../../../models/task';
import { UniteTravService } from '../../../../services/unite-trav.service';
import { UTrav } from '../../../../models/u-trav';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent {

  tasksWithDangers: any[] = [];
  uniteTravList: UTrav[] = [];
  msg="";
  errorMsg = "";

  constructor(private unitService : UniteTravService){}

  ngOnInit(): void {
    this.unitService.getTasksWithDangers().subscribe(data => {
      this.tasksWithDangers = data;
    });

    this.unitService.getUniteTravail().subscribe(data => {
      this.uniteTravList = data;
    });
  }

  getUniteTravName(id_UT: number): string {
    const unite = this.uniteTravList.find(ut => ut.id === id_UT);
    return unite ? unite.nom_UT : 'Unknown';
  }

  // Delete task
  delete(task: Task): void {
    if (confirm('Êtes vous certain(e) de vouloir supprimer cette tâche?')) {
      this.tasksWithDangers = this.tasksWithDangers.filter(t => t !== task);
      this.unitService.deleteTaskAndTaskSD(task.id).subscribe(() => {
        this.msg = `Tâche supprimée avec succès`;
        setTimeout(() => {
          this.msg = ``;
        }, 3000); // Retard de 3 secondes
      }, error => {
        this.errorMsg = `Erreur de suppression`;
        setTimeout(() => {
          this.errorMsg = ``;
        }, 3000); // Retard de 3 secondes
      });
    }
  }

}
