import { DatePipe } from "@angular/common";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { FormsCompromissoViewModel } from "../../compromissos/models/form-compromisso.view-model";

@Injectable()

export class CompromissoService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/compromissos/';

    constructor(private http: HttpClient,private localStorage: LocalStorageService){

    }

    public inserir(compromisso: FormsCompromissoViewModel): Observable<FormsCompromissoViewModel>{
        return this.http.post<any>(this.endpoit, compromisso,this.obterHeadersAutorizacao())
        .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public editar(id:string, compromisso: FormsCompromissoViewModel): Observable<FormsCompromissoViewModel>{
      return this.http.put<any>(this.endpoit + id, compromisso,this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public excluir(id:string){
      return this.http.delete<any>(this.endpoit + id,this.obterHeadersAutorizacao())
      .pipe(map(res => res),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodos(){
        return this.http.get<any>(this.endpoit, this.obterHeadersAutorizacao())
        .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodosHoje(){
      return this.http.get<any>(this.endpoit + 'hoje', this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodosPassados(){
      return this.http.get<any>(this.endpoit + `passados/${this.dataAtual()}`, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarHttpErros(err)))
    }

    public selecionarTodosFuturos(){

      console.log(this.endpoit + `futuros/${this.dataAtual()}=${this.dataFutura()}`)
      return this.http.get<any>(this.endpoit + `futuros/${this.dataAtual()}=${this.dataFutura()}`, this.obterHeadersAutorizacao())
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

    dataAtual(date = new Date()) {
      const year = date.toLocaleString('default', {year: 'numeric'});
      const month = date.toLocaleString('default', {
        month: '2-digit',
      });
      const day = date.toLocaleString('default', {day: '2-digit'});
    
      return [year, month, day].join('-');
    }

    dataFutura(date = new Date()) {
      date.setFullYear(date.getFullYear() + 100);
      const year = date.toLocaleString('default', {year: 'numeric'});
      const month = date.toLocaleString('default', {
        month: '2-digit',
      });
      const day = date.toLocaleString('default', {day: '2-digit'});
    
      return [year, month, day].join('-');
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