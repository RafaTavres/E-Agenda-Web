import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ContatosService } from '../services/contato.service';

@Component({
  selector: 'app-excluir-contatos',
  templateUrl: './excluir-contatos.component.html',
  styleUrls: ['./excluir-contatos.component.css']
})
export class ExcluirContatosComponent implements OnInit {
    contatoVM!: VisualizarContatoViewModel;
    idSelecionado:string | null = null;


    constructor(private route:ActivatedRoute,private contatoService: ContatosService,private router:Router){

    }

    ngOnInit(): void {
  
  
     
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;
      this.contatoService.selecionarCompletoPorId(this.idSelecionado).subscribe(res => {
        this.contatoVM = res
      })
     }

     excluir(){
      this.contatoService.excluir(this.idSelecionado!).subscribe(res => {
        this.router.navigate(['/contatos/listar'])
      })
     }
  
  }
