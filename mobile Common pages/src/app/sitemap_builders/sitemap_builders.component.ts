import { Component, HostListener, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { CityService } from '../city.service';
import {DataService} from '../data.service';
import { Meta, Title } from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-sitemapbuilders',
  templateUrl: './sitemap_builders.component.html',
  styleUrls: ['./sitemap_builders.component.css']
})
export class SitemapBuildersComponent implements OnInit {
  completedata: any;
  routeSub: any;
  cityname: any;
  cityid: any;
  activeLetter: any;
  constructor(private dataService: DataService,private router: Router,private titleService: Title, private meta: Meta,private service: DataService,
  private activatedRoute: ActivatedRoute,) { }
  ngOnInit() {
    this.values();

    // var giftofspeed = document.createElement('link');
    // giftofspeed.rel = 'stylesheet';
    // giftofspeed.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    // giftofspeed.type = 'text/css';
    // var godefer = document.getElementsByTagName('link')[0];
    // godefer.parentNode.insertBefore(giftofspeed, godefer);
  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScroll() {
    this.service.mouseenterservice3();
  }
  values() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      const city = params['city'];
      const letter = params['default'];
      const id = params['id'];
      this.cityid = id;
      String.prototype.toLocaleUpperCase = function() {
        return this.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      this.cityname = city.toLocaleUpperCase();
      this.dataService.getAuto(id).subscribe((myLocalList: any[]) => {
        this.completedata = myLocalList['autolist'];
      });
      if(letter == undefined){
        this.activeLetter = "";
        this.titleService.setTitle(' Real Estate Sitemap for ' + this.cityname + ' Builders' + '-' + ' Easy Site  Navigation For ' + this.cityname +' City ');
        this.meta.updateTag({ name: 'description', content: 'Navigate through ' + this.cityname + ' Builders easily by referring this page. Browse all ' + this.cityname + ' Builders in one page' });
      }else{
        this.activeLetter = letter;
        // this.titleService.setTitle(' Real Estate Sitemap for ' + this.cityname + ' Builders' + '-' + ' Easy Site  Navigation by the letter of '+ this.activeLetter +' For ' + this.cityname +' City ');
        this.titleService.setTitle(`Top ${this.cityname} Builders Sitemap - Browse ${this.activeLetter} Letter Listings`);
        // this.meta.updateTag({ name: 'description', content: 'Navigate through ' + this.cityname + ' Builders by the letter of '+ this.activeLetter +'. Browse all ' + this.cityname + ' Builders in one page' });
        this.meta.updateTag({ name: 'description', content: `Find top real estate builders in ${this.cityname} starting with '${this.activeLetter}'. Browse our alphabetical directory to find trusted ${this.cityname} developers.` });
      }
      
      this.dataService.createLinkForCanonicalURL();
      
     });
  }
}
