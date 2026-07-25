import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../pipe/pipe.module';
import {ReviewLocalityOneComponent} from './review-locality-one.component';
import {AutoCompleteModule} from '@syncfusion/ej2-angular-dropdowns';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { CountdownModule } from 'ngx-countdown';






@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: ReviewLocalityOneComponent
      }
    ]),
    SharedModule,
    AutoCompleteModule,
    PipeModule,
    MatProgressBarModule,
    NgOtpInputModule,
    // NgApexchartsModule,
    Shared3Module,
    Shared2Module,
    CountdownModule
    // NgApexchartsModule



  ],
  declarations: [ReviewLocalityOneComponent],

})
export class ReviewLocalityOneModule {}
