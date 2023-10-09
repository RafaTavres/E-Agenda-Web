import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsCategoriaViewModel } from '../../models/form-categoria.view-model';

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styleUrls: ['./form-categorias.component.css']
})
export class FormCategoriasComponent implements OnInit {
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;

  @Input() categoriaBuscada: any;

  @Output() onGravar: EventEmitter<FormsCategoriaViewModel | null>
  
  constructor(private formBuilder: FormBuilder,private toastrService:ToastrService){
    this.onGravar = new EventEmitter();
  }  

  ngOnInit(): void {

    this.form = this.formBuilder.group({
     titulo: new FormControl('',[Validators.required])
    });
    
    
    this.form.patchValue(this.categoriaBuscada)
  
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

    

    this.categoriaVM = this.form.value;

    this.onGravar.emit(this.categoriaVM);
  }
}
