import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {UserBlogsComponent} from "./user-blogs.component";
import {FooterModule} from "../footer/footer.module";
import {NgOtpInputModule} from 'ng-otp-input';
import {CountdownModule} from 'ngx-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from '../pipe/pipe.module';
import {MatTabsModule} from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';




// import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    // Ng2SearchPipeModule,

    RouterModule.forChild([
      {
        path: '',
        component: UserBlogsComponent
      }
    ]),
    SharedModule,
    FooterModule,
    NgOtpInputModule,
    PipeModule,
    MatTabsModule,
    NgxPaginationModule,



    CountdownModule
  ],
  declarations: [UserBlogsComponent]
})
export class UserBlogsModule {}
