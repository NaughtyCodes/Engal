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

  defaultColDef = {
    width: 170,
    sortable: false,
    editable: false,
    resizable: false,
    filter: false,
    cellStyle: { 'white-space': 'normal !important', 'line-height': '1.5em' },
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
          floatingFilter: false,
          cellStyle: {},
          hide: false,
          wrapText: true,
          autoHeight: true,
        },
        {
          headerName: 'St.Pr.',
          field: 'price',
          wrapText: true,
          autoHeight: true,
        }, 
        {
          field: 'rsi',
          headerName: 'RSI',
          filter: 'agTextColumnFilter',
          floatingFilter: false,
        },
        {
          headerName: 'PRE',
          field: 'premium',
        }, 
        {
          headerName: '%',
          field: 'precentage',
        }, 
        {
          headerName: 'EX',
          field: 'expiry',
          wrapText: true,
          autoHeight: true,
          hide: true,
        }
      ];
  
      // this.rowData = [{
      //   optionChain:"BOB BANK",
      //   price: "2000",
      //   rsi: "40",
      //   premium: "9.20",
      //   precentage: "2%",
      //   expiry: "24JUN2021",
      // },{
      //   optionChain:"BOB BANK",
      //   price: "2000",
      //   rsi: "40",
      //   premium: "9.20",
      //   precentage: "2%",
      //   expiry: "24JUN2021",
      // },{
      //   optionChain:"BOB BANK",
      //   price: "2000",
      //   rsi: "40",
      //   premium: "9.20",
      //   precentage: "2%",
      //   expiry: "24JUN2021",
      // }];
  
    }

  ngOnInit(): void { 
    this.primengConfig.ripple = true;

    this.fetchOptionsService.getOptions().subscribe((d:any) => {
      for(const o in d){
        for(const p in d[o]){
          if(p === 'optionChain' && o === 'BANKBARODA'){
            const c = d[o][p];
            from(c).pipe(map((e:any) => {
                if(e.poLTP !== "" && e.poVolume <= 10){
                  return {
                    optionChain:"BOB BANK",
                    price: e.strikePrice,
                    rsi: "40",
                    premium: e.poLTP,
                    volume: e.poVolume,
                    precentage: (e.poLTP/(e.strikePrice/100)).toFixed(2),
                    expiry: "24JUN2021",
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
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setHeaderHeight();
    this.gridColumnApi = params.columnApi;
  }

}
