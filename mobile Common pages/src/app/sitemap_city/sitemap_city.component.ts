import { Component, HostListener, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataService} from '../data.service';
import { Meta, Title } from '@angular/platform-browser';
import { CityService } from '../city.service';

declare var $: any;
@Component({
  selector: 'app-sitemapcity',
  templateUrl: './sitemap_city.component.html',
  styleUrls: ['./sitemap_city.component.css']
})
export class SitemapCityComponent implements OnInit {

  completedata: any;
  routeSub: any;
  cityname: any;
  cityid: any;
  bangalore = false;
  activeLetter: any;
  constructor(private dataService: DataService,private router: Router,private titleService: Title, private meta: Meta,private service: DataService,
    private activatedRoute: ActivatedRoute,public cityservice: CityService,) { }

  ngOnInit() {
    this.getmeta();
    this.values();
    this.LocateBnr();

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
  innerheader:any;
  loaded=false;
  city:any;
  getmeta() {
    var cityname = this.router.url.split('/all-localities-by-city')[1];
    var idremove = cityname.split('/')[1];
    var cityid = this.router.url.split('/').pop();
    this.cityname = idremove;
    String.prototype.toLocaleUpperCase = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    var capsname = this.cityname.toLocaleUpperCase();
    this.city = capsname.replace('-', ' ');
    var value = this.cityservice.cityfinder(this.router.url);
    // var cityid = value.cityid
    if(this.city !== value.cityname){
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }
    
    if (this.router.url.indexOf('--') > -1){
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }
    else if (this.router.url.indexOf('/all-localities-by-city/') > -1) {
    } else {
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }
    if(Number(cityid)){
      // 
    }else if(cityid.indexOf('?') > -1){

    }else{
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }
    this.dataService.createLinkForCanonicalURL();
  }
  values() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      const city = params['city'];
      const letter = params['default'];
      this.activeLetter = letter;
      // if(letter == undefined){
      //   this.activeLetter = "";
      // }else{
      //   this.activeLetter = letter;
      // }
      if(this.activeLetter == undefined){
        this.titleService.setTitle(' Real Estate Sitemap of ' + this.cityname + ' Localities-Site Navigation');
        this.meta.updateTag({ name: 'description', content: 'Navigate through ' + this.cityname + ' City easily by referring the sitemap. Browse all ' + this.cityname + ' localities in one page' });
      }else{
        this.titleService.setTitle(' Sitemap for ' + this.cityname + ' Localities - Navigate from Letter '+ this.activeLetter);
        this.meta.updateTag({ name: 'description', content: 'Navigate through ' + this.cityname + ' City by the letter of '+ this.activeLetter +'. Browse all ' + this.cityname + ' localities in one page' });
      }
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
     });
  }

  LocateBnr(){
    if(this.router.url.indexOf('bangalore') > -1) {
      this.bangalore = true; 
    }
  }
  // Metatags(){

    
  // }

}
