import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
// import { Shared2Module } from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';
import { PipeModule } from '../pipe/pipe.module';
import { LocalityOverviewComponent } from './locality-overview.component';
import { Shared2Module } from '../shared/shared.module2';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LocalityOverviewComponent
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
  ],
  declarations: [LocalityOverviewComponent]
})
export class LocalityOverviewModule { }
