import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: any;
  visibleSidebar5: any;
  

  constructor() { }

  ngOnInit(): void {

    this.items = [
  
  ];

  }

}
