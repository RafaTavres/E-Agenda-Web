import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsContatoViewModel } from '../models/form-contato.view-model';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ContatosService } from '../services/contato.service';

@Component({
  selector: 'app-visualizar-contatos',
  templateUrl: './visualizar-contatos.component.html',
  styleUrls: ['./visualizar-contatos.component.css']
})
export class VisualizarContatosComponent  implements OnInit {

  contatoVM!: VisualizarContatoViewModel;
  idSelecionado:string | null = null;


  constructor(private toastrService:ToastrService,private route:ActivatedRoute,private contatoService: ContatosService,private router:Router){

  }

  ngOnInit(): void {
  
  this.idSelecionado = this.route.snapshot.paramMap.get('id');

  this.contatoVM = this.route.snapshot.data['contato']; 
  console.clear()
  console.log(this.contatoVM)
  }


  processarErro(error: Error): void {
    this.toastrService.error(
    `Falha ao excluir contato: ${error.message}`,
    'Erro'
      ); 

  }

  processarSucesso(){
      this.toastrService.success(
        `Contato excluido com sucesso`,
        'Sucesso'
      ); 

      this.router.navigate(['/contatos/listar'])
  }
    
}
