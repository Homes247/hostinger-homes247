import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
// import {NgOtpInputModule} from 'ng-otp-input';
// import {CountdownModule} from 'ngx-countdown';
import { PropertywritereviewComponent } from './propertywritereview.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
    CommonModule,
    SharedModule,
    NgOtpInputModule,
    CountdownModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [PropertywritereviewComponent],
  bootstrap: [PropertywritereviewComponent]
  
})
export class PropertywritereviewModule {
  static components = {
    lazy: PropertywritereviewComponent,
};
}