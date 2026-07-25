import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EnquiryFormindComponent } from './enquiry-form-ind.component';
import { PipeModule } from '../pipe/pipe.module';
// import { AgmCoreModule } from '@agm/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PipeModule,
        BrowserModule,
        NgOtpInputModule,
        CountdownModule,

    ],
  declarations: [EnquiryFormindComponent],
  bootstrap: [EnquiryFormindComponent]

})
export class enquiryFormindModule {
    static components = {
        lazy: EnquiryFormindComponent,
    };
}
