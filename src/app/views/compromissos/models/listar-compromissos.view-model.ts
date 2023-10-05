
export class ListarCompromissoViewModel {
     id:string;
     assunto: string;
     local: string;
     tipoLocal : number;
     link : string ;
     data : Date;
     horaInicio : string;
     horaTermino : string ;
     contatoId:string;
     nomeContato : string;
  
    constructor(
        id:string,
        assunto: string,
        local: string,
        tipoLocal : number,
        link :  string ,
        data :  Date,
        horaInicio :  string,
        horaTermino :  string ,
        contatoId:string,
        nomeContato :  string,
    ) {
      this.id = id;
      this.assunto = assunto;
      this.local = local;
      this.tipoLocal = tipoLocal;
      this.link = link;
      this.data = data;
      this.horaInicio = horaInicio;
      this.horaTermino = horaTermino;
      this.contatoId = contatoId;
      this.nomeContato = nomeContato;
    }
  }