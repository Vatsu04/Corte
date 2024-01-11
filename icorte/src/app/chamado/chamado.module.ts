import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChamadoPageRoutingModule } from './chamado-routing.module';

import { ChamadoPage } from './chamado.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChamadoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChamadoPage]
})
export class ChamadoPageModule {}
