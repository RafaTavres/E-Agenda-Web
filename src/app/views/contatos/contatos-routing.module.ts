import { inject, NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { EditarContatosComponent } from "./editar-contatos/editar-contatos.component";
import { ExcluirContatosComponent } from "./excluir-contatos/excluir-contatos.component";
import { InserirContatosComponent } from "./inserir-contatos/inserir-contatos.component";
import { ListarContatosComponent } from "./listar-contatos/listar-contatos.component";
import { FormsContatoViewModel } from "./models/form-contato.view-model";
import { ListarContatoViewModel } from "./models/listar-contato.view-model";
import { VisualizarContatoViewModel } from "./models/visualizar-contato.view-model";
import { ContatosService } from "./services/contato.service";

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

const routes: Routes = [
 //contatos
  {
    path:'',
    redirectTo: 'listar',
    pathMatch:'full',
  },
  {
    path:'inserir',
    component:InserirContatosComponent
  }
  ,
  {
    path:'editar/:id',
    component:EditarContatosComponent,
    resolve:{ contato: formsContatoResolver},
  }
  ,
  {
    path:'excluir/:id',
    component:ExcluirContatosComponent,
    resolve:{ contato: visualizarContatoResolver},
  }
  ,
  {
    path:'listar',
    component:ListarContatosComponent,
    resolve:{ contatos: listarContatosResolver}
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ContatoRoutingModule{}