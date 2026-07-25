import { Component, HostListener, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { CityService } from '../city.service';

declare var $: any;
@Component({
  selector: 'app-sitemap-all-buildersbycity',
  templateUrl: './sitemap-all-buildersbycity.component.html',
  styleUrls: ['./sitemap-all-buildersbycity.component.css']
})
export class SitemapAllBuildersbycityComponent implements OnInit {

  citiess: any;
  routeSub: any;
  activeLetter: any;
  constructor(private dataService: DataService, private titleService: Title,public cityservice: CityService,private activatedRoute: ActivatedRoute,private service: DataService,
    private meta: Meta) { }

    ngOnInit() {
      this.metatags();
      this.getlocationlist();
  
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
    cityname:any;

    metatags() {
        this.dataService.createLinkForCanonicalURL();
  
      this.routeSub = this.activatedRoute.params.subscribe(params => {
        const letter = params['default'];
        // const city = params['city'];
        String.prototype.toLocaleUpperCase = function() {
          return this.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        };
        // this.cityname = city.toLocaleUpperCase();
        this.cityname = "All City";

        if(letter == undefined){
          this.activeLetter = "";
          this.titleService.setTitle(' Real Estate Sitemap of ' + this.cityname + ' Builders-Site Navigation');
          this.meta.updateTag({name: 'description', content: 'Navigate through Builders by each city easily by referring this page. Browse all Builders in one page'});
        }else{
          this.activeLetter = letter;
          this.titleService.setTitle(' Sitemap for ' + this.cityname + ' Builders - Navigate from Letter '+ this.activeLetter);
          this.meta.updateTag({name: 'description', content: 'Navigate through Builders by each city easily by referring this '+ this.activeLetter +'. Browse all Builders by the letter of '+ this.activeLetter});
        }
      });
    }
  
    getlocationlist() {
      this.dataService.getlocationlist().subscribe((city: any[]) => {
        this.citiess = city['locations'];
        
      });
    }

}
