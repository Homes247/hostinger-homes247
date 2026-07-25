import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyFloorplansComponent } from './property-floorplans.component';
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
              component: PropertyFloorplansComponent
            }
          ]),
        SharedModule,
        Shared3Module,
        PipeModule,
        PhotoGalleryModule,

    ],
  declarations: [PropertyFloorplansComponent],
  bootstrap: [PropertyFloorplansComponent]

})
export class PropertyFloorplanModule {
    static components = {
        lazy: PropertyFloorplansComponent,
    };
}
