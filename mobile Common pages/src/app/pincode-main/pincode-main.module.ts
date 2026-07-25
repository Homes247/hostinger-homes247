import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {PincodeMainComponent} from './pincode-main.component';
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
        component: PincodeMainComponent
      }
    ]),
    SharedModule,
    Shared2Module,
    Shared3Module,
    PipeModule,
    CarouselModule,

    // SearchDropdownComponent

  ],
  declarations: [PincodeMainComponent],

})
export class PincodModule {
}
