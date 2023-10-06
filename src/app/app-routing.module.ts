import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EditarCompromissosComponent } from './views/compromissos/editar-compromissos/editar-compromissos.component';
import { ExcluirCompromissosComponent } from './views/compromissos/excluir-compromissos/excluir-compromissos.component';
import { InserirCompromissosComponent } from './views/compromissos/inserir-compromissos/inserir-compromissos.component';
import { ListarCompromissosComponent } from './views/compromissos/listar-compromissos/listar-compromissos.component';
import { FormsCompromissoViewModel } from './views/compromissos/models/form-compromisso.view-model';
import { ListarCompromissoViewModel } from './views/compromissos/models/listar-compromissos.view-model';
import { VisualizacaoCompromissoViewModel } from './views/compromissos/models/visualizacao-compromisso.view-model';
import { CompromissoService } from './views/compromissos/services/compromissos.service';
import { EditarContatosComponent } from './views/contatos/editar-contatos/editar-contatos.component';
import { ExcluirContatosComponent } from './views/contatos/excluir-contatos/excluir-contatos.component';
import { InserirContatosComponent } from './views/contatos/inserir-contatos/inserir-contatos.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { FormsContatoViewModel } from './views/contatos/models/form-contato.view-model';
import { ListarContatoViewModel } from './views/contatos/models/listar-contato.view-model';
import { VisualizarContatoViewModel } from './views/contatos/models/visualizar-contato.view-model';
import { ContatosService } from './views/contatos/services/contato.service';
import { DashBoardComponent } from './views/dash-board/dash-board.component';

const formsContatoResolver: ResolveFn<FormsContatoViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(ContatosService).selecionarPorId(route.paramMap.get('id')!)
  }

const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(ContatosService).selecionarCompletoPorId(route.paramMap.get('id')!)
  }

  const listarContatosResolver: ResolveFn<ListarContatoViewModel> =  
  () => 
  {
    return inject(ContatosService).selecionarTodos()
  }




const formsCompromissoResolver: ResolveFn<FormsCompromissoViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(CompromissoService).selecionarPorId(route.paramMap.get('id')!)
  }

const visualizaCompromissoResolver : ResolveFn<VisualizacaoCompromissoViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(CompromissoService).selecionarCompletoPorId(route.paramMap.get('id')!)
  }

const listarCompromissoResolver : ResolveFn<ListarCompromissoViewModel> =  
  () => 
  {
    return inject(CompromissoService).selecionarTodos()
  }



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
    component:EditarContatosComponent,
    resolve:{ contato: formsContatoResolver},
  }
  ,
  {
    path:'contatos/excluir/:id',
    component:ExcluirContatosComponent,
    resolve:{ contato: visualizarContatoResolver},
  }
  ,
  {
    path:'contatos/listar',
    component:ListarContatosComponent,
    resolve:{ contatos: listarContatosResolver}
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
  component:EditarCompromissosComponent,
  resolve:{ compromisso: formsCompromissoResolver},
}
,
{
  path:'compromissos/excluir/:id',
  component:ExcluirCompromissosComponent,
  resolve:{ compromisso: visualizaCompromissoResolver},
}
,
{
  path:'compromissos/listar',
  component:ListarCompromissosComponent,
  resolve:{ compromissos: listarCompromissoResolver},
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
