import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarBarbeariaPage } from './editar-barbearia.page';

const routes: Routes = [
  {
    path: '',
    component: EditarBarbeariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarBarbeariaPageRoutingModule {}
