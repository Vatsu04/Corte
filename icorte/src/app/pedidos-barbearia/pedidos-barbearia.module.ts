import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosBarbeariaPageRoutingModule } from './pedidos-barbearia-routing.module';

import { PedidosBarbeariaPage } from './pedidos-barbearia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosBarbeariaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidosBarbeariaPage]
})
export class PedidosBarbeariaPageModule {}
