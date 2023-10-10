import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EditarDespesasComponent } from './editar-despesas/editar-despesas.component';
import { ExcluirDespesasComponent } from './excluir-despesas/excluir-despesas.component';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { FormsDespesasViewModel } from './models/form-despesas.view-model';
import { VisualizarDespesasViewModel } from './models/visualizae-despesas.view-model';
import { DespesasService } from './services/despesas.service';

const listarDespesasResolver : ResolveFn<ListarDespesasComponent> =  
  () => 
  {
    return inject(DespesasService).selecionarTodos()
  }

const formsDespesasResolver: ResolveFn<FormsDespesasViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(DespesasService).selecionarPorId(route.paramMap.get('id')!)
  }

const visualizarDespesasResolver: ResolveFn<VisualizarDespesasViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(DespesasService).selecionarCompletoPorId(route.paramMap.get('id')!)
  }


const routes: Routes = [{
  path:'',
  redirectTo: 'listar',
  pathMatch:'full',
  }
  ,
  {
    path:'listar',
    component:ListarDespesasComponent,
    resolve:{ despesas: listarDespesasResolver},
  }
  ,
  {
    path:'inserir',
    component:InserirDespesasComponent
  }
  ,
  {
    path:'editar/:id',
    component:EditarDespesasComponent,
    resolve:{ despesa: formsDespesasResolver},
  }
  ,
  {
    path:'excluir/:id',
    component:ExcluirDespesasComponent,
    resolve:{ despesa: visualizarDespesasResolver},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasRoutingModule { }
