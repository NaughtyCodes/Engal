import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { DragAndDropService } from 'ag-grid-community';
import { FundName, WatchList } from '../models/fund-name';
import { FetchMutualFundService } from '../services/FetchMutualFundService';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ButtonRendererComponent } from '../button-render/button-render.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, PrimeNGConfig} from 'primeng/api';
import { FirebaseService } from '../services/firebase.service';
import { WatchlisthandlerService } from '../services/watchlisthandler.service';

@Component({
  selector: 'app-stoxpo-home',
  templateUrl: './stoxpo-home.component.html',
  styleUrls: ['./stoxpo-home.component.scss'],
  providers: [ConfirmationService]
})
export class stoxpoHomeComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  rowData: [] = [];
  rowHeight: number | undefined;
  rowSelection: string = 'single';
  frameworkComponents: any;
  showAddDialog: boolean = false;
  breakpoints: any = {'960px': '75vw', '640px': '100vw'};
  watchList: any[] = [];

  columnDefs = [
    {
      field: 'schemeCode',
      headerName: 'Fund Id',
      filter: 'agTextColumnFilter',
      floatingFilter: false,
      cellStyle: {},
      hide: true,
    },
    {
      field: 'schemeName',
      headerName: 'Fund Name',
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
        label: 'click',
        icon: 'pi pi-plus-circle',
        data: {watchList : this.watchList}
      },
    },
    {
      headerName: '',
      field: '',
      width: 50,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.addToWatchList.bind(this),
        label: 'click',
        icon: 'pi pi-eye',
      },
    },
    {
      headerName: '',
      field: '',
      width: 50,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.viewInDetails.bind(this),
        label: 'click',
        icon: 'pi pi-list',
      },
    },
  ];

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
  ) {
    this.getFundsName();
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
    this.fetchMutualFundService.getFundNames().subscribe(
      (data) => {
        this.watchlisthandlerService.getWatchlist().subscribe(w=>{
          this.watchList = w.map(d => {
            return d.payload.doc.data()
          });
          this.rowData = data;
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
    let mfid = e.rowData.schemeCode;
    this.router.navigate(['/stoxpo/details/' + mfid, {}]);
  }

  addToWatchList(e: any) {
    let fund : WatchList = {
      id: '',
      schemeCode: e.rowData.schemeCode,
      schemeName: e.rowData.schemeName,
      userId: 'Admin',
    }
    let params: any = {field:'schemeCode', value: e.rowData.schemeCode}
    this.watchlisthandlerService.getWatchlist().subscribe(d=>{
      if (d.filter((a:any) => ( a.payload.doc.data().schemeCode === e.rowData.schemeCode)).length === 0){
        this.firebaseService.addGridData('stoxpo_watchlist',[fund]);
      } else {
        alert("Already added to watchlist.");
      } 
    });
  }

}
