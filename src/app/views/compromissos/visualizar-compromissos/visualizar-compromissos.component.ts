import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizacaoCompromissoViewModel } from '../models/visualizacao-compromisso.view-model';

@Component({
  selector: 'app-visualizar-compromissos',
  templateUrl: './visualizar-compromissos.component.html',
  styleUrls: ['./visualizar-compromissos.component.css']
})
export class VisualizarCompromissosComponent implements OnInit {
  compromissoVM!: VisualizacaoCompromissoViewModel;
  idSelecionado:string | null = null;


  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private router:Router){

  }

  ngOnInit(): void {

  this.idSelecionado = this.route.snapshot.paramMap.get('id');

  this.compromissoVM = this.route.snapshot.data['compromisso']; 

  }

}

