import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-indetails',
  templateUrl: './indetails.component.html',
  styleUrls: ['./indetails.component.scss'],
})
export class IndetailsComponent implements OnInit {
  index: number = 0;

  constructor() {}

  ngOnInit(): void {}

  openNext() {
    this.index = this.index === 2 ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = this.index === 0 ? 2 : this.index - 1;
  }
}
