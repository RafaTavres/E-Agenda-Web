import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsDespesasViewModel } from '../../despesas/models/form-despesas.view-model';
import { FormsTarefasViewModel } from '../models/tarefa/form-tarefas.view-model';
import { VisualizarTarefasViewModel } from '../models/tarefa/visualizae-tarefas.view-model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-inserir-tarefas',
  templateUrl: './inserir-tarefas.component.html',
  styleUrls: ['./inserir-tarefas.component.css']
})
export class InserirTarefasComponent {

  constructor(private toastrService:ToastrService,private tarefaService: TarefasService,private router:Router) {
  }
  
  gravar(tarefaVM: FormsTarefasViewModel){
    this.tarefaService.inserir(tarefaVM).subscribe({
      next:(res) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao adicionar tarefa: ${error.message}`,
     'Erro'
   ); 
  }

  processarSucesso(res: FormsTarefasViewModel){
    console.log(res)
  this.toastrService.success(
    `Tarefa ${res.titulo} adicionada com sucesso`,
    'Sucess'
  ); 

    this.router.navigate(['/tarefas/listar'])
  }
}
