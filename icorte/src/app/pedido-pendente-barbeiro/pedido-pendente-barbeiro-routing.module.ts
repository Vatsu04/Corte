import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoPendenteBarbeiroPage } from './pedido-pendente-barbeiro.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoPendenteBarbeiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoPendenteBarbeiroPageRoutingModule {}
