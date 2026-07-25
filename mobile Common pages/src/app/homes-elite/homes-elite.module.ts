import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
// import { Shared2Module } from '../shared/shared.module2';
import { PipeModule } from '../pipe/pipe.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HomesEliteComponent } from '../homes-elite/homes-elite.component';

import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';
// import { Testing } from '../Performance/testing';
import { MatSelectModule } from '@angular/material/select';
// import { AllIndiaLinksComponent } from '../all-india-links/all-india-links.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CountdownModule } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomesEliteComponent
      }
    ]),
    // SharedModule,
    // Shared2Module,
    // Testing,
    CarouselModule,
    NgOtpInputModule,
    CountdownModule,
    Shared3Module,
    MatSelectModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports:[
    LazyLoadImageModule
  ],
  declarations: [HomesEliteComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomesEliteModule {

}