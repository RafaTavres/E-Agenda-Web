import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../../contatos/services/contato.service';
import { FormsCompromissoViewModel } from '../models/form-compromisso.view-model';
import { CompromissoService } from '../services/compromissos.service';

@Component({
  selector: 'app-editar-compromissos',
  templateUrl: './editar-compromissos.component.html',
  styleUrls: ['./editar-compromissos.component.css']
})
export class EditarCompromissosComponent {

  form!: FormGroup;
  idSelecionado:string | null = null;
  compromissoBuscado!:FormsCompromissoViewModel;

  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private router:Router,private compromissoService:CompromissoService) {
   
   
  }

   ngOnInit(): void {
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;

    this.compromissoBuscado = this.route.snapshot.data['compromisso']; 
  }

   gravar(compromissoVM: FormsCompromissoViewModel){

    this.compromissoService.editar(this.idSelecionado! , compromissoVM).subscribe({
        next:(res: FormsCompromissoViewModel) => this.processarSucesso(res),
        error: (error: Error) => this.processarErro(error)
      }
    )
   }

   processarErro(error: Error): void {
    this.toastrService.error(
      `Falha ao editar compromisso: ${error.message}`,
      'Erro'
      ); 
    }

  processarSucesso(res: FormsCompromissoViewModel){
  this.toastrService.success(
    `Compromisso ${res.assunto} editado com sucesso`,
    'Sucess'
  ); 

    this.router.navigate(['/compromissos/listar'])
  }
}
