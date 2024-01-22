import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagInicialPage } from './pag-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: PagInicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagInicialPageRoutingModule {}
