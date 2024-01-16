import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarContaUsuarioPage } from './editar-conta-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: EditarContaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarContaUsuarioPageRoutingModule {}
