import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChamarBarbeariaPage } from './chamar-barbearia.page';

const routes: Routes = [
  {
    path: '',
    component: ChamarBarbeariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChamarBarbeariaPageRoutingModule {}
