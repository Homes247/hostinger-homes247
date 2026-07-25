import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { InnerHeaderNewComponent } from '../inner-header-new/inner-header-new.component';
// import { MatSelectModule } from '@angular/material/select';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [
    InnerHeaderNewComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  exports: [
    InnerHeaderNewComponent,
  ]
})
export class InnerHeaderNewSharedModule { }
