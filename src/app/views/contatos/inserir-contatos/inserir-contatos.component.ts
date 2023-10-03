import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormsContatoViewModel } from '../models/form-contato.view-model';

import { ContatosService } from '../services/contato.service';

@Component({
  selector: 'app-inserir-contatos',
  templateUrl: './inserir-contatos.component.html',
  styleUrls: ['./inserir-contatos.component.css']
})
export class InserirContatosComponent implements OnInit {
   form!: FormGroup;
   contatoVM!: FormsContatoViewModel;

   constructor(private formBuilder: FormBuilder,private contatoService: ContatosService,private router:Router) {
    
    
   }

    ngOnInit(): void {
     this.form = this.formBuilder.group({
      nome: new FormControl(' '),
      email: new FormControl(' '),
      telefone: new FormControl(' '),
      cargo: new FormControl(' '),
      empresa: new FormControl(' '),
     });
    }

    gravar(){
     this.contatoVM = this.form.value;

     this.contatoService.inserir(this.contatoVM).subscribe((res) => {console.log(res); this.router.navigate(['/dash-board'])})
    }
}
