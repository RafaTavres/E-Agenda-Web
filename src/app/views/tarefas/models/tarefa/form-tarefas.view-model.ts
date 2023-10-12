import { PrioridadeTarefaEnum } from "./prioridade-tarefa-enum";

export class FormsTarefasViewModel {
    titulo: string
    dataCriacao: Date
    prioridade: PrioridadeTarefaEnum
    situacao: string
    constructor(
        titulo: string,
        dataCriacao: Date,
        prioridade: PrioridadeTarefaEnum,
        situacao: string,
    ){
        this.titulo = titulo;
        this.dataCriacao = dataCriacao;
        this.prioridade = prioridade;
        this.situacao = situacao;
    }
  }