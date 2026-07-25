import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyLocationComponent } from './property-location.component';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { Shared3Module } from '../shared/shared.module3';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
              path: '',
              component: PropertyLocationComponent
            }
          ]),
        SharedModule,
        Shared3Module,
        PipeModule,
    ],
  declarations: [PropertyLocationComponent],
  bootstrap: [PropertyLocationComponent]

})
export class PropertyLocationModule {
    static components = {
        lazy: PropertyLocationComponent,
    };
}
