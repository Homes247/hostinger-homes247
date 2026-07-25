import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { PipeModule } from '../pipe/pipe.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {PhotoGalleryModule} from '@twogate/ngx-photo-gallery';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { NgOtpInputModule } from  'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExpertBlogDetailsComponent } from './expert-blog-details.component';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ExpertBlogDetailsComponent
      }
    ]),
          SharedModule,
    Shared2Module,
    Shared3Module,
    PipeModule,
    CarouselModule,
    CountdownModule,
    MatFormFieldModule,
    PhotoGalleryModule,
    MatInputModule,
    NgOtpInputModule,
    MatAutocompleteModule,
    NgxSkeletonLoaderModule,
    NgxPaginationModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports:[
    LazyLoadImageModule
  ],
  declarations: [ExpertBlogDetailsComponent]
})
export class ExpertDetailsModule {}
