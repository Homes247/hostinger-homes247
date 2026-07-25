import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared2Module } from '../shared/shared.module2';
import { PropDetailsComponent } from './prop-details.component';
import { PipeModule } from '../pipe/pipe.module';
import {PhotoGalleryModule} from '@twogate/ngx-photo-gallery';
import { LightboxModule } from 'ngx-lightbox';
// import { MapsAPILoader,AgmCoreModule } from '@agm/core';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgOtpInputModule} from "ng-otp-input";
import {CountdownModule} from "ngx-countdown";
// import { MyJsonLdComponent } from '../my-json-ld/my-json-ld.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {ChartsModule} from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';
import { Shared3Module } from '../shared/shared.module3';

@NgModule({
  imports: [
    CommonModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAVdleVekuxfgl1JzMFJQvguyFoySLV5Qk'
    // }),
    RouterModule.forChild([
      {
        path: '',
        component: PropDetailsComponent
      }
    ]),
    LightboxModule,
    PhotoGalleryModule,
    SharedModule,
    Shared2Module,
    Shared3Module,
    PipeModule,
    NgxSkeletonLoaderModule,
    NgOtpInputModule,
    CountdownModule,
    CarouselModule,
    ChartsModule,
    MatInputModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports:[
    CarouselModule,
    LazyLoadImageModule
  ],
  declarations: [PropDetailsComponent]
})
export class PropDetailsModule {}
