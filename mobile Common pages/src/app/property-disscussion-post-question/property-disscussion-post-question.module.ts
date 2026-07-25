import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyDisscussionPostQuestionComponent } from './property-disscussion-post-question.component';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { Shared3Module } from '../shared/shared.module3';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
              path: '',
              component: PropertyDisscussionPostQuestionComponent
            }
          ]),
        SharedModule,
        PipeModule,
        Shared3Module,
        NgOtpInputModule,
        CountdownModule,
    ],
  declarations: [PropertyDisscussionPostQuestionComponent],
  bootstrap: [PropertyDisscussionPostQuestionComponent]

})
export class PropertyDisscussionPostQuestionModule {
    static components = {
        lazy: PropertyDisscussionPostQuestionComponent,
    };
}
