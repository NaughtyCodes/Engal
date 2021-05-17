import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `<button
    class="btn"
    style="padding:0% 0% 0% 0% !important;margin-left:0px;color:dimgrey !important"
    type="button"
    onMouseOver="this.style.color='#0e0e0e'"
    onMouseOut="this.style.color='dimgrey'"
    (click)="onClick($event)"
  >
    <i class="{{ icon }}" style="font-size:1em"></i>
  </button>`,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  label: string = '';
  icon: string = '';
  data: any = {};

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
    this.icon = this.params.icon || null;
  }

  refresh(params?: any): boolean {
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
