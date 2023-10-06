import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DateValidator } from "src/app/Validators/date-validator";
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

  constructor(private formBuilder: FormBuilder,private contatoService:ContatosService,private toastrService:ToastrService){
    this.onGravar = new EventEmitter();
  }  
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
     assunto: new FormControl('',[Validators.required]),
     tipoLocal: new FormControl(1,[Validators.required]),
     link: new FormControl(''),
     local: new FormControl(''),
     data: new FormControl(new Date(''),[Validators.required,Validators.nullValidator]),
     horaInicio: new FormControl('08:00',[Validators.required,DateValidator.ptDate]),
     horaTermino: new FormControl('09:00',[Validators.required]),
     contatoId: new FormControl(''),
    });
    
    this.contatoService.selecionarTodos().subscribe(res =>{
      this.contatos = res
    })

    this.form.patchValue(
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
      );
  
  }
  campoInvalido(nome: string){
    return this.form.get(nome)?.invalid && this.form.get(nome)?.touched;
  }

  gravar(){
    if(this.form.invalid){

        const erros = this.form.validate();
        for(let erro of erros){
         this.toastrService.warning(
           erro
         );
        }
        
        return;
     }


    this.compromissoVM = this.form.value;

    this.onGravar.emit(this.compromissoVM);
  }


}
