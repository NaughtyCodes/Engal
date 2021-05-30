import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stoxpoRoutingModule } from './stoxpo-routing.module';
import { stoxpoHomeComponent } from './stoxpo-home/stoxpo-home.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { IndetailsComponent } from './indetails/indetails.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonRendererComponent } from './button-render/button-render.component';
import { CrudstoxpoComponent } from './crud-stoxpo/crud-stoxpo.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { AppCommonModule } from '../common/app-common.module';
import { AnalyserComponent } from './analyser/analyser.component';

@NgModule({
  declarations: [
    stoxpoHomeComponent,
    IndetailsComponent,
    ButtonRendererComponent,
    CrudstoxpoComponent,
    WatchListComponent,
    AnalyserComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    stoxpoRoutingModule,
    TabMenuModule,
    TabViewModule,
    ButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ConfirmDialogModule,
    MessagesModule,
    DialogModule,
    CalendarModule,
  ],
  providers: [],
})
export class stoxpoModule {}
