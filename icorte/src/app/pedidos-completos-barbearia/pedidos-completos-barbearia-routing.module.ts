import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosCompletosBarbeariaPage } from './pedidos-completos-barbearia.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosCompletosBarbeariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosCompletosBarbeariaPageRoutingModule {}
