import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosBarbeariaPage } from './pedidos-barbearia.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosBarbeariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosBarbeariaPageRoutingModule {}
