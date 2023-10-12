import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarTarefasViewModel } from '../models/tarefa/listar-tarefas.view-model';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent {

  tarefas: ListarTarefasViewModel[] = [];

  constructor(private route:ActivatedRoute,private toastrService:ToastrService){
  }

  ngOnInit(): void {
   
    this.route.data.pipe(map((dados) => dados['tarefas'])).subscribe({
      next:(res: ListarTarefasViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao carregar tarefas: ${error.message}`,
     'Erro'
   ); 

   }

 processarSucesso(res: ListarTarefasViewModel[]){
   console.log(res);
   this.tarefas = res
 }
}
