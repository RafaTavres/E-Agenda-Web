import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route:ActivatedRoute,private formBuilder: FormBuilder,private contatoService: ContatosService,private router:Router) {
   
   
  }

   ngOnInit(): void {
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;

    this.contatoService.selecionarPorId(this.idSelecionado).subscribe(res => {
      this.contatoBuscado = res;
      console.log(this.contatoBuscado)
    })


   }

   gravar(contatoVM: FormsContatoViewModel){

    this.contatoService.editar(this.idSelecionado! , contatoVM).subscribe((res) => {
      console.log(res); 
      this.router.navigate(['/contatos/listar'])
    })
   }
}
