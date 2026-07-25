import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 

import {BlogLandingComponent} from './blog-landing.component';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
    imports: [
      CommonModule,
      PipeModule,
      RouterModule.forChild([
        {
          path: '',
          component: BlogLandingComponent
        },
      ]),
     
    ],
    declarations: [BlogLandingComponent]
  })
  export class BlogLandingModule {}