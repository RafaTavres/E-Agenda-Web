import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormsTarefasViewModel } from "../models/tarefa/form-tarefas.view-model";

@Injectable()

export class TarefasService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/tarefas/';

    constructor(private http: HttpClient){

    }

    public inserir(tarefa: FormsTarefasViewModel): Observable<FormsTarefasViewModel>{
        return this.http.post<any>(this.endpoit, tarefa,this.obterHeadersAutorizacao())
        .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public editar(id:string, tarefa: FormsTarefasViewModel): Observable<FormsTarefasViewModel>{
      return this.http.put<any>(this.endpoit + id, tarefa,this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public excluir(id:string){
      return this.http.delete<any>(this.endpoit + id,this.obterHeadersAutorizacao())
      .pipe(map((res) => res),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodos(){
        return this.http.get<any>(this.endpoit, this.obterHeadersAutorizacao())
        .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarPorId(id: string){
      return this.http.get<any>(this.endpoit + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarCompletoPorId(id: string){
      return this.http.get<any>(this.endpoit +'visualizacao-completa/' + id, this.obterHeadersAutorizacao())
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