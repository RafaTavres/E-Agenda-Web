import { DatePipe } from '@angular/common';
import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../../models/listar-compromissos.view-model';

@Component({
  selector: 'app-card-compromisso',
  templateUrl: './card-compromisso.component.html',
  styleUrls: ['./card-compromisso.component.css']
})
export class CardCompromissoComponent{
  dataAtual:Date = new Date();
  @Input() compromisso!: ListarCompromissoViewModel;

  transformarData(data: Date){
    let datePipe:DatePipe = new DatePipe('pt-BR');
    return Date.parse(datePipe.transform(data, 'dd/MM/YYYY')!);
  }

}



