import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService2 } from '../data.service2';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { AllindiaService } from '../allindia.service';
import { Meta, Title } from '@angular/platform-browser';
declare var $: any;

declare var $: any;
@Component({
  selector: 'app-pin-code1',
  templateUrl: './pin-code1.component.html',
  styleUrls: ['./pin-code1.component.css']
})
export class PinCode1Component implements OnInit {

  dataloader:boolean = false;
  selectedState: any;
  StateName: any;
  selectedCity: any
  Api_District_Name: any=[];
  CityName:any
  State_Name: any;
  Api_District_Name1: any=[];
  Taluk_Branch: any;
  districtList: any =[];
  district: any;

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
  city: any;
  State_Name_Seo: any;

  constructor(private allindia :AllindiaService,private router: Router, private titleService: Title, private meta: Meta,
    @Inject(LOCAL_STORAGE) private Local_Storage: any, private service: DataService, private service1: DataService2, private activeroute: ActivatedRoute,) { }
    componentloads = false;
    @HostListener('window:scroll', ['$event'])
    @HostListener('touchstart', ['$event'])
    onWindowScroll() {
      this.service.mouseenterservice3();
      if (this.componentloads == false) {
        this.componentloads = true;
        this.stateNamefetch();
      }
    }

  private routeSub: Subscription;

  
  citiess: any;
  getAlllocationlist() {
    this.service.getlocationlist().subscribe(city => {
      this.citiess = city['locations'];
    });
  }

  ngOnInit(): void {
    this.service.createLinkForCanonicalURL();
    this.fetchstateNAme();
    // this.stateNamefetch();
    this.getAlllocationlist();
    this.showless();
    // this.metaseo();

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

  fetchstateNAme() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      const StateName = params['State_Name'].replace(/-/g, ' ');
      this.StateName = StateName.replace(/-/g, ' ').toLowerCase()
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      this.State_Name_Seo = StateName.toLocaleUpperCase();
      this.titleService.setTitle('Find Pin Code Numbers in India, ' + this.State_Name_Seo + ' | Homes247');
      this.meta.updateTag({
        name: 'description',
        content: 'Find PIN Code (Postal Index Number Code) for ' + this.State_Name_Seo + ' all districts and localities on Homes247'
      });
      


      var param = {
        state: StateName,
      };
      this.service1.getPinCode(param).subscribe(lists => {
        var State = lists['pincode'];
        this.Api_District_Name = State;
        this.Api_District_Name1 = this.Api_District_Name[0].district;
       this.GetTAlukBranch();
      });
    })
  }

  GetStateName() {
    var StateName = $('#State_Name').val();
    this.Local_Storage.setItem('State_Name', StateName);
    if (this.selectedState == null) {
    } else {
      this.router.navigate(['/find-all-pincodes/' + StateName.replace(/\s+/g, '-').toLowerCase()]);
    }
  }
  stateNamefetch() {
    this.service1.AllPinCodeFetch().subscribe((allStateList: any[]) => {
      this.State_Name = allStateList['pincode'];
    });
  }

  
  GetTAlukBranch(){
    this.dataloader = true;
    var param1 = {
      state: this.StateName,
      district : this.Api_District_Name1,
    };
    this.service1.getPinCode(param1).subscribe(lists => {
      var State = lists['pincode'];
      this.dataloader = false;
      this.districtList = State;
    });
  }
  ChangeCity(event) {
    let city = event;
    var selectedCityName = [];
    selectedCityName.push(city);
    this.Api_District_Name1 = selectedCityName[0];
    
    this.GetTAlukBranch()
  }

  GetCityName() {
    var CityName = $('#City_Name').val();
    this.Local_Storage.setItem('City_Name', CityName);
    if (this.selectedCity == null) {
    } else {
      this.router.navigate(['/find-all-pincodes/' + this.StateName.replace(/\s+/g, '-').toLowerCase() + '/' + CityName.replace(/\s+/g, '-').toLowerCase()]);
    }
  }


  statename() {
    var getPinCode =
    {
      city: this.city,
    }
    this.service1.getPinCode(getPinCode).subscribe((allbanklist: any[]) => {
      this.State_Name = allbanklist['pincode'];
    });
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

  TestingOwl: OwlOptions = {
    loop: false,
    nav: false,
    dots: false,
    autoplay: false                                              ,
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
    margin:0,
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
    // margin:10,
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

}

