import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { __await } from 'tslib';
import { FormsContatoViewModel } from '../../models/form-contato.view-model';

@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-contatos.component.html',
  styleUrls: ['./form-contatos.component.css']
})
export class FormContatosComponent implements OnInit {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  @Input() contatoBuscado: any;

  @Output() onGravar: EventEmitter<FormsContatoViewModel | null>

  constructor(private formBuilder: FormBuilder,private toastrService:ToastrService){
    this.onGravar = new EventEmitter();
  }  
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
     nome: new FormControl('',[Validators.required]),
     email: new FormControl('',[Validators.required,Validators.email]),
     telefone: new FormControl('',[Validators.required]),
     cargo: new FormControl('',[Validators.required]),
     empresa: new FormControl('',[Validators.required]),
    });
    
    
    setTimeout(() => {this.form.patchValue(this.contatoBuscado)},2000)
  
  }

  campoInvalido(nome: string){
    return this.form.get(nome)?.invalid && this.form.get(nome)?.touched;
  }

  get email() {
    return this.form.get('email');
  }

  gravar(){
    if(this.form.invalid){
      this.toastrService.warning(
        'Verifique o Preenchimento do Formulario',
        'Aviso'
      );

      this.form.markAllAsTouched();

      return;
     }

    

    this.contatoVM = this.form.value;

    this.onGravar.emit(this.contatoVM);
  }
}
