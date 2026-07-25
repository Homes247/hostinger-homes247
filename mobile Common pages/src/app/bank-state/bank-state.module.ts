import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BankStateComponent } from './bank-state.component';
import { PipeModule } from '../pipe/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BankStateComponent
      }
    ]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    CarouselModule,
    Shared3Module,
    Shared2Module,

  ],
  declarations: [BankStateComponent]
})
export class BankStateModule { }