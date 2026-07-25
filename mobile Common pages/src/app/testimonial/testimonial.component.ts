import { Component, OnInit, HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Meta, Title} from '@angular/platform-browser';
import { DataService } from '../data.service';

declare var $: any;

declare var $: any;
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  testimonialListing: any;
  testimonialImage = this.Service.imagesURL + 'TestimonialImage/';
  constructor(public Service: DataService,private titleService: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.metatags();
    this.Gettestmonial();
  }

  metatags() {
    const PAGEID = '36';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.Service.createLinkForCanonicalURL();
    });
  }
  loaded = false;
  FooterComponent: any;
  innerheader:any;
  @HostListener('touchstart', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
      this.Service.mouseenterservice3();
  }
  TestimonialOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav : false,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/leftarrow.png alt=\'LeftArrow\' class=\'owl-nav owl-prev left-icon\'>',
    '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/rightarrow.png alt=\'RightArrow\' class=\'owl-nav owl-next right-icon\'>'],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  };
  Gettestmonial(){
  this.Service.gettestimonials().subscribe(testi => {
    if (testi['status'] === 'True') {
      this.testimonialListing = testi['testimonial'];
    }
  });
 }
}
