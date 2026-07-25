import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService2 } from '../data.service2';
import { Meta, Title } from '@angular/platform-browser';
declare var $: any;

declare var $: any;
@Component({
  selector: 'app-bank-state',
  templateUrl: './bank-state.component.html',
  styleUrls: ['./bank-state.component.css']
})
export class BankStateComponent implements OnInit {
  customOptionsTopProjects: OwlOptions = {
    loop: false,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    center: false,
    autoplaySpeed: 1000,
    navSpeed: 1000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: false,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/leftarrow.png alt=\'LeftArrow\' class=\'ifsc_page_owl owl-nav owl-prev main_move_left\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/rightarrow.png alt=\'RightArrow\' class=\'ifsc_page_owl owl-nav owl-next main_move_right\'>'],
    responsive: {
      0: {
        items: 3
      },
      480: {
        items: 3
      },
      700: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  };
  TestingOwl3: OwlOptions = {
    loop: false,
    // margin:10,
    nav: true,
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
  TestingOwl: OwlOptions = {
    loop: false,
    // margin:10,
    nav: false,
    dots: false,
    // autoplay:true,
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
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
  private routeSub: Subscription;

  changeText: boolean;
  CurrentBankName: any;
  bank_discription: any;
  blogs: any;
  Trending_Blogs: any;
  Meta_bankname: any;
  constructor(
    @Inject(WINDOW) private window: Window,
    public Service: DataService,
    private activeroute: ActivatedRoute,
    public Service2: DataService2,
    private router: Router,
    @Inject(LOCAL_STORAGE) private Local_Storage: any,
    private titleService: Title, private meta: Meta,

  ) {
    this.changeText = false;
  }
  selectedBanks: any;
  selectedState: any;
  registerForm: FormGroup;
  SelectedAllBankingNames: any;
  SelectedAllStateNames: any;
  ngOnInit(): void {
    // this.getAllindiaBanks();
    this.GetAllStateName();
    this.getAlllocationlist();
    // this.metaseo();
    var giftofspeed = document.createElement('link');
    giftofspeed.rel = 'stylesheet';
    giftofspeed.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';
    giftofspeed.type = 'text/css';
    var godefer = document.getElementsByTagName('link')[0];
    godefer.parentNode.insertBefore(giftofspeed, godefer);

    var giftofspeed2 = document.createElement('link');
    giftofspeed2.rel = 'stylesheet';
    giftofspeed2.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';
    giftofspeed2.type = 'text/css';
    var godefer2 = document.getElementsByTagName('link')[0];
    godefer2.parentNode.insertBefore(giftofspeed2, godefer2);

    this.stickyload();
    $(".result").hover(
      function () {
        $(this).addClass("result_hover");
      },
      function () {
        $(this).removeClass("result_hover");
      }
    );
    this.affordablePropDetails();
  }
  ApiStateName: any;

  // ************* Bank APIs Start  ***************//
  getAllindiaBanks() {
    this.Service2.getallbankingnames().subscribe((allbanklist: any[]) => {
      this.SelectedAllBankingNames = allbanklist['BankDetails'];
    });
  }
  componentloads = false;

  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScroll() {
    this.Service.mouseenterservice3();
    if (this.componentloads == false) {
      this.componentloads = true;
      this.getAllindiaBanks();
    }
  }
  // metaseo(){

  // }
  GetBankNameNav() {
    var bankName = $('#Bank_Name').val();
    this.Local_Storage.setItem('Bank_Name', bankName);

    if (this.selectedBanks == null) {
    } else {
      this.router.navigate(['/all-ifsc-and-micr-code/' + bankName.replace(/\s+/g, '-').toLowerCase()]);
    }
  }
  // ************* Bank APIs End  ***************//

  // ************* State APIs start  ***************//
  Bankname: any
  GetAllStateName() {

    this.routeSub = this.activeroute.params.subscribe(params => {
      var BankName = params['Bankname'].replace(/-/g, ' ');
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      this.Meta_bankname = params['Bankname'].replace(/-/g, ' ').toLocaleUpperCase();
      this.titleService.setTitle('Find All IFSC & MICR Code For ' + this.Meta_bankname + ' in India | Homes247');
      this.meta.updateTag({
        name: 'description',
        content: 'Find All the details For ' + this.Meta_bankname + ' IFSC & MICR Code in India at Homes247.in'
      });
      this.Service.createLinkForCanonicalURL();

      this.Bankname = BankName.replace(/\s+/g, '-').toLowerCase();
      this.CurrentBankName = BankName;
      var param = {
        Bank: BankName,
      };
      this.Service2.IfscFetching(param).subscribe(lists => {
        var State = lists['BankDetails'];
        this.ApiStateName = State;
        //  this.bank_discription = State[0]['bank_description']
        this.bank_discription = State?.[0]?.bank_description || '';
        //  
      });
    })
  }
  StateName: any;
  GetStateNameNav() {
    var StateName = $('#State_Name').val();
    this.StateName = StateName.replace(/\s+/g, '-').toLowerCase();
    this.Local_Storage.setItem('State_Name', StateName);

    if (this.selectedState == null) {
    } else {
      this.router.navigate(['/all-ifsc-and-micr-code/' + this.Bankname + '/' + this.StateName]);
    }
  }
  // ************* State APIs End  ***************//
  citiess: any;
  City_Value: any;
  getAlllocationlist() {
    this.Service.getlocationlist().subscribe(city => {
      this.citiess = city['locations'];
    });
  }
  readmore() {
    $('.banner_description').css('height', '200px');
    $('.banner_description').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  readless() {
    $('.banner_description').css('height', '130px');
    $('.banner_description').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }
  iconOne = true;
  iconTwo = true;
  iconThree = true;
  iconFour = true;
  iconamenities = true;
  faqMore = false;

  onIconOne() {
    if (this.iconOne === true) {
      this.iconOne = false;
      this.iconTwo = false;
      this.iconamenities = true;
      this.iconThree = true;
      this.iconFour = true;
    } else if (this.iconOne === false) {
      this.iconamenities = true;
      this.iconOne = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
    }
  }
  blogimagePath = this.Service.imagesURL + 'stories/';
  affordablePropDetails() {
    this.Service.getrecentblogs().subscribe((blogs: any[]) => {
      this.blogs = blogs['locations'];
    });
    const id = '1'
    this.Service2.getcategoryblogs(id).subscribe(blogs => {
      this.Trending_Blogs = blogs['blogcategory'];
    });
  }
  localitys: any;
  locality = [];
  stickyload() {
    $(this.window).scroll(function () {
      if ($(this).scrollTop() > 10) {
        $('.top_section_mainheader').css('display', 'none');
        // $('.top_section_mainheader').css('transition', '0.3s ease-in-out');
        $('.fixed_section_SubHeader').css('display', 'block');
        $('.fixed_section_SubHeader').addClass('fixed_search');
        $('.fixed_section_SubHeader').css('margin-top', '0px');
        // $('.fixed_section_SubHeader').css('transition', '0.2s ease-in-out');
      } else {
        $('.top_section_mainheader').css('display', 'block');
        // $('.top_section_mainheader').css('transition', '0.3s ease-in-out');
        $('.fixed_section_SubHeader').css('display', 'block');
        $('.fixed_section_SubHeader').css('margin-top', '49px');
        // $('.fixed_section_SubHeader').css('transition', '0.2s ease-in-out');
      }
      if ($(this).scrollTop() > 800) {
        $('#filterId').addClass('filterSelectedDivOnScroll');
        $('#filterId').removeClass('filterSelectedDiv');
      } else {
        $('#filterId').addClass('filterSelectedDiv');
        $('#filterId').removeClass('filterSelectedDivOnScroll');
      }
    });
    // var regionid = '';
    // const cityid = '1'
    // this.Service.getlocality(cityid, regionid).subscribe(localitys => {
    //   this.localitys = localitys['details'];
    // });
  }
  onLocalityChange(event) {
    var text = $("#multi-select").dropdown("get value");
    // this.Filter.Servicelocality = text;
    this.locality = text;
    // 
    // this.showLoader = true;
    // this.sectionFirstResponce = false;
    // // this.getcity();
    // this.Service.mouseenterservice1();
  }
  //   mouseEnter(div : string){
  //     
  //  }

  //  mouseLeave(div : string){
  //    
  //  }

}
