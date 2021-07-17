import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { svg } from 'd3';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Engal';

  constructor(@Inject(DOCUMENT) private _document: HTMLDocument) {

  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    let clH = (document.querySelector('body') as HTMLElement).clientHeight;
    let hH  = (document.querySelector('#headingMenubar') as HTMLElement).offsetHeight;
    let fH  = (document.querySelector('#footerMenubar') as HTMLElement).offsetHeight;
    let maH  = (document.querySelector('#mainArea') as HTMLElement).offsetHeight;
    let mA  = (document.querySelector('#mainArea') as HTMLElement);
    
    console.log(maH +'__'+fH+'__'+hH+'_px');

    //mA.style.height = (clH - (hH+fH))+'px';
    
    console.log((clH - (hH+fH))+'px');
 
  
  }

}
