import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedfooterComponent } from './fixedfooter.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [FixedfooterComponent],
  bootstrap: [FixedfooterComponent]
  
})
export class FixedfooterComponentModule {
  static components = {
    lazy: FixedfooterComponent,
};
}