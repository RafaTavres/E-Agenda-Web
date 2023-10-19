import { inject, NgModule } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { authGuard } from './core/auth/guards/auth.guard';
import { AuthService } from './core/auth/services/auth.service';
import { DashBoardComponent } from './views/dash-board/dash-board.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch:'full',
  }
  ,
  {
    path:'dash-board',
    component:DashBoardComponent,
    canActivate: [authGuard]
  }
  ,
  {
    path:'contatos',
    loadChildren: () => import('./views/contatos/contatos.module').then((m) =>m.ContatosModule),
    canActivate: [authGuard]
  }
  ,
  {
    path:'compromissos',
    loadChildren: () => import('./views/compromissos/compromissos.module').then((m) =>m.CompromissosModule),
    canActivate: [authGuard]
  }
  ,
  {
    path:'categorias',
    loadChildren: () => import('./views/categorias/categorias.module').then((m) =>m.CategoriasModule),
    canActivate: [authGuard],

  }
  ,
  {
    path:'despesas',
    loadChildren: () => import('./views/despesas/despesas.module').then((m) =>m.DespesasModule),
    canActivate: [authGuard]
  }
  ,
  {
    path:'tarefas',
    loadChildren: () => import('./views/tarefas/tarefas.module').then((m) =>m.TarefasModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
