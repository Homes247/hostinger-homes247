import { Shared3Module } from './../shared/shared.module3';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyDisscussionMainComponent } from './property-disscussion-main.component';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
              path: '',
              component: PropertyDisscussionMainComponent
            }
          ]),
        SharedModule,
        Shared3Module,
        NgOtpInputModule,
        PipeModule,
        CountdownModule,

    ],
  declarations: [PropertyDisscussionMainComponent],
  bootstrap: [PropertyDisscussionMainComponent]

})
export class PropertyDisscussionMainModule {
    static components = {
        lazy: PropertyDisscussionMainComponent,
    };
}
