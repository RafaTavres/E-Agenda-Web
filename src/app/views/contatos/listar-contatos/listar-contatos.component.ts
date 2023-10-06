import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ContatosService } from '../services/contato.service';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit{
  contatos:ListarContatoViewModel[] = [];

  constructor(private toastrService:ToastrService,private route:ActivatedRoute){
  }

  ngOnInit(): void {
   this.route.data.pipe(map((dados) => dados['contatos'])).subscribe({
      next:(res: ListarContatoViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao carregar contatos: ${error.message}`,
     'Erro'
   ); 

   }

 processarSucesso(res: ListarContatoViewModel[]){
   this.contatos = res
 }


}
