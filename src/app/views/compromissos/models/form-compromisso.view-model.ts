import { Time } from "@angular/common";

export class FormsCompromissoViewModel {
     assunto: string;
     local: string;
     tipoLocal : number;
     link : string ;
     data : Date;
     horaInicio : string;
     horaTermino : string ;
     contatoId : string;
  
    constructor(
        assunto: string,
        local: string,
        tipoLocal : number,
        link :  string ,
        data :  Date,
        horaInicio :  string,
        horaTermino :  string ,
        contatoId :  string,
    ) {
      this.assunto = assunto;
      this.local = local;
      this.tipoLocal = tipoLocal;
      this.link = link;
      this.data = data;
      this.horaInicio = horaInicio;
      this.horaTermino = horaTermino;
      this.contatoId = contatoId;
    }
  }