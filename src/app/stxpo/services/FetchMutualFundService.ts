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
  public static GetFundDetails = 'https://api.mfapi.in/mf/';
  //TODO: Clean up
  //public static GetFundNameUrl = '/assets/mock-data/fundNames.json';

  constructor(private http: HttpClient, private router: Router) {}

  public getFundNames(): Observable<any> {
    return this.http.get(FetchMutualFundService.GetFundNameUrl);
  }

  public getFundDetails(mfId: any): Observable<any> {
    return this.http.get(FetchMutualFundService.GetFundDetails + mfId);
  }

  setRowHeightByField(rdata: any, fieldName: string) {
    let l = 0;
    let maxLength;
    for (var i = 0; i < rdata.length; i++) {
      if (rdata[i][fieldName].length > l) {
        l = rdata[i][fieldName].length;
        maxLength = rdata[i][fieldName].length;
      }
    }
    //console.log(maxLength);
    return maxLength;
  }
}
