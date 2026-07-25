import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';


import { OtpLoginNewComponent } from './otp-login-new.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: OtpLoginNewComponent
            }
        ]),
        CountdownModule,
        NgOtpInputModule,
    ],
    declarations: [OtpLoginNewComponent],


})
export class OtpLoginNewModule {
    static components = {
        lazy: OtpLoginNewComponent,
    };
}