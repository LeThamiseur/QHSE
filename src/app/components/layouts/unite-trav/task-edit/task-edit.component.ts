import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../models/task';
import { UTrav } from '../../../../models/u-trav';
import { SituationD } from '../../../../models/situation-D';
import { TaskSD } from '../../../../models/taskSD';
import { UniteTravService } from '../../../../services/unite-trav.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DangRiskService } from '../../../../services/dang-risk.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  @Input() task!: Task;
  uniteTravList: UTrav[] = [];
  dangersList: SituationD[] = [];
  selectedDangers: number[] = [];
  msg = '';
  error= "";

  constructor(private unitService: UniteTravService,
              private route: ActivatedRoute,
              private dangerService: DangRiskService,
              private router: Router) {}

  ngOnInit(): void {
    this.getTask();

    this.unitService.getUniteTravail().subscribe(data => {
      this.uniteTravList = data;
    });

    this.dangerService.getDangRisk(this.dangersList).subscribe(data => {
      this.dangersList = data;
    });
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.unitService.getTaskByID(id).subscribe(task => {
      this.task = task;
      this.getDangersForTask(task.id);
    });
  }

  getDangersForTask(taskId: number): void {
    this.unitService.getTaskSDByTaskId(taskId).subscribe(taskSDs => {
      this.selectedDangers = taskSDs.map(taskSD => taskSD.id_Sd).flat();
    });
  }

  save(): void {
    this.task.id_UT = +this.task.id_UT;  // Convertir id_UT en number
    this.unitService.updateTask(this.task).subscribe(response => {
      console.log('Mis à jour avec succès', response);
      this.updateTaskSD(response.id);
    }, error => {
      console.error('Error lors de la mise à jour ', error);
      this.error = 'Error lors de la mise à jour ';
    });
  }

  updateTaskSD(taskId: number): void {
    const taskSD: TaskSD = {
      id: 0, // L'id sera géré par le backend
      id_T: taskId,
      id_Sd: this.selectedDangers
    };
    this.unitService.updateTaskSD(taskSD).subscribe(() => {
      this.msg = 'Mis à jour avec succès';
      setTimeout(() => {
        this.router.navigate(['/uniteTrav/tasks']);
      }, 1000); // Retard de 1 seconde
    }, error => {
      console.error('Error lors de la mise à jour ', error);
      this.error = 'Error lors de la mise à jour ';
    });
  }
}
