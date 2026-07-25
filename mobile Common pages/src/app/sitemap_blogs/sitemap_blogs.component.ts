import { Component, HostListener, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { DataService2 } from '../data.service2';

declare var $: any;
@Component({
  selector: 'app-sitemapblogs',
  templateUrl: './sitemap_blogs.component.html',
  styleUrls: ['./sitemap_blogs.component.css']
})
export class SitemapblogsComponent implements OnInit {

  completedata: any;
  routeSub: any;
  cityname: any;
  constructor(private dataService: DataService,private dataService2: DataService2) { }

  ngOnInit() {
    this.values();
  }
  loaded=false;
  innerheader:any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
      // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
      //   this.innerheader = InnerHeaderModule.components['lazy'];
      //   this.loaded = true;
      // });

    }
  values() {
    var blogid = '1';
    this.dataService2.getblogAuto(blogid).subscribe((myLocalList: any[]) => {
      this.completedata = myLocalList['blogautolist'];
    });
    this.dataService.createLinkForCanonicalURL();
  }

}
