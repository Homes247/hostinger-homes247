import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { PipeModule } from '../pipe/pipe.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CountdownModule} from "ngx-countdown";
import {NgOtpInputModule} from "ng-otp-input";
import { PropertyTypeLocalityComponent } from './property-type-locality.component';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';
import { MyJsonLdComponenttypewithlocality } from '../my-json-ld/my-json-ld.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PropertyTypeLocalityComponent
      }
    ]),
          SharedModule,
    Shared3Module,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    CountdownModule,
    NgOtpInputModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports:[
    LazyLoadImageModule
  ],
  declarations: [PropertyTypeLocalityComponent,MyJsonLdComponenttypewithlocality ]
})
export class PropertyTypeLocalityModule {}
