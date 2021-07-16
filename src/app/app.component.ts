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
  screenHeight: any = '768px';
  footerMargin: any = '740px';
  mainAreaHeight: any = '768px';

  constructor(@Inject(DOCUMENT) private _document: HTMLDocument) {
    this.screenHeight = (screen.height)+'px';
    this.mainAreaHeight = (screen.width < 450 ? screen.height - 100 : screen.height - 250)+'px';
    this.footerMargin = '';
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    //console.log((screen.height+((screen.height/100)*10))+'px');
    //(document.querySelector('.footer-menubar) as HTMLElement).style['margin-top = (screen.height-30)
  }

}
