import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndetailsComponent } from './indetails/indetails.component';
import { StxpoHomeComponent } from './stxpo-home/stxpo-home.component';

const routes: Routes = [
  {
    path: '',
    component: StxpoHomeComponent,
  },
  {
    path: 'details/:mfid',
    component: IndetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StxpoRoutingModule {}
