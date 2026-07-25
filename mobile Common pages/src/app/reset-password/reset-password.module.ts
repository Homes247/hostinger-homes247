import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, UrlSerializer} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared2Module } from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';
import {CountdownModule} from "ngx-countdown";
import {NgOtpInputModule} from "ng-otp-input";
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResetPasswordComponent
      }
    ]),
          SharedModule,
    Shared2Module,
    Shared3Module,
    CountdownModule,
    NgOtpInputModule,
    ReactiveFormsModule,
  ],
  declarations: [ResetPasswordComponent],
})
export class ResetPasswordModule {
}
