import { Component } from '@angular/core';
import { Accinc } from '../../../../models/accinc';
import { AccincService } from '../../../../services/accinc.service';

@Component({
  selector: 'app-acc-list',
  templateUrl: './acc-list.component.html',
  styleUrl: './acc-list.component.css'
})
export class AccListComponent {
  accincList : Accinc [] = []
  filteredAccincList : Accinc [] = [];
  // selectedAccinc?: Accinc;

  constructor (private accinservice: AccincService){
    // this.filteredAccincList = this.accincList
  }

  ngOnInit(): void {
   // affiche la listes des déclarartions
    this.accinservice.getAccIncList(this.accincList).subscribe(data => {
      this.accincList = data;
      this.filteredAccincList = this.accincList
    });
  }

  // onSelect(accinc: Accinc): void {
  //   this.selectedAccinc = accinc;
  // }
// Delete declaration
  delete(accinc: Accinc): void {
    this.accincList = this.accincList.filter(aI => aI !== accinc);
    this.accinservice.deleteAccinc(accinc.id).subscribe();
  }

  // recherche de déclaration en fonction du critère de recherche
  filterResults(text: string) {
    if (!text) {
      this.filteredAccincList=this.accincList;
      return;
    }
    this.filteredAccincList = this.accincList.filter(
      accInc => accInc?.type.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
                // accInc?.victime.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
                accInc.contract.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    )
  }

}
