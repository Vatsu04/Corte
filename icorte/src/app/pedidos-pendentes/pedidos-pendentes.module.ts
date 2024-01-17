import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPendentesPageRoutingModule } from './pedidos-pendentes-routing.module';

import { PedidosPendentesPage } from './pedidos-pendentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPendentesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidosPendentesPage]
})
export class PedidosPendentesPageModule {}
