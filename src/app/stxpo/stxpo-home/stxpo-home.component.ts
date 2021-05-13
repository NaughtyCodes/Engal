import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { DragAndDropService } from 'ag-grid-community';
import { FundName } from '../models/fund-name';
import { FetchMutualFundService } from '../services/FetchMutualFundService';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ButtonRendererComponent } from '../button-render/button-render.component';

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
  rowSelection: string = 'single';
  frameworkComponents: any;

  columnDefs = [
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
        icon: 'pi pi-list',
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
        icon: 'pi pi-info',
      },
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetchMutualFundService: FetchMutualFundService
  ) {
    this.getFundsName();
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addToPortfolio(e: any) {
    console.log(JSON.stringify(e));
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
    //console.log(maxLength);
    return maxLength;
  }

  onSelectionChanged($event: any) {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows[0]);
  }

  viewInDetails(e: any) {
    let selectedRows = this.gridApi.getSelectedRows();
    let mfid = selectedRows[0]['schemeCode'];
    this.router.navigate(['/stxpo/details/' + mfid, {}]);
  }

  addToWatchList(e: any) {}
}
