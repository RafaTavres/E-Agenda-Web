import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InserirCompromissosComponent } from './inserir-compromissos/inserir-compromissos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormCompromissosComponent } from './shared/form-compromissos/form-compromissos.component';
import { CompromissoService } from './services/compromissos.service';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { EditarCompromissosComponent } from './editar-compromissos/editar-compromissos.component';
import { ExcluirCompromissosComponent } from './excluir-compromissos/excluir-compromissos.component';
import { CardCompromissoComponent } from './card-compromisso/card-compromisso.component';



@NgModule({
  declarations: [
    InserirCompromissosComponent,
    FormCompromissosComponent,
    ListarCompromissosComponent,
    EditarCompromissosComponent,
    ExcluirCompromissosComponent,
    CardCompromissoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  providers:[
    CompromissoService
  ]
})
export class CompromissosModule { }
