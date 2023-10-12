import { PrioridadeTarefaEnum } from "./prioridade-tarefa-enum"

export class ListarTarefasViewModel {
    id:string
    titulo: string
    dataCriacao: Date
    prioridade: PrioridadeTarefaEnum
    situacao: string
    constructor(
        id:string,
        titulo: string,
        dataCriacao: Date,
        prioridade: PrioridadeTarefaEnum,
        situacao: string,
    ){
        this.id = id;
        this.titulo = titulo;
        this.dataCriacao = dataCriacao;
        this.prioridade = prioridade;
        this.situacao = situacao;
    }
  }