import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatusItemTarefa } from '../models/itens/status-item-tarefa-enum';
import { FormsTarefasViewModel } from '../models/tarefa/form-tarefas.view-model';
import { VisualizarTarefasViewModel } from '../models/tarefa/visualizae-tarefas.view-model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-visualizar-item-tarefa',
  templateUrl: './visualizar-item-tarefa.component.html',
  styleUrls: ['./visualizar-item-tarefa.component.css']
})
export class VisualizarItemTarefaComponent {
  tarefaBuscada!: VisualizarTarefasViewModel;
  tarefaVM!: FormsTarefasViewModel;
  idSelecionado:string | null = null;

  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private tarefaService: TarefasService,private router:Router){
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    this.tarefaBuscada = this.route.snapshot.data['tarefaCompleta'];
    this.tarefaVM = this.route.snapshot.data['tarefa'];
  }

  editarItens(){
    this.tarefaService.editar(this.idSelecionado!, this.tarefaVM).subscribe(
      {
        next:(res: FormsTarefasViewModel) => this.processarSucesso(res),
        error: (error: Error) => this.processarErro(error)
      }
    )
   }

   processarErro(error: Error): void {
    this.toastrService.error(
      `Falha ao editar itens da tarefa: ${error.message}`,
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
  
  public modificarItem(item:any){
    console.clear()
    console.log(item)
    item.concluido =!item.concluido
  }

  public removerItem(item:any){
    item.status = StatusItemTarefa.Removido;
    console.clear()
    console.log(item.status)
  }

  public voltarItem(item:any){
    item.status = StatusItemTarefa.nenhum;
  }
}
