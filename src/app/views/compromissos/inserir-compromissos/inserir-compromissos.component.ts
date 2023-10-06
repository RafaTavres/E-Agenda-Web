import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCompromissoViewModel } from '../models/form-compromisso.view-model';
import { CompromissoService } from '../services/compromissos.service';

@Component({
  selector: 'app-inserir-compromissos',
  templateUrl: './inserir-compromissos.component.html',
  styleUrls: ['./inserir-compromissos.component.css']
})
export class InserirCompromissosComponent {


  constructor(private toastrService:ToastrService,private compromissoService: CompromissoService,private router:Router) {
  }
  
  gravar(compromissoVM: FormsCompromissoViewModel){
    this.compromissoService.inserir(compromissoVM).subscribe({
      next:(res: FormsCompromissoViewModel) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao adicionar contato: ${error.message}`,
     'Erro'
   ); 
  }

  processarSucesso(res: FormsCompromissoViewModel){
  this.toastrService.success(
    `Compromisso ${res.assunto} adicionado com sucesso`,
    'Sucess'
  ); 

    this.router.navigate(['/compromissos/listar'])
  }
}
