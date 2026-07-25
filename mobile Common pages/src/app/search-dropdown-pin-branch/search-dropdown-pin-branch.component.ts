import { Component, Input, forwardRef, HostListener, ElementRef, Output, EventEmitter, ViewChild, OnInit, } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-search-dropdown-pin-branch',
  templateUrl: './search-dropdown-pin-branch.component.html',
  styleUrls: ['./search-dropdown-pin-branch.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchDropdownPinBranchComponent),
      multi: true,
    },
  ],
})
export class SearchDropdownPinBranchComponent implements ControlValueAccessor {

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
  constructor(private ele: ElementRef, private activeroute: ActivatedRoute) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  private routeSub: Subscription;
  ngOnChanges() {
    this._label =
      typeof this.label !== 'undefined' && this.label !== ''
        ? this.label
        : 'name';
    this._img =
      typeof this.img !== 'undefined' && this.img !== '' ? this.img : 'img';
    this._uid =
      typeof this.uid !== 'undefined' && this.uid !== '' ? this.uid : 'id';
    // this.value = 'Select';
    this.ValuePAssing();
  }
  ValuePAssing() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      // var BankName = params['Branch_Name'].replace(/-/g, ' ');
      // this.value = BankName;
      const BankName = params['Branch_Name'] || '';
      this.value = BankName.replace(/-/g, ' ');
    })
  }
  writeValue(value) {
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
      if (x[this._label].toLowerCase().indexOf(val) !== -1 || !val) {
        return x;
      }
    });
    this.list = temp;
  }
  select(item) {
    // this.onChange(item[this._uid]);
    this.onChange(item[this._label] + '/' + item[this._uid]);
    this.value = item[this._label];
    this.shown = false;
    this.afterChange.emit(item);
  }
  show() {
    this.shown = this.shown ? false : true;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 200);
  }
  @HostListener('document:click', ['$event']) onClick(e) {
    if (!this.ele.nativeElement.contains(e.target)) {
      this.shown = false;
    }
  }

}
