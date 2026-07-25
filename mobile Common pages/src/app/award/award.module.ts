import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { PipeModule } from '../pipe/pipe.module';
import { AwardComponent } from './award.component';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
  


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AwardComponent
            }
        ]),
        SharedModule,
        Shared2Module,
        Shared3Module,
       
        PipeModule,
        PhotoGalleryModule,
    ],
  declarations: [AwardComponent]
})
export class AwardModule {}
