import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { ExpertDetailsComponent } from './expert-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PipeModule } from '../pipe/pipe.module';
import {NgOtpInputModule} from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: ExpertDetailsComponent
        }
    ]),
    SharedModule,
    Shared3Module,
    CarouselModule,
    PipeModule,
    NgOtpInputModule,
    CountdownModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [ExpertDetailsComponent]
})
export class ExpertDetailsModule {}
