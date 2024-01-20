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
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },   {
    path: 'chamado',
    loadChildren: () => import('./chamado/chamado.module').then( m => m.ChamadoPageModule)
  },
  {
    path: 'pedidos-pendentes',
    loadChildren: () => import('./pedidos-pendentes/pedidos-pendentes.module').then( m => m.PedidosPendentesPageModule)
  },
  {
    path: 'editar-conta-usuario',
    loadChildren: () => import('./editar-conta-usuario/editar-conta-usuario.module').then( m => m.EditarContaUsuarioPageModule)
  },
  {
    path: 'editar-conta-barbeiro',
    loadChildren: () => import('./editar-conta-barbeiro/editar-conta-barbeiro.module').then( m => m.EditarContaBarbeiroPageModule)
  },
  {
    path: 'pedido-pendente-barbeiro',
    loadChildren: () => import('./pedido-pendente-barbeiro/pedido-pendente-barbeiro.module').then( m => m.PedidoPendenteBarbeiroPageModule)
  },  {
    path: 'pedidos-completos-cliente',
    loadChildren: () => import('./pedidos-completos-cliente/pedidos-completos-cliente.module').then( m => m.PedidosCompletosClientePageModule)
  },
  {
    path: 'pedidos-completos-barbeiro',
    loadChildren: () => import('./pedidos-completos-barbeiro/pedidos-completos-barbeiro.module').then( m => m.PedidosCompletosBarbeiroPageModule)
  }


     




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
