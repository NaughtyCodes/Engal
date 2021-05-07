import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TengalHomeComponent } from './tengal-home/tengal-home.component';

const routes: Routes = [{ path: '', component: TengalHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TengalRoutingModule {}
