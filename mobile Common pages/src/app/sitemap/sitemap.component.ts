import { Component, HostListener, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {

  citiess: any;
  routeSub: any;
  activeLetter: any;
  constructor(private dataService: DataService,private activatedRoute: ActivatedRoute,private titleService: Title,private router: Router,private service: DataService,
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
  loaded=false;
  innerheader:any;
  metatags() {
    var sectionremove = this.router.url.replace('/all-cities-in-india/', '');
      if(sectionremove == '/all-cities-in-india'){
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
    const PAGEID = '45';
    this.dataService.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/about.jpg'});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.dataService.createLinkForCanonicalURL();
    });

    this.routeSub = this.activatedRoute.params.subscribe(params => {
      const letter = params['default'];
      if(letter == undefined){
        this.activeLetter = "";
      }else{
        this.activeLetter = letter;
      }
    });
  }

  getlocationlist() {
    this.dataService.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
    });
  }

}
