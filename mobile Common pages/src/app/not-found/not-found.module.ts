import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: NotFoundComponent
        }
    ]),
    SharedModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule {}