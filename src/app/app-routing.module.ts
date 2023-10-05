import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarCompromissosComponent } from './views/compromissos/editar-compromissos/editar-compromissos.component';
import { ExcluirCompromissosComponent } from './views/compromissos/excluir-compromissos/excluir-compromissos.component';
import { InserirCompromissosComponent } from './views/compromissos/inserir-compromissos/inserir-compromissos.component';
import { ListarCompromissosComponent } from './views/compromissos/listar-compromissos/listar-compromissos.component';
import { EditarContatosComponent } from './views/contatos/editar-contatos/editar-contatos.component';
import { ExcluirContatosComponent } from './views/contatos/excluir-contatos/excluir-contatos.component';
import { InserirContatosComponent } from './views/contatos/inserir-contatos/inserir-contatos.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { DashBoardComponent } from './views/dash-board/dash-board.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dash-board',
    pathMatch:'full',
  }
  ,
  {
    path:'dash-board',
    component:DashBoardComponent
  }
  ,
  {
    path:'contatos/inserir',
    component:InserirContatosComponent
  }
  ,
  {
    path:'contatos/editar/:id',
    component:EditarContatosComponent
  }
  ,
  {
    path:'contatos/excluir/:id',
    component:ExcluirContatosComponent
  }
  ,
  {
    path:'contatos/listar',
    component:ListarContatosComponent
  }

// compromissos

,
{
  path:'compromissos/inserir',
  component:InserirCompromissosComponent
}
,
{
  path:'compromissos/editar/:id',
  component:EditarCompromissosComponent
}
,
{
  path:'compromissos/excluir/:id',
  component:ExcluirCompromissosComponent
}
,
{
  path:'compromissos/listar',
  component:ListarCompromissosComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
