import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroBarbeiroPage } from './cadastro-barbeiro.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroBarbeiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroBarbeiroPageRoutingModule {}
