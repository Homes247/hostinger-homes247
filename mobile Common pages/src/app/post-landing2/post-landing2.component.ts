import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DataService } from '../data.service';

declare var $: any;
declare var $: any;
@Component({
  selector: 'app-post-landing2',
  templateUrl: './post-landing2.component.html',
  styleUrls: ['./post-landing2.component.css']
})
export class PostLanding2Component implements OnInit {

  constructor(
    private titleService: Title,
    private meta: Meta,
    private Service: DataService,

  ) { }

  ngOnInit(): void {
    $('body').addClass('bodyhiddenclass');
    this.titleService.setTitle('Post Free Property Ads Here: Sell or Rent | Homes247.in');
    this.meta.updateTag({
      name: 'description',
      content: "Free Property Ads Posting Site India: Advertise Your Property on Homes247.in. Free Property Ads to Sell or Rent Your Property Faster in India. Get Started Today!"
    });
    this.Service.createLinkForCanonicalURL();
  }

}
