import { Component } from '@angular/core';
import { SituationD } from '../../../../models/situation-D';
import { RisqueP } from '../../../../models/RisqueP';
import { DangRiskService } from '../../../../services/dang-risk.service';

@Component({
  selector: 'app-situation-list',
  templateUrl: './situation-list.component.html',
  styleUrl: './situation-list.component.css'
})
export class SituationListComponent {

  situationDList : SituationD [] =[]

  constructor(private dangRiskSevice : DangRiskService){}

  ngOnInit(): void {
    this.dangRiskSevice.getDangRisk(this.situationDList).subscribe(data => {
      this.situationDList = data;
    });
  }

  // situationD : SituationD [] =[
  //   {
  //     id : '1',
  //     libelle: 'Chutes de hauteur',
  //     description: "Travailler sur des échafaudages, des toits ou des échelles sans protection adéquate",
  //     riskP: [
  //       {
  //         id : '1',
  //         nomR  : "risque1",
  //         frequence  : 3,
  //         gravity  : 2,
  //         preventiveMes  : "mesures preventives"
  //       },
  //       {
  //         id : '2',
  //         nomR  : "risque2",
  //         frequence  : 3,
  //         gravity  : 2,
  //         preventiveMes  : "mesures preventives"
  //       }
  //     ]
  //   },
  //   {
  //     id : '2',
  //     libelle: 'Exposition à des produits chimiques',
  //     description: "Manipulation de substances toxiques sans protection.",
  //     riskP : []
  //   },
  //   {
  //     id : '3',
  //     libelle: 'Exposition à des températures extrêmes',
  //     description: "Travailler dans des conditions de chaleur ou de froid intense sans équipement de protection adéquat",
  //     riskP: []
  //   },
  //   {
  //     id : '4',
  //     libelle: 'Environnements bruyants',
  //     description: "Exposition prolongée à des niveaux de bruit élevés sans protection auditive, pouvant entraîner une perte auditive",
  //     riskP: []
  //   }

  // ];

}
