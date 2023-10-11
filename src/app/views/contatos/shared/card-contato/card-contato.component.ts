import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsContatoViewModel } from '../../models/form-contato.view-model';
import { ListarContatoViewModel } from '../../models/listar-contato.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent {

  @Input() contato!: ListarContatoViewModel;

  @Output() onFavoritar: EventEmitter<ListarContatoViewModel>;

  constructor(){
    this.onFavoritar = new EventEmitter();
  }

  favoritarClick(){
    this.onFavoritar.emit(this.contato)
  }
}
