import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Blogservice } from '../blog.service';
import {map, startWith} from "rxjs/operators";

declare var $: any;
@Component({
  selector: 'app-blog-matautocomplete',
  templateUrl: './blog-matautocomplete.component.html',
  styleUrls: ['./blog-matautocomplete.component.css']
})
export class BlogMatautocompleteComponent implements OnInit {

  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;

  constructor(public BlogService: Blogservice,private router: Router,) { }

  ngOnInit(): void {
    this.getAuto();
  }

  getAuto() {
    var blogid = '1';
    this.BlogService.getblogAuto(blogid).subscribe(myLocalList => {
      this.apioptions(myLocalList['blogautolist']);
    });
  }
  apioptions(apivalue){
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
  
  onItemSelect(selected) {
    const blogurl = selected.structure.toLowerCase().replace(/\s+/g, '-');
    
    const blogid = selected.id;
    if(blogurl.charAt(0) === "-"){
      const finalblogurl = blogurl.replace('-', '');
      // 
      this.router.navigate(['/blogs/'+finalblogurl+'-'+blogid]);
    }else{
      // 
      this.router.navigate(['/blogs/'+blogurl+'-'+blogid]);
    }
  }
  public displayname(value) {
    if (value) {
      return value.name;
    }
  }

}
