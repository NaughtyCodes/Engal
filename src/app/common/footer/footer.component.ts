import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  items: any;

  constructor(private router: Router) { 

  }

  ngOnInit() {
     
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
