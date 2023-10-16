import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsItemTarefaViewModel } from '../../models/itens/forms-item-tarefa.view-model';
import { StatusItemTarefa } from '../../models/itens/status-item-tarefa-enum';
import { FormsTarefasViewModel } from '../../models/tarefa/form-tarefas.view-model';
import { ListarTarefasViewModel } from '../../models/tarefa/listar-tarefas.view-model';
import { TarefasService } from '../../services/tarefas.service';

@Component({
  selector: 'app-form-tarefas',
  templateUrl: './form-tarefas.component.html',
  styleUrls: ['./form-tarefas.component.css']
})
export class FormTarefasComponent implements OnInit {

  form!: FormGroup;
  formItem!:FormGroup;
  tarefaVM!: FormsTarefasViewModel;
  itens:FormsItemTarefaViewModel[] = []
  adicionarItens:boolean = false

  @Input() idSelecionado: any;
  @Input() tarefaBuscada: any;
  @Output() onGravar: EventEmitter<FormsTarefasViewModel | null>
  @Output() onSalvarAlteraceosItens: EventEmitter<FormsTarefasViewModel | null>

  constructor(private formBuilder: FormBuilder,private tarefaService:TarefasService,private toastrService:ToastrService){
    this.onGravar = new EventEmitter();
    this.onSalvarAlteraceosItens = new EventEmitter();
  }  
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
     titulo: new FormControl('',[Validators.required]),
     prioridade: new FormControl(0,[Validators.required]),
    });
    
    this.formItem = this.formBuilder.group({
      titulo: new FormControl('',[Validators.required]),
      concluido: new FormControl(false),
      status: new FormControl(StatusItemTarefa.Adicionado)
     });

    this.form.patchValue(
        {
          titulo: this.tarefaBuscada.titulo,
          prioridade: this.tarefaBuscada.prioridade,
        }
      );

    console.clear()
    console.log(this.tarefaBuscada)
    this.itens = this.tarefaBuscada.itens;  
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
    this.tarefaVM.itens = this.itens
    this.onGravar.emit(this.tarefaVM);
  }


  salvarAlteracoesItens(){
    if(this.form.invalid){

        const erros = this.form.validate();
        for(let erro of erros){
         this.toastrService.warning(
           erro
         );
        }
        
        return;
     }

    this.tarefaVM.itens = this.itens
    this.onSalvarAlteraceosItens.emit(this.tarefaVM);
  }



  public adicionarItem(){
   let item = this.formItem.value;

   let existe = false;
      this.itens.forEach(i => {
        if (i.titulo == item.titulo){ existe = true}})
     
   if(existe == false)
      this.itens.push(this.formItem.value);
    else
      this.toastrService.warning(
        'Item ja existe!',
        'Erro'
      );
  }

  public removerItem(item:any){
    let index = this.itens.indexOf(item);
    this.itens.splice(index,1)
    console.clear()
    console.log(this.itens)
  }


  public ativarFormItens(){
    this.adicionarItens = !this.adicionarItens
  }

}


