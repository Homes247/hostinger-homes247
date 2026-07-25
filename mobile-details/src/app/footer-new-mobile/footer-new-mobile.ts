import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cleanUrlPipe, MyBHKPipe } from '../mainpipe-pipe';
import { DataService } from '../data.service';
import { CityService } from '../city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService2 } from '../data.service2';

@Component({
  selector: 'app-footer-new-mobile',
  templateUrl: './footer-new-mobile.html',
  styleUrls: ['./footer-new-mobile.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    cleanUrlPipe,
    // MyBHKPipe,
  ]
})
export class FooterNewMobile implements OnInit {
  footNavId: number = 1;
  selectedCity = 'Bengaluru';
  cityList: any;
  trendingBlogs: any;
  VastuBlogs: any;
  InteriorsBlogs: any;
  LifestyleBlogs: any;
  ConstructionBlogs: any;
  HomeBuyingBlogs: any;
  IndianRealestateBlogs: any;
  constructor(
    private cityListService: DataService,
    public cityservice: CityService,
    public vlogService: DataService2,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  cityName: any;
  ngOnInit(): void {

    this.geturlparams(); // call your function when city changes

    const trendingId = '1';
    this.vlogService
      .getcategoryblogs(trendingId)
      .subscribe((responce) => {
        if (responce['status'] === 'True') {
          this.trendingBlogs = responce['blogcategory'];
        }
      });
    const VastuBlogs = '8';
    this.vlogService
      .getcategoryblogs(VastuBlogs)
      .subscribe((responce) => {
        if (responce['status'] === 'True') {
          this.VastuBlogs = responce['blogcategory'];
        }
      });
    const InteriorsBlogs = '5';
    this.vlogService
      .getcategoryblogs(InteriorsBlogs)
      .subscribe((responce) => {
        if (responce['status'] === 'True') {
          this.InteriorsBlogs = responce['blogcategory'];
        }
      });
    const LifestyleBlogs = '9';
    this.vlogService
      .getcategoryblogs(LifestyleBlogs)
      .subscribe((responce) => {
        if (responce['status'] === 'True') {
          this.LifestyleBlogs = responce['blogcategory'];
        }
      });
    const ConstructionBlogs = '10';
    this.vlogService
      .getcategoryblogs(ConstructionBlogs)
      .subscribe((responce) => {
        if (responce['status'] === 'True') {
          this.ConstructionBlogs = responce['blogcategory'];
        }
      });
    const HomeBuyingBlogs = '4';
    this.vlogService
      .getcategoryblogs(HomeBuyingBlogs)
      .subscribe((responce) => {
        if (responce['status'] === 'True') {
          this.HomeBuyingBlogs = responce['blogcategory'];
        }
      });
    const IndianRealestateBlogs = '17';
    this.vlogService
      .getcategoryblogs(IndianRealestateBlogs)
      .subscribe((responce) => {
        if (responce['status'] === 'True') {
          this.IndianRealestateBlogs = responce['blogcategory'];
        }
      });
  }

  getCityList() {
    this.cityListService.getlocationlist().subscribe((res: any) => {
      this.cityList = res['locations'];
    });
  }
  uploads: any[] = []
  cityname: any
  properties: any[] = []
  geturlparams() {


   var value = this.cityservice.cityfinder(this.router.url);
    if (value.cityid === undefined) {
      this.cityname = 'Bangalore';
    } else {
      this.cityname = value.cityname;
      this.cityname = this.cityname?.replace('-', ' ');
    }

    this.selectedCity = this.cityname;
    
    this.vlogService.getmajorrecentupdatelist().subscribe((res: any) => {
      if (res.status === 'True') {

        const filtered = res.recentproperties
          .filter((item: any) => item.city === this.selectedCity);

        this.properties = filtered.flatMap((item: any) => item.properties);
      }
    });


  }
}