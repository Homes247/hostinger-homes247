import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { PipeModule } from '../pipe/pipe.module';
import { ApexChart2Component } from './apex-chart2.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';



@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: ApexChart2Component
      }
    ]),
    SharedModule,
    MatProgressBarModule,
    PipeModule,
    NgApexchartsModule,
    NgOtpInputModule,
    CountdownModule


  ],
  declarations: [ApexChart2Component],

})
export class ApexChart2Module {
    static components = {
        lazy: ApexChart2Component,
    };
}
