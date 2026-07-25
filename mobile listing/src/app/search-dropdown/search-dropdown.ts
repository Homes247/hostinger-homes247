import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms'; // Added FormsModule
import { CommonModule } from '@angular/common'; // Added CommonModule
import { ActivatedRoute, RouterModule } from '@angular/router'; // Added RouterModule
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-search-dropdown',
  imports: [CommonModule,
    FormsModule,
    RouterModule],
  templateUrl: './search-dropdown.html',
  styleUrl: './search-dropdown.css',
})
export class SearchDropdown implements ControlValueAccessor, OnChanges {

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
  value: any = 'Select';
  shown = false;

  private routeSub: Subscription;

  constructor(private ele: ElementRef, private activeroute: ActivatedRoute) { }

  ngOnChanges(changes: SimpleChanges) {
    this._label =
      typeof this.label !== 'undefined' && this.label !== ''
        ? this.label
        : 'name';
    this._img =
      typeof this.img !== 'undefined' && this.img !== '' ? this.img : 'img';
    this._uid =
      typeof this.uid !== 'undefined' && this.uid !== '' ? this.uid : 'id';

    this.ValuePAssing();
  }

  ValuePAssing() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      const name = params['State_Name'] || '';
      this.value = name.replace(/-/g, ' ');
    });
  }

  writeValue(value) {
    // Logic preserved as commented in original code
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
    const val = e.toLowerCase();
    const temp = this.temp_list.filter((x) => {
      if (x[this._label].toLowerCase()?.indexOf(val) !== -1 || !val) {
        return x;
      }
    });
    this.list = temp;
  }

  select(item) {
    this.onChange(item[this._uid]);
    this.value = item[this._label];
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

  // Good practice to cleanup subscription on destroy, 
  // but kept flow exactly as provided.
}
