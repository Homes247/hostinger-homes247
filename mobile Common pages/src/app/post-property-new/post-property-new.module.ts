import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';
import { PipeModule } from '../pipe/pipe.module';
// import {NgxFileDropModule} from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PostPropertyNewComponent } from './post-property-new.component';
@NgModule({
   imports: [
      CommonModule,
      // SharedModule,
      RouterModule.forChild([
         {
            path: '',
            component: PostPropertyNewComponent
         },
      ]),
      PipeModule,
      FormsModule,
      ReactiveFormsModule,

      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FooterModule,
      //    MatIconModule,

      // NgxFileDropModule,


      //    MatStepperModule,
      NgMultiSelectDropDownModule,
      MatTabsModule,
      MatAutocompleteModule,
      //    MatChipsModule,
      //    NgOtpInputModule, 
      //    CountdownModule,

   ],
   declarations: [PostPropertyNewComponent]
})
export class PostPropertyNewModule { }
