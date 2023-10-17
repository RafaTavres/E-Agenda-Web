import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  

  form!: FormGroup;

  constructor(private router:Router,private toastrService: ToastrService,private formBuilder: FormBuilder,private authService:AuthService){

  }
  ngOnInit(): void {
   this.form = this.formBuilder.group({
    nome: ['',[Validators.required,Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.email]],
    senha: ['',[Validators.required,Validators.minLength(6)]],
    confirmarSenha: ['',[Validators.required,Validators.minLength(6)]]
   })
  }

  campoInvalido(nome: string){
    return this.form.get(nome)?.invalid && this.form.get(nome)?.touched;
  }

  gravar(){
    if (this.form?.invalid) {
      const erros = this.form.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    this.authService.registrar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: TokenViewModel) {
    this.toastrService.success(
      'Seja bem-vindo, ' + res.usuarioToken.nome + '!',
      'Sucesso'
    );

    this.router.navigate(['/dash-board']);
  }

  processarFalha(err: Error) {
    this.toastrService.error(err.message, 'Erro');
  }
}

