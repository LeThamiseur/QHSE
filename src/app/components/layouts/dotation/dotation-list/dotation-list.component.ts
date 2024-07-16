import { Component } from '@angular/core';
import { Dotation } from '../../../../models/dotation';
import { EquipementService } from '../../../../services/equipement.service';
// import { HistoDot } from '../../../../models/histoDot';

@Component({
  selector: 'app-dotation-list',
  templateUrl: './dotation-list.component.html',
  styleUrl: './dotation-list.component.css'
})
export class DotationListComponent {

  combinedData: any[] = [];
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private equipementService: EquipementService) { }

  ngOnInit(): void {
    this.getCombinedData();
  }

  getCombinedData(): void {
    this.equipementService.getCombinedData().subscribe(data => {
      this.combinedData = data;
    });
  }

  onDeleteDotation(id: number): void {
    if (confirm('Êtes vous certain(e) de vouloir supprimer cette dotation?')) {
      this.equipementService.deleteDotation(id).subscribe(() => {
        this.successMsg = `Dotation with id=${id} deleted successfully.`;
        this.getCombinedData(); // Refresh the data after deletion
      }, error => {
        this.errorMsg = `Error deleting dotation with id=${id}.`;
      });
    }
  }
  

  }
