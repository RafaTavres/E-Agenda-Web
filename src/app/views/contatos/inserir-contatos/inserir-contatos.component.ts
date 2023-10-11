import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsContatoViewModel } from '../models/form-contato.view-model';

import { ContatosService } from '../services/contato.service';

@Component({
  selector: 'app-inserir-contatos',
  templateUrl: './inserir-contatos.component.html',
  styleUrls: ['./inserir-contatos.component.css']
})
export class InserirContatosComponent{

   constructor(private contatoService: ContatosService,private router:Router,private toastrService:ToastrService) {
  
   }

    gravar(contatoVM: FormsContatoViewModel){
     
      this.contatoService.inserir(contatoVM).subscribe({
          next:(res: FormsContatoViewModel) => this.processarSucesso(res),
          error: (error: Error) => this.processarErro(error)
      });

      
    }


    processarErro(error: Error): void {
       this.toastrService.error(
        `Falha ao adicionar contato: ${error.message}`,
        'Erro'
      ); 

    }

    processarSucesso(res: FormsContatoViewModel){
      console.clear()
      console.log(res);
      this.toastrService.success(
        `Contato ${res.nome} adicionado com sucesso`,
        'Sucesso'
      ); 

      this.router.navigate(['/contatos/listar'])
    }
}
