import { Component } from '@angular/core';
import { SituationD } from '../../../../models/situation-D';
import { DangRiskService } from '../../../../services/dang-risk.service';

@Component({
  selector: 'app-add-situation',
  templateUrl: './add-situation.component.html',
  styleUrl: './add-situation.component.css'
})
export class AddSituationComponent {

  formData: SituationD = new SituationD();
  msg = ''

  constructor(private dangeriskService : DangRiskService){}

  addSD(){
    this.dangeriskService.addDang(this.formData).subscribe(response => {
      console.log('Data sent successfully', response);
      this.formData = new SituationD()
      this.msg = 'Situation enregistrée avec succes';
    }, (error:any) => {
      console.error('Error sending data', error);
    })
  };

}
