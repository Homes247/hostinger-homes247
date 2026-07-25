import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyDisscussionDetailedComponent } from './property-disscussion-detailed.component';
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
              component: PropertyDisscussionDetailedComponent
            }
          ]),
        SharedModule,
        PipeModule,
        Shared3Module,
        NgOtpInputModule,
        CountdownModule,
    ],
  declarations: [PropertyDisscussionDetailedComponent],
  bootstrap: [PropertyDisscussionDetailedComponent]

})
export class PropertyDisscussionDetailedModule {
    static components = {
        lazy: PropertyDisscussionDetailedComponent,
    };
}
