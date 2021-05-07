import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './stxpo/stxpo.module#StxpoModule',
  },
  {
    path: 'tengal',
    loadChildren: './tengal/tengal.module#TengalModule',
  },
  {
    path: 'stxpo',
    loadChildren: './stxpo/stxpo.module#StxpoModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
