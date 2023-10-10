import { Component, Input } from '@angular/core';
import { listarCategoriaViewModel as ListarCategoriaViewModel } from '../models/listar-categorias.view-model';

@Component({
  selector: 'app-card-categorias',
  templateUrl: './card-categorias.component.html',
  styleUrls: ['./card-categorias.component.css']
})
export class CardCategoriasComponent {

  dataAtual:Date = new Date();
  @Input() categoria!: ListarCategoriaViewModel;


}
