import { Component, HostListener, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { User } from './about';
import { Meta, Title } from '@angular/platform-browser';
import { DataService } from '../data.service';

declare var $: any;

declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private _location: Location,
    public Service: DataService,
    private route: ActivatedRoute,
  ) {
  }

  user = new User();

  ngOnInit() {
    this.metatags();
    // this.semanticjquery();
    $(window).scroll(function () {
      if ($(window).scrollTop() >= $(".footerDiv").offset().top) {
        $('#conatctbutton').addClass('conatctbuttonhide');
      }
      else {
        $('#conatctbutton').removeClass('conatctbuttonhide');
      }
    });
  }
  @HostListener('touchstart', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowScrolls() {
    this.Service.mouseenterservice3();
  }
  metatags() {
    const PAGEID = '2';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {

      const title = metatags['Pageseo'][0].page_title;
      const description = metatags['Pageseo'][0].meta_description;
      const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
      const url = 'https://www.homes247.in' + this.router.url;

      this.titleService.setTitle(title);

      // Meta description
      this.meta.updateTag({ name: 'description', content: description });

      // Open Graph
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });

      // Twitter Card
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: image });

      // Canonical
      this.Service.createLinkForCanonicalURL();

    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  loaded = false;
  sectionloader = false;
  apiload = true;
  topnewdivreached = false;
  FooterComponent: any;
  innerheader: any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (this.topnewdivreached = scrollPosition >= elementPosition) {
      if (this.apiload == true) {
        this.apiload = false;
        this.sectionloader = true;
      }
    }

    // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
    //   this.innerheader = InnerHeaderModule.components['lazy'];
    //   this.loaded = true;
    // });
  }


}