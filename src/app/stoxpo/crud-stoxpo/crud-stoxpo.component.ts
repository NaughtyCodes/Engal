import {
  Component,
  Input,
  IterableDiffer,
  IterableDiffers,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { FundName } from '../models/fund-name';
import { WatchlisthandlerService } from '../services/watchlisthandler.service';

@Component({
  selector: 'app-crud-stoxpo',
  templateUrl: './crud-stoxpo.component.html',
  styleUrls: ['./crud-stoxpo.component.scss'],
})
export class CrudstoxpoComponent implements OnInit {
  @Input()
  fundNames: any;
  
  changedFunds: any = [];

  private _differObj: any = {};
  private _differArray: IterableDiffer<any> | undefined;

  constructor(private watchlisthandlerService: WatchlisthandlerService, private _differsArray: IterableDiffers, private _differsObj: KeyValueDiffers) {}

  ngDoCheck() {
    if (this._differArray) {
      const changes = this._differArray.diff(this.fundNames);
      if (changes) {
        changes.forEachAddedItem((record) => {
            console.log('added ' + JSON.stringify(record.item));
        });
        changes.forEachRemovedItem((record) => {
            console.log('removed ' + JSON.stringify(record.item));
        });
      }
    }

    this.fundNames.forEach((e: any) => {
      let differObj = this._differObj[e];
      const objChanges = differObj.diff(e);
      if (objChanges) {
        objChanges.forEachChangedItem((record: any) => {
        //console.log('previous => '+record.previousValue+' :::: current ==>'+record.currentValue)
        //console.log(record.key + "," + record.currentValue);
        });
      }
    });
        
  }

  ngOnInit(): void { 

    if (!this._differArray && this.fundNames) {
      this._differArray = this._differsArray.find(this.fundNames).create(this.trackByFn);
    }

    this.fundNames.forEach((e: any) => {
      this._differObj[e] = this._differsObj.find(e).create();
    });

    this.watchlisthandlerService.getWatchlist().subscribe(data => {
      //console.log(data[0].payload.doc.data()['schemeCode']);
    }, 
    errorCode => {
      console.log(errorCode);
    });

  }

  trackByFn(index: number, item: any) {
    return index;
  }

  updateArray() {
    console.log('****** Before *******');
    this.fundNames.forEach((e: any, index: number) => {
      console.log(this.fundNames[index].schemeCode);
    });
    console.log('********************');
    
    let id = Math.floor(Math.random() * 21)+3;
    this.fundNames.push({ 
        schemeCode: id, 
        schemeName: 'Changed Value'+id
      });
    
    console.log('****** After *******');
    this.fundNames.forEach((e: any, index: number) => {
      console.log(this.fundNames[index].schemeCode);
    });
    console.log('********************');
    console.log('****** After Change *******');
    this.changedFunds.forEach((e: any, index: number) => {
      console.log(JSON.stringify(e));
    });
    console.log('********************');
  }

  changeArray() {
    console.log('****** Before *******');
    this.fundNames.forEach((e: any, index: number) => {
      console.log(this.fundNames[index].schemeCode);
    });
    console.log('********************');
    
    this.fundNames[1]['schemeCode'] = Math.floor(Math.random() * 51)+21;
    
    console.log('****** After *******');
    
    this.fundNames.forEach((e: any, index: number) => {
      console.log(this.fundNames[index].schemeCode);
    });
    
    console.log('********************');
    console.log('****** After Change *******');
    this.changedFunds.forEach((e: any, index: number) => {
      console.log(JSON.stringify(e));
    });
    console.log('********************');
  }

  deleteArray() {
    console.log('****** Before *******');
    this.fundNames.forEach((e: any, index: number) => {
      console.log(this.fundNames[index].schemeCode);
    });
    console.log('********************');
    
    this.fundNames.pop();
    
    console.log('****** After *******');
    this.fundNames.forEach((e: any, index: number) => {
      console.log(this.fundNames[index].schemeCode);
    });
    console.log('********************');
    console.log('****** After Change *******');
    this.changedFunds.forEach((e: any, index: number) => {
      console.log(JSON.stringify(e));
    });
    console.log('********************');
  }


}
