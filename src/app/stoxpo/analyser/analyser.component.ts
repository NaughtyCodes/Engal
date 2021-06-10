import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { FetchOptionsService } from '../services/fetch-options.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-analyser',
  templateUrl: './analyser.component.html',
  styleUrls: ['./analyser.component.scss']
})
export class AnalyserComponent implements OnInit {

  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  rowHeight: number | undefined;
  rowSelection: string = 'single';
  frameworkComponents: any;
  watchList: any[] = [];
  columnDefs: any[] = [];
  originalData:[] = [];
  gridOptions = {};
  t: any[] = [];
  preValue: any;
  changeFlag: boolean = false;

  defaultColDef = {
    width: 80,
    sortable: true,
    editable: false,
    resizable: false,
    filter: false,
    cellStyle: { 'white-space': 'normal !important'},
  };

  constructor(
    private fetchOptionsService : FetchOptionsService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private firebaseService: FirebaseService
    ) { 
      this.columnDefs = [
        {
          field: 'optionChain',
          headerName: 'EQ',
          filter: 'agTextColumnFilter',
          floatingFilter: true,
          cellStyle: (params: any) => {
            if(this.preValue ===  params.value) {
              return {"background-color": "#87CEFA"};
            } else {
              this.preValue = params.value;
              this.changeFlag = true;
              return {"background-color": "#bababa"};
            }
          },
          hide: false,
          wrapText: true,
          autoHeight: true,
          pinned: 'left',
        },
        {
          headerName: 'St.Pr.',
          field: 'price',
          filter: 'agNumberColumnFilter',
          wrapText: true,
          autoHeight: true,
          floatingFilter: true,
        },
        {
          field: 'volume',
          headerName: 'VOL',
          filter: 'agNumberColumnFilter',
          floatingFilter: true,
          width: 80,
        }, 
        {
          field: 'rsi',
          headerName: 'RSI',
          filter: 'agNumberColumnFilter',
          wrapText: true,
          autoHeight: true,
          floatingFilter: true,
        },
        {
          headerName: 'PRE',
          field: 'premium',
          filter: 'agNumberColumnFilter',
          floatingFilter: true,
          wrapText: true,
          autoHeight: true,
        }, 
        {
          headerName: '%',
          field: 'precentage',
          filter: 'agNumberColumnFilter',
          wrapText: true,
          autoHeight: true,
          floatingFilter: true,
        }, 
        {
          headerName: 'EX',
          field: 'expiry',
          wrapText: true,
          autoHeight: true,
          filter: 'agTextColumnFilter',
          hide: false,
          floatingFilter: true,
          width: 60,
        }
      ];
  
    }

  ngOnInit(): void { 
    this.primengConfig.ripple = true;

    this.fetchOptionsService.getOptions().subscribe((d:any) => {
      for(const o in d){
        for(const p in d[o]){
          if(p === 'optionChain' && o !== ''){
            const c = d[o][p];
            from(c).pipe(map((e:any) => {
                if(e.poVolume > 0){
                  return {
                    optionChain: o,
                    price: e.strikePrice,
                    rsi: d[o].rsi.value,
                    premium: e.poLTP,
                    volume: e.poVolume,
                    precentage: (e.poLTP/(e.strikePrice/100)).toFixed(2),
                    expiry: d[o].expiryDate,
                  }
                }
            })).subscribe(
              (v: any) => {
                if(v !== undefined){
                  this.t.push(v); 
                }
              }
            );
          }
        }
      } 
      this.rowData = this.t;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    //this.gridApi.sizeColumnsToFit();
    this.gridApi.setHeaderHeight(20);
    this.gridColumnApi = params.columnApi;
  }

}
