import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { DragAndDropService } from 'ag-grid-community';
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
  rowHeight: number | undefined;

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
      //wrapText: true,
    },
  ];

  defaultColDef = {
    width: 170,
    sortable: false,
    editable: false,
    resizable: false,
    filter: true,
    cellStyle: { 'white-space': 'normal !important', 'line-height': '1.5em' },
    //    wrapText: true,
    //    autoHeight: true,
  };

  gridOptions = {};

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
        this.rowHeight = this.setRowHeightByField(data, 'schemeName') / 1.8;
        this.gridApi.sizeColumnsToFit();
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
    console.log(maxLength);
    return maxLength;
  }
}
