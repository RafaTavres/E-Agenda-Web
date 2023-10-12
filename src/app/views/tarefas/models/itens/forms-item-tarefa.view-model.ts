import { StatusItemTarefa } from "./status-item-tarefa-enum"
import { Guid } from 'guid-typescript';

export class FormsItemTarefaViewModel{
        id:	Guid
        titulo: string
        status:	StatusItemTarefa
        concluido:	boolean

        constructor( 
            id:	Guid,
            titulo: string,
            status:	StatusItemTarefa,
            concluido:	boolean
            )
        {  
            this.id = id
            this.titulo = titulo
            this.status = status
            this.concluido = concluido
        }
}
