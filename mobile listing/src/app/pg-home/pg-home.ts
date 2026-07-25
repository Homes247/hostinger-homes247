import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { CountdownModule } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
// import { PipeModule } from '../pipe/pipe.module';
// import { Shared3Module } from '../shared/shared.module3';
import { MatSelectModule } from '@angular/material/select';
import { cleanUrlPipe, customPriceFormatPipe } from '../mainpipe-pipe';
import { SafeStorageService } from '../safe-storage.service';
import { HomeSidenavbar } from '../home-sidenavbar/home-sidenavbar';


declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-pg-home',
  templateUrl: './pg-home.html',
  styleUrls: ['./pg-home.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CarouselModule,
    NgOtpInputModule,
    // CountdownModule,
    // Shared3Module,
    MatSelectModule,
    NgxSkeletonLoaderModule,
    // PipeModule,
    // LazyLoadImageModule,
    cleanUrlPipe,
    customPriceFormatPipe,
    HomeSidenavbar
  ],
})
export class PgHomeComponent implements OnInit, AfterViewInit {

  trendingBlogs: any[] = [];

  Mousemovement: boolean = false;
  HideMovement: boolean = true;
  blogs: any;
  blogapiload = true;
  loaded = false;
  citiess: any;
  allCommercialProperties = [];
  PGRent = [];
  FooterComponent: any;
  componentloads = false;
  allBuilders = [];
  topprojectsloader = true;
  blogsloader = true;
  public text: string = 'Enter a location, builder, project';
  UserId: any;
  Matautocomplete: any;
  loginshow = true;
  userlogin = false;
  allPGProperties: any;
  PGforcolive: any;
  PGforboys: any;
  PGforgirls: any;
  cityId: string;
  currentCity = 'Bangalore';
  currentCity2 = 'bangalore';
  boysprojectsloader = true;
  girlsprojectsloader = true;
  coliverojectsloader = true;
  localstorediv: any;
  userRentalFavList = [];
  propertyIds = [];

  // private storage = this.storage;

  window!: Window;


  @ViewChild('tabScroll') tabScroll!: ElementRef;
  @ViewChild('activeTab') activeTab!: ElementRef;

  constructor(
    public cityservice: CityService,
    private dataService: DataService,
    private router: Router,
    @Inject(DOCUMENT) private doc: any,
    private titleService: Title,
    private meta: Meta,
    private activeroute: ActivatedRoute,
    private storage: SafeStorageService,
    
  ) { 
    this.window = this.doc.defaultView!;
  }

  ngAfterViewInit() {
    const cards = document.querySelectorAll('#txtTop');
    cards.forEach((card: any) => {
      if (card.offsetWidth > 138) {
        card.style.paddingLeft = '6px';
      }
    });
    this.activeTab.nativeElement.scrollLeft = this.activeTab.nativeElement.scrollWidth;
  }

  IsVisible = false;

  ngOnInit(): void {
    this.dataLoads()
    this.getlocationlist();
    import('../footer-new-mobile/footer-new-mobile').then(m => {
      this.FooterComponent = m.FooterNewMobile;
    });
  }

