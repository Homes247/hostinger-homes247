import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PipeModule } from '../pipe/pipe.module';

const routes: Routes = [];

@NgModule({
    declarations: [
      ],
      imports: [
        // PipeModule,
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

export class propdetailssharedModule { }