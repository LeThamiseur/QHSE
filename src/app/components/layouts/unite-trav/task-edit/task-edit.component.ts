import { Component, Input } from '@angular/core';
import { Task } from '../../../../models/task';
import { UTrav } from '../../../../models/u-trav';
import { UniteTravService } from '../../../../services/unite-trav.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {

  @Input() task!: Task;
  uniteTravList: UTrav[] = [];
  msg = '';
  error= "";

  constructor(private unitService : UniteTravService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getTask();

    this.route.params.subscribe(params => {
      const id = this.task.id; // Récupère l'ID des paramètres de la route
      this.unitService.getTaskByID(id).subscribe(data => {
        this.task = data;
        console.log(this.task)
      });
    });

    this.unitService.getUniteTravail().subscribe(data => {
      this.uniteTravList = data;
    });
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.unitService.getTaskByID(id)
      .subscribe(tach => this.task = tach);
  }

  save(): void {
    this.task.id_UT = +this.task.id_UT;  // Convertir id_UT en number
    this.unitService.updateTask(this.task).subscribe(response => {
      console.log('Mis à jour avec succès', response);
        if (response){
        this.msg='Mis à jour avec succès';
        setTimeout(() => {
          this.router.navigate(['/uniteTrav/tasks']);
        }, 1000); // Retard de 5 secondes
        // this.router.navigate(['/uniteTrav']);
        }
      }), (error: any) => {
        console.error('Error lors la mise à jour ', error);
        if (error){this.error='Error lors la mise à jour '};
      }

  }

}
