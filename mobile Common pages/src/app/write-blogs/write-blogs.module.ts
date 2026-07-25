import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {WriteBlogsComponent} from "./write-blogs.component";
import {FooterModule} from "../footer/footer.module";
import {NgOtpInputModule} from 'ng-otp-input';
import {CountdownModule} from 'ngx-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from '../pipe/pipe.module';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatInputModule,
    // Ng2SearchPipeModule,

    RouterModule.forChild([
      {
        path: '',
        component: WriteBlogsComponent
      }
    ]),
    SharedModule,
    PipeModule,
    FooterModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    FormsModule,

    CountdownModule
  ],
  declarations: [WriteBlogsComponent]
})
export class WriteBlogsModule {}
