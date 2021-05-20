import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `<button class="btn" style="padding:0% 0% 0% 0% !important;margin-left:0px;" type="button" (click)="onClick($event)" > <i class="{{ icon }}" style="{{ iconStyle }}"></i> </button>`,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  label: string = '';
  icon: string = '';
  data: any = {};
  watchList: any[] = [];
  iconStyle: string = '';

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
    this.icon = this.params.icon || null;
    this.watchList = params.data.watchList || null;

    this.setWatchlistIconColor();
    
  }

  setWatchlistIconColor(){
    if(this.icon === 'pi pi-eye' && this.params.data.isWatchList){
      this.iconStyle = 'font-size:1em; font-weight: bold; color:blue';
    } else {
      this.iconStyle = 'font-size:1em; font-weight: bold; color:dimgrey';
    }
  }

  refresh(params?: any): boolean {
    this.params = params;
    this.label = this.params.label || null;
    this.icon = this.params.icon || null;
    this.watchList = params.data.watchList || null;
    this.setWatchlistIconColor();
    return true;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onClick(params);
    }
  }
}
