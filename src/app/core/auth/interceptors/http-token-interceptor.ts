import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LocalStorageService } from "../services/local-storage.service";
import { NgxSpinnerService } from "ngx-spinner";

export const httpTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>,next: HttpHandlerFn) => {

    const spinner = inject(NgxSpinnerService)
    spinner.show();


    const token = inject(LocalStorageService).obterDadosLocaisUsuario()?.chave;
  
    
    const reqModificada = req.clone({
      headers: req.headers.set('Authorization',`Bearer ${token}`)
    })
    
    setTimeout(() => {spinner.hide()}, 500);
    return next(reqModificada)
  }

