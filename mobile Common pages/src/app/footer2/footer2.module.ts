import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent2 } from './footer2.component';

@NgModule({
    imports: [
    CommonModule
  ],
  declarations: [FooterComponent2],
  bootstrap: [FooterComponent2]
  
})
export class FooterModule {
  static components = {
    lazy: FooterComponent2,
};
}