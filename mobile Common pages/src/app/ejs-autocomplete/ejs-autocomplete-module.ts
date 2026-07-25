import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjsAutocompleteComponent } from './ejs-autocomplete.component';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
    imports: [
    CommonModule,
    AutoCompleteModule
  ],
  
  declarations: [EjsAutocompleteComponent,],
  bootstrap: [EjsAutocompleteComponent]
  
})
export class EjsAutocompleteModule {
  static components = {
    lazy: EjsAutocompleteComponent,
};
}