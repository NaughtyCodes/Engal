import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { WatchList } from '../models/fund-name';

@Injectable({
  providedIn: 'root'
})
export class WatchlisthandlerService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private firestore: AngularFirestore 
  ) { }

    getWatchlist() {
    return this.firestore.collection<WatchList>('stoxpo_watchlist').snapshotChanges().pipe(
      tap(arr => console.log(`read ${arr.length} docs.`)),
      take(1)
    );
  }
}
