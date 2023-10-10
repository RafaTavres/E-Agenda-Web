import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { ExcluirCategoriasComponent } from './excluir-categorias/excluir-categorias.component';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { FormsCategoriaViewModel } from './models/form-categoria.view-model';
import { listarCategoriaViewModel as ListarCategoriaViewModel } from './models/listar-categorias.view-model';
import { VisualizarCategoriaViewModel } from './models/visualizar-categoria.view-model';
import { CategoriaService } from './services/categoria.service';

const formsCategoriaResolver: ResolveFn<FormsCategoriaViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(CategoriaService).selecionarPorId(route.paramMap.get('id')!)
  }

const listarCategoriaResolver : ResolveFn<ListarCategoriaViewModel> =  
  () => 
  {
    return inject(CategoriaService).selecionarTodos()
  }

const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(CategoriaService).selecionarCompletoPorId(route.paramMap.get('id')!)
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
    component:ListarCategoriasComponent,
    resolve:{ categorias: listarCategoriaResolver},
  }
  ,
  {
    path:'inserir',
    component:InserirCategoriasComponent
  }
  ,
  {
    path:'excluir/:id',
    component:ExcluirCategoriasComponent,
    resolve:{ categoria:  visualizarCategoriaResolver},
  }
  ,
  {
    path:'editar/:id',
    component:EditarCategoriasComponent,
    resolve:{ categoria:  formsCategoriaResolver},
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { 
  
}
