import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap,map, catchError, throwError, Observable } from "rxjs";
import { LoginUsuarioViewModel } from "../models/login-usuario.view.model";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { LocalStorageService } from "./local-storage.service";

@Injectable()

export class AuthService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/conta/';

    constructor(private http: HttpClient,private localStorage: LocalStorageService){

    }

    public autenticar(usuario:LoginUsuarioViewModel){

        return this.http.post<any>(this.endpoit + 'autentuicar',usuario).pipe(
            map((res) => res.dados),
            tap((dados: TokenViewModel) => this.localStorage.salvarDadosLocaisUsuario(dados)),
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