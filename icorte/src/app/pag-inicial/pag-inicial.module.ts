import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagInicialPageRoutingModule } from './pag-inicial-routing.module';

import { PagInicialPage } from './pag-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagInicialPageRoutingModule
  ],
  declarations: [PagInicialPage]
})
export class PagInicialPageModule {}
