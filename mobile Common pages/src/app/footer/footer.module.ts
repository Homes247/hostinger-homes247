import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
    imports: [
    CommonModule,
    PipeModule
  ],
  declarations: [FooterComponent],
  bootstrap: [FooterComponent]
  
})
export class FooterModule {
  static components = {
    lazy: FooterComponent,
};
}