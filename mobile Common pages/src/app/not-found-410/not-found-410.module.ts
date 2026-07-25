import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
 
import { NotFoundComponent } from './not-found-410.component';

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
export class NotFoundModule410 {}