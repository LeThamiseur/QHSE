import { Component, Input } from '@angular/core';
import { UTrav } from '../../../../models/u-trav';
import { UniteTravService } from '../../../../services/unite-trav.service';
import { Duer } from '../../../../services/docU.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DocU } from '../../../../models/docU';

@Component({
  selector: 'app-edit-ut',
  templateUrl: './edit-ut.component.html',
  styleUrl: './edit-ut.component.css'
})
export class EditUTComponent {

  @Input() unite!: UTrav;
  docUList: DocU[] = [];
  msg = '';
  error= "";

  constructor(private unitService : UniteTravService,
    private docUService : Duer,
    private route: ActivatedRoute,
    private router: Router,
){}

ngOnInit(): void {
  this.getUnit();

  this.route.params.subscribe(params => {
    const id = this.unite.id; // Récupère l'ID des paramètres de la route
    this.unitService.getUnitByID(id).subscribe(data => {
      this.unite = data;
      console.log(this.unite)
    });
  });

  this.docUService.getDocU().subscribe(data => {
    this.docUList = data;
  });
}

getUnit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.unitService.getUnitByID(id)
    .subscribe(ut => this.unite = ut);
}

save(): void {
  this.unitService.updateUT(this.unite).subscribe(response => {
    console.log('Mis à jour avec succès', response);
      if (response){
      this.msg='Mis à jour avec succès';
      setTimeout(() => {
        this.router.navigate(['/uniteTrav']);
      }, 1000); // Retard de 5 secondes
      // this.router.navigate(['/uniteTrav']);
      }
    }), (error: any) => {
      console.error('Error lors la mise à jour ', error);
      if (error){this.error='Error lors la mise à jour '};
    }

}

}
