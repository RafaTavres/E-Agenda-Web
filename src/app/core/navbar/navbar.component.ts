import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  map, Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  estaColapsada:boolean = true;

  usuarioEstaLogado$?: Observable<boolean>;

  constructor(private authService:AuthService,private router:Router)
  {}

  ngOnInit(): void {
    this.usuarioEstaLogado$ = this.authService.ObterUsuarioAutenticado().pipe(
      map((usuario) => {
        if(!usuario){
            return false
        }
          return true
      })
    )
  }

  sair(){
    this.authService.sair().subscribe(() =>{
      this.router.navigate(['/login'])
    })
  }
}
