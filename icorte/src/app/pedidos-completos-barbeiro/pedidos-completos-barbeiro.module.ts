import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosCompletosBarbeiroPageRoutingModule } from './pedidos-completos-barbeiro-routing.module';

import { PedidosCompletosBarbeiroPage } from './pedidos-completos-barbeiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosCompletosBarbeiroPageRoutingModule
  ],
  declarations: [PedidosCompletosBarbeiroPage]
})
export class PedidosCompletosBarbeiroPageModule {}
