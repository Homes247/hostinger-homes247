import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Meta, Title } from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-blog-landing',
  templateUrl: './blog-landing.component.html',
  styleUrls: ['./blog-landing.component.css']
})
export class BlogLandingComponent implements OnInit {


  bloggerId: any;
  authdetails1: any;
  blogger_name_html: any;
  beforeLogin = false;
  afterLogin = false;

  constructor(
    public Service: DataService,
    private titleService: Title,
    private meta: Meta,
  ) { }

  ngOnInit(): void {

    this.bloggerId = localStorage.getItem("bloggerId");
    if (this.bloggerId == null) {
      this.beforeLogin = true;
    } else {
      this.afterLogin = true;
    }
    var param3 = {
      bloggerId: this.bloggerId,
    }
    this.Service.getAuthorDetails(param3).subscribe(response => {
      this.authdetails1 = response['blogtype'].BloggerProfile;
      this.blogger_name_html = this.authdetails1[0].name;
    })

    this.titleService.setTitle('Start Your Free Blog Today: Share Your Voice & Reach Millions');
    this.meta.updateTag({
      name: 'description',
      content: "Start Your Free Blog Now! Explore Free Blog Website & Share Your Ideas & Build Your Audience. Start Your Blog Today With Homes247 Free Blogging Site"
    });
    this.Service.createLinkForCanonicalURL();
  }



}
