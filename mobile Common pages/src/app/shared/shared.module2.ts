import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FooterformComponent} from "../footerform/footerform.component";
import { FooterComponent2 } from '../footer2/footer2.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    FooterformComponent,
    FooterComponent2,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FooterformComponent,
    FooterComponent2,
  ]
})
export class Shared2Module { }
