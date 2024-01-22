import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosCompletosBarbeiroPage } from './pedidos-completos-barbeiro.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosCompletosBarbeiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosCompletosBarbeiroPageRoutingModule {}
