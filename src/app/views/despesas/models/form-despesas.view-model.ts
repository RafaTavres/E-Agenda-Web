import { FormaPagamento } from "./forma-pagamento";

export class FormsDespesasViewModel {
    descricao: string;
    valor: number;
    data: Date;
    formaPagamento: FormaPagamento;
    categoriasSelecionadas:string[]
    constructor(
        descricao: string,
        valor: number,
        data: Date,
        formaPagamento: FormaPagamento,
        categoriasSelecionadas:string[]
    ){
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.formaPagamento = formaPagamento;
        this.categoriasSelecionadas = categoriasSelecionadas
    }
  }