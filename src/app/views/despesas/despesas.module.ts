import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesasRoutingModule } from './despesas-routing.module';
import { DespesasService } from './services/despesas.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { CardDespesasComponent } from './card-despesas/card-despesas.component';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { FormsDespesasComponent } from './shared/form-despesas/form-despesas.component';
import { CategoriasModule } from '../categorias/categorias.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditarDespesasComponent } from './editar-despesas/editar-despesas.component';
import { ExcluirDespesasComponent } from './excluir-despesas/excluir-despesas.component';


@NgModule({
  declarations: [
    ListarDespesasComponent,
    CardDespesasComponent,
    InserirDespesasComponent,
    FormsDespesasComponent,
    EditarDespesasComponent,
    ExcluirDespesasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DespesasRoutingModule,
    CategoriasModule,
    NgSelectModule,
    FormsModule
  ],
  providers:[
    DespesasService
  ]
})
export class DespesasModule { }
