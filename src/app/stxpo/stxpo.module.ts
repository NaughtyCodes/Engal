import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StxpoRoutingModule } from './stxpo-routing.module';
import { StxpoHomeComponent } from './stxpo-home/stxpo-home.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { IndetailsComponent } from './indetails/indetails.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonRendererComponent } from './button-render/button-render.component';

@NgModule({
  declarations: [
    StxpoHomeComponent,
    IndetailsComponent,
    ButtonRendererComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    StxpoRoutingModule,
    TabMenuModule,
    TabViewModule,
    ButtonModule,
  ],
  providers: [],
})
export class StxpoModule {}
