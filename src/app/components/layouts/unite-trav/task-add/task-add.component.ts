import { Component } from '@angular/core';
import { Task } from '../../../../models/task';
import { UTrav } from '../../../../models/u-trav';
import { UniteTravService } from '../../../../services/unite-trav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  formData: Task = new Task();
  uniteTravList: UTrav[] = [];
  msg = '';

  constructor(private unitService : UniteTravService,
    private router : Router
){}

ngOnInit(): void {
  this.unitService.getUniteTravail().subscribe(data => {
    this.uniteTravList = data;
  });
}

add_Task(){
  this.formData.id_UT = +this.formData.id_UT;  // Convertir id_UT en number
  this.unitService.addTask(this.formData).subscribe(response => {
    console.log('Data sent successfully', response);
    this.formData = new Task()
    this.msg = 'Tâche enregistrée avec succes';
    setTimeout(() => {
      this.router.navigate(['/uniteTrav/tasks']);
    }, 1000); // Retard de 1 secondes
    
  }, (error:any) => {
    console.error('Error sending data', error);
    this.msg = `Erreur lors de l'enreistrement de la tâche`;
    setTimeout(() => {
      this.router.navigate(['/uniteTrav/tasks']);
    }, 1000); // Retard de 1 secondes
    this.msg = '';
  })
};

}
