import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../pipe/pipe.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FooterModule} from '../footer/footer.module';
import {MatStepperModule} from '@angular/material/stepper';
import { PostProperty1Component } from './post-property1.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        // SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: PostProperty1Component
            },
        ]),
        PipeModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FooterModule,
        MatIconModule,
        // NgxFileDropModule,
        MatStepperModule,
        NgMultiSelectDropDownModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatChipsModule,
        NgOtpInputModule,
        CountdownModule,

    ],
  declarations: [PostProperty1Component],
})
export class PostProperty1Module {}

