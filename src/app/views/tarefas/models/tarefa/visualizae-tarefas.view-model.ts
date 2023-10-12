import { FormsItemTarefaViewModel } from "../itens/forms-item-tarefa.view-model"
import { PrioridadeTarefaEnum } from "./prioridade-tarefa-enum"

export class VisualizarTarefasViewModel {
    id:string
    titulo: string
    dataCriacao: Date
    dataConclusao: Date
    quantidadeItens: number
    percentualConcluido: number
    prioridade: PrioridadeTarefaEnum
    situacao: string
    itens:FormsItemTarefaViewModel[]
    constructor(
        id:string,
        titulo: string,
        dataCriacao: Date,    
        dataConclusao: Date,
        quantidadeItens: number,
        percentualConcluido: number,
        prioridade: PrioridadeTarefaEnum,
        situacao: string,
        itens:FormsItemTarefaViewModel[]
    ){
        this.id = id;
        this.titulo = titulo;
        this.dataCriacao = dataCriacao;
        this.dataConclusao = dataConclusao;
        this.quantidadeItens = quantidadeItens;
        this.percentualConcluido = percentualConcluido;
        this.prioridade = prioridade;
        this.situacao = situacao;
        this.itens = itens;
    }
  }