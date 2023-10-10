import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsDespesasViewModel } from '../models/form-despesas.view-model';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-editar-despesas',
  templateUrl: './editar-despesas.component.html',
  styleUrls: ['./editar-despesas.component.css']
})
export class EditarDespesasComponent {

  form!: FormGroup;
  idSelecionado:string | null = null;
  despesaBuscada!:FormsDespesasViewModel;

  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private router:Router,private despesasService:DespesasService) {
   
   
  }

   ngOnInit(): void {
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;

    this.despesaBuscada = this.route.snapshot.data['despesa']; 
  }

   gravar(despesaVM: FormsDespesasViewModel){

    this.despesasService.editar(this.idSelecionado!, despesaVM).subscribe(
      {
        next:(res: FormsDespesasViewModel) => this.processarSucesso(res),
        error: (error: Error) => this.processarErro(error)
      }
    )
   }

   processarErro(error: Error): void {
    this.toastrService.error(
      `Falha ao editar despesa: ${error.message}`,
      'Erro'
      ); 
    }

  processarSucesso(res: FormsDespesasViewModel){
  this.toastrService.success(
    `Despesa ${res.descricao} editada com sucesso`,
    'Sucess'
  ); 

    this.router.navigate(['/despesas/listar'])
  }
}
