import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ListarContatoViewModel } from "src/app/views/contatos/models/listar-contato.view-model";
import { ContatosService } from "src/app/views/contatos/services/contato.service";
import { FormsCompromissoViewModel } from "../../models/form-compromisso.view-model";

@Component({
  selector: 'app-form-compromissos',
  templateUrl: './form-compromissos.component.html',
  styleUrls: ['./form-compromissos.component.css']
})
export class FormCompromissosComponent  implements OnInit {

  form!: FormGroup;
  compromissoVM!: FormsCompromissoViewModel;
  contatos:ListarContatoViewModel[] = [];

  @Input() compromissoBuscado: any;
  @Output() onGravar: EventEmitter<FormsCompromissoViewModel | null>

  constructor(private formBuilder: FormBuilder,private contatoService:ContatosService){
    this.onGravar = new EventEmitter();
  }  
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
     assunto: new FormControl('',[Validators.required]),
     tipoLocal: new FormControl('',[Validators.required]),
     link: new FormControl(''),
     local: new FormControl(''),
     data: new FormControl(new Date(''),[Validators.required]),
     horaInicio: new FormControl('08:00',[Validators.required]),
     horaTermino: new FormControl('09:00',[Validators.required]),
     contatoId: new FormControl('',[Validators.required]),
    });
    
    this.contatoService.selecionarTodos().subscribe(res =>{
      this.contatos = res
    })

    setTimeout(() => {this.form.patchValue(
      {
      assunto : this.compromissoBuscado.assunto,
      tipoLocal:this.compromissoBuscado.tipoLocal,
      link: this.compromissoBuscado.link,
      local: this.compromissoBuscado.local,
      data: this.compromissoBuscado.data.slice(0,10),
      horaInicio: this.compromissoBuscado.horaInicio,
      horaTermino:this.compromissoBuscado.horaTermino,
      contatoId: this.compromissoBuscado.contato.id,
      }
      )},2000)
  
  }

  gravar(){
    if(this.form.invalid){
      
      return;
     }

    this.compromissoVM = this.form.value;

    this.onGravar.emit(this.compromissoVM);
  }

  o(){
    console.log(this.form.value)
  }

}
