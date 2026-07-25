import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {PinCode2Component} from './pin-code2.component';
import { PipeModule } from '../pipe/pipe.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';


@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: PinCode2Component
      }
    ]),
    SharedModule,
    Shared2Module,

    Shared3Module,

    PipeModule,
    CarouselModule,


  ],
  declarations: [PinCode2Component],

})
export class Pincode2Module {
}
