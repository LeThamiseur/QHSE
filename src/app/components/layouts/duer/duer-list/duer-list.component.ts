import { Component } from '@angular/core';
import { DocU } from '../../../../models/docU';
import { DuerService } from '../../../../services/docU.service';

@Component({
  selector: 'app-duer-list',
  templateUrl: './duer-list.component.html',
  styleUrls: ['./duer-list.component.css']
})
export class DuerListComponent {
  docUList: DocU[] = [];
  msg="";
  errorMsg = "";

  constructor(private docUService: DuerService) { }

  ngOnInit(): void {
    this.docUService.getDuerList().subscribe(data => {
      this.docUList = data;
      console.log(this.docUList)
    });
  }

}
