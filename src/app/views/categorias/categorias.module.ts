import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCategoriasComponent } from './shared/form-categorias/form-categorias.component';
import 'src/app/extensions/form-group.extension'
import { CategoriaService } from './services/categoria.service';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CardCategoriasComponent } from './card-categorias/card-categorias.component';
import { ExcluirCategoriasComponent } from './excluir-categorias/excluir-categorias.component';


@NgModule({
  declarations: [
    InserirCategoriasComponent,
    FormCategoriasComponent,
    ListarCategoriasComponent,
    CardCategoriasComponent,
    ExcluirCategoriasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CategoriasRoutingModule,
    
  ],
  providers:[
    CategoriaService
  ]
})
export class CategoriasModule { }
