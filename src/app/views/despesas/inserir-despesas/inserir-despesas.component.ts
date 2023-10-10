import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsDespesasViewModel } from '../models/form-despesas.view-model';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-inserir-despesas',
  templateUrl: './inserir-despesas.component.html',
  styleUrls: ['./inserir-despesas.component.css']
})
export class InserirDespesasComponent {

  constructor(private toastrService:ToastrService,private despesasService: DespesasService,private router:Router) {
  }
  
  gravar(despesaVM: FormsDespesasViewModel){
    this.despesasService.inserir(despesaVM).subscribe({
      next:(res: FormsDespesasViewModel) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao adicionar despesa: ${error.message}`,
     'Erro'
   ); 
  }

  processarSucesso(res: FormsDespesasViewModel){
  this.toastrService.success(
    `Despesa ${res.descricao} adicionada com sucesso`,
    'Sucess'
  ); 

    this.router.navigate(['/despesas/listar'])
  }
}
