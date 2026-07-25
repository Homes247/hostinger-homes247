import { Component,PLATFORM_ID, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { ReplaceLineBreaks } from '../mainpipe-pipe';
import { DataService2 } from '../data.service2';
import { isPlatformBrowser } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule, ReplaceLineBreaks],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  trendingBlogs: any;
  VastuBlogs: any;
  InteriorsBlogs: any;
  LifestyleBlogs: any;
  ConstructionBlogs: any;
  HomeBuyingBlogs: any;
  IndianRealestateBlogs: any;
  constructor(
    private Service: DataService2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  mobileview: boolean;
  ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
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
  }
  onresize() {
    var width = window.innerWidth;
    if (width < 420) {
      this.mobileview = true;
    } else {
      this.mobileview = false;
    }
  }
}
