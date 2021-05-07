import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StxpoRoutingModule } from './stxpo-routing.module';
import { StxpoHomeComponent } from './stxpo-home/stxpo-home.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [StxpoHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    StxpoRoutingModule,
  ],
  providers: [],
})
export class StxpoModule {}
