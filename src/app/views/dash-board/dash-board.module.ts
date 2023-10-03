import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class DashBoardModule { }
