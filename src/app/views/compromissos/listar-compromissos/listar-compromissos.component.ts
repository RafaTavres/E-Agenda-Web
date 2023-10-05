import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../../contatos/services/contato.service';
import { ListarCompromissoViewModel } from '../models/listar-compromissos.view-model';
import { CompromissoService } from '../services/compromissos.service';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent  implements OnInit{
  compromissos:ListarCompromissoViewModel[] = [];

  constructor(private compromissoService: CompromissoService,private contatoService:ContatosService){
  }

  ngOnInit(): void {
   this.compromissoService.selecionarTodos().subscribe((res) => {
    this.compromissos = res
   })
  }

}
