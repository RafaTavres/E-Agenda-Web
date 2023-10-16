import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsTarefasViewModel } from '../models/tarefa/form-tarefas.view-model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-editar-tarefas',
  templateUrl: './editar-tarefas.component.html',
  styleUrls: ['./editar-tarefas.component.css']
})
export class EditarTarefasComponent {
  form!: FormGroup;
  idSelecionado:string | null = null;
  tarefaBuscada!:FormsTarefasViewModel;


  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private router:Router,private tarefaService:TarefasService) {
   
   
  }

   ngOnInit(): void {
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;

    this.tarefaBuscada = this.route.snapshot.data['tarefa']; 
  }

   gravar(tarefaVM: FormsTarefasViewModel){

    console.log(tarefaVM)
    this.tarefaService.editar(this.idSelecionado!, tarefaVM).subscribe(
      {
        next:(res: FormsTarefasViewModel) => this.processarSucesso(res),
        error: (error: Error) => this.processarErro(error)
      }
    )
   }

   salvarAlteracoesItens(tarefaVM: FormsTarefasViewModel){
    this.tarefaService.editar(this.idSelecionado!, tarefaVM).subscribe(
      {
        next:(res: FormsTarefasViewModel) => this.processarSucessoSemSair(res),
        error: (error: Error) => this.processarErro(error)
      }
    )
   }
   processarErro(error: Error): void {
    this.toastrService.error(
      `Falha ao editar tarefa: ${error.message}`,
      'Erro'
      ); 
    }

  processarSucesso(res: FormsTarefasViewModel){
  this.toastrService.success(
    `Tarefa ${res.titulo} editada com sucesso`,
    'Sucess'
  ); 

    this.router.navigate(['/tarefas/listar'])
  }

  processarSucessoSemSair(res: FormsTarefasViewModel){
    this.toastrService.success(
      `Itens da Tarefa ${res.titulo} salvos com sucesso`,
      'Sucess'
    ); 
  
    }
}


