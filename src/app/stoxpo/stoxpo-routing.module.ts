import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudstoxpoComponent } from './crud-stoxpo/crud-stoxpo.component';
import { IndetailsComponent } from './indetails/indetails.component';
import { stoxpoHomeComponent } from './stoxpo-home/stoxpo-home.component';
import { WatchListComponent } from './watch-list/watch-list.component';

const routes: Routes = [
  {
    path: '',
    component: IndetailsComponent,
  },
  {
    path: 'details/:mfId',
    component: IndetailsComponent,
  },
  {
    path: 'details/tab/:tabIndex',
    component: IndetailsComponent,
  },
  {
    path: 'crud',
    component: CrudstoxpoComponent,
  },
  {
    path: 'watchlist',
    component: WatchListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class stoxpoRoutingModule {}
