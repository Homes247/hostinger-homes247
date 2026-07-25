import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PropertyGalleryComponent } from './property-gallery.component';
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
              component: PropertyGalleryComponent
            }
          ]),
        SharedModule,
        Shared3Module,

        PipeModule,
    PhotoGalleryModule,

    ],
  declarations: [PropertyGalleryComponent],
  bootstrap: [PropertyGalleryComponent]

})
export class PropertyGallerynModule {
    static components = {
        lazy: PropertyGalleryComponent,
    };
}
