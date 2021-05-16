import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
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

  getGirddata(collectionName: string, paramsArray: any) {
    return this.firestore.collection('collectionName').snapshotChanges().pipe(
      tap(arr => console.log(`read ${arr.length} docs.`)),
      take(1)
    );
  }

  updateGrid(collectionName: string, dataArray: any): ResponseObj {
    let responseObject : ResponseObj =
    {
      responseCode: 100,
      responseMessage: "Thanks",
      responseData: null
    };

    return responseObject;
  }

  deleteGrid(collectionName: string, dataArray: any): ResponseObj {
    let responseObject : ResponseObj =
    {
      responseCode: 100,
      responseMessage: "Thanks",
      responseData: null
    };

    return responseObject;
  }

 

}
