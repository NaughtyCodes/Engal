import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StxpoHomeComponent } from './stxpo-home/stxpo-home.component';

const routes: Routes = [{ path: '', component: StxpoHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StxpoRoutingModule {}
