import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared2Module } from '../shared/shared.module2';
import { Shared3Module } from '../shared/shared.module3';
import {PipeModule} from '../pipe/pipe.module';
import {SitemapblogsComponent} from './sitemap_blogs.component';

  

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SitemapblogsComponent
      }
    ]),
          SharedModule,
    Shared2Module,
    Shared3Module,
    PipeModule
  ],
  declarations: [SitemapblogsComponent ]
})
export class SitemapblogsModule {
}
