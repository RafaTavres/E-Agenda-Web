import { FormsCategoriaViewModel } from "../../categorias/models/form-categoria.view-model";
import { FormaPagamento } from "./forma-pagamento";

export class VisualizarDespesasViewModel {
    descricao: string;
    valor: number;
    data: Date;
    formaPagamento: FormaPagamento;
    categorias:FormsCategoriaViewModel[]
    constructor(
        descricao: string,
        valor: number,
        data: Date,
        formaPagamento: FormaPagamento,
        categorias:FormsCategoriaViewModel[]
    ){
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.formaPagamento = formaPagamento;
        this.categorias = categorias
    }
  }