import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { listarCategoriaViewModel } from 'src/app/views/categorias/models/listar-categorias.view-model';
import { CategoriaService } from 'src/app/views/categorias/services/categoria.service';
import { FormsDespesasViewModel } from '../../models/form-despesas.view-model';

@Component({
  selector: 'app-form-despesas',
  templateUrl: './form-despesas.component.html',
  styleUrls: ['./form-despesas.component.css']
})
export class FormsDespesasComponent implements OnInit {

  form!: FormGroup;
  despesaVM!: FormsDespesasViewModel;
  categorias:listarCategoriaViewModel[] = [];

  @Input() despesaBuscada: any;
  @Output() onGravar: EventEmitter<FormsDespesasViewModel | null>

  constructor(private formBuilder: FormBuilder,private categoriaService:CategoriaService,private toastrService:ToastrService){
    this.onGravar = new EventEmitter();
  }  
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
     descricao: new FormControl('',[Validators.required]),
     valor: new FormControl(0,[Validators.required]),
     data: new FormControl(new Date(''),[Validators.required]),
     formaPagamento: new FormControl(0,[Validators.required]),
     categoriasSelecionadas: new FormControl([],[Validators.required]),
    });
    
    this.categoriaService.selecionarTodos().subscribe(res =>{
      this.categorias = res
    })

    this.form.patchValue(
        {
          descricao: this.despesaBuscada.descricao,
          valor: this.despesaBuscada.valor,
          data: this.despesaBuscada.data.slice(0,10),
          formaPagamento: this.despesaBuscada.formaPagamento,
          categoriasSelecionadas: this.despesaBuscada.categoriasSelecionadas,
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


    this.despesaVM = this.form.value;
    this.onGravar.emit(this.despesaVM);
  }


}