  allCommercialpropertyimage: any
  coverimage: any
  propertyimage: any
  propertyimageRent: any
  builderLogo: any
  blogimagePath: any
  dataLoads() {
    this.allCommercialpropertyimage = 'https://img-mc.homes247.in/assets/images/Icons/pg_type/';
    this.coverimage = this.dataService.PGImg + 'gallery/';
    this.propertyimage = this.dataService.CoverImagelink;
    this.propertyimageRent = this.dataService.RentCoverImagelink;
    this.builderLogo = this.dataService.imagesURL + 'builder/';
    this.blogimagePath = this.dataService.blogimageURL + 'stories/';
  }
  headerOnScroll = false;
  @HostListener('touchstart', ['$event'])
  handleTouch(event: any) {

    const scrollTop = window.scrollY;

    if (scrollTop > 80 && !this.headerOnScroll) {
      this.headerOnScroll = true;
    }

    if (scrollTop <= 80 && this.headerOnScroll) {
      this.headerOnScroll = false;
    }
    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });
  }

  private routeSub: Subscription;

  getlocationlist() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.dataService.getlocationlist().subscribe((city: any[]) => {
        this.citiess = city['locations'];
      });

      this.dataService.gettopBuildersCommercial().subscribe((topBuilders: any[]) => {
        this.allBuilders = topBuilders['builderinfo'];
      });

      this.dataService.getrecentblogs().subscribe((blogs: any[]) => {
        if (blogs['status'] === 'True') {
          this.blogsloader = false;
          this.blogs = blogs['locations'];
          this.blogapiload = false;
        } else {
          this.blogsloader = true;
        }
      });

      const trendingId = '1';
      this.dataService.getTrendingblogsList(trendingId).subscribe(responce => {
        if (responce['status'] === 'True') {
          this.trendingBlogs = responce['blogcategory'];
        }
      });

      var param4 = { cityId: 1 };
      this.dataService.pgProperties(param4).subscribe((topProperty: any[]) => {
        if (topProperty['status'] === 'True') {
          this.allPGProperties = topProperty['Pgdetails'];
        }
      });

      var param1 = { limit: 0, limitrows: 20, pg_type: 1 };
      var param2 = { limit: 0, limitrows: 20, pg_type: 2 };
      var param3 = { limit: 0, limitrows: 20, pg_type: 3 };

      var value = this.cityservice.cityfinder(this.router.url);

      if (value.cityname == null || value.cityname == undefined) {
      } else {
        this.currentCity2 = value.cityname.toLowerCase().replace(/\s+/g, '-');
        this.currentCity = value.cityname;
        this.cityId = value.cityid;
      }

      if (this.cityId !== null || this.cityId != undefined || this.cityId != '') {
        this.titleService.setTitle('PGs in ' + this.currentCity + ' | Best Paying Guest Accommodation');
        this.meta.updateTag({ name: 'description', content: 'Find top PGs in ' + this.currentCity + ' for students & professionals. Affordable rents, food, WiFi & furnished rooms. Book your PG with Homes247.in.' });
        this.meta.updateTag({ property: 'og:title', content: 'PGs for Rent in ' + this.currentCity + ' | Verified PGs & Co-living' });
        this.meta.updateTag({ property: 'og:description', content: 'Discover verified PGs in ' + this.currentCity + '. Boys PG, Girls PG & Co-living options with food, WiFi & housekeeping. Start your search with Homes247.in.' });
      } else {
        this.titleService.setTitle('PGs for Rent in India | Best Paying Guest Accommodation');
        this.meta.updateTag({ name: 'description', content: 'Search verified PGs across India for students & working professionals. Affordable rent, furnished rooms, food & WiFi available in prime locations.' });
        this.meta.updateTag({ property: 'og:title', content: 'PGs for Rent in India | Verified PG Accommodation' });
        this.meta.updateTag({ property: 'og:description', content: 'Browse Boys PG, Girls PG & Co-living spaces across India. Affordable PGs with food, WiFi & security at Homes247.in.' });
      }

      this.dataService.createLinkForCanonicalURL();

      this.dataService.PGRent(this.currentCity2, param1).subscribe((topProperty: any[]) => {
        this.boysprojectsloader = false;
        if (topProperty['status'] === 'True') {
          this.PGforboys = topProperty['details'] || [];
        } else {
          this.PGforboys = [];
        }
      });

      this.dataService.PGRent(this.currentCity2, param2).subscribe((topProperty: any[]) => {
        this.girlsprojectsloader = false;
        if (topProperty['status'] === 'True') {
          this.PGforgirls = topProperty['details'] || [];
        } else {
          this.PGforgirls = [];
        }
      });

      this.dataService.PGRent(this.currentCity2, param3).subscribe((topProperty: any[]) => {
        this.coliverojectsloader = false;
        if (topProperty['status'] === 'True') {
          this.PGforcolive = topProperty['details'] || [];
        } else {
          this.PGforcolive = [];
        }
      });

      this.dataService.pgProperties(param4).subscribe((topProperty: any[]) => {
        if (topProperty['status'] === 'True') {
          this.allPGProperties = topProperty['Pgdetails'];
        }
      });

         const userId = this.storage?.getItem('userID');
    if (userId) {
        this.UserId = this.storage?.getItem('userID');
        if (!('pgPropertyID' in this.storage)) {
          this.storage.setItem('pgPropertyID', '[]');
        }
        this.dataService.getUserWishListByIdTest(this.UserId, 5).subscribe(userFavList => {
          this.userRentalFavList = userFavList['favouritelist'];
          this.propertyIds = this.userRentalFavList.map(item => item.propertyId) || [];
        });
      } else {
        if ('pgPropertyID' in this.storage) {
          this.storagearr = JSON.parse(this.storage?.getItem('pgPropertyID')!);
        } else {
          this.storage.setItem('pgPropertyID', '[]');
          this.storagearr = JSON.parse(this.storage?.getItem('pgPropertyID')!);
        }
      }
    });
  }

  customOptionsTopBuilders: OwlOptions = {
    loop: false,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    center: false,
    autoplaySpeed: 1000,
    navSpeed: 1000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: true,
    navText: [
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/newChangeProp/arrowleft.png alt=\'LeftArrow\' class=\'homeBuilders1 owl-nav owl-prev main_move_left\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/newChangeProp/arrowRight.png alt=\'RightArrow\' class=\'homeBuilders1 owl-nav owl-next main_move_right\'>',
    ],
    responsive: {
      0: { items: 3 },
      480: { items: 3 },
      700: { items: 4 },
      940: { items: 4 },
    },
  };

  storagearr = [];

  isInWishlist1(propertyID: number): boolean {
      const userId = this.storage?.getItem('userID');
    if (userId) {
      this.storagearr = this.propertyIds;
      return this.storagearr.includes(propertyID);
    } else {
      return this.storagearr.includes(propertyID);
    }
  }

  Heart_Transtion1(propertyID: number) {
    const index = this.storagearr?.indexOf(propertyID);
    var loginID = this.storage?.getItem('loginID');
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = this.storage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 5 };
        this.dataService.removeFavaourite(param).subscribe(response => { });
      }
    } else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = this.storage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 5 };
        this.dataService.addfavaourite(param).subscribe(response => { });
      }
    }
    this.storage.setItem('pgPropertyID', JSON.stringify(this.storagearr));
    if ('pgPropertyID' in this.storage) {
      this.storagearr = JSON.parse(this.storage?.getItem('pgPropertyID')!);
    } else {
      this.storage.setItem('pgPropertyID', '[]');
      this.storagearr = JSON.parse(this.storage?.getItem('pgPropertyID')!);
    }
  }

  shareContent(Property: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({
        title: 'Checkout this Property - ' + Property.Propertyname,
        text: 'Check out ' + 'Test',
        url: 'https://www.homes247.in/pgd/pg-for-rent-in-' + Property.city.toLowerCase() + '-' + Property.propartid,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  clickNavopen() {
    this.doc.getElementById('mySidenavsss').style.width = '250px';
    $('body').css('overflow', 'hidden');
    $('.navbar-custom').css('z-index', '0');
  }

  ShowHidecontact() {
    $('#FirstCityModal').modal('show');
    $('.modal-backdrop').removeClass('modal-backdrop fade show');
    $('.matAuto').css('display', 'block');
  }

  clickNavclose() {
    this.doc.getElementById('mySidenavsss').style.width = '0';
    $('body').css('overflow', 'scroll');
    $('.navbar-custom').css('z-index', '999');
  }

  username: any;

  Login() {
    const loginid = this.storage?.getItem('loginID');
    const username = this.storage?.getItem('userName');
    const userid = this.storage?.getItem('userID');
    if (loginid === '1') {
      this.userlogin = true;
      this.loginshow = false;
      this.username = username;
      this.UserId = userid;
    }
  }

  Logout() {
    this.storage.clear();
    window.location.reload();
  }

  IsVisiblee = false;
  ShowHide_More() {
    this.IsVisiblee = this.IsVisiblee ? false : true;
  }
}