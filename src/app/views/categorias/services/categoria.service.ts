import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { FormsCompromissoViewModel } from "../../compromissos/models/form-compromisso.view-model";
import { FormsCategoriaViewModel } from "../models/form-categoria.view-model";

@Injectable()

export class CategoriaService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/categorias/';

    constructor(private http: HttpClient,private localStorage: LocalStorageService){

    }

    public inserir(categoria: FormsCategoriaViewModel): Observable<FormsCategoriaViewModel>{
        return this.http.post<any>(this.endpoit, categoria,this.obterHeadersAutorizacao())
        .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public editar(id:string, categoria: FormsCategoriaViewModel): Observable<FormsCategoriaViewModel>{
      return this.http.put<any>(this.endpoit + id, categoria,this.obterHeadersAutorizacao())
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
      const token = this.localStorage.obterDadosLocaisUsuario()?.chave;
    
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
        };
      }
}