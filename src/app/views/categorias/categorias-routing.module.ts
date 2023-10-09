import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'listar',
    pathMatch:'full',
  },
  {
    path:'inserir',
    component:InserirCategoriasComponent
  }
  ,
  {
    path:'listar',
    component:ListarCategoriasComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { 
  
}
