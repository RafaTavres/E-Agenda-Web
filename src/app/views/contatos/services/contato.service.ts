import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FormsContatoViewModel } from "../models/form-contato.view-model";

@Injectable()

export class ContatosService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/contatos/';

    constructor(private http: HttpClient){

    }

    public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel>{
        return this.http.post<any>(this.endpoit, contato,this.obterHeadersAutorizacao())
    }

    public editar(id:string, contato: FormsContatoViewModel): Observable<FormsContatoViewModel>{
      return this.http.put<any>(this.endpoit + id, contato,this.obterHeadersAutorizacao())
    }

    public selecionarTodos(){
        return this.http.get<any>(this.endpoit, this.obterHeadersAutorizacao())
        .pipe(map((res) => res.dados))
    }

    public selecionarPorId(id: string){
      return this.http.get<any>(this.endpoit + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados))
  }

    private obterHeadersAutorizacao() {
        const token = environment.apiKey;
    
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
        };
      }
}