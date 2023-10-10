import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCategoriaViewModel } from '../models/form-categoria.view-model';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-excluir-categorias',
  templateUrl: './excluir-categorias.component.html',
  styleUrls: ['./excluir-categorias.component.css']
})
export class ExcluirCategoriasComponent implements OnInit {

  categoriaVM!: VisualizarCategoriaViewModel;
  idSelecionado:string | null = null;


  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private categoriaService: CategoriaService,private router:Router){

  }

  ngOnInit(): void {
  
  this.idSelecionado = this.route.snapshot.paramMap.get('id');

  this.categoriaVM = this.route.snapshot.data['categoria']; 

  }

   excluir(){
    this.categoriaService.excluir(this.idSelecionado!).subscribe( 
      {
      next:(res: FormsCategoriaViewModel) => this.processarSucesso(),
      error: (error: Error) => this.processarErro(error)
    })
   }

   processarErro(error: Error): void {
    this.toastrService.error(
    `Falha ao excluir categoria: ${error.message}`,
    'Erro'
      ); 

  }

  processarSucesso(){
      this.toastrService.success(
        `Categoria excluida com sucesso`,
        'Sucesso'
      ); 

      this.router.navigate(['/categorias/listar'])
  
  }

}

