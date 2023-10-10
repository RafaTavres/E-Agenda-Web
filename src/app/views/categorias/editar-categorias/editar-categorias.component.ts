import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCompromissoViewModel } from '../../compromissos/models/form-compromisso.view-model';
import { FormsCategoriaViewModel } from '../models/form-categoria.view-model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent {

  form!: FormGroup;
  idSelecionado:string | null = null;
  categoriaBuscada!:FormsCategoriaViewModel;

  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private router:Router,private categoriaService:CategoriaService) {
   
   
  }

   ngOnInit(): void {
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;

    this.categoriaBuscada = this.route.snapshot.data['categoria']; 
  }

   gravar(categoriaVM: FormsCategoriaViewModel){

    this.categoriaService.editar(this.idSelecionado! , categoriaVM).subscribe({
        next:(res: FormsCategoriaViewModel) => this.processarSucesso(res),
        error: (error: Error) => this.processarErro(error)
      }
    )
   }

   processarErro(error: Error): void {
    this.toastrService.error(
      `Falha ao editar compromisso: ${error.message}`,
      'Erro'
      ); 
    }

  processarSucesso(res: FormsCategoriaViewModel){
  this.toastrService.success(
    `Categoria ${res.titulo} editado com sucesso`,
    'Sucess'
  ); 

    this.router.navigate(['/categorias/listar'])
  }
}
