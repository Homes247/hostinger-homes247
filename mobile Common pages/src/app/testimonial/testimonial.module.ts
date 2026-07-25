import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { PipeModule } from '../pipe/pipe.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { NgOtpInputModule } from  'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { TestimonialComponent } from './testimonial.component';
  

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: TestimonialComponent
            }
        ]),
        SharedModule,
        Shared2Module,
        Shared3Module,
        PipeModule,
        NgxSkeletonLoaderModule,
        InfiniteScrollModule,
        NgOtpInputModule,
        CountdownModule
    ],
  declarations: [TestimonialComponent ]
})
export class TestimonialModule {}