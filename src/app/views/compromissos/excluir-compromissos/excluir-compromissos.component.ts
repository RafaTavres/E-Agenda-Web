import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCompromissoViewModel } from '../models/form-compromisso.view-model';
import { VisualizacaoCompromissoViewModel } from '../models/visualizacao-compromisso.view-model';
import { CompromissoService } from '../services/compromissos.service';

@Component({
  selector: 'app-excluir-compromissos',
  templateUrl: './excluir-compromissos.component.html',
  styleUrls: ['./excluir-compromissos.component.css']
})
export class ExcluirCompromissosComponent implements OnInit {
  compromissoVM!: VisualizacaoCompromissoViewModel;
  idSelecionado:string | null = null;


  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private compromissoService: CompromissoService,private router:Router){

  }

  ngOnInit(): void {

  this.idSelecionado = this.route.snapshot.paramMap.get('id');

  this.compromissoVM = this.route.snapshot.data['compromisso']; 

  }

   excluir(){
    this.compromissoService.excluir(this.idSelecionado!).subscribe( 
    {
      next:(res: FormsCompromissoViewModel) => this.processarSucesso(),
      error: (error: Error) => this.processarErro(error)
    })
    
  }

  processarErro(error: Error): void {
    this.toastrService.error(
    `Falha ao excluir compromisso: ${error.message}`,
    'Erro'
      ); 

  }

  processarSucesso(){
      this.toastrService.success(
        `Compromisso excluido com sucesso`,
        'Sucesso'
      ); 

      this.router.navigate(['/compromissos/listar'])
  
  }
}

