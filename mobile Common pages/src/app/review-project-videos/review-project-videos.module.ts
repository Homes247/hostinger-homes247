import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { PipeModule } from '../pipe/pipe.module';
import { ReviewProjectVideosComponent } from './review-project-videos.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';


@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: ReviewProjectVideosComponent
      }
    ]),
    SharedModule,
    NgxPaginationModule,
    MatProgressBarModule,
    Shared3Module,
    Shared2Module,
    PipeModule

  ],
  declarations: [ReviewProjectVideosComponent],

})
export class ReviewProjectVideosModule {}
