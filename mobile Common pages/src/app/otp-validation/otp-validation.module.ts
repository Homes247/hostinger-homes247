import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { OtpValidationComponent } from './otp-validation.component';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { PipeModule } from '../pipe/pipe.module';
import { LightboxModule } from 'ngx-lightbox';
// import { AgmCoreModule } from '@agm/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
    imports: [
        CommonModule,
        LightboxModule,
        PhotoGalleryModule,
        SharedModule,
        PipeModule,
        NgOtpInputModule,
        CountdownModule,
        NgxSkeletonLoaderModule,
        MatProgressBarModule,
        BrowserModule,
        NgApexchartsModule
    ],
  declarations: [OtpValidationComponent],
  bootstrap: [OtpValidationComponent]

})
export class OtpValidationModule {
    static components = {
        lazy: OtpValidationComponent,
    };
}
