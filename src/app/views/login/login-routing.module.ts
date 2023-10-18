import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from 'src/app/core/auth/guards/login.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    canActivate:[loginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
