import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { FilterService } from '../filter.service';
import { DataService } from '../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService2 } from '../data.service2';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

declare var $: any;
declare var $: any;
@Component({
  selector: 'app-bank-main',
  templateUrl: './bank-main.component.html',
  styleUrls: ['./bank-main.component.css']
})
export class BankMainComponent implements OnInit {
  customOptionsTopProjects: OwlOptions = {
    loop: false,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';

  changeText: boolean;
  selectedBanks: any
  blogs: any;
  Interior: any;
  constructor(
    @Inject(WINDOW) private window: Window,
    public Service: DataService,
    public Service2: DataService2,
    @Inject(LOCAL_STORAGE) private Local_Storage: any,
    private router: Router,
    private titleService: Title, private meta: Meta,
    private activatedRoute: ActivatedRoute

  ) {
    this.changeText = false;
  }
  registerForm: FormGroup;
  SelectedAllBankingNames: any;
  ngOnInit() {

    this.routeSub = this.activatedRoute.params.subscribe(params => {
      const letter = params['alphabet'];
      this.activeLetter = letter;
    });


    this.getAllindiaBanks();
    this.getAlllocationlist();
    this.affordablePropDetails();
    this.metaseo();
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

  }
  metaseo() {
    if (this.activeLetter == undefined || this.activeLetter == '') {
      this.titleService.setTitle('Find IFSC & MICR Codes | Address of All Banks in India');
      this.meta.updateTag({
        name: 'description',
        content: 'Homes247 - Find the list of Indian Financial System Code (IFSC) & MICR Code of all banks in India, other details like address, Branch code, etc.'
      });
    } else {
      this.titleService.setTitle(`IFSC & MICR Codes for Banks Starting with '${this.activeLetter}'`
);
      this.meta.updateTag({
        name: 'description',
        content: `Homes247 - Find the list of Indian Financial System Code (IFSC) & MICR Code of all banks starting with '${this.activeLetter}' in India, other details like address, Branch code, etc.)`
      });
    }

    this.Service.createLinkForCanonicalURL();
  }

  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
    this.Service.mouseenterservice3();
  }

  readmore() {
    $('.banner_description').css('height', '270px');
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
  readmore2() {
    $('.banner_descriptions').css('height', '270px');
    $('.banner_descriptions').css('overflow-y', 'scroll');
    $('.down_arrows').css('display', 'none');
    $('.up_arrows').css('display', 'block');
  }
  readless2() {
    $('.banner_descriptions').css('height', '140px');
    $('.banner_descriptions').css('overflow-y', 'hidden');
    $('.down_arrows').css('display', 'block');
    $('.up_arrows').css('display', 'none');
  }
  popular_bank: any;
  getAllindiaBanks() {
    this.Service2.getallbankingnames().subscribe((allbanklist: any[]) => {
      this.SelectedAllBankingNames = allbanklist['BankDetails'];
    });

    var param1 = {
      popularbank: '1',
    };
    this.Service2.IfscIdFetching(param1).subscribe(lists => {
      var Popular_banks = lists['BankDetails'];
      this.popular_bank = Popular_banks;
    });
  }

  GetBankNameNav() {
    var bankName = $('#Bank_Name').val();
    this.Local_Storage.setItem('Bank_Name', bankName);
    if (this.selectedBanks == null) {
    } else {
      this.router.navigate(['/all-ifsc-and-micr-code/' + bankName.replace(/\s+/g, '-').toLowerCase()]);
    }
  }

  citiess: any;
  private routeSub: Subscription;
  activeLetter: any;

  getAlllocationlist() {
    this.Service.getlocationlist().subscribe(city => {
      this.citiess = city['locations'];
    });

    this.routeSub = this.activatedRoute.params.subscribe(params => {
      const letter = params['alphabet'];
      this.activeLetter = letter;
    });
  }
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
  }
  blogimagePath = this.Service.imagesURL + 'stories/';
  affordablePropDetails() {
    this.Service.getrecentblogs().subscribe((blogs: any[]) => {
      this.blogs = blogs['locations'];
    });
    const id = '5'
    this.Service2.getcategoryblogs(id).subscribe(blogs => {
      this.Interior = blogs['blogcategory'];
    });
  }
}
