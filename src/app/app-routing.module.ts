import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './stoxpo/stoxpo.module#stoxpoModule',
  },
  {
    path: 'tengal',
    loadChildren: './tengal/tengal.module#TengalModule',
  },
  {
    path: 'stoxpo',
    loadChildren: './stoxpo/stoxpo.module#stoxpoModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
