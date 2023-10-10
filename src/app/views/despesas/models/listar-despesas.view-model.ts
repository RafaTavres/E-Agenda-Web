import { FormaPagamento } from "./forma-pagamento";

export class ListarDespesasViewModel {
    id:string;
    descricao: string;
    valor: number;
    data: Date;
    formaPagamento: FormaPagamento;
  
    constructor(
        id:string,
        descricao: string,
        valor: number,
        data: Date,
        formaPagamento: FormaPagamento,
    ){
        this.id = id
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.formaPagamento = formaPagamento;
    }
  }