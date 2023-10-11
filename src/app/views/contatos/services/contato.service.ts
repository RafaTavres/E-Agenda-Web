import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormsContatoViewModel } from "../models/form-contato.view-model";

@Injectable()

export class ContatosService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/contatos';

    constructor(private http: HttpClient){

    }

    public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel>{
        return this.http.post<any>(this.endpoit, contato,this.obterHeadersAutorizacao())
        .pipe(
          map(res => res.dados),
          catchError((err: HttpErrorResponse) =>this.processarHttpErros(err))
          )
    }

  

    public editar(id:string, contato: FormsContatoViewModel): Observable<FormsContatoViewModel>{
      return this.http.put<any>(this.endpoit + '/'+ id, contato,this.obterHeadersAutorizacao())
      .pipe(map(res => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public favoritar(id:string): Observable<FormsContatoViewModel>{
      return this.http.put<any>(this.endpoit + '/favoritos/'+ id,{},this.obterHeadersAutorizacao())
      .pipe(map(res => res),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public excluir(id:string){
      return this.http.delete<any>(this.endpoit + '/'+id,this.obterHeadersAutorizacao())
      .pipe(map(res => res),
       catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
     
    }

    public selecionarTodos(){
        return this.http.get<any>(this.endpoit, this.obterHeadersAutorizacao())
        .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodosFavoritos(){
      return this.http.get<any>(this.endpoit +'?statusFavorito=1', this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodosNaoFavoritos(){
      return this.http.get<any>(this.endpoit +'?statusFavorito=2', this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarPorId(id: string){
      return this.http.get<any>(this.endpoit + '/'+ id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarCompletoPorId(id: string){
      return this.http.get<any>(this.endpoit +'/visualizacao-completa/' + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    private processarHttpErros(err: HttpErrorResponse) {
      let mensagemErro = '';

      if (err.status == 0) {
        mensagemErro = 'Ocorreu um erro no processo de requisicao';
      }
      if (err.status == 401) {
        mensagemErro = 'O usuario nao esta autorizado. efetue o login e tente novamente';
      }

      else
        mensagemErro = err.error?.erros[0];


      return throwError(() => new Error(mensagemErro));
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