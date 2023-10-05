import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { FormsCompromissoViewModel } from "../../compromissos/models/form-compromisso.view-model";

@Injectable()

export class CompromissoService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/compromissos/';

    constructor(private http: HttpClient){

    }

    public inserir(compromisso: FormsCompromissoViewModel): Observable<FormsCompromissoViewModel>{
        return this.http.post<any>(this.endpoit, compromisso,this.obterHeadersAutorizacao())
    }

    public editar(id:string, compromisso: FormsCompromissoViewModel): Observable<FormsCompromissoViewModel>{
      return this.http.put<any>(this.endpoit + id, compromisso,this.obterHeadersAutorizacao())
    }

    public excluir(id:string){
      return this.http.delete<any>(this.endpoit + id,this.obterHeadersAutorizacao())
    }

    public selecionarTodos(){
        return this.http.get<any>(this.endpoit, this.obterHeadersAutorizacao())
        .pipe(map((res) => res.dados))
    }

    public selecionarPorId(id: string){
      return this.http.get<any>(this.endpoit + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados))
    }

    public selecionarCompletoPorId(id: string){
      return this.http.get<any>(this.endpoit +'visualizacao-completa/' + id, this.obterHeadersAutorizacao())
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