import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginBarbeiroPage } from './login-barbeiro.page';

const routes: Routes = [
  {
    path: '',
    component: LoginBarbeiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginBarbeiroPageRoutingModule {}
