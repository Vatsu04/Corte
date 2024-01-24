import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosCompletosBarbeiroPageRoutingModule } from './pedidos-completos-barbeiro-routing.module';

import { PedidosCompletosBarbeiroPage } from './pedidos-completos-barbeiro.page';
import { RatingModule } from '../rating/rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosCompletosBarbeiroPageRoutingModule,
    RatingModule,
    ReactiveFormsModule
    
  ],
  declarations: [PedidosCompletosBarbeiroPage]
})
export class PedidosCompletosBarbeiroPageModule {}
