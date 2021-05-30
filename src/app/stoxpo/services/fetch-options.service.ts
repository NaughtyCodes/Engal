import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchOptionsService {

  public static GetOptions = '/assets/mock-data/';

  constructor(private http: HttpClient, private router: Router) {}

  public getOptions(date: string) {
    const headers= new HttpHeaders();

    return this.http.get(FetchOptionsService.GetOptions+date+'.json', { 'headers': headers });
  }
}
