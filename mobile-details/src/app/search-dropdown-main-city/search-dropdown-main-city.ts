import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  Inject,
  OnChanges
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SafeStorageService } from '../safe-storage.service';


declare var $: any;

@Component({
  selector: 'app-search-dropdown-main-city',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterModule],
  templateUrl: './search-dropdown-main-city.html',
  styleUrl: './search-dropdown-main-city.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchDropdownMainCity),
      multi: true,
    },
  ],
})
export class SearchDropdownMainCity implements ControlValueAccessor, OnChanges {
  list = [];
  temp_list = [];
  keyword = '';
  _img: any;
  _label: any;
  _uid: any;

  @Output() afterChange = new EventEmitter();
  @ViewChild('input') input: ElementRef;

  @Input('size') size;
  @Input('items') set items(value) {
    this.list = value;
    this.temp_list = value;
  }
  @Input('img') img;
  @Input('label') label;
  @Input('uid') uid;

  onChange: any = () => { };
  onTouch: any = () => { };
  value: any = 'Search City';
  shown = false;
  private routeSub: Subscription;

  constructor(
    private ele: ElementRef,
    private storage: SafeStorageService,
    private activeroute: ActivatedRoute
  ) { }

  ngOnChanges() {
    this._label = typeof this.label !== 'undefined' && this.label !== '' ? this.label : 'name';
    this._img = typeof this.img !== 'undefined' && this.img !== '' ? this.img : 'img';
    this._uid = typeof this.uid !== 'undefined' && this.uid !== '' ? this.uid : 'id';
    this.ValuePAssing();
  }

  ValuePAssing() {
    var CityName = this.storage.getItem('CityName');
    this.value == null // Kept exactly as provided in original code
    if (CityName == null) {
      this.value = 'Search City';
    } else {
      this.value = CityName;
    }
  }

  writeValue(value) {
    // Kept commented logic as provided
    // if (value) {
    //   this.temp_list.map((x) => {
    //     if (x[this._uid] == value) {
    //       this.value = x[this._label];
    //     }
    //   });
    // }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  search(e) {
    this.value = 'Search City';
    const val = e.toLowerCase();
    const temp = this.temp_list.filter((x) => {
      if (x[this._label].toLowerCase().indexOf(val) !== -1 || !val) {
        return x;
      }
    });
    this.list = temp;
  }

  select(item) {
    this.onChange(item[this._uid]);
    this.value = item[this._label];
    this.keyword = item[this._label];
    this.shown = false;
    this.afterChange.emit(item);
  }

  show() {
    this.shown = this.shown ? false : true;
    setTimeout(() => {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    }, 200);
  }

  @HostListener('document:click', ['$event'])
  onClick(e) {
    if (!this.ele.nativeElement.contains(e.target)) {
      this.shown = false;
    }
  }
}
