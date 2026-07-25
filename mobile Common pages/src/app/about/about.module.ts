import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
import { PipeModule } from '../pipe/pipe.module';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: AboutComponent
        }
    ]),
          SharedModule,
    Shared2Module,
    Shared3Module,
    PipeModule
  ],
  declarations: [AboutComponent,]
})
export class AboutModule {}