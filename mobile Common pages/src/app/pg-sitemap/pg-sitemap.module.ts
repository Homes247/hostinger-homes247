import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../pipe/pipe.module';
import { PgSitemapComponent } from './pg-sitemap.component';
import { Shared3Module } from '../shared/shared.module3';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: PgSitemapComponent
            }
        ]),
        SharedModule,
        PipeModule,
        Shared3Module,

    ],
    declarations: [PgSitemapComponent]
})
export class PgSitemapModule {
}
