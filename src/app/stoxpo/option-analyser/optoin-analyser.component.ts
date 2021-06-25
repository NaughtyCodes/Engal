import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { from, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FetchOptionsService } from '../services/fetch-options.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-option-analyser',
  templateUrl: './optoin-analyser.component.html',
  styleUrls: ['./optoin-analyser.component.scss']
})
export class OptionAnalyserComponent implements OnInit {

  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  rowHeight: number=18;
  rowSelection: string = 'single';
  frameworkComponents: any;
  watchList: any[] = [];
  columnDefs: any[] = [];
  originalData:[] = [];
  gridOptions = {};
  t: any[] = [];
  preValue: any;
  activeTabIndex: number;
  changeFlag: boolean = false;
  firstCounter: boolean = true;
  isNextMonthData: boolean = true;
  isLastMonthData: boolean = false;
  isOptInfo: boolean = false;
  isAllFundsTab: boolean = false;

  defaultColDef = {
    width: screen.width <= 450 ? 80 : 120,
    sortable: true,
    editable: false,
    resizable: false,
    filter: false,
    cellStyle: { 'white-space': 'normal !important'},
  };

  constructor(
    private fetchOptionsService : FetchOptionsService,
    private route: ActivatedRoute,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private firebaseService: FirebaseService,
    private http: HttpClient,
    ) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.activeTabIndex = this.route.snapshot.params['tabIndex'];
      if(this.activeTabIndex){
        this.onChangeTab({index:this.activeTabIndex});
      }

      const numberSort = (num1: number, num2: number) => {
        return num1 - num2;
      };

      this.columnDefs = [
        {
          field: 'optionChain',
          headerName: 'EQ',
          filter: 'agTextColumnFilter',
          floatingFilter: true,
          cellStyle: (params: any) => {
            if(this.firstCounter){
              this.firstCounter = false;
              this.changeFlag = false;
            } else {
              this.changeFlag = this.preValue === params.value ? false : true; 
            }
            if(!this.changeFlag) {
              this.preValue = params.value;
              return {"background-color": "#87CEFA"};
            } else {
              this.preValue = params.value
              return {"background-color": "#bababa"};
            }
          },
          hide: false,
          wrapText: true,
          autoHeight: true,
          pinned: 'left',
        },
        {
          headerName: 'PRICE',
          field: 'lastPrice',
          filter: 'agTextColumnFilter',
          wrapText: true,
          autoHeight: true,
          floatingFilter: true,
          comparator: numberSort,
        },
        {
          headerName: 'ST.PR.',
          field: 'strikePrice',
          filter: 'agTextColumnFilter',
          wrapText: true,
          autoHeight: true,
          floatingFilter: true,
          comparator: numberSort,
        },
        {
          headerName: 'DIFF%',
          field: 'diffPercentage',
          filter: 'agTextColumnFilter',
          wrapText: true,
          autoHeight: true,
          floatingFilter: true,
          comparator: numberSort,
        },
        {
          field: 'volume',
          headerName: 'VOL',
          filter: 'agTextColumnFilter',
          floatingFilter: true,
          width: 80,
          comparator: numberSort,
        }, 
        {
          field: 'rsi',
          headerName: 'RSI',
          filter: 'agTextColumnFilter',
          wrapText: true,
          autoHeight: true,
          floatingFilter: true,
          comparator: numberSort,
        },
        {
          headerName: 'PRE',
          field: 'premium',
          filter: 'agTextColumnFilter',
          floatingFilter: true,
          wrapText: true,
          autoHeight: true,
          comparator: numberSort,
        }, 
        {
          headerName: '%',
          field: 'precentage',
          filter: 'agTextColumnFilter',
          wrapText: true,
          autoHeight: true,
          floatingFilter: true,
          comparator: numberSort,
        }, 
        {
          headerName: 'EX',
          field: 'expiry',
          wrapText: true,
          autoHeight: true,
          filter: 'agTextColumnFilter',
          hide: false,
          floatingFilter: true,
          width: screen.width <= 450 ? 80 : 120,
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
                  let price = d[o].stPrice.lastPrice.replace(',','');
                  return {
                    optionChain: o,
                    strikePrice: e.strikePrice,
                    rsi: parseFloat(d[o].rsi.value).toFixed(2),
                    premium: e.poLTP,
                    volume: e.poVolume,
                    precentage: (e.poLTP/(e.strikePrice/100)).toFixed(2),
                    expiry: d[o].expiryDate,
                    lastPrice: price,
                    companyName: d[o].stPrice.companyName,
                    diffPercentage: ( (price - e.strikePrice) / (price/100) ).toFixed(2) 
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
    if(screen.width <= 450 ){
      this.gridApi.setHeaderHeight(20);
    } else {
      this.gridApi.setHeaderHeight();
      this.gridApi.sizeColumnsToFit();
    }
    
    this.gridColumnApi = params.columnApi;
  }

  onChangeTab($event: any) {
    //console.log('changing tab:'+$event.originalEvent.currentTarget.innerText);
    let tabIndex = parseInt($event.index);
    if(tabIndex === 0){
      this.isNextMonthData = true;
    } else if(tabIndex === 1){
      this.isLastMonthData = true;
    } else if(tabIndex === 2){
      this.isAllFundsTab = true;
    } else if(tabIndex === 3){
      this.isOptInfo = true;
    } else {
      this.isNextMonthData = true;
    }
  }

}
