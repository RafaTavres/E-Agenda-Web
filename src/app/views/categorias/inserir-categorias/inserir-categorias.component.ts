import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsContatoViewModel } from '../../contatos/models/form-contato.view-model';
import { FormsCategoriaViewModel } from '../models/form-categoria.view-model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-inserir-categorias',
  templateUrl: './inserir-categorias.component.html',
  styleUrls: ['./inserir-categorias.component.css']
})
export class InserirCategoriasComponent {

  constructor(private categoriaService: CategoriaService,private router:Router,private toastrService:ToastrService) {
  
  }

  gravar(categoriaVM: FormsCategoriaViewModel){
     
    this.categoriaService.inserir(categoriaVM).subscribe({
      next:(res: FormsCategoriaViewModel) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    });

    
  }


  processarErro(error: Error): void {
     this.toastrService.error(
      `Falha ao adicionar contato: ${error.message}`,
      'Erro'
    ); 

  }

  processarSucesso(res: FormsCategoriaViewModel){
    this.toastrService.success(
      `Categoria ${res.titulo} adicionado com sucesso`,
      'Sucesso'
    ); 

    this.router.navigate(['/categorias/listar'])
  }

}
