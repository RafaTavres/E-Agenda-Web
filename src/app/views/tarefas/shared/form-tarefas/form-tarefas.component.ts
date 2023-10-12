import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsItemTarefaViewModel } from '../../models/itens/forms-item-tarefa.view-model';
import { StatusItemTarefa } from '../../models/itens/status-item-tarefa-enum';
import { FormsTarefasViewModel } from '../../models/tarefa/form-tarefas.view-model';
import { ListarTarefasViewModel } from '../../models/tarefa/listar-tarefas.view-model';
import { TarefasService } from '../../services/tarefas.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-form-tarefas',
  templateUrl: './form-tarefas.component.html',
  styleUrls: ['./form-tarefas.component.css']
})
export class FormTarefasComponent implements OnInit {

  form!: FormGroup;
  tarefaVM!: FormsTarefasViewModel;
  categorias:ListarTarefasViewModel[] = [];

  @Input() tarefaBuscada: any;
  @Output() onGravar: EventEmitter<FormsTarefasViewModel | null>

  constructor(private formBuilder: FormBuilder,private tarefaService:TarefasService,private toastrService:ToastrService){
    this.onGravar = new EventEmitter();
  }  
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
     id: new FormControl(Guid.create(),[Validators.required]),
     titulo: new FormControl('',[Validators.required]),
     prioridade: new FormControl(0,[Validators.required]),
     itens: new FormControl([new FormsItemTarefaViewModel(Guid.create(),'1',StatusItemTarefa.Adicionado,true)],[Validators.required]),
    });
    

    this.form.patchValue(
        {
          titulo: this.tarefaBuscada.titulo,
          prioridade: this.tarefaBuscada.prioridade,
          itens: this.tarefaBuscada.itens,
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


    this.tarefaVM = this.form.value;
    console.log(this.tarefaVM)
    this.onGravar.emit(this.tarefaVM);
  }


}


