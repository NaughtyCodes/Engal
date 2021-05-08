import { Component, OnInit } from '@angular/core';
import { FundName } from '../models/fund-name';
import { FetchMutualFundService } from '../services/FetchMutualFundService';

@Component({
  selector: 'app-stxpo-home',
  templateUrl: './stxpo-home.component.html',
  styleUrls: ['./stxpo-home.component.scss'],
})
export class StxpoHomeComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  rowData: [] = [];
  rowHeight = 120;

  columnDefs = [
    {
      field: 'schemeCode',
      headerName: 'Fund Id',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellStyle: {},
    },
    {
      field: 'schemeName',
      headerName: 'Fund Name',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      wrapText: true,
      cellStyle: { 'white-space': 'normal !important' },
    },
  ];

  defaultColDef = {
    width: 170,
    sortable: false,
    editable: false,
    resizable: false,
    filter: true,
    //    wrapText: true,
    //    autoHeight: true,
  };

  gridOptions = {
    defaultColDef: this.defaultColDef,
  };

  constructor(private fetchMutualFundService: FetchMutualFundService) {
    this.getFundsName();
  }

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getFundsName() {
    this.fetchMutualFundService.getFundNames().subscribe(
      (data) => {
        this.rowData = data;
        this.gridApi.sizeColumnsToFit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
