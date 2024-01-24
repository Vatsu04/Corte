import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosCompletosClientePageRoutingModule } from './pedidos-completos-cliente-routing.module';

import { PedidosCompletosClientePage } from './pedidos-completos-cliente.page';
import { RatingModule } from '../rating/rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosCompletosClientePageRoutingModule,
    RatingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidosCompletosClientePage]
})
export class PedidosCompletosClientePageModule {}
