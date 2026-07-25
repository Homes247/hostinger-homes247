import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared2Module } from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';
import {CountdownModule} from "ngx-countdown";
import {NgOtpInputModule} from "ng-otp-input";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PipeModule } from '../pipe/pipe.module';
import { SeenProjetcsComponent } from './seen-projetcs.component';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SeenProjetcsComponent
      }
    ]),
          SharedModule,
    Shared2Module,
    Shared3Module,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    CountdownModule,
    NgOtpInputModule,
    MatTabsModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports:[
    LazyLoadImageModule
  ],
  declarations: [SeenProjetcsComponent],
})
export class SeenProjetcsModule {
}