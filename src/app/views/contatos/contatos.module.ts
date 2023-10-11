import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatosComponent } from './inserir-contatos/inserir-contatos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosService } from './services/contato.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { RouterLink } from '@angular/router';
import { EditarContatosComponent } from './editar-contatos/editar-contatos.component';
import { ExcluirContatosComponent } from './excluir-contatos/excluir-contatos.component';
import { FormContatosComponent } from './shared/form-contatos/form-contatos.component';
import { CardContatoComponent } from './shared/card-contato/card-contato.component';
import 'src/app/extensions/form-group.extension'
import { ContatoRoutingModule } from './contatos-routing.module';
import { VisualizarContatosComponent } from './visualizar-contatos/visualizar-contatos.component';


@NgModule({
  declarations: [
    InserirContatosComponent,
    ListarContatosComponent,
    EditarContatosComponent,
    ExcluirContatosComponent,
    FormContatosComponent,
    CardContatoComponent,
    VisualizarContatosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ContatoRoutingModule,
    
  ],
  providers:[
    ContatosService
  ]
})
export class ContatosModule { }
