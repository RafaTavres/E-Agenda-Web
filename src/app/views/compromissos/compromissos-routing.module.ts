import { inject, NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { EditarCompromissosComponent } from "./editar-compromissos/editar-compromissos.component";
import { ExcluirCompromissosComponent } from "./excluir-compromissos/excluir-compromissos.component";
import { InserirCompromissosComponent } from "./inserir-compromissos/inserir-compromissos.component";
import { ListarCompromissosComponent } from "./listar-compromissos/listar-compromissos.component";
import { FormsCompromissoViewModel } from "./models/form-compromisso.view-model";
import { ListarCompromissoViewModel } from "./models/listar-compromissos.view-model";
import { VisualizacaoCompromissoViewModel } from "./models/visualizacao-compromisso.view-model";
import { CompromissoService } from "./services/compromissos.service";
import { VisualizarCompromissosComponent } from "./visualizar-compromissos/visualizar-compromissos.component";

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
    //COmpromisso

      {
        path:'',
        redirectTo: 'listar',
        pathMatch:'full',
      },
      {
        path:'inserir',
        component:InserirCompromissosComponent
      }
      ,
      {
        path:'editar/:id',
        component:EditarCompromissosComponent,
        resolve:{ compromisso: formsCompromissoResolver},
      }
      ,
      {
        path:'excluir/:id',
        component:ExcluirCompromissosComponent,
        resolve:{ compromisso: visualizaCompromissoResolver},
      }
      ,
      {
        path:'visualizar/:id',
        component:VisualizarCompromissosComponent,
        resolve:{ compromisso: visualizaCompromissoResolver},
      }
      ,
      {
        path:'listar',
        component:ListarCompromissosComponent,
        resolve:{ compromissos: listarCompromissoResolver},
      }
]
   
   @NgModule({
       imports: [RouterModule.forChild(routes)],
       exports: [RouterModule],
   })
   
   export class CompromissosRoutingModule{}