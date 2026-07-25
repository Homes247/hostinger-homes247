import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {DataService} from '../data.service';

declare var $: any;
@Component({
  selector: 'app-post-property-landing',
  templateUrl: './post-property-landing.component.html',
  styleUrls: ['./post-property-landing.component.css']
})
export class PostPropertyLandingComponent implements OnInit {
  height: any;
  LoginId: any;
  userID: any;
  loginDropDownOpen = false;
  profileDropDownOpen = false;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object,public Service: DataService,private titleService: Title,
  private meta: Meta,) {
    if (isPlatformBrowser(this.platformId)) {
      const node: any = document.createElement('link');
      node.href = 'https://fonts.googleapis.com/css2?family=Stick+No+Bills&display=swap';
      node.rel = 'stylesheet';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);

      const node2: any = document.createElement('link');
      node2.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
      node2.rel = 'stylesheet';
      node2.async = true;
      document.getElementsByTagName('head')[0].appendChild(node2);
    }
  }

  ngOnInit(): void {
    this.metatags();
    this.LoginId = localStorage.getItem('loginID');
    this.userID = localStorage.getItem('userID');
    if (this.LoginId === null) {
      this.loginDropDownOpen = true;
    } else if (this.LoginId === '1') {
      this.profileDropDownOpen = true;
    }
  }

  metatags() {
    const PAGEID = '38';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/about.jpg'});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.Service.createLinkForCanonicalURL();
    });
  }
}
