import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { PipeModule } from '../pipe/pipe.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FooterModule} from '../footer/footer.module';
// import { NgxFileDropModule } from 'ngx-file-drop';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';

import {MatTabsModule} from '@angular/material/tabs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SellEditPropertyComponent } from './sell-edit-property.component';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SellEditPropertyComponent
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
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatAutocompleteModule,
    NgMultiSelectDropDownModule,
  ],
  declarations: [SellEditPropertyComponent]
})
export class SellEditPropertyModule {}