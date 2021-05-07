import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { take } from 'rxjs/operators';
import { FundName } from '../models/fund-name';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchMutualFundService {
  public static GetFundNameUrl = 'https://api.mfapi.in/mf';
  //TODO: Clean up
  //public static GetFundNameUrl = '/assets/mock-data/fundNames.json';

  constructor(private http: HttpClient, private router: Router) {}

  public getFundNames(): Observable<any> {
    return this.http.get(FetchMutualFundService.GetFundNameUrl);
  }
}
