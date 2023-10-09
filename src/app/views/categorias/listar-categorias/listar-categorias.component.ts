import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ListarCompromissoViewModel } from '../../compromissos/models/listar-compromissos.view-model';
import { CompromissoService } from '../../compromissos/services/compromissos.service';
import { listarCategoriaViewModel as ListarCategoriaViewModel } from '../models/listar-categorias.view-model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent  implements OnInit{
  categorias: ListarCategoriaViewModel[] = [];

  constructor(private categoriasService: CategoriaService,private toastrService:ToastrService){
  }

  ngOnInit(): void {
   this.categoriasService.selecionarTodos().subscribe({
      next:(res: ListarCategoriaViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao carregar compromissos: ${error.message}`,
     'Erro'
   ); 

   }

 processarSucesso(res: ListarCategoriaViewModel[]){
   this.categorias = res
 }
}
