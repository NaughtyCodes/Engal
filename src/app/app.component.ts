import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngapp11';

  numbers: any;
  tamilNumbers: any = '';
  tnNumbers: string[] = [];

  constructor() {
    this.initTamilNumbers();
    this.tnNumbers.forEach((c) => {
      console.log(c);
    });

    console.log(this.tnNumbers);
  }

  ngOnInit(): void {
    d3.selectAll('#d3Square')
      .on('mouseover', function () {
        d3.select(this).style('background-color', 'orange');

        // Get current event info
        //console.log(d3.);

        // Get x & y co-ordinates
        console.log(d3.pointer(this));
      })
      .on('mouseout', function () {
        d3.select(this).style('background-color', 'steelblue');
      });
  }

  initTamilNumbers() {
    let unicode = 3046;
    let stringRef = '';
    for (let i = 0; i <= 10; i++) {
      this.tnNumbers.push(String.fromCharCode(unicode + i));
    }
  }

  numToTamil($event: any) {
    let num = +$event.key;

    if ($event.key === 'Backspace') {
      this.tamilNumbers = '';
    }

    switch (num) {
      case 0:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[0];
        break;
      case 1:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[1];
        break;
      case 2:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[2];
        break;
      case 3:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[3];
        break;
      case 4:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[4];
        break;
      case 5:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[5];
        break;
      case 6:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[6];
        break;
      case 7:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[7];
        break;
      case 8:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[8];
        break;
      case 9:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[9];
        break;
      case 10:
        this.tamilNumbers = this.tamilNumbers + this.tnNumbers[10];
        break;

      default:
        this.tamilNumbers = this.tamilNumbers + '';
    }
  }
}
