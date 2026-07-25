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
import { SellPropertiesComponent } from './sell-properties.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';
import { ClipboardModule } from '@angular/cdk/clipboard';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SellPropertiesComponent
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
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    ClipboardModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports:[
    LazyLoadImageModule
  ],
  declarations: [SellPropertiesComponent],
})
export class SellPropertiesModule {
}