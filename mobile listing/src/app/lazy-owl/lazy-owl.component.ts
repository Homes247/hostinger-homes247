import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-lazy-owl',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  template: `
    <owl-carousel-o [options]="options" (changed)="onChange($event)">
      @for (image of images | slice:0:5; track $index) {
        <ng-template carouselSlide>
          <ng-content></ng-content>
          <a [href]="linkBase" target="_blank">
            <img [src]="imgBase + image.name + '?width=280&height=221'"
                 width="280" height="221" decoding="async" loading="lazy"
                 alt="Property Image">
          </a>
        </ng-template>
      }
    </owl-carousel-o>
  `
})
export class LazyOwlComponent {
  @Input() images: any[] = [];
  @Input() options: any = {};
  @Input() imgBase: string = '';
  @Input() linkBase: string = '';
  @Output() changed = new EventEmitter<number>();
  onChange(e: any) { this.changed.emit(e.startPosition + 1); }
}