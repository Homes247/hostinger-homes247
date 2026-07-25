import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyBrochureFloorplansComponent } from './property-brochure-floorplans.component';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Shared3Module } from '../shared/shared.module3';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
              path: '',
              component: PropertyBrochureFloorplansComponent
            }
          ]),
        SharedModule,
        PipeModule,
    PhotoGalleryModule,
    CarouselModule,
    Shared3Module,
    ],
  declarations: [PropertyBrochureFloorplansComponent],
  bootstrap: [PropertyBrochureFloorplansComponent]

})
export class PropertyBrochureFloorplansModule {
    static components = {
        lazy: PropertyBrochureFloorplansComponent,
    };
}
