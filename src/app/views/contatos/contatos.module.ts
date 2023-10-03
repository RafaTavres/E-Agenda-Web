import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatosComponent } from './inserir-contatos/inserir-contatos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosService } from './services/contato.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    InserirContatosComponent,
    ListarContatosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  providers:[
    ContatosService
  ]
})
export class ContatosModule { }
