import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPendenteBarbeiroPageRoutingModule } from './pedido-pendente-barbeiro-routing.module';

import { PedidoPendenteBarbeiroPage } from './pedido-pendente-barbeiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPendenteBarbeiroPageRoutingModule
  ],
  declarations: [PedidoPendenteBarbeiroPage]
})
export class PedidoPendenteBarbeiroPageModule {}
