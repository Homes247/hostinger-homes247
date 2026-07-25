import { Component, OnInit,ViewChild } from '@angular/core';
import {Subscription, from, Observable} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import { Blogservice } from '../blog.service';
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import { AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

declare var $: any;
@Component({
  selector: 'app-blogautocomplete',
  templateUrl: './blogautocomplete.component.html',
  styleUrls: ['./blogautocomplete.component.css']
})
export class BlogautocompleteComponent implements OnInit {
   @ViewChild('autoCompleteObj') autoCompleteObj!: AutoCompleteComponent;

  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;

  public autoCompleteData: { [key: string]: Object }[] = [];

  public fields: Object = { groupBy: 'category', value: 'name' };

  public text: string = "Enter a blog name";

  public highlight: Boolean = true;

  public minLength: Number = 2;

  constructor(public BlogService: Blogservice,private router: Router,) { }

  ngOnInit(): void {
    this.getAuto();
  }

  getAuto() {
    var blogid = '1';
    this.BlogService.getblogAuto(blogid).subscribe(myLocalList => {
      this.apioptions(myLocalList['blogautolist']);
      this.autoCompleteData = myLocalList['blogautolist'];
    });
  }
  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onItemSelect(selected: any) {
    const blogurl = selected.itemData.structure.toLowerCase().replace(/\s+/g, '-');
    const blogid = selected.itemData.id;
    const finalblogurl = blogurl.charAt(0) === '-' ? blogurl.slice(1) : blogurl;

    this.router.navigate(['/blogs/' + finalblogurl + '-' + blogid]).then(() => {
      if (this.autoCompleteObj) {
        this.autoCompleteObj.value = '';
      }
    });
  }
  public displayname(value) {
    if (value) {
      return value.name;
    }
  }
}
