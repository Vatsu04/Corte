import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosCompletosBarbeariaPageRoutingModule } from './pedidos-completos-barbearia-routing.module';

import { PedidosCompletosBarbeariaPage } from './pedidos-completos-barbearia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosCompletosBarbeariaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidosCompletosBarbeariaPage]
})
export class PedidosCompletosBarbeariaPageModule {}
