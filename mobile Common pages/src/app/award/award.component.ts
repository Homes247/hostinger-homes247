import { Component, OnInit, HostListener, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {WINDOW} from '@ng-toolkit/universal';
import {DOCUMENT, Location} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import { DataService } from '../data.service';
import {FormBuilder, FormControl} from '@angular/forms';
declare var $: any;
declare var $: any;
@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.css']
})
export class AwardComponent implements OnInit {

  // constructor(private router: Router,) { }
  constructor(public Service: DataService, private _formBuilder: FormBuilder,
    private titleService: Title,
    private meta: Meta, private router: Router,
    private _location: Location, @Inject(DOCUMENT) private doc,
    @Inject(WINDOW) private window: Window
){}

  ngOnInit(): void {
    this.metatags();
    this.onWindowScroll()
  }
  @HostListener('touchstart', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowScrolls() {
      this.Service.mouseenterservice3();
  }
  metatags() {
    const PAGEID = '35';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.Service.createLinkForCanonicalURL();
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  loaded = false;
  FooterComponent: any;
  innerheader:any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
  
    }

    
    // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
    //   this.innerheader = InnerHeaderModule.components['lazy'];
    //   this.loaded = true;
    // });
    if ($(window).scrollTop() >=  $(".footerDiv").offset().top) {
      $('#conatctbutton').addClass('conatctbuttonhide');
  }
  else {
      $('#conatctbutton').removeClass('conatctbuttonhide');
  }
  }
}
