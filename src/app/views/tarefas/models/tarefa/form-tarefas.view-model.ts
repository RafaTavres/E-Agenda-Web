import { FormsItemTarefaViewModel } from "../itens/forms-item-tarefa.view-model";
import { PrioridadeTarefaEnum } from "./prioridade-tarefa-enum";

export class FormsTarefasViewModel {
    titulo: string
    dataCriacao: Date
    prioridade: PrioridadeTarefaEnum
    situacao: string
    itens:FormsItemTarefaViewModel[]
    constructor(
        titulo: string,
        dataCriacao: Date,
        prioridade: PrioridadeTarefaEnum,
        situacao: string,
        itens:FormsItemTarefaViewModel[]
    ){
        this.titulo = titulo;
        this.dataCriacao = dataCriacao;
        this.prioridade = prioridade;
        this.situacao = situacao;
        this.itens = itens
    }
  }