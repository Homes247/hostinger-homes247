import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IfscCityComponent } from './bank-city.component';
import { PipeModule } from '../pipe/pipe.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IfscCityComponent
      }
    ]),
    SharedModule,
    Shared3Module,
    Shared2Module,
    PipeModule,
    CarouselModule,
  ],
  declarations: [IfscCityComponent]
})
export class IfscCityModule { }