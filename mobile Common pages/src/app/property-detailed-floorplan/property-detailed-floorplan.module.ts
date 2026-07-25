import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyDetailedFloorplanComponent } from './property-detailed-floorplan.component';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { Shared3Module } from '../shared/shared.module3';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
              path: '',
              component: PropertyDetailedFloorplanComponent
            }
          ]),
        SharedModule,
        PipeModule,
    PhotoGalleryModule,
    Shared3Module,

    ],
  declarations: [PropertyDetailedFloorplanComponent],
  bootstrap: [PropertyDetailedFloorplanComponent]

})
export class PropertyDetailedFloorplanModule {
    static components = {
        lazy: PropertyDetailedFloorplanComponent,
    };
}
