import { Component } from '@angular/core';
import { Task } from '../../../../models/task';
import { UTrav } from '../../../../models/u-trav';
import { UniteTravService } from '../../../../services/unite-trav.service';
import { Router } from '@angular/router';
import { SituationD } from '../../../../models/situation-D';
import { DangRiskService } from '../../../../services/dang-risk.service';
import { TaskSD } from '../../../../models/taskSD';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  formData: Task = new Task();
  uniteTravList: UTrav[] = [];
  msg = '';
  dangerList: SituationD[] = [];
  selectedDangers: number[] = [];

  constructor(private unitService : UniteTravService,
    private dangerService : DangRiskService,
    private router : Router
){}

  ngOnInit(): void {
    this.unitService.getUniteTravail().subscribe(data => {
      this.uniteTravList = data;
    });

    this.dangerService.getDangRisk(this.dangerList).subscribe(data => {
      this.dangerList = data;
    });

  }

  add_Task(): void {
    this.formData.id_UT = +this.formData.id_UT; // Convertir id_UT en number
    this.unitService.addTask(this.formData).subscribe(response => {
      console.log('Data sent successfully', response);
      const taskId = response.id;
      const taskSD = new TaskSD();
      taskSD.id_T = taskId;
      taskSD.id_Sd = this.selectedDangers;
      this.unitService.addTaskSD(taskSD).subscribe();
      this.formData = new Task();
      this.selectedDangers = [];
      this.msg = 'Tâche enregistrée avec succès';
      setTimeout(() => {
        this.router.navigate(['/uniteTrav/tasks']);
      }, 1000); // Retard de 1 seconde
    }, (error: any) => {
      console.error('Error sending data', error);
      this.msg = `Erreur lors de l'enregistrement de la tâche`;
      setTimeout(() => {
        this.router.navigate(['/uniteTrav/tasks']);
      }, 1000); // Retard de 1 seconde
      this.msg = '';
    });
  }

}
