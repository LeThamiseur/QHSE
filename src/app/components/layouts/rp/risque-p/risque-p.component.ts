import { Component } from '@angular/core';
import { DangRiskService } from '../../../../services/dang-risk.service';
import { SituationD } from '../../../../models/situation-D';

@Component({
  selector: 'app-risque-p',
  templateUrl: './risque-p.component.html',
  styleUrl: './risque-p.component.css'
})
export class RisquePComponent {

  situationDList : SituationD [] =[];
  // filteredSDList : SituationD [] = [];
  // msg = ''

  constructor(private dangRiskSevice : DangRiskService){}

  ngOnInit(): void {
    this.dangRiskSevice.getDangRisk(this.situationDList).subscribe(data => {
      this.situationDList = data;
      // this.filteredSDList = this.situationDList
    });
  }

}
