import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared2Module } from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';
import { PipeModule } from '../pipe/pipe.module';
import { PgLocalitySitemapComponent } from './pg-locality-sitemap.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: PgLocalitySitemapComponent
            }
        ]),
        SharedModule,
        Shared2Module,
        Shared3Module,
        PipeModule
    ],
    declarations: [PgLocalitySitemapComponent]
})
export class PgLocalitySitemapModule {
}
