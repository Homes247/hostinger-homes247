import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Shared3Module } from '../shared/shared.module3';
import { PipeModule } from '../pipe/pipe.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { PropertyTypeComponent } from './property-type.component';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';
  

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PropertyTypeComponent
      }
    ]),
    Shared3Module,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    NgMultiSelectDropDownModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports:[
    LazyLoadImageModule
  ],
    declarations: [PropertyTypeComponent ]
  })
  export class PropertyTypeModule {}
