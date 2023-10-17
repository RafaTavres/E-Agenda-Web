import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/auth/services/auth.service';
import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroRoutingModule } from './registro-routing.module';
import 'src/app/extensions/form-group.extension'

@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService]

})
export class RegistroModule { }
