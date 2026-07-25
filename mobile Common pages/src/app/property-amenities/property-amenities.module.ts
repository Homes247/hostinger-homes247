import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyAmenitiesComponent } from './property-amenities.component';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
// import { Shared2Module } from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
              path: '',
              component: PropertyAmenitiesComponent
            }
          ]),
        SharedModule,
        Shared3Module,
        PipeModule,
        
    ],
  declarations: [PropertyAmenitiesComponent],
  bootstrap: [PropertyAmenitiesComponent]

})
export class PropertyAmenitiesModule {
    static components = {
        lazy: PropertyAmenitiesComponent,
    };
}
