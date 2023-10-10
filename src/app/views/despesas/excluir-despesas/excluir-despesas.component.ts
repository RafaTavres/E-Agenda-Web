import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsDespesasViewModel } from '../models/form-despesas.view-model';
import { VisualizarDespesasViewModel } from '../models/visualizae-despesas.view-model';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-excluir-despesas',
  templateUrl: './excluir-despesas.component.html',
  styleUrls: ['./excluir-despesas.component.css']
})
export class ExcluirDespesasComponent implements OnInit {
  despesaVM!: VisualizarDespesasViewModel;
  idSelecionado:string | null = null;


  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private despesasService: DespesasService,private router:Router){

  }

  ngOnInit(): void {

  this.idSelecionado = this.route.snapshot.paramMap.get('id');

  this.despesaVM = this.route.snapshot.data['despesa']; 

  }

   excluir(){
    this.despesasService.excluir(this.idSelecionado!).subscribe( 
    {
      next:(res: FormsDespesasViewModel) => this.processarSucesso(),
      error: (error: Error) => this.processarErro(error)
    })
    
  }

  processarErro(error: Error): void {
    this.toastrService.error(
    `Falha ao excluir despesa: ${error.message}`,
    'Erro'
      ); 

  }

  processarSucesso(){
      this.toastrService.success(
        `Despesa excluida com sucesso`,
        'Sucesso'
      ); 

      this.router.navigate(['/despesas/listar'])
  
  }
}
