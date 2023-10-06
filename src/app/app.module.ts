import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule } from 'ngx-toastr';
import { DashBoardModule } from './views/dash-board/dash-board.module';
import { CoreModule } from './core/core.module';
import { ContatosModule } from './views/contatos/contatos.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompromissosModule } from './views/compromissos/compromissos.module';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    
@NgModule({
  declarations: [
    AppComponent
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

    
    HttpClientModule,
    DashBoardModule,
    ContatosModule,
    CompromissosModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
