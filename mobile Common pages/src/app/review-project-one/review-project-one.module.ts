import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../pipe/pipe.module';
import {ReviewProjectOneComponent} from './review-project-one.component';
import {AutoCompleteModule} from '@syncfusion/ej2-angular-dropdowns';
import { NgxPaginationModule } from 'ngx-pagination';
import { Shared2Module } from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';


@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: ReviewProjectOneComponent
      }
    ]),
    SharedModule,
    AutoCompleteModule,
    NgxPaginationModule,
    Shared3Module,
    Shared2Module,
    PipeModule,
    NgOtpInputModule,
    CountdownModule
  ],
  declarations: [ReviewProjectOneComponent],

})
export class ReviewProjectOneModule {}
