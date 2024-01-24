import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosBarbeariaPageRoutingModule } from './pedidos-barbearia-routing.module';

import { PedidosBarbeariaPage } from './pedidos-barbearia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosBarbeariaPageRoutingModule
  ],
  declarations: [PedidosBarbeariaPage]
})
export class PedidosBarbeariaPageModule {}
