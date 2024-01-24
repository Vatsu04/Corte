import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuBarbeariaPage } from './menu-barbearia.page';

const routes: Routes = [
  {
    path: '',
    component: MenuBarbeariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuBarbeariaPageRoutingModule {}
