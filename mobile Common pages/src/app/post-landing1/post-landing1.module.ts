import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {PostLanding1Component} from './post-landing1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild([
        {
          path: '',
          component: PostLanding1Component
        },
      ]),
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [PostLanding1Component]
  })
  export class PostLanding1Module {}