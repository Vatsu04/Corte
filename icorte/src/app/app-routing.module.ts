import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import  {redirectUnauthorizedTo, redirectLoggedInTo, canActivate} from '@angular/fire/auth-guard';





const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pag-inicial/pag-inicial.module').then(m => m.PagInicialPageModule),
   
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
    path: 'cadastro-barbeiro',
    loadChildren: () => import('./cadastro-barbeiro/cadastro-barbeiro.module').then( m => m.CadastroBarbeiroPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
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
    path: 'pedidos-completos-cliente',
    loadChildren: () => import('./pedidos-completos-cliente/pedidos-completos-cliente.module').then( m => m.PedidosCompletosClientePageModule)
  },
  {
    path: 'pedidos-completos-barbeiro',
    loadChildren: () => import('./pedidos-completos-barbeiro/pedidos-completos-barbeiro.module').then( m => m.PedidosCompletosBarbeiroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro-barbearia',
    loadChildren: () => import('./cadastro-barbearia/cadastro-barbearia.module').then( m => m.CadastroBarbeariaPageModule)
  },
  {
    path: 'menu-barbearia',
    loadChildren: () => import('./menu-barbearia/menu-barbearia.module').then( m => m.MenuBarbeariaPageModule)
  },
  {
    path: 'editar-barbearia',
    loadChildren: () => import('./editar-barbearia/editar-barbearia.module').then( m => m.EditarBarbeariaPageModule)
  },

  {
    path: 'pedidos-barbearia',
    loadChildren: () => import('./pedidos-barbearia/pedidos-barbearia.module').then( m => m.PedidosBarbeariaPageModule)
  },
  {
    path: 'chamar-barbearia',
    loadChildren: () => import('./chamar-barbearia/chamar-barbearia.module').then( m => m.ChamarBarbeariaPageModule)
  },
  {
    path: 'pedidos-completos-barbearia',
    loadChildren: () => import('./pedidos-completos-barbearia/pedidos-completos-barbearia.module').then( m => m.PedidosCompletosBarbeariaPageModule)
  },  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  }





     




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
