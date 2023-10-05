import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  compromissoBuscado:any;

  constructor(private route:ActivatedRoute,private formBuilder: FormBuilder,private contatoService: ContatosService,private router:Router,private compromissoService:CompromissoService) {
   
   
  }

   ngOnInit(): void {
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;

    this.compromissoService.selecionarCompletoPorId(this.idSelecionado).subscribe(res => {
      this.compromissoBuscado = res;
      console.log(this.compromissoBuscado)
    })


   }

   gravar(compromissoVM: FormsCompromissoViewModel){

    this.compromissoService.editar(this.idSelecionado! , compromissoVM).subscribe((res) => {
      console.log(res); 
      this.router.navigate(['/compromissos/listar'])
    })
   }
}
