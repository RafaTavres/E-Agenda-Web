import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsCompromissoViewModel } from '../models/form-compromisso.view-model';
import { CompromissoService } from '../services/compromissos.service';

@Component({
  selector: 'app-inserir-compromissos',
  templateUrl: './inserir-compromissos.component.html',
  styleUrls: ['./inserir-compromissos.component.css']
})
export class InserirCompromissosComponent {


  constructor(private compromissoService: CompromissoService,private router:Router) {
    
  }
  
  gravar(compromissoVM: FormsCompromissoViewModel){
    console.log(compromissoVM);
    this.compromissoService.inserir(compromissoVM).subscribe((res) => {console.log(res); this.router.navigate(['/dash-board'])})
  }
}
