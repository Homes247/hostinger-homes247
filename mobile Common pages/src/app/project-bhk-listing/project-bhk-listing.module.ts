import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { PipeModule } from '../pipe/pipe.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {CountdownModule} from 'ngx-countdown';
import {NgOtpInputModule} from 'ng-otp-input';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import {ProjectBhkListingComponent} from './project-bhk-listing.component';
import {PhotoGalleryModule} from '@twogate/ngx-photo-gallery';
  

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProjectBhkListingComponent
            }
        ]),
        SharedModule,
        // Shared2Module,
        Shared3Module,
        NgxSkeletonLoaderModule,
        InfiniteScrollModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        NgMultiSelectDropDownModule,
        CountdownModule,
        NgOtpInputModule,
        LazyLoadImageModule.forRoot({
            preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
        }),
        PhotoGalleryModule
    ],
  exports: [
    LazyLoadImageModule
  ],
  declarations: [ProjectBhkListingComponent ]
})
export class ProjectBhkListingModule {}
