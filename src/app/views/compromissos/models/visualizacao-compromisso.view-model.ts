import { VisualizarContatoViewModel } from "../../contatos/models/visualizar-contato.view-model";

export class VisualizacaoCompromissoViewModel {
    id:string;
    assunto: string;
    local: string;
    tipoLocal : number;
    link : string ;
    data : Date;
    horaInicio : string;
    horaTermino : string ;
    contato : VisualizarContatoViewModel;
 
   constructor(
       id:string,
       assunto: string,
       local: string,
       tipoLocal : number,
       link :  string ,
       data :  Date,
       horaInicio :  string,
       horaTermino :  string ,
       contato : VisualizarContatoViewModel
   ) {
     this.id = id;
     this.assunto = assunto;
     this.local = local;
     this.tipoLocal = tipoLocal;
     this.link = link;
     this.data = data;
     this.horaInicio = horaInicio;
     this.horaTermino = horaTermino;
     this.contato = contato;
   }
 }