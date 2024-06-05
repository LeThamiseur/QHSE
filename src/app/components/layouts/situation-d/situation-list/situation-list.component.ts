import { Component } from '@angular/core';
import { SituationD } from '../../../../models/situation-D';

@Component({
  selector: 'app-situation-list',
  templateUrl: './situation-list.component.html',
  styleUrl: './situation-list.component.css'
})
export class SituationListComponent {

  situationD : SituationD [] =[
    {
      id : '1',
      libelle: 'Chutes de hauteur',
      description: "Travailler sur des échafaudages, des toits ou des échelles sans protection adéquate"
    },
    {
      id : '2',
      libelle: 'Chutes de hauteur',
      description: "Travailler sur des échafaudages, des toits ou des échelles sans protection adéquate"
    },
    {
      id : '3',
      libelle: 'Équipement de levage',
      description: "Utilisation incorrecte de chariots élévateurs ou grues, entraînant la chute de charges lourdes"
    },
    {
      id : '4',
      libelle: 'Environnements bruyants',
      description: "Exposition prolongée à des niveaux de bruit élevés sans protection auditive, pouvant entraîner une perte auditive"
    }

  ]
}
