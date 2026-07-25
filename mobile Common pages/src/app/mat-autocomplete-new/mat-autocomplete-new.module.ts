import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteNewComponent } from './mat-autocomplete-new.component';
// import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
// import { MatSliderModule } from '@angular/material/slider';
import { SearchDropdownMainCityComponent } from '../search-dropdown-main-city/search-dropdown-main-city.component';
import { RangeSlideDirective } from '../range.directive';

@NgModule({
    imports: [
    CommonModule,
    // MatSelectModule,
    FormsModule,
    RouterModule,
    PipeModule,
    ReactiveFormsModule,
    // MatSliderModule
  ],
  // exports:[MatSelectModule],
  declarations: [ MatAutocompleteNewComponent,SearchDropdownMainCityComponent,RangeSlideDirective],
  bootstrap: [MatAutocompleteNewComponent]
  
})
export class MatAutocompleteNewModule {
  static components = {
    lazy: MatAutocompleteNewComponent,
};
}   