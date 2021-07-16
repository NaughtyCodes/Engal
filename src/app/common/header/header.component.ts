import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: any;
  visibleSidebar5: any;
  

  constructor(private router: Router) {  }

  ngOnInit(): void {

    this.items = [
  
  ];

  }

  home($event: any){
    this.router.navigate(['/opts/0', {}]);
  }

  mutualFunds($event: any){
    this.router.navigate(['/stoxpo', {}]);;
  }

  options($event: any){
    this.router.navigate(['/opts/1', {}]);
  }

}
