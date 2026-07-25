import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { SharedModule } from '../shared/shared.module';
// import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FooterModule } from '../footer/footer.module';
import { PostPropertyNewEditComponent } from './post-property-new-edit.component';
// import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { MatTabsModule } from '@angular/material/tabs';
// import {MatIconModule} from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import {MatChipsModule} from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: PostPropertyNewEditComponent
            },
        ]),
        PipeModule,
        // NgxSkeletonLoaderModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FooterModule,
        MatStepperModule,
        // NgMultiSelectDropDownModule,
        MatTabsModule,
        // MatIconModule,
        MatAutocompleteModule,
        // MatChipsModule,
        NgOtpInputModule,
        CountdownModule,
        ReactiveFormsModule,
        HttpClientModule,

    ],
    declarations: [PostPropertyNewEditComponent]
})
export class PostPropertyNewEditModule { }
