import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EditarTarefasComponent } from "./editar-tarefas/editar-tarefas.component";
import { ExcluirTarefasComponent } from "./excluir-tarefas/excluir-tarefas.component";
import { InserirTarefasComponent } from "./inserir-tarefas/inserir-tarefas.component";
import { ListarTarefasComponent } from "./listar-tarefas/listar-tarefas.component";
import { TarefasService } from "./services/tarefas.service";
import { TarefasRoutingModule } from "./tarefas-routing.module";
import { CardTarefasComponent } from './shared/card-tarefas/card-tarefas.component';
import { FormTarefasComponent } from './shared/form-tarefas/form-tarefas.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import 'src/app/extensions/form-group.extension'

@NgModule({
  declarations: [
    ListarTarefasComponent,
    InserirTarefasComponent,
    EditarTarefasComponent,
    ExcluirTarefasComponent,
    CardTarefasComponent,
    FormTarefasComponent
  ],
  imports: [
    CommonModule,
    TarefasRoutingModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  providers:[
    TarefasService
  ]
})
export class TarefasModule { }