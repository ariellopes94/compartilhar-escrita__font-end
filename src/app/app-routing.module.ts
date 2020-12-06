import { ListarTodasAsPublicacaoComponent } from './pages/listar-todas-as-publicacao/listar-todas-as-publicacao.component';
import { CriarPublicacaoComponent } from './pages/criar-publicacao/criar-publicacao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent
  },

  {
    path: 'criarPublicacao',
    component: CriarPublicacaoComponent
  },

  {
    path: 'listarPublicacao',
    component: ListarTodasAsPublicacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
