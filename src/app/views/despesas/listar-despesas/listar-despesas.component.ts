import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarDespesasViewModel } from '../models/listar-despesas.view-model';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent {
  despesas: ListarDespesasViewModel[] = [];

  constructor(private route:ActivatedRoute,private toastrService:ToastrService,private despesaService:DespesasService){
  }

  ngOnInit(): void {
   this.carregarTodos();
  }

  processarErro(error: Error): void {
    this.toastrService.error(
     `Falha ao carregar compromissos: ${error.message}`,
     'Erro'
   ); 

   }

 processarSucesso(res: ListarDespesasViewModel[]){
   console.log(res);
   this.despesas = res
 }

  carregarAntigas(){
    this.despesaService.selecionarTodosAntigas().subscribe({
      next:(res: ListarDespesasViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  carregarTodos(){
    this.route.data.pipe(map((dados) => dados['despesas'])).subscribe({
      next:(res: ListarDespesasViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }

  carregarUltimos30Dias(){
    this.despesaService.selecionarTodosUltimos30Dias().subscribe({
      next:(res: ListarDespesasViewModel[]) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    })
  }
}
