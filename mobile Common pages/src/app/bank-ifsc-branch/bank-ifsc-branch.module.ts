import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IfscBranchComponent } from './bank-ifsc-branch.component';
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
        component: IfscBranchComponent
      }
    ]),
    SharedModule,
    Shared3Module,
    PipeModule,
    Shared2Module,
    CarouselModule,
  ],
  declarations: [IfscBranchComponent]
})
export class IfscBranchModule { }