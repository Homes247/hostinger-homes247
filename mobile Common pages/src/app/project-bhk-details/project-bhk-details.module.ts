import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {Shared2Module} from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';
import {PipeModule} from '../pipe/pipe.module';
import {PhotoGalleryModule} from '@twogate/ngx-photo-gallery';
import {LightboxModule} from 'ngx-lightbox';
// import {MapsAPILoader, AgmCoreModule} from '@agm/core';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgOtpInputModule} from 'ng-otp-input';
import {CountdownModule} from 'ngx-countdown';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {ChartsModule} from 'ng2-charts';
import {LazyLoadImageModule, intersectionObserverPreset} from 'ng-lazyload-image';
import {MatTabsModule} from '@angular/material/tabs';
import {ProjectBhkDetailsComponent} from './project-bhk-details.component';
  

@NgModule({
  imports: [
    CommonModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAVdleVekuxfgl1JzMFJQvguyFoySLV5Qk'
    // }),
    RouterModule.forChild([
      {
        path: '',
        component: ProjectBhkDetailsComponent
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
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    }),
    MatTabsModule
  ],
  exports: [
    CarouselModule,
    LazyLoadImageModule
  ],
  declarations: [ProjectBhkDetailsComponent ]
})
export class ProjectBhkDetailsModule {
}
