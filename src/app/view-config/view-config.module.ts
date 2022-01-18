import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewConfigPage } from './view-config.page';

import { IonicModule } from '@ionic/angular';

import { ViewConfigPageRoutingModule } from './view-config-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewConfigPageRoutingModule
  ],
  declarations: [ViewConfigPage]
})
export class ViewConfigPageModule {}
