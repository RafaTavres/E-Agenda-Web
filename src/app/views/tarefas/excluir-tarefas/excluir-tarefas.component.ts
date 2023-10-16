import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarTarefasViewModel } from '../models/tarefa/visualizae-tarefas.view-model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-excluir-tarefas',
  templateUrl: './excluir-tarefas.component.html',
  styleUrls: ['./excluir-tarefas.component.css']
})
export class ExcluirTarefasComponent  implements OnInit {

  tarefaVM!: VisualizarTarefasViewModel;
  idSelecionado:string | null = null;


  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private tarefaService: TarefasService,private router:Router){

  }

  ngOnInit(): void {

  this.idSelecionado = this.route.snapshot.paramMap.get('id');

  this.tarefaVM = this.route.snapshot.data['tarefa']; 

  }

   excluir(){
    this.tarefaService.excluir(this.idSelecionado!).subscribe( 
    {
      next:() => this.processarSucesso(),
      error: (error: Error) => this.processarErro(error)
    })
    
  }

  processarErro(error: Error): void {
    this.toastrService.error(
    `Falha ao excluir tarefa: ${error.message}`,
    'Erro'
      ); 

  }

  processarSucesso(){
      this.toastrService.success(
        `Tarefa excluida com sucesso`,
        'Sucesso'
      ); 

      this.router.navigate(['/tarefas/listar'])
  
  }
}
