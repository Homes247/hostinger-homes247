import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class blogdetailsmodule { }
