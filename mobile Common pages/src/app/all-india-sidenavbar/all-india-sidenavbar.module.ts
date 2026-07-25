import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllIndiaSidenavbarComponent } from './all-india-sidenavbar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule,intersectionObserverPreset } from 'ng-lazyload-image';

@NgModule({
    imports: [
    RouterModule,
    CommonModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    LazyLoadImageModule.forRoot({
        preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
      })
  ],
  
  declarations: [ AllIndiaSidenavbarComponent,],
  bootstrap: [AllIndiaSidenavbarComponent]
  
})
export class AllIndiaSidenavbarComponentModule {
  static components = {
    lazy: AllIndiaSidenavbarComponent,
};
}