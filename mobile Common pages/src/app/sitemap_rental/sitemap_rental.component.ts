import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sitemaprental',
  templateUrl: './sitemap_rental.component.html',
  styleUrls: ['./sitemap_rental.component.css']
})
export class SitemaprentalComponent implements OnInit {

  completedata: any;
  routeSub: any;
  cityname: any;
  majorcities: any;
  constructor(private dataService: DataService,private titleService :Title, private Service: DataService2,private meta: Meta, private router :Router) { }

  ngOnInit() {
    this.values();

    this.dataService.createLinkForCanonicalURL();
    
    this.titleService.setTitle('Rental Properties Sitemap | Homes247.in');
    this.meta.updateTag({ name: 'description', content: 'Find rental properties in major cities across India. Explore a wide range of apartments, houses, and commercial spaces for rent on Homes247.in.' });
    this.meta.updateTag({ property: 'og:title', content: 'Rental Properties Sitemap | Homes247.in' });
    this.meta.updateTag({ property: 'og:description', content: 'Find rental properties in major cities across India. Explore a wide range of apartments, houses, and commercial spaces for rent on Homes247.in.' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
    });
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://www.homes247.in' + this.router.url
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Rental Properties Sitemap | Homes247.in' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Find rental properties in major cities across India. Explore a wide range of apartments, houses, and commercial spaces for rent on Homes247.in.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });;

  }


values() {
  // var blogid = '1';
  // this.Service.getblogAuto(blogid).subscribe((myLocalList: any[]) => {
  //   this.completedata = myLocalList['blogautolist'];
  // });
  this.Service.getmajorcities().subscribe((majorcity: any[]) => {
    if ((majorcity['status']) === 'True') {
      this.completedata = majorcity['locations'];
    }
  });
}

}
