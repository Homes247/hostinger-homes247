import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipe/pipe.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { BlogMatautocompleteComponent } from './blog-matautocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        PipeModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
  ],
  declarations: [BlogMatautocompleteComponent],
  bootstrap: [BlogMatautocompleteComponent]
  
})
export class BlogMatautocompleteModule {
  static components = {
    lazy: BlogMatautocompleteComponent,
};
} 