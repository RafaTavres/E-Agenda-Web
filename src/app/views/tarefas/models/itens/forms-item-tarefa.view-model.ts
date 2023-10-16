import { StatusItemTarefa } from "./status-item-tarefa-enum"

export class FormsItemTarefaViewModel{
        id:	string
        titulo: string
        status:	StatusItemTarefa
        concluido:	boolean
        situacao: any
        constructor( 
            id:	string,
            titulo: string,
            status:	StatusItemTarefa,
            concluido:	boolean,
            situacao: any
            )
        {  
            this.id = id
            this.titulo = titulo
            this.status = status
            this.concluido = concluido
            this.situacao = situacao
        }
}
