import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngapp11';

  numbers: any;
  tamilNumbers: any = '';
  tnNumbers = ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯', '௰'];

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
