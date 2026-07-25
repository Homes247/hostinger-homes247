import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
 
import { PipeModule } from '../pipe/pipe.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ApexChart1Component } from './apex-chart1.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgApexchartsModule } from 'ng-apexcharts';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ApexChart1Component
      }
    ]),
    SharedModule,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    NgOtpInputModule,
    CountdownModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgMultiSelectDropDownModule,
    MatProgressBarModule,
    NgApexchartsModule,
  ],
  declarations: [ApexChart1Component]
})
export class ApexChart1Module { 
    static components = {
        lazy: ApexChart1Component,
    };
}
