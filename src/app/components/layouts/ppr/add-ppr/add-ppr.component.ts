import { Component } from '@angular/core';

@Component({
  selector: 'app-add-ppr',
  templateUrl: './add-ppr.component.html',
  styleUrl: './add-ppr.component.css'
})
export class AddPprComponent {

  project = {
    nomProjet: '',
    lieu: '',
    responsable: '',
    tel: '',
    duree: '',
    effectif: '',
    description: '',
    tasks: [
      {taskName : '',
      situations : [
        {
          situationName:'',
          risks:'',
          measures: ''
        }
      ]
      }
    ]
  };

  addTask() {
    this.project.tasks.push({
      taskName: '',
      situations: [
      ]
    });
  }

  addDangerousSituation(taskIndex: number) {
    this.project.tasks[taskIndex].situations.push({
      situationName: '',
      risks: '',
      measures: ''
    });
  }

  onSubmit() {
    console.log(this.project);
  }

}
