import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllindiaService } from '../allindia.service';
import { CityService } from '../city.service';


@Component({
  selector: 'app-all-india-links',
  templateUrl: './all-india-links.component.html',
  styleUrls: ['./all-india-links.component.css']
})
export class AllIndiaLinksComponent implements OnInit {
  cityId: string;

  constructor( private allindia :AllindiaService,
    public cityservice: CityService,

    private router: Router,
    ) { }

    citiess: any;
    majorcities:any;
    uploads:any;
    trending:any;
    handpicked:any;
    launched:any;
    blogs: any;
    testimonialListing: any;
    blogsloader = true;
    blogapiload = true;

  ngOnInit(): void {
    this.getlocationlist();
    this.allindia.gettestimonials().subscribe(testi => {
      if (testi['status'] === 'True') {
        this.testimonialListing = testi['testimonial'];
      }
    });
    this.allindia.getrecentblogs().subscribe((blogs: any[]) => {
      if (blogs['status'] === 'True') {
        this.blogsloader = false;
        this.blogs = blogs['locations'];
        this.blogapiload = false;
      } else {
        this.blogsloader = true;
      }
    });
  }
  getlocationlist() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;

    var param = {
      cityid : this.cityId,
    };

    this.allindia.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
    });

    this.allindia.getmajorcities().subscribe((majorcity: any[]) => {
      this.majorcities = majorcity['locations'];
    });

    this.allindia.getmajorrecentupdatelist().subscribe((recents: any[]) => {
      this.uploads = recents['recentproperties'];
    });

    this.allindia.gettrendingprojects(param).subscribe((trend: any[]) => {
      this.trending = trend['Trending'];
    });

    this.allindia.getpriorityprojects(param).subscribe((prior: any[]) => {
      this.handpicked = prior['Priority'];
    });

    this.allindia.getnewprojects(param).subscribe((launch: any[]) => {
      this.launched = launch['Newprojects'];
    });

  }
}
