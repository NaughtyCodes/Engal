import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchOptionsService {

  public static GetOptions = 'https://www1.nseindia.com/marketinfo/companyTracker/mtOptionKeys.jsp?companySymbol=BRITANNIA&indexSymbol=NIFTY&series=EQ&instrument=OPTSTK&date=29JUL2021';

  constructor(private http: HttpClient, private router: Router) {}

  public getOptions() {
    const headers= new HttpHeaders();

    return this.http.get(FetchOptionsService.GetOptions, { 'headers': headers }).subscribe((e:any) => {
      console.log(e);
    });
  }
}
