import { Component, Input } from '@angular/core';
import { ListarDespesasViewModel } from '../models/listar-despesas.view-model';

@Component({
  selector: 'app-card-despesas',
  templateUrl: './card-despesas.component.html',
  styleUrls: ['./card-despesas.component.css']
})
export class CardDespesasComponent {

  @Input() despesa!: ListarDespesasViewModel;
}
