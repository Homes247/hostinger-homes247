import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  trendingBlogs: any;
  VastuBlogs: any;
  InteriorsBlogs: any;
  LifestyleBlogs: any;
  ConstructionBlogs: any;
  HomeBuyingBlogs: any;
  IndianRealestateBlogs: any;

  constructor(
    private Service: DataService2,private router: Router,
  ) { }
  mobileview:boolean;
  aboutUsReadMore: boolean = true

  ngOnInit():void {

      const currentUrl = this.router.url;
    if (currentUrl == '/aboutus') {
      this.aboutUsReadMore = false
    }


    const trendingId = '1';
    this.Service.getcategoryblogs(trendingId).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.trendingBlogs = responce['blogcategory'];
      }
    });
    const VastuBlogs = '8';
    this.Service.getcategoryblogs(VastuBlogs).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.VastuBlogs = responce['blogcategory'];
      }
    });
    const InteriorsBlogs = '5';
    this.Service.getcategoryblogs(InteriorsBlogs).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.InteriorsBlogs = responce['blogcategory'];
      }
    });
    const LifestyleBlogs = '9';
    this.Service.getcategoryblogs(LifestyleBlogs).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.LifestyleBlogs = responce['blogcategory'];
      }
    });
    const ConstructionBlogs = '10';
    this.Service.getcategoryblogs(ConstructionBlogs).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.ConstructionBlogs = responce['blogcategory'];
      }
    });
    const HomeBuyingBlogs = '4';
    this.Service.getcategoryblogs(HomeBuyingBlogs).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.HomeBuyingBlogs = responce['blogcategory'];
      }
    });
    const IndianRealestateBlogs = '17';
    this.Service.getcategoryblogs(IndianRealestateBlogs).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.IndianRealestateBlogs = responce['blogcategory'];
      }
    });
    this.onresize();

  }
  onresize()
  {
    var width = window.innerWidth;
    if (width < 420) {
      this.mobileview = true;
    }else{
      this.mobileview = false;
    }
  }

}
