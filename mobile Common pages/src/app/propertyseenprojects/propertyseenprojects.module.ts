import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../pipe/pipe.module';
import { PropertyseenprojectsComponent } from './propertyseenprojects.component';

@NgModule({
    imports: [
    CommonModule,
    SharedModule,
    PipeModule
  ],
  declarations: [PropertyseenprojectsComponent],
  bootstrap: [PropertyseenprojectsComponent]
  
})
export class PropertyseenprojectsModule {
  static components = {
    lazy: PropertyseenprojectsComponent,
};
}