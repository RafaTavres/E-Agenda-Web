import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirContatosComponent } from './views/contatos/inserir-contatos/inserir-contatos.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { DashBoardComponent } from './views/dash-board/dash-board.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dash-board',
    pathMatch:'full',
  },
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
    path:'contatos/listar',
    component:ListarContatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
