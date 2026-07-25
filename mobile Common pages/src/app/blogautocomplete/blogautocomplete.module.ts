import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipe/pipe.module';
// import {MatFormFieldModule} from "@angular/material/form-field";
// import {MatInputModule} from "@angular/material/input";
// import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { BlogautocompleteComponent } from './blogautocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
    imports: [
        CommonModule,
        PipeModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatAutocompleteModule,
      AutoCompleteModule,
        FormsModule,
        ReactiveFormsModule,
  ],
  declarations: [BlogautocompleteComponent],
  bootstrap: [BlogautocompleteComponent]
  
})
export class BlogautocompleteModule {
  static components = {
    lazy: BlogautocompleteComponent,
};
}
