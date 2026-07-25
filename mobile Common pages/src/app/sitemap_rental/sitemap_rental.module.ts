import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../pipe/pipe.module';
import {SitemaprentalComponent} from './sitemap_rental.component';
import { Shared3Module } from '../shared/shared.module3';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SitemaprentalComponent
      }
    ]),
    SharedModule,
    PipeModule,
        Shared3Module,
    
  ],
  declarations: [SitemaprentalComponent]
})
export class SitemaprentalModule {
}
