import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
 
import { PipeModule } from '../pipe/pipe.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FooterModule} from '../footer/footer.module';
// import {NgxFileDropModule} from 'ngx-file-drop';
import {MatStepperModule} from '@angular/material/stepper';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
// import {AngularFullpageModule} from '@fullpage/angular-fullpage';
import {PostLanding2Component} from './post-landing2.component';

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild([
        {
          path: '',
          component: PostLanding2Component
        },
      ]),
      PipeModule,
      NgxSkeletonLoaderModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FooterModule,
      // NgxFileDropModule,
      MatStepperModule,
      NgMultiSelectDropDownModule,
      MatTabsModule,
      MatIconModule,
      MatAutocompleteModule,
      MatChipsModule,
      // AngularFullpageModule
    ],
    declarations: [PostLanding2Component]
  })
  export class PostLanding2Module {}