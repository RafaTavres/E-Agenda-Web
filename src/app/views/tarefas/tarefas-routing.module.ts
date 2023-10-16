import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EditarTarefasComponent } from './editar-tarefas/editar-tarefas.component';
import { ExcluirTarefasComponent } from './excluir-tarefas/excluir-tarefas.component';
import { InserirTarefasComponent } from './inserir-tarefas/inserir-tarefas.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { FormsTarefasViewModel } from './models/tarefa/form-tarefas.view-model';
import { ListarTarefasViewModel } from './models/tarefa/listar-tarefas.view-model';
import { VisualizarTarefasViewModel } from './models/tarefa/visualizae-tarefas.view-model';
import { TarefasService } from './services/tarefas.service';
import { VisualizarItemTarefaComponent } from './visualizar-item-tarefa/visualizar-item-tarefa.component';

const listarTarefaResolver : ResolveFn<ListarTarefasViewModel> =  
  () => 
  {
    return inject(TarefasService).selecionarTodos()
  }

const formsTarefaResolver: ResolveFn<FormsTarefasViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(TarefasService).selecionarPorId(route.paramMap.get('id')!)
  }

const visualizarTarefaResolver: ResolveFn<VisualizarTarefasViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(TarefasService).selecionarCompletoPorId(route.paramMap.get('id')!)
  }


const routes: Routes = [ 
  {
  path:'',
  redirectTo: 'listar',
  pathMatch:'full',
  }
  ,
  {
    path:'listar',
    component:ListarTarefasComponent,
    resolve:{ tarefas: listarTarefaResolver},
  }
  ,
  {
    path:'inserir',
    component:InserirTarefasComponent
  }
  ,
  {
    path:'editar/:id',
    component:EditarTarefasComponent,
    resolve:{ tarefa: formsTarefaResolver},
  }
  ,
  {
    path:'excluir/:id',
    component:ExcluirTarefasComponent,
    resolve:{ tarefa: visualizarTarefaResolver},
  }
  ,
  {
    path:'visualizar-itens/:id',
    component:VisualizarItemTarefaComponent,
    resolve:{ tarefaCompleta: visualizarTarefaResolver, tarefa: formsTarefaResolver},
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
