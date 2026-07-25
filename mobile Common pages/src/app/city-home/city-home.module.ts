import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared2Module } from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';
import { CityHomeComponent } from './city-home.component';
import { PipeModule } from '../pipe/pipe.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: CityHomeComponent
            }
        ]),
        SharedModule,
        Shared2Module,
        Shared3Module,
        PipeModule,
        NgxSkeletonLoaderModule,
        InfiniteScrollModule,
        NgOtpInputModule,
        CountdownModule,
        MatTabsModule,
    ],
    declarations: [CityHomeComponent]
})
export class CityHomeModule { }