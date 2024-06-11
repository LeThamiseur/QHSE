import { Component, Input } from '@angular/core';
import { RisqueP } from '../../../../models/RisqueP';
import { DangRiskService } from '../../../../services/dang-risk.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SituationD } from '../../../../models/situation-D';

@Component({
  selector: 'app-add-risque',
  templateUrl: './add-risque.component.html',
  styleUrl: './add-risque.component.css'
})
export class AddRisqueComponent {
  situation = '';
  newRisk: RisqueP = new RisqueP();
  dangerId!: string;

  constructor(
    private dangRiskService: DangRiskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dangerId = this.route.snapshot.paramMap.get('dangerId')!;
    this.dangRiskService.getDangRById(this.dangerId).subscribe(data => {
      this.situation = data.libelle;
    });
  }

  onSubmit(): void {
    this.dangRiskService.addRisk(this.dangerId, this.newRisk).subscribe(() => {
      console.log('Risk updated successfully');
      this.router.navigate(['/RP']);
        // Rediriger vers la liste des risques après la mise à jour
    }),
      (    error: any) => console.error('Erreur lors de l\'ajout du risque :', error);


  }

}
