import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { FormsDespesasViewModel } from "../models/form-despesas.view-model";

@Injectable()

export class DespesasService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/despesas/';

    constructor(private http: HttpClient,private localStorage: LocalStorageService){

    }

    public inserir(despesa: FormsDespesasViewModel): Observable<FormsDespesasViewModel>{
        return this.http.post<any>(this.endpoit, despesa )
        .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public editar(id:string, despesa: FormsDespesasViewModel): Observable<FormsDespesasViewModel>{
      return this.http.put<any>(this.endpoit + id, despesa )
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public excluir(id:string){
      return this.http.delete<any>(this.endpoit + id )
      .pipe(map((res) => res),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodos(){
        return this.http.get<any>(this.endpoit )
        .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodosAntigas(){
      return this.http.get<any>(this.endpoit + 'antigas' )
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    } 

    public selecionarTodosUltimos30Dias(){
      return this.http.get<any>(this.endpoit + 'ultimos-30-dias' )
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    } 

    public selecionarPorId(id: string){
      return this.http.get<any>(this.endpoit + id )
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarCompletoPorId(id: string){
      return this.http.get<any>(this.endpoit +'visualizacao-completa/' + id )
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

    
   
}