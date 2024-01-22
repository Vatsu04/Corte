import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosCompletosClientePage } from './pedidos-completos-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosCompletosClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosCompletosClientePageRoutingModule {}
