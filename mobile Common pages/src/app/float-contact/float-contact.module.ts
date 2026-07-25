import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatContactComponent } from './float-contact.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [FloatContactComponent],
  bootstrap: [FloatContactComponent]
  
})
export class FloatContactComponentModule {
  static components = {
    lazy: FloatContactComponent,
};
}