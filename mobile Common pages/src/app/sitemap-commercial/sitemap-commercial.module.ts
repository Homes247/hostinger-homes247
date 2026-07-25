import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../pipe/pipe.module';
import { SitemapCommercialComponent } from './sitemap-commercial.component';
import { Shared3Module } from '../shared/shared.module3';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: SitemapCommercialComponent
            }
        ]),
        SharedModule,
        PipeModule,
        Shared3Module,

    ],
    declarations: [SitemapCommercialComponent]
})
export class SitemapCommercialModule {
}
