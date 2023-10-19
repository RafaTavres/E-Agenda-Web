import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { CoreModule } from "./core/core.module";
import { DashBoardModule } from "./views/dash-board/dash-board.module";
import { LoginModule } from "./views/login/login.module";
import { RegistroModule } from "./views/registro/registro.module";

import { httpTokenInterceptor } from "./core/auth/interceptors/http-token-interceptor";
import { AuthService } from "./core/auth/services/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    
function logarUsuarioSalvoFactory(authService : AuthService){
  return () => authService.logarUsuarioSalvo();
}



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot(
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true
      }
    ),

    
    
    DashBoardModule,
    CoreModule,
    RegistroModule,
    LoginModule
  ],
  providers: [
    {
    provide: APP_INITIALIZER,
    useFactory: logarUsuarioSalvoFactory,
    deps:[AuthService],
    multi:true,
    },
    provideHttpClient(withInterceptors([httpTokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
