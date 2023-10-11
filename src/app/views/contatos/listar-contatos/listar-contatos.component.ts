import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { FormsContatoViewModel } from '../models/form-contato.view-model';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ContatosService } from '../services/contato.service';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit{
  contatos:ListarContatoViewModel[] = [];

  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private contatoService:ContatosService){
  }

  ngOnInit(): void {
   this.carregarTodos();
  }

  favoritarContato(contato: ListarContatoViewModel){
    this.contatoService.favoritar(contato.id).subscribe({
      next:(res) => this.regarregar(),
      error: (error: Error) => this.processarErro(error)
    });
  }
  
  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao carregar contatos: ${error.message}`,
     'Erro'
   ); 

   }

  processarSucesso(res: ListarContatoViewModel[]){
    console.log(res);
    this.contatos = res
  }

  regarregar(){
    window.location.reload();
  }

  carregarFavoritos(){
    this.contatoService.selecionarTodosFavoritos().subscribe({
      next:(res: ListarContatoViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  carregarNaoFavoritos(){
    this.contatoService.selecionarTodosNaoFavoritos().subscribe({
      next:(res: ListarContatoViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  carregarTodos(){
    this.route.data.pipe(map((dados) => dados['contatos'])).subscribe({
      next:(res: ListarContatoViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }


}
