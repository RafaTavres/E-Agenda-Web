import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs";

@Injectable()

export class AuthService{
    private endpoit: string = 'https://e-agenda-web-api.onrender.com/api/conta/autenticar';

    constructor(private http: HttpClient){

    }

    public autenticar(){

        return this.http.post<any>(this.endpoit,{  
        "email": "user@test.com",
        "senha": "String0922."})
        .pipe(map((res) => res.dados.chave))
    }
}