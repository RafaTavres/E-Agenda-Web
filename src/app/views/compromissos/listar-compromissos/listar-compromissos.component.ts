import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
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

  constructor(private route:ActivatedRoute,private toastrService:ToastrService){
  }

  ngOnInit(): void {
 
    this.route.data.pipe(map((dados) => dados['compromissos'])).subscribe({
      next:(res: ListarCompromissoViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
    
  }

  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao carregar compromissos: ${error.message}`,
     'Erro'
   ); 

   }

 processarSucesso(res: ListarCompromissoViewModel[]){
   this.compromissos = res
 }
}
