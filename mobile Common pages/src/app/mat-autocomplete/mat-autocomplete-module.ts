import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteComponentss } from './mat-autocomplete.component';
// import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
    imports: [
    CommonModule,
    // MatSelectModule,
    FormsModule,
    RouterModule,
    PipeModule,
    ReactiveFormsModule,
  ],
  // exports:[MatSelectModule],
  declarations: [ MatAutocompleteComponentss],
  bootstrap: [MatAutocompleteComponentss]
  
})
export class MatAutocompleteModuless {
  static components = {
    lazy: MatAutocompleteComponentss,
};
}   