import { CommonModule, DOCUMENT, SlicePipe } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnInit } from '@angular/core';
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
import { HomeSidenavbar } from '../home-sidenavbar/home-sidenavbar';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial-home.html',
  styleUrls: ['./commercial-home.css'],
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
    HomeSidenavbar,

  ],
})
export class CommercialHome implements OnInit, AfterViewInit {

  trendingBlogs: any[] = [];
  Mousemovement: boolean = false;
  HideMovement: boolean = true;
  blogs: any;
  blogapiload = true;
  loaded = false;
  citiess: any;
  allCommercialProperties = [];
  commercialPropertiesSale = [];
  commercialPropertiesRent = [];
  FooterComponent: any;
  componentloads = false;
  allBuilders = [];
  topprojectsloader = true;
  blogsloader = true;
  public text: string = 'Enter a location, builder, project';
  UserId: any;
  loginshow = true;
  userlogin = false;
  Matautocomplete: any;
  sale_rent: any = 1;
  currentCity = 'Bangalore';
  currentCity2 = 'bangalore';
  commercial_sale = true;
  commercial_rent = true;
  cityname: any;
  userRentalFavList = [];
  propertyIds = [];



  constructor(
    public cityservice: CityService,
    private dataService: DataService,
    private router: Router,
    @Inject(DOCUMENT) private doc: any,
    private activeroute: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
  ) { }

  ngAfterViewInit() {
    const cards = document.querySelectorAll('#txtTop');
    cards.forEach((card: any) => {
      if (card.offsetWidth > 138) {
        card.style.paddingLeft = '6px';
      }
    });
  }

  IsVisible = false;
  ShowHidecontact() {
    $('#FirstCityModal').modal('show');
    $('.modal-backdrop').removeClass('modal-backdrop fade show');
    $('.matAuto').css('display', 'block');
  }

  ngOnInit(): void {
    this.dataLoads()
    this.getlocationlist();
      import('../footer-new-mobile/footer-new-mobile').then(m => {
      this.FooterComponent = m.FooterNewMobile;
    });
  }
  propertyimage: any
  propertyimageRent: any
  builderLogo: any
  blogimagePath: any
  allCommercialpropertyimage: any
  coverimage: any

