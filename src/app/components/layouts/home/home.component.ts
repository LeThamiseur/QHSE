import { Component, OnInit } from '@angular/core';
import { Accinc } from '../../../models/accinc';
import { AccincService } from '../../../services/accinc.service';
import { EquipementService } from '../../../services/equipement.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  accIncList: Accinc[] = [];
  latestAccInc: Accinc[] = [];
  combinedData: any[] = [];
  numberOfDotations: number = 0;
  

  constructor(private accincService: AccincService,
              private equipementService: EquipementService
  ) {}

  ngOnInit(): void {
    this.accincService.getAccIncList([]).subscribe((data: Accinc[]) => {
      this.accIncList = data;
      this.getLatestAccidents();
    });

    this.getCombinedData();
  }

  getLatestAccidents(): void {
    this.latestAccInc = this.accIncList
      .sort((a, b) => new Date(b.dateAccident).getTime() - new Date(a.dateAccident).getTime())
      .slice(0, 5);
  }

  // Dans HomeComponent
  getAccidents(): Accinc[] {
    return this.accIncList.filter(accident => accident.type === 'accident');
  }

  getIncidents(): Accinc[] {
    return this.accIncList.filter(accident => accident.type === 'incident');
  }

  


  getCombinedData(): void {
    this.equipementService.getCombinedData().subscribe(data => {
      // Récupération du nombre de dotations avant le tri
      this.numberOfDotations = data.length;
      // Tri des dotations par date décroissante
      this.combinedData = data.sort((a, b) => new Date(b.dotation.date).getTime() - new Date(a.dotation.date).getTime()).slice(0, 5);
    });
  }
  
}
