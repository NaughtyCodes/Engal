import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchMutualFundService } from '../services/FetchMutualFundService';

@Component({
  selector: 'app-indetails',
  templateUrl: './indetails.component.html',
  styleUrls: ['./indetails.component.scss'],
})
export class IndetailsComponent implements OnInit {
  index = 0;
  mfId: number | undefined;

  private metaGridApi: any;
  private metaGridColumnApi: any;
  metaRowData: any = [];
  metaRowHeight: number | undefined;
  metaRowSelection: string = 'single';

  private gridApi: any;
  private gridColumnApi: any;
  rowData: [] = [];
  rowHeight: number | undefined;
  rowSelection: string = 'single';

  columnDefs = [
    {
      field: 'date',
      headerName: 'Date',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellStyle: {},
    },
    {
      field: 'nav',
      headerName: 'Nav',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
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
    private fetchMutualFundService: FetchMutualFundService
  ) {
    this.mfId = this.route.snapshot.params['mfid'];
    this.getFundDetails(this.route.snapshot.params['mfid']);
  }

  ngOnInit(): void {}

  metaOnGridReady(params: any) {
    this.metaGridApi = params.api;
    this.metaGridColumnApi = params.columnApi;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  metaOnSelectionChanged($event: any) {
    //this.gridApi.getSelectedRows();
  }

  onSelectionChanged($event: any) {
    //this.gridApi.getSelectedRows();
  }

  goBack() {
    this.router.navigate(['/stxpo', {}]);
  }

  getFundDetails(mfId: number) {
    this.fetchMutualFundService.getFundDetails(mfId).subscribe(
      (data) => {
        let meta = [
          { field: 'Fund House', value: data['meta']['fund_house'] },
          { field: 'Scheme Category', value: data['meta']['scheme_category'] },
          { field: 'Scheme Name', value: data['meta']['scheme_name'] },
        ];
        this.metaRowData = meta;
        this.metaRowHeight =
          this.fetchMutualFundService.setRowHeightByField(meta, 'value') * 1.8;
        this.rowData = data.data;
        //this.metaGridApi.sizeColumnsToFit();
        //this.gridApi.sizeColumnsToFit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
