import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsContatoViewModel } from '../models/form-contato.view-model';
import { ContatosService } from '../services/contato.service';

@Component({
  selector: 'app-editar-contatos',
  templateUrl: './editar-contatos.component.html',
  styleUrls: ['./editar-contatos.component.css']
})
export class EditarContatosComponent {
  form!: FormGroup;
  idSelecionado:string | null = null;
  contatoBuscado:any;

  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private formBuilder: FormBuilder,private contatoService: ContatosService,private router:Router) {
   
   
  }

   ngOnInit(): void {
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;

    this.contatoBuscado = this.route.snapshot.data['contato']
    console.clear();
    console.log(this.contatoBuscado)
    
   }

   gravar(contatoVM: FormsContatoViewModel){

    this.contatoService.editar(this.idSelecionado! , contatoVM).subscribe({
      next:(res: FormsContatoViewModel) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    }
    )
   }

   
   processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao editar contato: ${error.message}`,
     'Erro'
   ); 

 }

 processarSucesso(res: FormsContatoViewModel){
   this.toastrService.success(
     `Contato ${res.nome} editado com sucesso`,
     'Sucesso'
   ); 

   this.router.navigate(['/contatos/listar'])
 }
}
