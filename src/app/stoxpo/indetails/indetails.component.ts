import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchMutualFundService } from '../services/fetch-mutualfund.service';
import { WatchlisthandlerService } from '../services/watchlisthandler.service';
import { ThisReceiver } from '@angular/compiler';
import { WatchList } from '../models/fund-name';

@Component({
  selector: 'app-indetails',
  templateUrl: './indetails.component.html',
  styleUrls: ['./indetails.component.scss'],
})
export class IndetailsComponent implements OnInit {
  activeTabIndex = 0;
  mfId: number | undefined;

  private gridApi: any;
  private metaGridApi: any;
  private watchListGridApi: any;
  
  private gridColumnApi: any;
  private metaGridColumnApi: any;
  private watchListGridColumnApi: any;
  
  rowData: any[] = [];
  metaRowData: any[] = [];
  watchListRowData: WatchList[] = [];
  
  watchListRowHeight: any = [];
  metaRowHeight: number | undefined;
  rowHeight: number | undefined;

  rowSelection: string = 'single';
  metaRowSelection: string = 'single';

  screenHight: number = screen.height;
  isFundDetailsTab = false;
  isAllFundsTab = false;
  isWatchListTab = false;

  columnDefs = [
    {
      field: 'date',
      headerName: 'Date',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      wrapText: true,
      autoHeight: true,
      cellStyle: {},
    },
    {
      field: 'nav',
      headerName: 'Nav',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      wrapText: true,
      autoHeight: true,
      cellStyle: {},
    },
  ];

  watchListColumnDefs = [
    {
      field: 'schemeName',
      headerName: 'Fund',
      filter: 'agTextColumnFilter',
      floatingFilter: false,
      wrapText: true,
      autoHeight: true,
      cellStyle: {},
    },
    {
      field: 'nav',
      headerName: 'Nav',
      filter: 'agTextColumnFilter',
      floatingFilter: false,
      
      cellStyle: {},
    },
    {
      field: 'nav',
      headerName: 'Diff.',
      aggFunc: ((params: any) => {
        let sum = 0;
        return sum;
      }),
      filter: 'agTextColumnFilter',
      floatingFilter: false,
      
      cellStyle: {},
    },
  ];

  metaColumnDefs = [
    {
      field: 'field',
      headerName: 'Heading',
      cellStyle: {},
    },
    {
      field: 'value',
      headerName: 'Details',
      wrapText: true,
      autoHeight: true,
      cellStyle: {},
    },
  ];

  defaultColDef = {
    width: 170,
    sortable: false,
    editable: false,
    resizable: false,
    filter: true,
    cellStyle: { 'white-space': 'normal !important', 'line-height': '1.5em' },
  };

  watchListDefColDef = this.defaultColDef;

  metaDefaultColDef = {
    width: 170,
    sortable: false,
    editable: false,
    resizable: false,
    filter: true,
    cellStyle: { 'white-space': 'normal !important', 'line-height': '1.5em' },
  };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetchMutualFundService: FetchMutualFundService,
    private watchlisthandlerService: WatchlisthandlerService
  ) {
    console.log(this.route.snapshot.url);
    //this.mfId = this.route.snapshot.params['mfId'];
    //this.activeTabIndex = this.route.snapshot.params['tabIndex'];
    //this.getFundDetails(this.route.snapshot.params['mfId']);
  }

  ngOnInit(): void {
    this.getWatchList();
  }

  onChangeTab($event: any) {
    console.log('changing tab:'+$event.originalEvent.currentTarget.innerText);
    let tabIndex = $event.index;
    if(tabIndex === 1){
      this.isAllFundsTab = true;
    } else if(tabIndex === 2){
      this.isFundDetailsTab = true;
    } else {
      this.isAllFundsTab = true;
      this.isFundDetailsTab = true;
    }
  }

  metaOnGridReady(params: any) {
    this.metaGridApi = params.api;
    this.metaGridColumnApi = params.columnApi;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  watchListOnGridReady(params: any) {
    this.watchListGridApi = params.api;
    this.watchListGridColumnApi = params.columnApi;
  }

  metaOnSelectionChanged($event: any) {
    //this.gridApi.getSelectedRows();
  }

  onSelectionChanged($event: any) {
    //this.gridApi.getSelectedRows();
  }

  goBack() {
    this.router.navigate(['/stoxpo', {}]);
  }

  getWatchList(){
    let objArray: WatchList[] = [];
    this.watchlisthandlerService.getWatchlist().subscribe(wlist => {
      wlist.forEach((d, index) => {
        this.fetchMutualFundService.getFundDetails(d.payload.doc.data()['schemeCode']).subscribe(fdetails => {
          if(fdetails.data !== undefined){
            let wl: WatchList = {
              id: d.payload.doc.data()['id'],  
              schemeCode: d.payload.doc.data()['schemeCode'],
              schemeName: d.payload.doc.data()['schemeName'],
              userId: d.payload.doc.data()['userId'],
              nav: fdetails.data[0].nav,
              prevNav: fdetails.data[1].nav,
              date: fdetails.data[0].date,
            }
            if(index+1 === wlist.length){
              objArray.push(wl);
              this.watchListRowData = objArray;
              this.watchListGridApi.sizeColumnsToFit();
              //this.watchListRowHeight = this.fetchMutualFundService.setRowHeightByField(this.watchListRowData, 'schemeName') * 2.5;
            } else {
              objArray.push(wl);
            }
          }
        });
      });
    });
  }
  
  getFundDetails(mfId: any) {
    this.activeTabIndex = 2;
    this.isFundDetailsTab = true;
    this.metaRowData = [];
    this.fetchMutualFundService.getFundDetails(mfId).subscribe(
      (data) => {
        let meta = [
          { field: 'Scheme Name', value: data['meta']['scheme_name'] },
          { field: 'Fund House', value: data['meta']['fund_house'] },
          { field: 'Scheme Category', value: data['meta']['scheme_category'] },
        ];    
        this.metaRowData = meta;
        this.metaRowHeight = this.fetchMutualFundService.setRowHeightByField(meta, 'value') * 1.8;
        this.rowData = data.data;
        this.metaGridApi.sizeColumnsToFit();
        this.gridApi.sizeColumnsToFit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}


