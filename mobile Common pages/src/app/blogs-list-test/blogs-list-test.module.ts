import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../shared/shared.module';
// import { Shared3Module } from '../shared/shared.module3';
// import { Shared2Module } from '../shared/shared.module2';
import { PipeModule } from '../pipe/pipe.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {BlogsListTestComponent} from './blogs-list-test.component';
// import {NgxPaginationModule} from 'ngx-pagination';
// import {CarouselModule} from 'ngx-owl-carousel-o';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { CountdownModule } from 'ngx-countdown';
// import { NgOtpInputModule } from 'ng-otp-input';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MyJsonLdBlogWebStory } from '../my-json-ld/my-json-ld.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: BlogsListTestComponent
            }
        ]),
        // SharedModule,
        // Shared2Module,
        // MatFormFieldModule,
        // MatInputModule,
        MatAutocompleteModule,
        PipeModule,
        NgxSkeletonLoaderModule,
        ReactiveFormsModule,
        FormsModule,
            CarouselModule,
        
        // NgxPaginationModule,
        // CarouselModule,
        // CountdownModule,
        // NgOtpInputModule,
        LazyLoadImageModule.forRoot({
            preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
          })
    ],
    exports:[
        LazyLoadImageModule
      ],
  declarations: [BlogsListTestComponent,MyJsonLdBlogWebStory]
})
export class BlogsListTestModule {}
 