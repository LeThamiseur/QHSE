import { Component } from '@angular/core';
import { RisqueP } from '../../../../models/RisqueP';
import { ActivatedRoute, Router } from '@angular/router';
import { DangRiskService } from '../../../../services/dang-risk.service';

@Component({
  selector: 'app-edit-risque',
  templateUrl: './edit-risque.component.html',
  styleUrl: './edit-risque.component.css'
})
export class EditRisqueComponent {
  risk: RisqueP = new RisqueP();
  dangerId!: string;
  riskId!: string;

  constructor(
    private route: ActivatedRoute,
    private dangRiskService: DangRiskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dangerId = this.route.snapshot.paramMap.get('dangerId')!;
    this.riskId = this.route.snapshot.paramMap.get('riskId')!;
    this.dangRiskService.getRiskById(this.dangerId, this.riskId).subscribe(data => {
      this.risk = data;
    });
  }

  onSubmit(): void {
    this.dangRiskService.updateRisk(this.dangerId, this.riskId, this.risk).subscribe(() => {
      console.log('Risk updated successfully');
      this.router.navigate(['/RP']);  // Rediriger vers la liste des risques après la mise à jour
    });
  }

}
