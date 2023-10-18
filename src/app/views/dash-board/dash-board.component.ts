import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsuarioTokenViewModel } from 'src/app/core/auth/models/usuario-token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit{


  usuario$?:Observable< UsuarioTokenViewModel | undefined>;

  subscription?: Subscription

  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
    this.usuario$ = this.authService.ObterUsuarioAutenticado();
  }
  
}
