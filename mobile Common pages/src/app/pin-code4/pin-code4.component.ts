import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { DataService2 } from '../data.service2';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { AllindiaService } from '../allindia.service';
import { Title, Meta } from '@angular/platform-browser';

declare var $: any;

declare var $: any;
@Component({
  selector: 'app-pin-code4',
  templateUrl: './pin-code4.component.html',
  styleUrls: ['./pin-code4.component.css']
})
export class PinCode4Component implements OnInit {

  // STATE: any;
  TALUK: any;
  StateName: any;
  ApiBranchName: any;
  selectedBranch: any
  CityName: any
  TalukName: any;
  pincodedetails: any;
  talukpinList: any = [];
  selectedState: any;
  State_Name: any;
  selectedCity: any;
  Api_District_Name: any;
  selectedTaluk: any;
  ApiTalukName: any;
  testingtaluk1: any;
  testingtaluk2: number;
  selectedBranchName: any;
  hidetable: boolean = false;

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
  city: any;
  numberOfPostOffice: any;
  pinPrefix: any;
  State_Name_Seo: any;
  District_Name_Seo: any;
  Taluk_Name_Seo: any;
  Branch_Name_Seo: any;


  constructor(private allindia: AllindiaService, private service: DataService, private router: Router,
    @Inject(LOCAL_STORAGE) private Local_Storage: any, private service1: DataService2, private activeroute: ActivatedRoute, private titleService: Title, private meta: Meta,) { }
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

  TestingOwl: OwlOptions = {
    loop: false,
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
    margin: 0,
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
    autoplay: false,
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
    this.fetchstateNAme();
    // this.statename();
    // this.stateNamefetch();
    this.getAlllocationlist();
    this.showless();
    this.tableshowless();
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
    if (this.categoryurl == '/') {
      this.homeactive = true;
    }
    if (this.categoryurl == '/offers') {
      this.videoactive = true;
    }
    if (this.categoryurl == '/compare-properties') {
      this.searchactive = true;
    }
  }

  fetchstateNAme() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      var StateName = params['State_Name'].replace(/-/g, ' ');
      var cityNAme = params['City_Name'].replace(/-/g, ' ');
      var TalukName = params['Taluk_Name'].replace(/-/g, ' ');
      var Branch_Name = params['Branch_Name'].replace(/-/g, ' ');
      var BranchName = params['Id'];
      this.CityName = cityNAme;
      this.TalukName = TalukName;

      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      this.State_Name_Seo = StateName.toLocaleUpperCase();
      this.District_Name_Seo = cityNAme.toLocaleUpperCase();
      this.Taluk_Name_Seo = TalukName.toLocaleUpperCase();
      this.Branch_Name_Seo = Branch_Name.toLocaleUpperCase();

      this.titleService.setTitle('Pin Code Numbers in India, ' + this.State_Name_Seo + ', ' + this.District_Name_Seo + ', ' + this.Taluk_Name_Seo +  ', ' + this.Branch_Name_Seo +' | Homes247');
      this.meta.updateTag({
        name: 'description',
        content: 'Get complete details of PIN Code (Postal Index Number Code) for ' + this.State_Name_Seo + ', ' + this.District_Name_Seo + ', ' + this.Taluk_Name_Seo +  ', ' + this.Branch_Name_Seo +' on Homes247'
      });
      this.service.createLinkForCanonicalURL();

      this.StateName = StateName.replace(/-/g, ' ').toLowerCase();
      var param = {
        state: this.StateName,
      };
      this.service1.getPinCode(param).subscribe(lists => {
        var State = lists['pincode'];
        this.Api_District_Name = State;
      });

      var param1 = {
        state: StateName,
        district: cityNAme,
      };
      this.service1.getPinCode(param1).subscribe(lists => {
        var State = lists['pincode'];
        this.ApiTalukName = State;
      });

      var param2 = {
        state: StateName,
        taluk: TalukName
      };

      this.service1.getPinCode(param2).subscribe(lists => {
        var State = lists['pincode'];
        this.ApiBranchName = State;
      });

      var paramId = {
        id: BranchName,
      };
      this.service1.getPinCodeiD(paramId).subscribe(lists => {
        var State = lists['pincode'];
        this.pincodedetails = State;
        this.numberOfPostOffice = this.pincodedetails.length;
        this.talukpinList = State;
        this.pinPrefix = this.talukpinList[0].pincode.slice(0,3)
        this.selectedBranchName = this.talukpinList[0]['branch']
        this.testingtaluk1 = this.talukpinList.length;
        this.testingtaluk2 = this.talukpinList.length / 2;
        if (this.ApiTalukName.length === 2) {
          this.hidetable = true;
        } else {
          this.hidetable = false;
        }
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

  GetCityName() {
    var CityName = $('#City_Name').val();
    this.Local_Storage.setItem('City_Name', CityName);
    
    if (this.selectedCity == null) {
    } else {
      this.router.navigate(['/find-all-pincodes/' + this.StateName.replace(/\s+/g, '-').toLowerCase() + '/' + CityName.replace(/\s+/g, '-').toLowerCase()]);
    }
  }

  GetTalukName() {
    var TalukName = $('#Taluk_Name').val();
    this.Local_Storage.setItem('Taluk_Name', TalukName);
    if (this.selectedTaluk == null) {
    } else {
      this.router.navigate(['/find-all-pincodes/' + this.StateName.replace(/\s+/g, '-').toLowerCase() + '/' + this.CityName.replace(/\s+/g, '-').toLowerCase() + '/' + TalukName.replace(/\s+/g, '-').toLowerCase()]);
    }
  }

  GetBranchName() {
    var BranchName = $('#Branch_Name').val();
    this.Local_Storage.setItem('Branch_Name', BranchName);
    if (this.selectedBranch == null) {
    } else {
      this.router.navigate(['/pincode/' + this.StateName.replace(/\s+/g, '-').toLowerCase() + '/' + this.CityName.replace(/\s+/g, '-').toLowerCase() + '/' + this.TalukName.replace(/\s+/g, '-').toLowerCase() + '/' + BranchName.replace(/\s+/g, '-').toLowerCase()]);
    }
  }

  // statename() {
  //   var getPinCode =
  //   {
  //     city: this.city,
  //     taluk: this.TALUK,
  //   }
  //   this.service1.getPinCode(getPinCode).subscribe((allbanklist: any[]) => {
  //     this.STATE = allbanklist['pincode'];
  //   });
  // }
  
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

  tableshowmore() {
    $('.localitypincodelist').css('height', '100px');
    $('.localitypincodelist').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  tableshowless() {
    $('.localitypincodelist').css('height', '80px');
    $('.localitypincodelist').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }
}
