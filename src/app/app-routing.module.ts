import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path:'contatos',
    loadChildren: () => import('./views/contatos/contatos.module').then((m) =>m.ContatosModule),
  }
  ,
  {
    path:'compromissos',
    loadChildren: () => import('./views/compromissos/compromissos.module').then((m) =>m.CompromissosModule),
  }
  ,
  {
    path:'categorias',
    loadChildren: () => import('./views/categorias/categorias.module').then((m) =>m.CategoriasModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
