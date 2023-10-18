import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap,map, catchError, throwError, Observable, BehaviorSubject } from "rxjs";
import { LoginUsuarioViewModel } from "../models/login-usuario.view.model";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { UsuarioTokenViewModel } from "../models/usuario-token.view-model";
import { LocalStorageService } from "./local-storage.service";

@Injectable()

export class AuthService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/conta/';

    private usuarioAutenticado: BehaviorSubject<UsuarioTokenViewModel | undefined>;

    constructor(private http: HttpClient,private localStorage: LocalStorageService){

          this.usuarioAutenticado = new BehaviorSubject<UsuarioTokenViewModel | undefined>(undefined);

    }

    public ObterUsuarioAutenticado(){
      return this.usuarioAutenticado.asObservable();
    }

    autenticar(usuario:LoginUsuarioViewModel){

        return this.http.post<any>(this.endpoit + 'autenticar',usuario).pipe(
            map((res) => res.dados),
            tap((dados: TokenViewModel) => this.localStorage.salvarDadosLocaisUsuario(dados)),
            tap((dados: TokenViewModel) => this.notificarLogin(dados.usuarioToken)),
            catchError((err: HttpErrorResponse) =>this.processarHttpErros(err))
        )
    }

    sair(){

      return this.http.post<any>(this.endpoit + 'sair',{},this.obterHeadersAutorizacao()).pipe(
          tap(() => this.notificarLogout()),
          tap(() => this.localStorage.limparDados()),
          catchError((err: HttpErrorResponse) =>this.processarHttpErros(err))
      )
    }

    registrar(usuario:RegistrarUsuarioViewModel): Observable<TokenViewModel>{

        return this.http.post<any>(this.endpoit + 'registrar',usuario).pipe(
            map((res) => res.dados),
            tap((dados: TokenViewModel) => this.localStorage.salvarDadosLocaisUsuario(dados)),
            catchError((err: HttpErrorResponse) =>this.processarHttpErros(err))
        )
    }

    logarUsuarioSalvo(){
      const dados = this.localStorage.obterDadosLocaisUsuario();

      if(!dados)return

      const tokenValido:boolean = new Date(dados.dataExpiracao) > new Date();

      if(tokenValido)
          this.notificarLogin(dados.usuarioToken);


    }


    private notificarLogin(usuario: UsuarioTokenViewModel):void {
      this.usuarioAutenticado.next(usuario);
    }

    private notificarLogout():void {
      this.usuarioAutenticado.next(undefined);
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