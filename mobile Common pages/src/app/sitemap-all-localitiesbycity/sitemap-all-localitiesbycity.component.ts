import { Component, HostListener, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { CityService } from '../city.service';

declare var $: any;
@Component({
  selector: 'app-sitemap-all-localitiesbycity',
  templateUrl: './sitemap-all-localitiesbycity.component.html',
  styleUrls: ['./sitemap-all-localitiesbycity.component.css']
})
export class SitemapAllLocalitiesbycityComponent implements OnInit {

  citiess: any;
  routeSub: any;
  activeLetter: any;
  constructor(private dataService: DataService, private titleService: Title,public cityservice: CityService,private activatedRoute: ActivatedRoute,  private router: Router,private service: DataService,
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
    metatags() {
      var sectionremove = this.router.url.replace('/all-localities-by-city/', '');
      if(sectionremove == '/all-localities-by-city'){
        // No Changes
      }else{
        var urlend = this.router.url.split('/').pop();
        var allOne = /^(.)\1*$/.test(urlend);
        if(allOne == true){
          // No Changes
        }else{
          // this.router.navigate(['/404'], { skipLocationChange: true });
        }
      }

      this.dataService.createLinkForCanonicalURL();
      this.routeSub = this.activatedRoute.params.subscribe(params => {
        const letter = params['default'];
        if(letter == undefined){
          this.activeLetter = "";
          this.titleService.setTitle('Real Estate Locality Sitemap by city based navigation - Easy Site Navigation for the all localities.');
          this.meta.updateTag({name: 'description', content: 'Real Estate city based navigation for the all localities  - Easy Site Navigation for the all localities by major cities'});
          
        }else{
          this.activeLetter = letter;
          this.titleService.setTitle('Real Estate Locality Sitemap by city based navigation with letter of '+ this.activeLetter +' - Easy Site Navigation for the localities by the letter of '+ this.activeLetter +'.');
          this.meta.updateTag({name: 'description', content: 'Real Estate city based navigation with letter of '+ this.activeLetter +' all localities  - Easy Site Navigation for the with letter of '+ this.activeLetter +' by major cities'});
        }
      });
    }
  
    getlocationlist() {
      this.dataService.getlocationlist().subscribe((city: any[]) => {
        this.citiess = city['locations'];
        
      });
    }

}
