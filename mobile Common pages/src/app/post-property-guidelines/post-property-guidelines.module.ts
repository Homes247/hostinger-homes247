import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
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
import {PostPropertyGuidelinesComponent} from './post-property-guidelines.component';

@NgModule({
  imports: [
    CommonModule,
          SharedModule,
    Shared2Module,
    Shared3Module,
    RouterModule.forChild([
      {
        path: '',
        component: PostPropertyGuidelinesComponent
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
  ],
  declarations: [PostPropertyGuidelinesComponent]
})
export class PostPropertyGuidelinesModule {}
