import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { PdfgenerateComponent } from './pdfgenerate.component';
import { PipeModule } from '../pipe/pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PdfgenerateComponent
      }
    ]),
    PipeModule,
    SharedModule,
  ],
  exports: [
    PdfgenerateComponent
  ],
  declarations: [PdfgenerateComponent]
})
  export class PdfgenerateModule {}
