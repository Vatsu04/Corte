import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import  {redirectUnauthorizedTo, redirectLoggedInTo, canActivate} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => [redirectUnauthorizedTo(['login'])];
const redirectLoggedInHome = () => [redirectLoggedInTo(['tab1'])];



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [redirectLoggedInHome]
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login-barbeiro',
    loadChildren: () => import('./login-barbeiro/login-barbeiro.module').then( m => m.LoginBarbeiroPageModule)
  },
  {
    path: 'cadastro-barbeiro',
    loadChildren: () => import('./cadastro-barbeiro/cadastro-barbeiro.module').then( m => m.CadastroBarbeiroPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
