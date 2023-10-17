import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!:FormGroup

  constructor(private toastrService: ToastrService,private router:Router, private formBuilder: FormBuilder,private authService:AuthService){

  }
  ngOnInit(): void {
   this.form = this.formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    senha: ['',[Validators.required,Validators.minLength(6)]]
   })
  }
  
  campoInvalido(nome: string){
    return this.form.get(nome)?.invalid && this.form.get(nome)?.touched;
  }

  login(){
    if (this.form?.invalid) {
      const erros = this.form.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    this.authService.autenticar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
   }
 
   processarSucesso(res: TokenViewModel) {
    this.toastrService.success(
      'Seja bem-vindo, ' + res.usuarioToken.nome + '!',
      'Sucesso'
    );

    this.router.navigate(['/dashboard']);
  }

  processarFalha(err: Error) {
    this.toastrService.error(err.message, 'Erro');
  }
}
