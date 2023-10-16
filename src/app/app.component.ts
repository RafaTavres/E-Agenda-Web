import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './views/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  

   constructor(private authService:AuthService){
    
   }
  ngOnInit(): void {
    this.authService.autenticar().subscribe((res) =>{
      environment.apiKey = res
      console.log(environment.apiKey)
    })
  }
}
