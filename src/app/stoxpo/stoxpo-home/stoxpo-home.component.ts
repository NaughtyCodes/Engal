import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DragAndDropService, RowNode } from 'ag-grid-community';
import { FundName, WatchList } from '../models/fund-name';
import { FetchMutualFundService } from '../services/fetch-mutualfund.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ButtonRendererComponent } from '../button-render/button-render.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, PrimeNGConfig} from 'primeng/api';
import { FirebaseService } from '../services/firebase.service';
import { WatchlisthandlerService } from '../services/watchlisthandler.service';
import { FetchOptionsService } from '../services/fetch-options.service';

@Component({
  selector: 'app-stoxpo-home',
  templateUrl: './stoxpo-home.component.html',
  styleUrls: ['./stoxpo-home.component.scss'],
  providers: [ConfirmationService]
})
export class stoxpoHomeComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  rowHeight: number | undefined;
  rowSelection: string = 'single';
  frameworkComponents: any;
  showAddDialog: boolean = false;
  breakpoints: any = {'960px': '75vw', '640px': '100vw'};
  watchList: any[] = [];
  columnDefs: any[] = [];
  originalData:[] = [];

  @Output()
  getFundDetails = new EventEmitter<number>();

  defaultColDef = {
    width: 170,
    sortable: false,
    editable: false,
    resizable: false,
    filter: false,
    cellStyle: { 'white-space': 'normal !important', 'line-height': '1.5em' },
    //    wrapText: true,
    //    autoHeight: true,
  };

  gridOptions = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetchMutualFundService: FetchMutualFundService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private firebaseService: FirebaseService,
    private watchlisthandlerService: WatchlisthandlerService,
    private fetchOptionsService: FetchOptionsService
  ) {
    this.getFundsName();
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit(): void {
    
    this.primengConfig.ripple = true;
    this.columnDefs = [
      {
        field: 'schemeCode',
        headerName: 'Fund Id',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        cellStyle: {},
        hide: true,
      },
      {
        field: 'schemeName',
        headerName: '',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        //suppressSizeToFit: true,
        //wrapText: true,
      },
      {
        headerName: '',
        field: '',
        width: 50,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.addToPortfolio.bind(this),
          label: 'Add-Portfolio',
          icon: 'pi pi-plus-circle',
        },
      },
      {
        headerName: '',
        field: 'isWatchList',
        width: 50,
        cellRenderer: 'buttonRenderer',
        // cellRenderer: function(params: any) {
        //   let html = '';
        //   for(let i=0; i<w.length; i++) {
        //     if(params.data.schemeCode === w[i].payload.doc.data().schemeCode){
        //       console.log(params.data.schemeCode+' === '+w[i].payload.doc.data().schemeCode);
        //       html = `<button class="btn" style="padding:0% 0% 0% 0% !important;margin-left:0px;" type="button" (click)="onClick($event)" > <i class="pi pi-eye" style="font-size:1em; font-weight: bold; color:blue"></i> </button>`;
        //       break;
        //     } else {
        //       html = `<button class="btn" style="padding:0% 0% 0% 0% !important;margin-left:0px;" type="button" (click)="onClick($event)" > <i class="pi pi-eye" style="font-size:1em; font-weight: bold; color:dimgrey"></i> </button>`;
        //     }
        //   };
        //   return html;                
        // },
        cellRendererParams: {
          onClick: this.addToWatchList.bind(this),
          label: 'Watch-List',
          icon: 'pi pi-star-o',
        }
      },
      {
        headerName: '',
        field: '',
        width: 50,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.viewInDetails.bind(this),
          label: 'In-Details',
          icon: 'pi pi-list',
        },
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addToPortfolio(e: any) {
    console.log(JSON.stringify(e));
    this.showAddDialog = true;
  }

  getFundsName() {
    this.fetchMutualFundService.getFundNames().subscribe((data) => {
        this.watchlisthandlerService.getWatchlist().subscribe(w=>{
          let watchList = w.map(d => {
            let r = d.payload.doc.data(); 
            r['id'] = d.payload.doc.id;
            return r;
          });
          let formatedData: any[] = [];
          data.forEach((e: any) => {
            e['isWatchList'] = watchList.filter(w => (w.schemeCode === e.schemeCode)).length === 0 ? false : true;
            formatedData.push(e);
          });
          
          this.rowData = formatedData;
          this.originalData = data;
          this.rowHeight = this.setRowHeightByField(data, 'schemeName') / 1.8;
          this.gridApi.sizeColumnsToFit();
        });
      },
      (error) => {
        console.log(error);
      }
    );
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

  onSelectionChanged($event: any) {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows[0]);
  }

  viewInDetails(e: any) {
    let mfId = e.rowData.schemeCode;
    this.getFundDetails.emit(mfId);
    this.router.navigate(['/stoxpo/details/'+ mfId, {}]);
  }

  addToWatchList(e: any) {
    let fund : WatchList = {
      schemeCode: e.rowData.schemeCode,
      schemeName: e.rowData.schemeName,
      userId: 'Admin',
    }
    let params: any = {field:'schemeCode', value: e.rowData.schemeCode}
    this.watchlisthandlerService.getWatchlist().subscribe(data=>{
      let selectedRecord = data.filter((a:any) => ( a.payload.doc.data().schemeCode === e.rowData.schemeCode));
      if (selectedRecord.length === 0){
        this.firebaseService.addGridData('stoxpo_watchlist',fund).then(()=>{
          console.log( "Record Added : "+JSON.stringify(fund) );  
          this.originalData.forEach((d,i) => {
            if(d['schemeCode'] === fund.schemeCode){
              this.rowData[i].isWatchList = true;
            }
          });
          this.gridApi.setRowData(this.rowData);
        }, (errorCode: any) => {
          console.error(errorCode);
        });
      } else {
        let params: any = {id : selectedRecord[0].payload.doc.id};
        this.firebaseService.deleteGrid('stoxpo_watchlist', params.id).then(()=>{
          console.log( "Record Deleted : "+JSON.stringify(selectedRecord[0].payload.doc.data()) );
          this.originalData.forEach((d,i) => {
            if(d['schemeCode'] === fund.schemeCode){
              this.rowData[i].isWatchList = false;
            }
          });
          this.gridApi.setRowData(this.rowData);
        }, (errorCode: any) => {
          console.error(errorCode);
        });
      }
    });
  }

}
