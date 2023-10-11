import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule,registerLocaleData  } from '@angular/common';
import { InserirCompromissosComponent } from './inserir-compromissos/inserir-compromissos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormCompromissosComponent } from './shared/form-compromissos/form-compromissos.component';
import { CompromissoService } from './services/compromissos.service';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { EditarCompromissosComponent } from './editar-compromissos/editar-compromissos.component';
import { ExcluirCompromissosComponent } from './excluir-compromissos/excluir-compromissos.component';
import { CardCompromissoComponent } from './shared/card-compromisso/card-compromisso.component';
import localePt from '@angular/common/locales/pt';
import 'src/app/extensions/form-group.extension'
import { CompromissosRoutingModule } from './compromissos-routing.module';
import { ContatosModule } from '../contatos/contatos.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    InserirCompromissosComponent,
    FormCompromissosComponent,
    ListarCompromissosComponent,
    EditarCompromissosComponent,
    ExcluirCompromissosComponent,
    CardCompromissoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CompromissosRoutingModule,
    ContatosModule
  ],
  providers:[
    CompromissoService,
    {provide: LOCALE_ID,useValue: 'pt-BR'},
  ]
})
export class CompromissosModule { }
