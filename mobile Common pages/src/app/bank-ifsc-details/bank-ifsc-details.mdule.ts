import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BankIfscDetailsComponent } from './bank-ifsc-details.component';
import { PipeModule } from '../pipe/pipe.module';
import { ClipboardModule } from 'ngx-clipboard';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Shared3Module } from '../shared/shared.module3';
import { Shared2Module } from '../shared/shared.module2';
// import { SearchDropdown } from '../search-dropdown/search-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BankIfscDetailsComponent
      }
    ]),
    SharedModule,
    Shared3Module,
    Shared2Module,
    PipeModule,
    ClipboardModule,
    CarouselModule,
  ],
  declarations: [BankIfscDetailsComponent]
})
export class IfscDetailsModule { }