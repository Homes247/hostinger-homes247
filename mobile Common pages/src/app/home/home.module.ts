import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import {MatSelectModule} from "@angular/material/select";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';
import { Shared3Module } from '../shared/shared.module3';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]),
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    MatSelectModule,
    CarouselModule,
    Shared3Module,
    NgOtpInputModule,
    CountdownModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports:[
    LazyLoadImageModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
