import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchOptionsService {

  public static getOptions = 'https://raw.githubusercontent.com/hellomohanakrishnan/NseOptionsChainData/main/';

  constructor(private http: HttpClient, private router: Router) {}

  public getOptions(fetchMonthKey: any) {
    const headers= new HttpHeaders();
    return this.http.get(FetchOptionsService.getOptions+this.getMonthToFetch(fetchMonthKey)+'_UpdatedData.json', { 'headers': headers });
  }

  getMonthToFetch(fetchMonthKey: string) {
    const MMM = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let mm = MMM[new Date().getMonth()];

    if(fetchMonthKey === 'CURRENT') {
      return mm = new Date().getDate() <= this.getLastThrusday(new Date()) ? MMM[new Date().getMonth()] : MMM[new Date().getMonth()+1];
    } else if(fetchMonthKey === 'NEXT') {
      return mm = new Date().getDate() <= this.getLastThrusday(new Date()) ? MMM[new Date().getMonth()+1] : MMM[new Date().getMonth()+2];
    } else if(fetchMonthKey === 'LAST') {
      return mm = new Date().getDate() <= this.getLastThrusday(new Date()) ? MMM[new Date().getMonth()+2] : MMM[new Date().getMonth()+3];
    } else {
      return mm = new Date().getDate() <= this.getLastThrusday(new Date()) ? MMM[new Date().getMonth()] : MMM[new Date().getMonth()+1];
    }

  }

  getLastThrusday(date: Date) {
    let dd = date.getDate();
    let th = 0;
    switch (date.getMonth()) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        th = new Date(date.getMonth()+1+'/31/'+date.getFullYear()).getDay();
        if(th > 4) {
          dd=new Date(date.getMonth()+1+'/'+(31-(th-4))+'/'+date.getFullYear()).getDate();
        } else if(th < 4) {
          dd=new Date(date.getMonth()+1+'/'+(31-(4+th))+'/'+date.getFullYear()).getDate()+1;
        } else {
          dd=new Date(date.getMonth()+1+'/'+(31)+'/'+date.getFullYear()).getDate();
        }
      break;
      case 1:
        let febDays = date.getFullYear() % 4 === 0 ? 29 : 28;
        th = new Date(date.getMonth()+1+'/'+febDays+'/'+date.getFullYear()).getDay();
        if(th > 4) {
          dd=new Date(date.getMonth()+1+'/'+(febDays-(th-4))+'/'+date.getFullYear()).getDate();
        } else if(th < 4) {
          dd=new Date(date.getMonth()+1+'/'+(febDays-(4+th))+'/'+date.getFullYear()).getDate()+1;
        } else {
          dd=new Date(date.getMonth()+1+'/'+(febDays-(4))+'/'+date.getFullYear()).getDate();
        }
        break;
        default:
          th = new Date(date.getMonth()+1+'/30/'+date.getFullYear()).getDay();
          if(th > 4) {
            dd=new Date(date.getMonth()+1+'/'+(30-(th-4))+'/'+date.getFullYear()).getDate();
          } else if(th < 4) {
            dd=new Date(date.getMonth()+1+'/'+(30-(4+th))+'/'+date.getFullYear()).getDate()+1;
          } else {
            dd=new Date(date.getMonth()+1+'/'+(30)+'/'+date.getFullYear()).getDate();
          }
      }
      return dd;
    }


}