  dataLoads() {
    this.propertyimage = this.dataService.CoverImagelink;
    this.propertyimageRent = this.dataService.RentCoverImagelink;
    this.builderLogo = this.dataService.imagesURL + 'builder/';
    this.blogimagePath = this.dataService.blogimageURL + 'stories/';
    this.allCommercialpropertyimage = 'https://img-mc.homes247.in/assets/images/Icons/com_type/';
    this.coverimage = this.dataService.commercialImg + 'gallery/';
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
      var value = this.cityservice.cityfinder(this.router.url);
      if (value.cityname == undefined || value.cityname == null) {
      } else {
        this.currentCity = value.cityname;
        this.currentCity2 = value.cityname.toLowerCase().replace(/\s+/g, '-');
      }

      if (value.cityname != undefined || value.cityname != null) {
        this.titleService.setTitle('Commercial Properties in ' + this.currentCity + ' | Office, Shops & Retail');
        this.meta.updateTag({ name: 'description', content: 'Find commercial office spaces, shops & retail properties in ' + this.currentCity + '. Flexible lease options, affordable rent & prime business locations.' });
        this.meta.updateTag({ property: 'og:title', content: 'Commercial Properties in ' + this.currentCity + ' | Rent & Sale' });
        this.meta.updateTag({ property: 'og:description', content: 'Explore commercial spaces in ' + this.currentCity + '. Offices, shops, showrooms & co-working spaces available for rent & sale. Schedule a site visit today.' });
      } else {
        this.titleService.setTitle('Commercial Properties in India | Office, Shops & Retail');
        this.meta.updateTag({ name: 'description', content: 'Browse verified commercial properties across India. Find office spaces, shops, retail outlets & co-working spaces at prime locations.' });
        this.meta.updateTag({ property: 'og:title', content: 'Commercial Properties for Rent & Sale in India' });
        this.meta.updateTag({ property: 'og:description', content: 'Search commercial spaces across India. Affordable offices, retail shops & showrooms with flexible rent & lease options.' });
      }

      this.dataService.createLinkForCanonicalURL();

      this.dataService.getlocationlist().subscribe((city: any[]) => {
        this.citiess = city['locations'];
      });

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

      var param = { limit: 0, limitrows: 20, sale_rent: 1 };

      this.dataService.postPropNewCommercial1().subscribe(list => {
        this.tagOptions = list['commercialPropertyTypeList'];
      });

      this.dataService.commercialSaleProperties(this.currentCity2, param).subscribe((topProperty: any[]) => {
        this.commercial_sale = false;
        if (topProperty['status'] === 'True') {
          this.commercialPropertiesSale = topProperty['details'] || [];
        } else {
          this.commercialPropertiesSale = [];
        }
      });

      var param2 = { limit: 0, limitrows: 20, sale_rent: 2 };
      this.dataService.commercialSaleProperties(this.currentCity2, param2).subscribe((topProperty: any[]) => {
        this.commercial_rent = false;
        if (topProperty['status'] === 'True') {
          this.commercialPropertiesRent = topProperty['details'] || [];
        } else {
          this.commercialPropertiesRent = [];
        }
      });

      var param3 = { cityId: 1, sale_rent: this.sale_rent };
      this.dataService.commercialProperties(param3).subscribe((topProperty: any[]) => {
        if (topProperty['status'] === 'True') {
          this.allCommercialProperties = topProperty['commercial_details'];
        }
      });
    });

    if ('userID' in localStorage) {
      this.UserId = localStorage?.getItem('userID');
      if (!('commercialPropertyID' in localStorage)) {
        localStorage.setItem('commercialPropertyID', '[]');
      }
      this.dataService.getUserWishListByIdTest(this.UserId, 4).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map(item => item.propertyId) || [];
      });
    } else {
      if ('commercialPropertyID' in localStorage) {
        this.storagearr = JSON.parse(localStorage?.getItem('commercialPropertyID')!);
      } else {
        localStorage.setItem('commercialPropertyID', '[]');
        this.storagearr = JSON.parse(localStorage?.getItem('commercialPropertyID')!);
      }
    }
  }

  sale_rent_value: any = 'sale';
  typefetch(value: any) {
    if (value == 'Buy') {
      this.sale_rent_value = 'sale';
    } else if (value == 'Lease') {
      this.sale_rent_value = 'rent';
    }
  }

  clickNavopen() {
    this.doc.getElementById('mySidenavsss').style.width = '250px';
    $('body').css('overflow', 'hidden');
    $('.navbar-custom').css('z-index', '0');
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
    if ('userID' in localStorage) {
      this.storagearr = this.propertyIds;
      return this.storagearr.includes(propertyID);
    } else {
      return this.storagearr.includes(propertyID);
    }
  }

  Heart_Transtion1(propertyID: number, commercial_type: any) {
    const index = this.storagearr?.indexOf(propertyID);
    var loginID = localStorage?.getItem('loginID');
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = localStorage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 4 };
        this.dataService.removeFavaourite(param).subscribe(response => { });
      }
    } else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = localStorage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 4 };
        this.dataService.addfavaourite(param).subscribe(response => { });
      }
    }
    let existingData = localStorage?.getItem('commercialPropertyData');
    let dataArray = existingData ? JSON.parse(existingData) : [];
    if (index === -1) {
      const finalObject = { commercialPropertyID: propertyID, commercialType: commercial_type };
      dataArray.push(finalObject);
    } else {
      dataArray = dataArray.filter((item: any) => item.commercialPropertyID !== propertyID);
    }
    localStorage.setItem('commercialPropertyData', JSON.stringify(dataArray));
    localStorage.setItem('commercialPropertyID', JSON.stringify(this.storagearr));
  }

  shareContent(data: any, type: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({
        title: 'Checkout this Property - ' + data.Propertyname,
        text: 'Check out ' + 'Property',
        url: 'https://www.homes247.in/cld/commercial-properties-for-' + type + '-in-' + data.city_name.toLowerCase() + '-' + data.commercial_type + '-' + data.property_IDFK,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  username: any;

  Login() {
    const loginid = localStorage?.getItem('loginID');
    const username = localStorage?.getItem('userName');
    const userid = localStorage?.getItem('userID');
    if (loginid === '1') {
      this.userlogin = true;
      this.loginshow = false;
      this.username = username;
      this.UserId = userid;
    }
  }

  Logout() {
    localStorage.clear();
    window.location.reload();
  }

  IsVisiblee = false;
  ShowHide_More() {
    this.IsVisiblee = this.IsVisiblee ? false : true;
  }

  clickNavclose() {
    this.doc.getElementById('mySidenavsss').style.width = '0';
    $('body').css('overflow', 'scroll');
    $('.navbar-custom').css('z-index', '999');
  }

  getProjectsmain(currentCity: any) {
    if (this.currentCity === '') {
      swal({ title: 'Please Select city', type: 'error', showConfirmButton: false, timer: 1500 });
    }
    var cityname = currentCity.toLowerCase().replace(/\s+/g, '-');
    this.cityname = cityname;
    const queryParams: any = {
      Propertype: this.selectedPropertyType.length ? this.selectedPropertyType.join(',') : undefined,
    };
    this.router.navigate(['/cll/commercial-properties-for-' + this.sale_rent_value + '-in-' + cityname], {
      relativeTo: this.activeroute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  propertyType: string = 'Buy';
  searchQuery: string = '';
  selectedPurpose: string = 'Buy';
  selectedPropertyType = [];

  tagDropdownOpen = false;
  tagOptions = [];

  toggleTagDropdown() {
    this.tagDropdownOpen = !this.tagDropdownOpen;
  }

  toggleTag(tag: any) {
    tag.selected = !tag.selected;
  }

  getSelectedTags(): string {
    return this.tagOptions
      .filter((item: any) => item.selected)
      .map((item: any) => item.label)
      .join(', ');
  }

  closeDropdown() { }

  selectPropertyType(id: any) {
    if (this.selectedPropertyType.includes(id)) {
      this.selectedPropertyType = this.selectedPropertyType.filter(selected => selected !== id);
    } else {
      this.selectedPropertyType.push(id);
    }
  }
}