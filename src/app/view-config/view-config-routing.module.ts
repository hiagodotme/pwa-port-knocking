import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewConfigPage } from './view-config.page';

const routes: Routes = [
  {
    path: '',
    component: ViewConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewConfigPageRoutingModule {}
