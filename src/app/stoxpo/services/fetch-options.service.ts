import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchOptionsService {

  public static getOptions = 'https://raw.githubusercontent.com/hellomohanakrishnan/NseOptionsChainData/main/LastUpdatedData.json';

  constructor(private http: HttpClient, private router: Router) {}

  public getOptions() {
    const headers= new HttpHeaders();
    return this.http.get(FetchOptionsService.getOptions, { 'headers': headers });
  }

}
