import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { WatchList } from '../models/fund-name';
import { ResponseObj } from '../models/response-obj';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor (
    private firestore: AngularFirestore,
    private http: HttpClient,
    private router: Router,
  ) { 

  }

  getGirdData(collectionName: string, paramsArray: any) {
    if (paramsArray !== null && collectionName === 'stoxpo_watchlists'){
      return this.firestore.collection(collectionName, ref => ref.where('schemeCode', '==', paramsArray['value'])).valueChanges().pipe(
        tap(arr => console.log(`read ${arr.length} docs.`)),
        take(1)
      );
    } else {
      return this.firestore.collection('/stoxpo_watchlists').snapshotChanges().pipe(
        tap(arr => console.log(`read ${arr.length} docs.`)),
        take(1)
      );
    }
  }

  updateGridData(collectionName: string, dataArray: any): any {
    return null;
  }

  addGridData(collectionName: string, data: any): any {
    return this.firestore.collection(collectionName).add(data);
  }

  deleteGrid(collectionName: string, data: any): any{
    return this.firestore.doc(collectionName+'/'+data).delete();
    
  }
}
