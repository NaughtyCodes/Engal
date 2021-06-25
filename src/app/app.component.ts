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
  screenHight: number = 768;

  constructor(@Inject(DOCUMENT) private _document: HTMLDocument) {
    this.screenHight = screen.height;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    //console.log((screen.height+((screen.height/100)*10))+'px');
    //(document.querySelector('.main-area') as HTMLElement).style.height = (screen.height+((screen.height/100)*3))+'px';
  }

}
