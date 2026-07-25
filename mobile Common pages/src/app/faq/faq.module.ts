import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { FaqComponent } from './faq.component';
  

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: FaqComponent
        }
    ]),
       SharedModule,
    Shared2Module,
    Shared3Module
  ],
  declarations: [FaqComponent ]
})
export class FaqModule {}