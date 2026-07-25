import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../pipe/pipe.module';
// import { PropertyseenprojectsComponent } from './propertyseenprojects.component';
import { PropertywishlistComponent } from './propertywishlist.component';

@NgModule({
    imports: [
    CommonModule,
    SharedModule,
    PipeModule
  ],
  declarations: [PropertywishlistComponent],
  bootstrap: [PropertywishlistComponent]
  
})
export class PropertywishlistsModule {
  static components = {
    lazy: PropertywishlistComponent,
};
}