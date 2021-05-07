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
  columnDefs = [
    {
      field: 'schemeCode',
      headerName: 'Fund Id',
      width: '20px',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'schemeName',
      headerName: 'Fund Name',
      filter: 'agTextColumnFilter',
      //floatingFilter: true,
    },
  ];

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
