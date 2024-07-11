import { Component, OnInit } from '@angular/core';
import { UTrav } from '../../../../models/u-trav';
import { Task } from '../../../../models/task';
import { UniteTravService } from '../../../../services/unite-trav.service';

@Component({
  selector: 'app-unit-trav-list',
  templateUrl: './unit-trav-list.component.html',
  styleUrls: ['./unit-trav-list.component.css']
})
export class UnitTravListComponent implements OnInit {

  uniteTravList: UTrav[] = [];
  selectedTasks: Task[] = [];
  selectedUnite: UTrav | null = null;
  msg="";
  errorMsg = "";

  constructor(private uniteTravService: UniteTravService) { }

  ngOnInit(): void {
    this.uniteTravService.getUniteTravail().subscribe(data => {
      this.uniteTravList = data;
    });
  }

  viewTasks(unite: UTrav): void {
    this.selectedUnite = unite;
    this.uniteTravService.getTasksByUniteTravail(unite.id).subscribe(data => {
      this.selectedTasks = data;
    });
  }

  // Delete UT
  delete(unite: UTrav): void {
    
    if (confirm('Êtes vous certain(e) de vouloir supprimer cette unité?')) {
      this.uniteTravList = this.uniteTravList.filter(ut => ut !== unite);
      this.uniteTravService.deleteUT(unite.id).subscribe(() => {
        this.msg = `Unité supprimée avec succès`;
        setTimeout(() => {
          this.msg = ``;
        }, 3000); // Retard de 5 secondes
      }, error => {
        this.errorMsg = `Erreur de suppression`;
        setTimeout(() => {
          this.errorMsg = ``;
        }, 3000); // Retard de 5 secondes
      }) ;
    }
  }
}
