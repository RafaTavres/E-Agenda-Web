import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarCompromissosComponent } from '../listar-compromissos/listar-compromissos.component';
import { ListarCompromissoViewModel } from '../models/listar-compromissos.view-model';
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


  constructor(private route:ActivatedRoute,private compromissoService: CompromissoService,private router:Router){

  }

  ngOnInit(): void {


   
  this.idSelecionado = this.route.snapshot.paramMap.get('id');

  if(this.idSelecionado == null)
    return;
    this.compromissoService.selecionarCompletoPorId(this.idSelecionado).subscribe(res => {
      this.compromissoVM = res
      console.log(this.compromissoVM)
    })
   }

   excluir(){
    this.compromissoService.excluir(this.idSelecionado!).subscribe(res => {
      this.router.navigate(['/compromissos/listar'])
    })
   }

}

