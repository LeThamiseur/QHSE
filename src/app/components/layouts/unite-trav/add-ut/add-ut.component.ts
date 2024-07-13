import { Component } from '@angular/core';
import { UTrav } from '../../../../models/u-trav';
import { UniteTravService } from '../../../../services/unite-trav.service';
import { DuerService } from '../../../../services/docU.service';
import { DocU } from '../../../../models/docU';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ut',
  templateUrl: './add-ut.component.html',
  styleUrl: './add-ut.component.css'
})
export class AddUTComponent {

  formData: UTrav = new UTrav();
  docUList: DocU[] = [];
  msg = '';

  constructor(private unitService : UniteTravService,
              private docUService : DuerService,
              private router : Router
  ){}

  ngOnInit(): void {
    this.docUService.getDocU().subscribe(data => {
      this.docUList = data;
    });
  }

  addUnit(){
    this.unitService.addUT(this.formData).subscribe(response => {
      console.log('Data sent successfully', response);
      this.formData = new UTrav()
      this.msg = 'Unité enregistrée avec succes';
      setTimeout(() => {
        this.router.navigate(['/uniteTrav']);
      }, 1000); // Retard de 5 secondes
      // this.router.navigate(['/uniteTrav'])
    }, (error:any) => {
      console.error('Error sending data', error);
    })
  };

}
