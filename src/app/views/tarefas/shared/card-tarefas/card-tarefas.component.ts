import { Component, Input } from '@angular/core';
import { ListarTarefasViewModel } from '../../models/tarefa/listar-tarefas.view-model';

@Component({
  selector: 'app-card-tarefas',
  templateUrl: './card-tarefas.component.html',
  styleUrls: ['./card-tarefas.component.css']
})
export class CardTarefasComponent {

  @Input() tarefa!: ListarTarefasViewModel;

}
