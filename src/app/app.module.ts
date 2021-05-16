import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import { TengalModule } from './tengal/tengal.module';
import { stoxpoModule } from './stoxpo/stoxpo.module';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    TengalModule,
    stoxpoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
