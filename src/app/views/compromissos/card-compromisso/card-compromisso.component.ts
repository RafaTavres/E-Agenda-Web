import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromissos.view-model';

@Component({
  selector: 'app-card-compromisso',
  templateUrl: './card-compromisso.component.html',
  styleUrls: ['./card-compromisso.component.css']
})
export class CardCompromissoComponent{
  dataAtual:Date = new Date();
  @Input() compromisso!: ListarCompromissoViewModel;

  transformarData(data: Date):number{
    let datePipe:DatePipe = new DatePipe('en-US')
    return Date.parse(datePipe.transform(data, 'dd/MM/YYYY')!);
  }

}



