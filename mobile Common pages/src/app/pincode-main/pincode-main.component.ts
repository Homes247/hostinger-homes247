import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Router } from '@angular/router';
import { DataService2 } from '../data.service2';
import { AllindiaService } from '../allindia.service';
import { Title, Meta } from '@angular/platform-browser';

declare var $: any;

declare var $: any;
@Component({
  selector: 'app-pincode-main',
  templateUrl: './pincode-main.component.html',
  styleUrls: ['./pincode-main.component.css']
})
export class PincodeMainComponent implements OnInit {
  State_Name: any;
  CITY: any;
  address: any;
  TALUK: any;
  selectedState: any;

  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  blogapiload = true;
  blogsloader = true;
  topprojectsloader = true;
  sectionloader = false;
  blogs: any;
  testimonialListing: any;
  propertyimage = this.allindia.imagesURL + 'uploadPropertyImgs/';
  blogimagePath = this.allindia.imagesURL + 'stories/';
  testimonialImage = this.allindia.imagesURL + 'TestimonialImage/';


  homeactive = false;
  videoactive = false;
  searchactive = false;
  moreactive = false;
  categoryurl = '';
  allindiasidenav:any;

  constructor(private allindia :AllindiaService,private service1: DataService2, private router: Router,
    @Inject(LOCAL_STORAGE) private Local_Storage: any, private service: DataService,private titleService: Title, private meta: Meta,) { }

  TestingOwl: OwlOptions = {
    loop: false,
    // margin:10,
    nav: false,
    dots: false,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    center: true,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-right.png" alt=\'LeftArrow\' class=\'ifsc_page_owl2 owl-nav2 owl-prev2 main_move_left2\'>',
      '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-left.png" alt=\'RightArrow\' class=\'ifsc_page_owl2 owl-nav2 owl-next2 main_move_right2\'>'],
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  };
  TestingOw2: OwlOptions = {
    loop: false,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    center: true,
    // margin:0,
    autoplaySpeed: 1000,
    navSpeed: 1000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: false,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-right.png" alt=\'LeftArrow\' class=\'ifsc_page_owl3 owl-nav3 owl-prev3 main_move_left3\'>',
      '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-left.png" alt=\'RightArrow\' class=\'ifsc_page_owl3 owl-nav3 owl-next3 main_move_right3\'>'],
    responsive: {
      0: {
        items: 1.5
      },
      600: {
        items: 1.2
      },
      1000: {
        items: 1.2
      }
    }
  };
  TestingOwl3: OwlOptions = {
    loop: false,
    nav: false,
    dots: false,
    autoplay: false                                              ,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    center: true,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-right.png" alt=\'LeftArrow\' class=\'ifsc_page_owl4 owl-nav4 owl-prev4 main_move_left4\'>',
      '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-left.png" alt=\'RightArrow\' class=\'ifsc_page_owl4 owl-nav4 owl-next4 main_move_right4\'>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };

  citiess: any;
  getAlllocationlist() {
    this.service.getlocationlist().subscribe(city => {
      this.citiess = city['locations'];
    });
  }
  ngOnInit(): void {
    this.metaseo();
    this.stateNamefetch();
    this.getAlllocationlist();
    this.showless();
    

    if (this.blogapiload == true) {
      this.topprojectsloader = false;
     this.sectionloader = true;
    this.allindia.getrecentblogs().subscribe((blogs: any[]) => {
      if (blogs['status'] === 'True') {
        this.blogsloader = false;
        this.blogs = blogs['locations'];
        this.blogapiload = false;
      } else {
        this.blogsloader = true;
      }
    });
    this.allindia.gettestimonials().subscribe(testi => {
      if (testi['status'] === 'True') {
        this.testimonialListing = testi['testimonial'];
      }

    });
  }
    this.categoryurl = this.router.url;
    if(this.categoryurl == '/'){
      this.homeactive = true;
    }
    if(this.categoryurl == '/offers'){
      this.videoactive = true;
    }
    if(this.categoryurl == '/compare-properties'){
      this.searchactive = true;
    }

  }

  metaseo(){
    this.titleService.setTitle('Find Pin Code Numbers in India | Homes247');
    this.meta.updateTag({
      name: 'description',
      content: ' Find Pin Code (Postal Index Number Code) for every location in India from Homes247. Get Accurate Pin Codes or Zip Codes'
    });
    this.service.createLinkForCanonicalURL();
  }

  GetStateName() {
    var StateName = $('#State_Name').val();
    this.Local_Storage.setItem('State_Name', StateName);
    // 
    if (this.selectedState == null) {
    } else {
      this.router.navigate(['/find-all-pincodes/'+ StateName.replace(/ /g, '-').toLowerCase()]);
    }
  }
  stateNamefetch() {
    this.service1.AllPinCodeFetch().subscribe((allStateList: any[]) => {
      this.State_Name = allStateList['pincode'];
    });
  }
  
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScroll() {
    this.service.mouseenterservice3();
  }

  showmore() {
    $('.accordiancollapse').css('height', '410px');
    $('.accordiancollapse').css('overflow-y');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }


  showless() {
    $('.accordiancollapse').css('height', '280px');
    $('.accordiancollapse').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }

  readmore() {
    $('.banner_description').css('height', '410px');
    $('.banner_description').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }
  readless() {
    $('.banner_description').css('height', '140px');
    $('.banner_description').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }
}

