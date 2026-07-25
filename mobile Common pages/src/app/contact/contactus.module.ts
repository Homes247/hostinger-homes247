import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { ContactComponent } from './contact.component';
import {CountdownModule} from "ngx-countdown";
import {NgOtpInputModule} from "ng-otp-input";
  

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactComponent
      }
    ]),
          SharedModule,
    Shared2Module,
    Shared3Module,
    CountdownModule,
    NgOtpInputModule
  ],
  declarations: [ContactComponent ]
})
export class ContactModule {}
