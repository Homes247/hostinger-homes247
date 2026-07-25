import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ServiceFormComponent } from './service-form.component';
import { PipeModule } from '../pipe/pipe.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PipeModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    ],
  declarations: [ServiceFormComponent],
  bootstrap: [ServiceFormComponent]

})
export class serviceFormModule {
    static components = {
        lazy: ServiceFormComponent,
    };
}
