import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TengalHomeComponent } from './tengal-home/tengal-home.component';
import { TengalRoutingModule } from './tengal-routing.module';

@NgModule({
  declarations: [TengalHomeComponent],
  imports: [CommonModule, TengalRoutingModule],
  providers: [],
})
export class TengalModule {}
