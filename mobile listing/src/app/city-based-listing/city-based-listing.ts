import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription, take, } from 'rxjs';
import { map, startWith, switchMap, filter } from 'rxjs/operators';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { ProplistingService } from '../proplisting.service';
import { ServerResponseService_city } from '../server-response-6(city).service';
import { ServerResponseService_bstc } from '../server-response-4(bstc).service';
import { ServerResponseService_btc } from '../server-response-4(btc).service';
import { ServerResponseService_bstc_withoutcity } from '../server-response-4-without-city(bstc).service';
import { ServerResponseService_mainhome } from '../server-response-main-home.service';
import { ServerResponseService_withoutcity_btc } from '../server-response-without-city-4(btc).service';
import { ServerResponseService_house } from '../server-response-7(house).service';
import { ServerResponseService_new_ready } from '../server-response-6(new_ready).service';
import { ServerResponseService_atc } from '../server-response-6(atc).service';
import { City, flitercity, minmax, } from './citybasedlisting';
import { log } from 'console';
import { MyJsonLdComponent } from '../my-json-ld/my-json-ld.component';
import { cleanUrlPipe, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany } from '../mainpipe-pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SafeStorageService } from '../safe-storage.service';
// import { CarouselModule, OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';





declare var $: any;

@Component({
  selector: 'app-city-based-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MyJsonLdComponent, cleanUrlPipe, NgxSkeletonLoaderModule, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany,InnerHeadderWithSidenav],
  templateUrl: './city-based-listing.html',
  styleUrl: './city-based-listing.css',
  providers: [ServerResponseService_city, ServerResponseService_bstc, ServerResponseService_bstc_withoutcity, ServerResponseService_btc, ServerResponseService_withoutcity_btc, ServerResponseService_mainhome, ServerResponseService_house, ServerResponseService_new_ready, ServerResponseService_atc],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityBasedListing implements AfterViewInit {
  myControl = new FormControl();
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChild('scrollapiloader', { static: false })
  scrollapiloader?: ElementRef;
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  public n: number = 1;
  // public autoCompleteData: { [key: string]: Object }[] = [];
  userlogin = false;
  loginshow = true;
  sortShowHide: boolean;
  IsVisibleFilter: boolean;
  oneBedroomSelect: boolean = false;
  twoBedroomSelect: boolean = false;
  threeBedroomSelect: boolean = false;
  fourBedroomSelect: boolean = false;
  fiveBedroomSelect: boolean = false;
  registerForm: FormGroup;
  newListingCard = false;
  apartmentSelect: boolean = false;
  villaSelect: boolean = false;
  plotSelect: boolean = false;
  readyToMoveSelect: boolean = false;
  underConstructionSelect: boolean = false;
  newLaunchSelect: boolean = false;
  preLaunchSelect: boolean = false;
  newBudget = [];
  budgetsLength: any;
  noOfBedrooms = [];
  projectStatus = [];
  projecttype = [];
  statusid = [];
  proptypeId: any;
  localId: any;
  filterLoader: boolean = false;
  minBugPrice: any;
  maxBugPrice: any;
  filterSelectOne: boolean = false;
  localityHide: boolean = true;
  statusHide: boolean = true;
  projectTypeHide: boolean = true;
  hideDesktopLocality = true;
  minbudget_IDPK;
  maxbudget_IDPK;
  minbudget_value: any;
  maxbudget_value: any;
  static citycount: number;
  proptypeurlparam: any;
  propertyid: any;
  alertmesg: any;
  propidarray = [];
  parsedarray = [];
  jsonparse = [];
  storagearr = [];
  seenProjectsStoragearr: any;
  localstorediv: any;
  localstoredivSeenProjects: any;
  zeroprojects = false;
  citybreadcrump: any;
  localityName: any;
  dropdownSettingsMobile = {};
  localityData = [];
  searches: any;
  localitydescription: any;
  description: boolean;
  seenproject: any;
  UserId: any;
  user = new Enquiry();
  enquiry = new Enquiry();
  propertylists: any;
  projectcount: any;
  localitys: any;
  cityapi = new City();
  city: any;
  citybread: any;
  builder: any;
  localtyname: any;
  zones: any;
  status_name: any;
  budget_show = true;
  bud_val_show = false;
  sortedCollection: any[];
  private routeSub: Subscription;
  cityname: any;
  cityId: any;
  cityhead: any;
  cityidseo: any;
  cityzonelinks: any;
  cityzonelinks_types: any;
  blogapiload = true;
  topnewapiload = true;
  topnewdivreached = false;
  loaded = false;
  FooterComponent: any;
  innerheader: any;
  Relevance: any;
  LowtoHigh: any;
  HightoLow: any;
  Recent: any;
  minprice = new minmax();
  maxprice = new minmax();
  modelmindata: any;
  minprice_value: any;
  maxprice_value: any;
  modeldata: any;
  showLoader = false;
  otploader: boolean = true;
  fliterbedroom: string;
  possission: string;
  locality = [];
  bedroom = new flitercity();
  hideshowcompare: boolean = false;
  compareShowonimg: boolean = false;
  propertiesDetails: any;
  image: any;
  propName: any;
  compareloader1: boolean = true;
  compareloader2: boolean = true;
  compareloader3: boolean = true;
  propertyname1: any;
  propimag1: any;
  propertyname2: any;
  propimag2: any;
  propertyname3: any;
  propimag3: any;
  comparePropType: any;
  compareStorageArry: any;
  propID: any;
  propid1: any;
  compareprop1: boolean = false;
  compareprop2: boolean = false;
  compareprop3: boolean = false;
  propid2: any;
  propid3: any;
  showselectitem: boolean = false;
  showcomparenow: boolean = false;
  addedShow: boolean = false;
  proptype1: any;
  proptype2: any;
  proptype3: any;
  showadded: boolean = false;
  compareproparray: any;
  propertiescount: any;
  Internallinkshide: boolean = true;
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numberdatesforyears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numbersforyears = [1, 2, 3, 4, 5];
  Date = new Date();
  YearDate = new Date();


  breadcrumbLD: SafeHtml;
  carouselsLD: SafeHtml;
  eventsLD: SafeHtml;
  localbusinessLD: SafeHtml;
  productmerchantreviewLD: SafeHtml;
  carouselsarrayjoin: any[] = [];
  eventsarrayjoin: any[] = [];
  localbusinessarrayjoin: any[] = [];
  productmerchantreviewarrayjoin: any[] = [];
  carouselsjson: any;
  eventsjson: any;
  localbusinessjson: any;
  Matautocomplete: any;
  productmerchantreviewjson: any;
  averagerating: any[] = [];
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
  ];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();
  public propertieslists: { [key: string]: Object }[] = [];
  currenturl: any;
  projectcountRent: any;

  Visiblebrochure = false;
  enquiryFormComponent: any;
  projectpgcount: any;
  projectcountcommercial: any;
  userRentalFavList = [];
  propertyIds = [];
  isExpanded = false;
  private mouseSub: any;
  private citySub: Subscription;
  FirstSection: boolean = false;


  constructor(private titleService: Title, private meta: Meta, private sanitizer: DomSanitizer,
    public Service: ProplistingService,
    public Services: DataService,
    private dataService2: DataService2,
    public cityservice: CityService,
    private router: Router,
    private activeroute: ActivatedRoute,
    public Filter: FilterService,
    public responseService_city: ServerResponseService_city,
    public responseService_bstc: ServerResponseService_bstc,
    public responseService_bstc_withoutcity: ServerResponseService_bstc_withoutcity,
    public responseService_btc: ServerResponseService_btc,
    public responseService_btc_withoutcity: ServerResponseService_withoutcity_btc,
    public responseService_Main_Home: ServerResponseService_mainhome,
    public responseService_house: ServerResponseService_house,
    public responseService_new_ready: ServerResponseService_new_ready,
    public responseService_atc: ServerResponseService_atc,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder, private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
  ) {



    this.window = this.doc.defaultView!;

    this.mouseSub = this.Services.mouseenterlisten1()
      .pipe(take(1))
      .subscribe(() => {
        this.getcity();
      });

    if (isPlatformBrowser(this.platformId)) {

      this.router.events.subscribe(() => {

        this.window.scrollTo(0, 0);
      });

      setTimeout(() => {
        this.n += 4;
      }, 1000);
    }

  }
  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }
  window!: Window;
  newProperties = [];
  newlaunchesloader: boolean = true;
  topProperties = [];
  topprojectsloader: boolean = true;
  City2Component: any;
  Mousemovement: boolean = false;
  sublistsection: boolean = false;
  componentloads: boolean = false
  @HostListener('touchstart', [])
  onTouchLoad() {
    if (this.componentloads == false) {
      this.componentloads = true;
      import('../lazy-owl/lazy-owl.component').then(c => {
        this.LazyOwl = c.LazyOwlComponent;
      });
      import('../enquiry-form/enquiry-form')
        .then(c => {
          this.enquiryFormComponent = c.EnquiryFormComponent;
          if (isPlatformBrowser(this.platformId)) {
            $('.modal-login').css('z-index', '99999');
          }
        });
      if (isPlatformBrowser(this.platformId)) {
        this.initIntersectionObserver();

        const link1 = document.createElement('link');
        link1.rel = 'preload';
        link1.as = 'style';
        link1.onload = () => link1.rel = 'stylesheet';
        link1.href =
          'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';

        const link2 = document.createElement('link');
        link2.rel = 'preload';
        link2.as = 'style';
        link2.onload = () => link2.rel = 'stylesheet';
        link2.href =
          'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';

        document.head.appendChild(link1);
        document.head.appendChild(link2);

        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/icons/bar.svg';
        // 👇 This is correct for priority loading
        preloadLink.setAttribute('fetchpriority', 'high');
        const head = document.head;
        if (head.firstChild) {
          head.insertBefore(preloadLink, head.firstChild);
        } else {
          head.appendChild(preloadLink);
        }

      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    if (this.router.getCurrentNavigation()) {
      return;
    }

    this.Mousemovement = true;

    if (!this.scrollapiloader?.nativeElement) return;

    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    this.topnewdivreached = scrollPosition >= elementPosition;

    if (this.topnewdivreached && !this.sublistsection) {
      this.sublistsection = true;
    }

    // existing API logic
    if (this.topnewdivreached && this.topnewapiload) {
      this.topnewapiload = false;

      const paramss = {
        cityId: this.cityId,
      };
    }
  }
  ngOnDestroy() {
    if (this.mouseSub) {
      this.mouseSub.unsubscribe();
    }
  }

  // onWindowScroll() {
  //   const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
  //   const scrollPosition = this.window.pageYOffset;
  //   this.topnewdivreached = scrollPosition >= elementPosition;
  //   if (this.topnewdivreached) {
  //     if (this.topnewapiload == true) {
  //       this.topnewapiload = false;
  //       let id = '1';
  //       var paramss = {
  //         cityId: this.cityId,
  //       };
  //     }
  //   }
  //   // this.FilterTransition();
  //   this.Services.mouseenterservice3();
  //   if (this.componentloads == false) {
  //     this.componentloads = true;
  //     import('../mat-autocomplete-new/mat-autocomplete-new')
  //       .then(c => {
  //         this.Matautocomplete = c.MatAutocompleteNew;
  //       });
  //     import('../enquiry-form/enquiry-form')
  //       .then(c => {
  //         this.enquiryFormComponent = c.EnquiryFormComponent;
  //         $('.modal-login').css('z-index', '99999');

  //       });
  //   }

  // }
  propertyimage: string = '';
  propertyInitialImages: string = '';
  loginidNew: any

  dataloads() {
    this.propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
    this.propertyInitialImages = this.Service.imagesURLInitial + 'uploadPropertyImgs/';

    const loginid = this.storage?.getItem('loginID');
    this.loginidNew = loginid
    this.UserId = this.storage?.getItem("userID");

  }
  ngOnInit() {

    this.dataloads();
    this.PageIndex();
    this.setPageTitle();
  }

  updateCity() {

    var value = this.cityservice.cityfinder(this.router.url);

    this.cityname = value.cityname;

    this.city = this.cityname?.replace('-', ' ');

  }
  // customOptionsGallery: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //   navSpeed: 700,
  //   autoplay: true,
  //   autoplayHoverPause: false,
  //   margin: 10,
  //   autoWidth: false, // Ensure images do not exceed container width
  //   center: true, // Keeps the image centered
  //   lazyLoad: true, // Improves image loading
  //   autoplayTimeout: 3000, // Set delay for auto sliding
  //   smartSpeed: 600, // Smooth sliding animation
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 1
  //     }
  //   },
  // };
  LazyOwl: any = null;
  OwlCarouselComponent: any = null;
  customOptionsGallery: any = {
    loop: true, mouseDrag: true, touchDrag: true, pullDrag: true,
    dots: true, navSpeed: 700, autoplay: true, autoplayHoverPause: false,
    margin: 10, autoWidth: false, center: true, lazyLoad: true,
    autoplayTimeout: 3000, smartSpeed: 600,
    responsive: { 0: { items: 1 }, 400: { items: 1 }, 740: { items: 1 }, 940: { items: 1 } }
  };



  //   doLikeButton(i) {
  //     $(".heart_icon"+i).removeClass('liked-shaked');
  //     $(".heart_icon"+i).toggleClass('liked');
  //     $(".heart_icon"+i).toggleClass('not-liked');
  //     $(".heart_icon"+i).toggleClass('fas');
  //     $(".heart_icon"+i).toggleClass('far');
  //     $(".lkebtns"+i).toggleClass('likeactive');
  //     if($(".heart_icon"+i).hasClass("liked")) {
  //       $(".heart_icon"+i).addClass('liked-shaked');
  //     }else{
  //     } 
  // }
  shuffletopprojects(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.topProperties = a;
  }
  currentCity: any;


  getcity() {
    CityBasedListing.citycount = 5;
    //this.showLoader = true;
    this.shuffle(this.numbers);
    this.shuffle(this.numberdatesforyears);
    this.shuffle(this.numbersforyears);
    const randnum = this.numbers.slice(0, 1);
    const randdatesyears = this.numberdatesforyears.slice(0, 1);
    const randnumyears = this.numbersforyears.slice(0, 1);
    this.Date.setDate(this.Date.getDate() - randnum[0]);
    this.YearDate.setDate(this.YearDate.getDate() - randdatesyears[0]);
    this.YearDate.setFullYear(this.YearDate.getFullYear() + randnumyears[0]);
    const dateonlydate = this.Date.toISOString().split('T')[0];
    const YearDateformatchange = this.YearDate.toISOString().split('T')[0];



    this.filterLoader = true;

    combineLatest([
      // this.activeroute.params,
      this.activeroute.queryParamMap
    ]).pipe(

      switchMap(([queryParams]) => {

        // const hasQueryParams = queryParams.keys.length > 0;

        if (this.router.url?.indexOf('/property-sale') > -1) {


          const propertyType = queryParams.get('propertytype');
          this.Filter.proptypeid = propertyType ? propertyType.split(',') : [];

          const locality = queryParams.get('localityid');
          this.Filter.servicelocality = locality ? locality.split(',') : [];

          const min = queryParams.get('min');
          this.Filter.property_minprice = min ? [min] : [];

          const max = queryParams.get('max');
          this.Filter.property_maxprice = max ? [max] : [];

          const sqftMin = queryParams.get('sqftmin');
          this.Filter.sqftmin = sqftMin ? [sqftMin] : [];

          const sqftMax = queryParams.get('sqftmax');
          this.Filter.sqftmax = sqftMax ? [sqftMax] : [];

          const bedroom = queryParams.get('bedroom');
          this.Filter.Bedrooms = bedroom ? bedroom.split(',') : [];

          const bathroom = queryParams.get('bathroom');
          this.Filter.Bathrooms = bathroom ? bathroom.split(',') : [];

          const availability = queryParams.get('availability');
          this.Filter.possission = availability ? availability.split(',') : [];

          const status = queryParams.get('status');
          this.Filter.statusid = status ? status.split(',') : [];

          const amenities = queryParams.get('amenities');
          this.Filter.amenities = amenities ? amenities.split(',') : [];

          const price_on_request = queryParams.get('price_on_request');

          this.Filter.price_on_request = price_on_request
            ? Number(price_on_request)
            : 1;

        }

        // DO NOT clear filters if no queryParams
        // filters remain unchanged

        const value = this.cityservice.cityfinder(this.router.url);
        const citiname = value?.cityname?.replace('-', ' ');

        this.cityname = citiname?.replace('-', ' ');
        this.citybreadcrump = this.cityname.toLocaleLowerCase();

        this.UserId = this.storage?.getItem("userID");

        const param = {
          limit: 0,
          limitrows: 5,
          proptypeid: this.Filter.proptypeid,
          bedroom: this.Filter.Bedrooms,
          bathroom: this.Filter.Bathrooms,
          price_on_request: this.Filter.price_on_request,
          minprice: this.Filter.property_minprice,
          maxprice: this.Filter.property_maxprice,
          possission: this.Filter.possission,
          locality: this.Filter.servicelocality,
          statusid: this.Filter.statusid,
          amenityId: this.Filter.amenities,
          area_min: this.Filter.sqftmin,
          area_max: this.Filter.sqftmax,
          searches: this.searches,
          regionid: this.zoneid,
        };
        this.otploader = true;
        return this.Service.getprojectscount(citiname, param).pipe(

          switchMap(countprojects => {

            this.filterLoader = false;

            let projectcount = countprojects['Counts'];
            this.projectcount = projectcount?.[0]?.PropertyCounts ?? 0;
            this.zeroprojects = this.projectcount <= 0;
            this.setPageTitle();

            return this.Service.getCity(citiname, param);

          })

        );

      })

    ).subscribe(lists => {

      if (lists['status'] == "True") {
        let propertylists = lists['deatils'];
        this.propertylists = propertylists;
        this.newListingCard = true;
        this.showLoader = false;
        this.otploader = false;


        if (this.projectcount <= 4) {
          if (isPlatformBrowser(this.platformId)) {
            $('.search-results').css('padding-bottom', '22px');
          }
        }

      } else {
        this.showLoader = true;
        this.otploader = true;

      }

    });







    const value = this.cityservice.cityfinder(this.router.url);
    const citiname = value?.cityname?.replace('-', ' ');
    var paramInd = {};

    this.Service.getindividualprojectscount(citiname, paramInd).subscribe(projectcounts => {
      let projectcount = projectcounts['Counts'];
      this.propertiescount = projectcount?.[0]?.PropertyCounts;
    });


    this.Services.getRentprojectscount(citiname, paramInd).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.projectcountRent = projectcount?.[0]?.PropertyCounts ?? 0;
    });

    var param2 = {
      limit: '',
      limitrows: ''
    };

    this.Services.PGRentCount(citiname, param2).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.projectpgcount = projectcount?.[0]?.PropertyCounts ?? 0;
    })

    this.Services.commercialSalePropertiesCount(citiname, param2).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.projectcountcommercial = projectcount?.[0]?.PropertyCounts ?? 0;
    })

    // const breadcrumbjson = {
    //   "@context": "https://schema.org",
    //   "@type": "BreadcrumbList",
    //   "itemListElement": [
    //     {
    //       "@type": "ListItem",
    //       "position": 1,
    //       "name": "India's Favourite Property Portal!",
    //       "item": "https://www.homes247.in/"
    //     },
    //     {
    //       "@type": "ListItem",
    //       "position": 2,
    //       "name": 'Real Estate in ' + this.cityname + '',
    //       "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-')
    //     },
    //     {
    //       "@type": "ListItem",
    //       "position": 3,
    //       "name": "Properties for Sale in " + this.cityname + "",
    //       "item": "https://www.homes247.in" + this.router.url
    //     }]
    // }
    // this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);

    // ******************Structured data — deferred 4s (SEO crawlers don't need these instantly)*********************
    setTimeout(() => {

    // ******************Carousal Structured data Starts*********************
    var carousalparam = {
      cityid: this.cityId,
      limit: 0,
      limitrows: 20,
    }


    this.Services.getlocalityproperties(carousalparam).subscribe(lists => {
      this.propertieslists = lists['autolist'];
      for (let i = 0; i < 40; i++) {
        // console.log("https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists)

        this.carouselsjson =
        {
          "@type": "ListItem",
          "position": i,
          "name": (this.propertieslists?.[i]?.['name'] ?? '') +
            " in " +
            (this.propertieslists?.[i]?.['locality'] ?? '') +
            " , " +
            (this.propertieslists?.[i]?.['city'] ?? ''),

          "description":
            (this.propertieslists?.[i]?.['name'] ?? '') +
            " in " +
            (this.propertieslists?.[i]?.['locality'] ?? '') +
            " , " +
            (this.propertieslists?.[i]?.['city'] ?? '') +
            " Reviews | Price | Homes247.in ",
          "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists[i]?.['coverimage'],
          "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id']
        }
        this.carouselsarrayjoin.push(this.carouselsjson);
      }
      this.carouselsLD = this.getcarousalSafeHTML(this.carouselsarrayjoin);
    });
    // ******************Carousal Structured data Ends*********************

    // ******************Events Structured data Starts*********************

    var eventsparam = {
      cityid: this.cityId,
      limit: 40,
      limitrows: 20,
    }
    this.Services.getlocalityproperties(eventsparam).subscribe(lists => {
      this.propertieslists = lists['autolist'];
      for (let i = 0; i < (this.propertieslists?.length ?? 0); i++) {
        this.eventsjson = {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": (this.propertieslists?.[i]?.['name'] ?? '') +
            " in " +
            (this.propertieslists?.[i]?.['locality'] ?? '') +
            " , " +
            (this.propertieslists?.[i]?.['city'] ?? ''),

          "description": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'] + " | Reviews | Price | Homes247.in ",
          "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists[i]?.['coverimage'],
          "startDate": dateonlydate + "T18:30+05:30",
          "endDate": YearDateformatchange + "T18:30+05:30",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": {
            "@type": "VirtualLocation",
            "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id'],
          },
          "performer": {
            "@type": "PerformingGroup",
            "name": "Homes247.in"
          },
          "organizer": {
            "@type": "Organization",
            "name": "Homes247.in",
            "url": "https://www.homes247.in"
          },
          "offers": [{
            "@type": "Offer",
            "name": (this.propertieslists?.[i]?.['name'] ?? '') +
              " in " +
              (this.propertieslists?.[i]?.['locality'] ?? '') +
              " , " +
              (this.propertieslists?.[i]?.['city'] ?? ''),

            "price": this.propertieslists[i]['price'],
            "priceCurrency": "INR",
            "validFrom": dateonlydate + "T18:30+05:30",
            "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id'],
            "availability": "https://schema.org/InStock"
          }]
        }
        this.eventsarrayjoin.push(this.eventsjson);
      }
      this.eventsLD = this.getSafeHTML(this.eventsarrayjoin);

    });

    // ******************Events Structured data Ends*********************

    // ******************Localbusiness Structured data Starts*********************

    var localbusinessparam = {
      cityid: this.cityId,
      limit: 80,
      limitrows: 20,
    }
    this.Services.getlocalityproperties(localbusinessparam).subscribe(lists => {
      this.propertieslists = lists['autolist'];
      if (this.propertieslists?.length) {
        for (let i = 0; i < this.propertieslists.length; i++) {
          this.localbusinessjson =
          {
            "@context": "http://schema.org/",
            "@type": "RealEstateAgent",
            "name": (this.propertieslists?.[i]?.['name'] ?? '') +
              " in " +
              (this.propertieslists?.[i]?.['locality'] ?? '') +
              " , " +
              (this.propertieslists?.[i]?.['city'] ?? ''),

            "description": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'] + " | Reviews | Price | Homes247.in ",
            "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id'],
            "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists[i]?.['coverimage'],
            "telephone": "9164247247",
            "address": {
              '@type': 'PostalAddress',
              'streetAddress': this.propertieslists[i]['locality'] + ',' + this.propertieslists[i]['name'],
              'addressLocality': this.propertieslists[i]['locality'],
              'postalCode': '560001',
              'addressRegion': this.propertieslists[i]['city'],
              'addressCountry': 'IN'
            },
            'priceRange': this.propertieslists[i]['price'],
            'openingHoursSpecification': [{
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              'opens': '10:00',
              'closes': '18:30'
            }],
          }
          this.localbusinessarrayjoin.push(this.localbusinessjson);
        }
      }
      this.localbusinessLD = this.getSafeHTML(this.localbusinessarrayjoin);
    });

    // ******************Localbusiness Structured data Ends***********************

    // *********************Product - Merchant Listings - Review Snippets Structured data Starts*********************

    var productmerchantreviewparam = {
      cityid: this.cityId,
      limit: 150,
      limitrows: 20,
    }
    this.Services.getlocalityproperties(productmerchantreviewparam).subscribe(lists => {
      this.propertieslists = lists['autolist'];
      for (let i = 0; i < this.propertieslists?.length; i++) {
        this.averagerating[i] = this.propertieslists[i]['Averagerating'];
        this.productmerchantreviewjson = {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": (this.propertieslists?.[i]?.['name'] ?? '') +
            " in " +
            (this.propertieslists?.[i]?.['locality'] ?? '') +
            " , " +
            (this.propertieslists?.[i]?.['city'] ?? ''),

          "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists[i]?.['coverimage'],
          "description": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'] + " | Reviews | Price | Homes247.in ",
          "sku": "Homes247",
          "mpn": "Homes247-" + this.propertieslists[i]['id'],
          "brand": {
            "@type": "Brand",
            "name": "Homes247.in"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": parseFloat(this.averagerating[i]).toFixed(1),
            "reviewCount": this.propertieslists[i]['Totalratings']
          },
          "offers": {
            "@type": "Offer",
            "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name']?.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id'],
            "priceCurrency": "INR",
            "price": this.propertieslists[i]['price'],
            "priceValidUntil": YearDateformatchange + "T18:30+05:30",
            "itemCondition": "NewCondition",
            "availability": "InStock"
          }
        }
        this.productmerchantreviewarrayjoin.push(this.productmerchantreviewjson);
      }
      this.productmerchantreviewLD = this.getSafeHTML(this.productmerchantreviewarrayjoin);
    });

    // *********************Product - Merchant Listings - Review Snippets Structured data Ends*********************

    }, 4000); // End of deferred structured data block

    if (isPlatformBrowser(this.platformId)) {
      this.window.scroll(0, 0);
    }
  }

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.updateCity();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateCity();
      });


    if (isPlatformBrowser(this.platformId)) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/icons/bar.svg';
      // 👇 This is correct for priority loading
      // preloadLink.setAttribute('fetchpriority', 'high');
      const head = document.head;
      if (head.firstChild) {
        head.insertBefore(preloadLink, head.firstChild);
      } else {
        head.appendChild(preloadLink);
      }
    }

    if (isPlatformBrowser(this.platformId)) {
      this.scripts();
    }
    this.onresize();
    this.searches = this.activeroute.queryParams['_value']['Searches'];

    // Defer sub-section API calls — load after page is interactive
    setTimeout(() => {
      this.luxuryPropDetails();
      this.getTopProjects();
      this.onReadyToMoveDetails();
      this.affordablePropDetails();
    }, 2000);

    // Lazy load only once
    if (this.Filter.componentloads == false) {
      this.Filter.componentloads = true;



    }

    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });

    if (isPlatformBrowser(this.platformId)) {
      $('.head_sticky').css('padding-bottom', '61px');
    }

  }



  private initIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadMore();
          // 
        }
      });
    });

    if (this.scrollAnchor?.nativeElement && this.observer) {
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
  }


  pagePropertyCount: number = 0

  loadMore() {

    this.pagePropertyCount = CityBasedListing.citycount


    this.showLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {

      let totalcount = this.projectcount;
      // const limit = CityBasedListing.citycount += 5;
      const limit = CityBasedListing.citycount;
      CityBasedListing.citycount += 5;
      let limitprprtyrows = 5;
      // let limitprprtyrows = 5;
      var bedroom = this.Filter.Bedrooms;
      var minprice = this.Filter.property_minprice;
      var maxprice = this.Filter.property_maxprice;
      var pos = this.Filter.possission;
      var locality = this.Filter.servicelocality;
      var projectStatus = this.Filter.statusid;
      var proptypeId = this.Filter.proptypeid;
      var amenityId = this.Filter.amenities;
      var area_min = this.Filter.sqftmin;
      var area_max = this.Filter.sqftmax;
      var bathroom = this.Filter.Bathrooms;
      var price_on_request = this.Filter.price_on_request;
      var regionid = this.zoneid;

      this.UserId = this.storage?.getItem("userID");
      let param = {
        limit: limit,
        limitrows: limitprprtyrows,
        bedroom: bedroom,
        price_on_request: price_on_request,
        minprice: minprice,
        maxprice: maxprice,
        possission: pos,
        locality: locality,
        statusid: projectStatus,
        proptypeid: proptypeId,
        bathroom: bathroom,
        area_max: area_max,
        area_min: area_min,
        amenityId: amenityId,
        // userId: this.UserId,
        regionid: regionid,
      };
      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        if (isPlatformBrowser(this.platformId)) {
          $('.search-results').css('padding-bottom', '22px');
        }
        return this.Service.getCity(this.city, param).subscribe(propertylists => {
          var status = propertylists['status'];
          if (status == "False") {
            this.showLoader = false;
            // 
            if (isPlatformBrowser(this.platformId)) {
              $('.search-results').css('padding-bottom', '22px');
            }
          } else {
            this.propertylists = this.propertylists.concat(propertylists['deatils']);

            //  this.propertylists = (this.propertylists || []).concat(propertylists['details'] || []);

          }
        });

      } else {
        this.showLoader = false;
      }
      return true;
    });
  }





  sectionFirstResponce: boolean = false;
  username: any;




  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2)?.replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  topsearch: any;
  featured: any;
  uploads: any;
  options;
  filteredOptions: Observable<any>;
  hideautocompletedata = true;
  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  // getlocality() {
  //   var value = this.cityservice.cityfinder(this.router.url);
  //   this.cityId = value.cityid;
  //   this.Services.getAuto(this.cityId).subscribe(myLocalList => {
  //     this.apioptions(myLocalList['autolist']);
  //     this.autoCompleteData = myLocalList['autolist'];
  //     if (myLocalList['status'] == "False") {
  //       this.hideautocompletedata = false;
  //     } else {
  //       this.hideautocompletedata = true;
  //     }
  //   });

  // }

  // ******************Carousal Structured data Starts*********************
  getcarousalSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2)?.replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">{
      "@context":"http://schema.org",
        "@type":"ItemList",
        "name":"Properties For Sale in ${this.city} | Homes247.in",
        "description":"Properties for sale in ${this.city}, Get the Details on Availability, Price Trends of houses in ${this.city}, Enquire Now and avail best price on Homes247.in",
        "itemListElement":[
          ${json}
      ],"numberOfItems":40}
    </script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  // ******************Carousal Structured data Ends*********************


  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }






  // @HostListener('transitionend', ['$event'])
  // transitionend(event){
  //   ;
  // }


  scripts() {
    if (isPlatformBrowser(this.platformId)) {
      $(function () {
        // this.doc.body.scrollTop = 0;
        // this.doc.documentElement.scrollTop = 0;
        // $('.ui.dropdown').dropdown();
        $('.ui.search.dropdown').dropdown({
          minCharacters: 3,
          useLabels: false
        });
      });
      var width = this.window.innerWidth;
      if (width < 420) {
        if (this.router.url?.indexOf('hyderabad') > -1) {
          $('.about_us_banner label.nodescrip').css('top', '67%');
          $('.about_us_banner img').css('height', '140px');
          $('.breadcrumbs_city').css('top', '35%');
        } else if (this.router.url?.indexOf('chennai') > -1) {
          $('.about_us_banner label.nodescrip').css('top', '67%');
          $('.about_us_banner img').css('height', '140px');
          $('.breadcrumbs_city').css('top', '35%');
        } else if (this.router.url?.indexOf('kochi') > -1) {
          $('.about_us_banner label.nodescrip').css('top', '67%');
          $('.about_us_banner img').css('height', '140px');
          $('.breadcrumbs_city').css('top', '35%');
        } else if (this.router.url?.indexOf('pune') > -1) {
          $('.about_us_banner label.nodescrip').css('top', '67%');
          $('.about_us_banner img').css('height', '140px');
          $('.breadcrumbs_city').css('top', '35%');
        }
      } else {

      }
    }
    // Pradeesh
    if (this.storage?.getItem('userID') !== null) {

      this.UserId = this.storage?.getItem('userID');

      let stored = this.storage?.getItem('propertyID');
      this.storagearr = stored ? JSON.parse(stored) : [];

      this.Services.getUserWishListByIdTest(this.UserId, 1)
        .subscribe(userFavList => {

          this.userRentalFavList = userFavList['favouritelist'];

          this.propertyIds =
            this.userRentalFavList.map(item => item.propertyId) || [];

          this.storagearr = [...this.propertyIds];

          this.storage.setItem('propertyID',
            JSON.stringify(this.storagearr));

          // console.log(this.storagearr);
        });

    } else {

      let stored = this.storage?.getItem('propertyID');
      this.storagearr = stored ? JSON.parse(stored) : [];

    }

    if ('SeenPropertyID' in this.storage) {
      this.seenProjectsStoragearr = JSON.parse(this.storage?.getItem('SeenPropertyID'));
    } else {
      this.storage.setItem('SeenPropertyID', '[]');
      this.seenProjectsStoragearr = JSON.parse(this.storage?.getItem('SeenPropertyID'));
    }
    // seen projects
  }

  onresize() {
    this.registerForm = this.fb.group({
      projectType: [''],
      minBudget: [''],
      maxBudget: [''],
      posessionWithin: [''],
      locality: [''],
    });
    this.cityzonelinks_types = false;

  }

  city4Component: any
  // componentloads = false;

  ShowHideFilter() {
    this.Services.mouseenterservice5();

    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
          // $('.head_stick').css('display', 'none');
        } else {
          // $('.head_stick').css('display', 'block');
        }
      }
    }, 300);
    if (isPlatformBrowser(this.platformId)) {
      $('#filterModal').modal('show');

      this.window.scroll(0, 0);

      this.sortShowHide = false;
    }
  }



  readmore() {
    if (isPlatformBrowser(this.platformId)) {
      this.isExpanded = true;
      $('.desc_div').css('height', 'auto');
      $('.overflow').css('height', 'scroll');
      $('.city_div img').css('filter', 'brightness(.2)');
      $('.banner_description').css('overflow-y', 'scroll');
      $('.banner_description').css('height', '330px');
      $('.city_div').css('height', '510px');
      $('.about_us_banner label').css('top', '20%');
      $('.down_arrow').css('display', 'none');
      $('.up_arrow').css('display', 'block');
    }
  }

  readless() {
    if (isPlatformBrowser(this.platformId)) {
      var scrollToTarget = function (target, containerEl) {
        // Moved up here for readability;
        var isElement = target && target.nodeType === 1,
          isNumber = Object.prototype.toString.call(target) === '[object Number]';

        if (isElement) {
          containerEl.scrollTop = target.offsetTop;
        } else if (isNumber) {
          containerEl.scrollTop = target;
        } else if (target === 'bottom') {
          containerEl.scrollTop = containerEl.scrollHeight - containerEl.offsetHeight;
        } else if (target === 'top') {
          containerEl.scrollTop = 0;
        }
      };
      this.isExpanded = false;
      var scrollableDiv = this.doc.getElementById('scrollable');
      scrollToTarget('top', scrollableDiv);
      $('.banner_description').css('height', '34px');
      $('.about_us_banner label').css('top', '40%');
      $('.about_us_banner label.descrip').css('top', '28%');
      $('.banner_description').css('overflow-y', 'hidden');
      $('.down_arrow').css('display', 'block');
      $('.up_arrow').css('display', 'none');
    }
  }

  property_id: any;
  propertyname: any;

  getenquiry(id, name) {
    this.property_id = id;
    this.enquiry.propertyname = name;
  }



  SelectedPropName: any;

  propertyNameClick(PropertyName, RegionID, localityid, PropertyID) {
    this.SelectedPropName = PropertyName;
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.propid = PropertyID;
    if (isPlatformBrowser(this.platformId)) {
      $('#otpValidate').css('display', 'block');
    }

  }



  onLocalitySelect(eve) {
    this.localityData.push(eve.locality_IDPK);
    this.locality = this.localityData;
    this.getcity();
  }

  onLocalityDeSelect(event) {
    var index = this.locality?.indexOf(event);
    this.localityData.splice(index, 1);
    this.getcity();
  }





  citiess: any;
  getlocationlist() {
    this.Services.getlocationlist().subscribe(city => {
      this.citiess = city['locations'];

    });
  }






  wishlistaddstorage(id) {
    if ('propertyID' in this.storage) {
    } else {
      this.storage.setItem('propertyID', '[]');
    }
    const proparray = this.storage?.getItem('propertyID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(id);

    this.parsedarray = JSON.parse(proparray);
    if (itemToRemoveIndex == -1) {
      // ;
      this.parsedarray.push(id);
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    } else {
      // ;
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== id;
      });
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    }
  }

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }



  Oncompareclick() {
    this.Services.mouseenterservice2();
    this.compareShowonimg = this.compareShowonimg ? false : true;
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
    if (this.compareproparray.length >= 1) {
      this.hideshowcompare = true;
      this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
      if (compare1 != undefined) {
        this.dataService2.getpropertynew(compare1).subscribe(prop => {
          let propDetails = prop['details'];
          this.propertiesDetails = propDetails;
          this.propimag1 = this.propertiesDetails[0].images[0].name;
          this.propertyname1 = this.propertiesDetails[0]['propertyName'];
          this.propid1 = this.propertiesDetails[0]['property_info_IDPK'];
          this.compareloader1 = false;
          this.compareprop1 = true;
        });
      }
      if (compare2 != undefined) {
        this.dataService2.getpropertynew(compare2).subscribe(prop => {
          let propDetails = prop['details'];
          this.propertiesDetails = propDetails;
          this.propimag2 = this.propertiesDetails[0].images[0].name;
          this.propertyname2 = this.propertiesDetails[0]['propertyName'];
          this.propid2 = this.propertiesDetails[0]['property_info_IDPK'];
          this.compareloader2 = false;
          this.compareprop2 = true;
        });
      }
    } else {
      this.hideshowcompare = false;
    }
    this.sortShowHide = false;
  }

  async oncompareshowimgclick(propid, proptype) {
    this.storage.removeItem('ComparePropID1_ReSale');
    this.storage.removeItem('comparePropType_ReSale_1');
    this.storage.removeItem('comparePropType_ReSale_2');
    this.hideshowcompare = true;
    if ('ComparePropID' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID', '[]');
    }
    this.comparePropType = this.storage?.getItem('comparePropType1');
    const proparray = this.storage?.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
    if (this.comparePropType == null) {
      const itemToRemoveIndex = jsonpars?.indexOf(propid);
      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        if (this.compareproparray.length >= 2) {
          const Swal = await this.getSwal();
          Swal.fire({
            text: 'Upto two properties can compare at a time',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.parsedarray.push(propid);
          this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function (item) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.storage.removeItem('comparePropType1');
        } else {
          this.hideshowcompare = true;
        }
        this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
      }
    } else if (this.comparePropType == proptype) {
      const proparray = this.storage?.getItem('ComparePropID');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars?.indexOf(propid);
      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        if (this.compareproparray.length >= 2) {
          const Swal = await this.getSwal();
          Swal.fire({
            text: 'Upto two properties can compare at a time',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.parsedarray.push(propid);
          this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function (item) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.storage.removeItem('comparePropType1');
        } else {
          this.hideshowcompare = true;
        }
        this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
      }
    } else {
      const Swal = await this.getSwal();
      Swal.fire({
        text: 'Compare only with same Property Type',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID'));
    var compare1 = this.compareStorageArry[0];
    var compare2 = this.compareStorageArry[1];
    if (compare1 != undefined) {
      this.dataService2.getpropertynew(compare1).subscribe(prop => {
        let propDetails = prop['details'];
        this.propertiesDetails = propDetails;
        this.propimag1 = this.propertiesDetails[0].images[0].name;
        this.propertyname1 = this.propertiesDetails[0]['propertyName'];
        this.propid1 = this.propertiesDetails[0]['property_info_IDPK'];
        this.proptype1 = this.propertiesDetails[0]['propertyType'];
        this.cityname = this.propertiesDetails[0]['city_name'];
        this.storage.setItem('comparePropType1', this.proptype1);
        this.compareloader1 = false;
        this.compareprop1 = true;
      });
    }
    if (compare2 != undefined) {
      this.dataService2.getpropertynew(compare2).subscribe(prop => {
        let propDetails = prop['details'];
        this.propertiesDetails = propDetails;
        this.propimag2 = this.propertiesDetails[0].images[0].name;
        this.propertyname2 = this.propertiesDetails[0]['propertyName'];
        this.propid2 = this.propertiesDetails[0]['property_info_IDPK'];
        this.proptype2 = this.propertiesDetails[0]['propertyType'];
        this.cityname = this.propertiesDetails[0]['city_name'];
        this.storage.setItem('comparePropType2', this.proptype2);
        this.compareloader2 = false;
        this.compareprop2 = true;
      });
    }
  }

  closeprop1(propid1) {
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.storage.removeItem('comparePropType1');
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID', '[]');
    }
    const proparray = this.storage?.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(propid1);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== propid1;
      });
      this.compareloader1 = true;
      this.compareprop1 = false;
      this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
    }
  }

  closeprop2(propid2) {
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.storage.removeItem('comparePropType2');
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID', '[]');
    }
    const proparray = this.storage?.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(propid2);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== propid2;
      });
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID'));
    }
  }

  CompareNow() {
    this.router.navigate(['/compare-properties']);
    this.storage.setItem('cityname', this.cityname);
  }



  isInWishlist(propertyID: number): boolean {
    const userId = this.storage?.getItem('userID');

    return userId
      ? this.storagearr.includes(propertyID) ?? false
      : this.storagearr.includes(propertyID) ?? false;
  }
  // Pradeesh
  Heart_Transtion(propertyID: number) {

    let stored = this.storage?.getItem('propertyID');
    this.storagearr = stored ? JSON.parse(stored) : [];

    const index = this.storagearr?.indexOf(propertyID);
    const loginID = this.storage?.getItem('loginID');

    if (index !== -1) {
      this.storagearr.splice(index, 1);

      if (loginID === '1') {
        const userid = this.storage?.getItem('userID');
        const param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 1
        };

        this.Services.removeFavaourite(param).subscribe();
      }

    } else {
      this.storagearr.push(propertyID);

      if (loginID === '1') {
        const userid = this.storage?.getItem('userID');
        const param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 1
        };

        this.Service.addfavaourite(param).subscribe();
      }
    }

    this.storage.setItem('propertyID', JSON.stringify(this.storagearr));
    if (this.storage?.getItem('propertyID')) {
      this.storagearr = JSON.parse(this.storage?.getItem('propertyID'));
    } else {
      this.storage.setItem('propertyID', '[]');
      this.storagearr = JSON.parse(this.storage?.getItem('propertyID'));
    }
  }



  shareContent(propertydemo) {
    if ((window.navigator as any).share) {
      // if(propertydemo.propertyype != 'Plot'){
      (window.navigator as any)
        .share({
          title: "Test",
          text: 'Check out this amazing Property!',
          url: 'https://www.homes247.in/property/' + propertydemo.city_name.toLowerCase()?.replace(/\s+/g, '-') + '/' + propertydemo.locality_name.toLowerCase()?.replace(/\s+/g, '-') + '/' + propertydemo.propertyName.toLowerCase()?.replace(/\s+/g, '-') + '-' + propertydemo.property_info_IDPK,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));

    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  // ----------Pradeesh city Optimize-----------------
  maincitypage = false;
  cityhomepage = false;
  readytomoveflats = false;
  newprojects = false;
  citystatuscombo = false;
  citycombo = false;
  localitycombo = false;
  budgetFlatTrue = false;
  residflatsforsale = false;
  villas = false;
  plots = false;
  home = false;
  stlc = false;
  btlc = false;
  upcoming_new_launch = false;
  status = false;
  zone = false;
  mainpage = false;
  agriculture = false;
  rentpage = false;
  projectandvideos = true;
  builder_locality = true;
  builderid: any;
  cityid: any;
  buildername: any;
  maxPrice;
  minPrice;
  builderlocality: any;
  statusId: any;
  proptypeid: any;
  projectstatus: any;
  public localityproperties: { [key: string]: Object }[] = [];
  localityId: any;
  bhkValue: any;
  property_type: any;
  localityproperties_hide = true;
  propertytypeid: any;
  zoneid: any;
  regionid: any;
  apc = false;
  lpc = false;
  ltc = false;
  btluc = false;
  btac = false;
  atc = false;
  ResidenceType: any;
  breadcrumbjson: any;
  titleName: string;
  secondorytitle: string;
  broadmatch: string;
  urlmatch: string;
  apartmentUrl = false;
  URLID: any;
  pagedescription: any;
  oneBhkUrl = false;
  twoBhkUrl = false;
  threeBhkUrl = false;
  fourBhkUrl = false;
  fiveBhkUrl = false;
  villasUrl = false;
  plotUrl = false
  independentHouseUrl = false;

  breadcrumbs: { label: string; url: string }[] = [];
  setBreadcrumbs(): void {
    const city = (this.currentCity || this.cityname || '').toString().trim();
    const citySlug = city.toLowerCase()?.replace(/\s+/g, '-');
    const bhk = this.noOfBedrooms;

    const home = { label: 'Home', url: '/' };
    const cityProps = { label: `Properties in ${city}`, url: `/${citySlug}/property-sale` };
    const flatsForSale = { label: `Flats for Sale in ${city}`, url: `/residential-flats-in-${citySlug}-for-sale` };
    const newProjects = { label: `New Projects in ${city}`, url: `/new-launch-projects/new-projects-in-${citySlug}` };

    if (this.maincitypage) {
      this.breadcrumbs = [
        home,
        { label: `Real Estate in ${city}`, url: `/real-estate-in-${citySlug}` },
        { label: `Overview of ${city}`, url: `/city-overview/${citySlug}-overview` },
        { label: `Properties for Sale in ${city}`, url: this.router.url }
      ];
    } else if (this.readytomoveflats) {
      this.breadcrumbs = [
        home,
        newProjects,
        cityProps,
        flatsForSale,
        { label: `Ready to Move Flats in ${city}`, url: this.router.url }
      ];
    } else if (this.newprojects) {
      this.breadcrumbs = [
        home,
        cityProps,
        flatsForSale,
        { label: `New Launch Flats in ${city}`, url: this.router.url }
      ];
    } else if (this.citystatuscombo) {
      this.breadcrumbs = [
        home,
        cityProps,
        flatsForSale,
        { label: `Ready to Move Flats in ${city}`, url: `/ready-to-move-apartments/ready-to-move-flats-in-${citySlug}` },
        { label: `${bhk} BHK Ready to Move Flats in ${city}`, url: this.router.url }
      ];
    } else if (this.citycombo) {
      this.breadcrumbs = [
        home,
        cityProps,
        flatsForSale,
        { label: `${bhk} BHK in ${city}`, url: this.router.url }
      ];
    } else if (this.residflatsforsale) {
      this.breadcrumbs = [
        home,
        newProjects,
        cityProps,
        { label: `Residential Flats for Sale in ${city}`, url: this.router.url }
      ];
    } else if (this.budgetFlatTrue) {
      this.breadcrumbs = [
        home,
        newProjects,
        cityProps,
        { label: this.titleName, url: this.router.url }
      ];
    } else if (this.villas) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Villas for Sale in ${city}`, url: this.router.url }
      ];
    } else if (this.atc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Affordable Projects in ${city}`, url: this.router.url }
      ];
    } else if (this.ltc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Luxury Projects in ${city}`, url: this.router.url }
      ];
    } else if (this.apc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Affordable ${this.ResidenceType} in ${city}`, url: this.router.url }
      ];
    } else if (this.lpc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Properties in ${city}`, url: `/${citySlug}/property-sale` },
        { label: `Luxury Projects in ${city}`, url: this.router.url }
      ];
    } else if (this.btac) {
      this.breadcrumbs = [
        home,
        cityProps,
        flatsForSale,
        { label: `${bhk} BHK Affordable Flats in ${city}`, url: this.router.url }
      ];
    } else if (this.btluc) {
      this.breadcrumbs = [
        home,
        cityProps,
        flatsForSale,
        { label: `${bhk} BHK Luxury Flats in ${city}`, url: this.router.url }
      ];
    } else {
      this.breadcrumbs = [home, cityProps];
    }
  }

  pageTitle: string = '';
  setPageTitle(): void {
    const raw = (this.currentCity || this.cityname || '').toString().trim();
    const city = raw.charAt(0).toUpperCase() + raw.slice(1);
    const bhk = this.noOfBedrooms;

    if (this.maincitypage) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Properties for Sale in ${city}`;
    } else if (this.readytomoveflats) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Ready to Move Flats in ${city}`;
    } else if (this.newprojects) {
      this.pageTitle = `${this.projectcount || 'XXXX'} New Launch Projects in ${city}`;
    } else if (this.citystatuscombo) {
      this.pageTitle = `${bhk} BHK Ready to Move Flats in ${city}`;
    } else if (this.citycombo) {
      this.pageTitle = `${bhk} BHK ${this.status_name} in ${city}`;
    } else if (this.residflatsforsale) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Residential Flats for Sale in ${city}`;
    } else if (this.budgetFlatTrue) {
      this.pageTitle = `${this.projectcount || 'XXXX'} ${this.titleName}`;
    } else if (this.villas) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Villas for Sale in ${city}`;
    } else if (this.atc) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Affordable Projects in ${city}`;
    } else if (this.ltc) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Luxury Projects in ${city}`;
    } else if (this.apc) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Affordable Apartments in ${city}`;
    } else if (this.lpc) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Luxury Projects in ${city}`;
    } else if (this.btac) {
      this.pageTitle = `${bhk} BHK Affordable Flats in ${city}`;
    } else if (this.btluc) {
      this.pageTitle = `${bhk} BHK Luxury Flats in ${city}`;
    } else {
      this.pageTitle = `${this.projectcount || 'XXXX'} Properties in ${city}`;
    }


    this.setBreadcrumbs();
  }
  PageIndex() {
    if (this.router.url?.indexOf('/property-sale') > -1) {
      this.Filter.proptypeid = [],
        this.Filter.servicelocality = [],
        // console.log('localityid', this.Filter.servicelocality);

        this.Filter.property_minprice = [],
        this.Filter.property_maxprice = [],
        this.Filter.sqftmin = [],
        this.Filter.sqftmax = [],
        this.Filter.Bedrooms = [],
        this.Filter.Bathrooms = [],
        this.Filter.possission = [],
        this.Filter.statusid = [],
        this.Filter.amenities = []
      this.maincitypage = true;
      this.cityhomepage = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.mainpage = false;
      this.projectandvideos = false;
      this.builder_locality = false;
      this.rentpage = false;

      this.routeSub = this.activeroute.params.subscribe(params => {
        var citiname = params['cityname']?.toString().trim()?.replace(' ', '-');
        this.currentCity = citiname;

        var City_Seo = this.currentCity.toLowerCase()?.replace(/\s+/g, '-');
        var value = this.cityservice.cityfinder(this.router.url);
        this.cityid = value.cityid;
        // 

        if (this.router.url?.indexOf('/' + City_Seo + '/property-sale') > -1) {
          var urlstructure1 = '/' + City_Seo + '/property-sale'
        } else {
        }

        if (this.router.url?.indexOf('--') > -1) {
          this.responseService_city.set301Status(City_Seo);
        } else if (this.router.url?.indexOf(urlstructure1) > -1) {
        } else {
          this.responseService_city.set301Status(City_Seo);
        }
        this.cityname = citiname;

        const breadcrumbjson = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "India's Favourite Property Portal!",
              "item": "https://www.homes247.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": 'Real Estate in ' + this.cityname + '',
              "item": "https://www.homes247.in/real-estate-in-" + this.cityname + ""
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Properties for Sale in " + this.cityname + "",
              "item": "https://www.homes247.in" + this.router.url
            }]
        }
        this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        const title = 'Properties For Sale in ' + this.cityname + ' | Homes247.in';
        const description = 'Properties for sale in ' + this.cityname + '. Get Details on Availability and Price Trends of houses in ' + this.cityname + '. Enquire Now and avail best price on Homes247.in.';

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
          let metatags = metatag['Citylistingseo'];
          if (!metatags?.length) {


          } else {
            // const title = metatags[0].page_title;
            // const description = metatags[0].meta_description;

            // this.titleService.setTitle(title);
            // this.meta.updateTag({ name: 'description', content: description });
            // this.meta.updateTag({ property: 'og:title', content: title });
            // this.meta.updateTag({ property: 'og:description', content: description });
            // this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
            // this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
            // this.meta.updateTag({ property: 'og:type', content: 'website' });
            // this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            // this.meta.updateTag({ name: 'twitter:title', content: title });
            // this.meta.updateTag({ name: 'twitter:description', content: description });
            // this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

            this.localitydescription = metatags[0].city_description;
          }
        });
      })


    } else if (this.router.url?.indexOf('/new-launch-projects/new-projects-in-') > -1) {
      this.ready_new();
    } else if (this.router.url?.indexOf('/ready-to-move-apartments/ready-to-move-flats-in-') > -1) {
      this.ready_new();
    } else if (this.router.url?.indexOf('/btc/') > -1) {
      this.bhk_status_type_locality_city();
    } else if (this.router.url?.indexOf('/bstc/') > -1) {
      this.bhk_status_type_locality_city();
    } else if (this.router.url?.indexOf('residential-flats-in') > -1) {
      this.fbc_residential();
    } else if (this.router.url?.indexOf('fbc') > -1) {
      this.fbc_residential();
    } else if (this.router.url?.indexOf('villas-for-sale-in-') > -1) {
      this.Villas();
    } else if (this.router.url?.indexOf('plots-in-') > -1) {
      this.Plots();
    } else if (this.router.url?.indexOf('home-for-sale-in-') > -1) {
      this.Home();
    } else if (this.router.url?.indexOf('apc') > -1) {
      this.Apc();
    } else if (this.router.url?.indexOf('lpc') > -1) {
      this.Lpc();
    } else if (this.router.url?.indexOf('/ltc/') > -1) {
      this.Ltc();
    } else if (this.router.url?.indexOf('btluc') > -1) {
      this.Btluc();
    } else if (this.router.url?.indexOf('btac') > -1) {
      this.Btac();
    } else if (this.router.url?.indexOf('/atc/') > -1) {
      this.Atc();
    } else if (this.router.url?.indexOf('/status/') > -1) {
      this.Status();
    } else if (this.router.url?.indexOf('/zone/') > -1) {
      this.Zone();
    } else if (this.router.url?.indexOf('/agricultural-land-for-sale-in-') > -1) {
      this.Agriculture();
    } else {
      this.mainpage = true;
      this.rentpage = false;
      this.maincitypage = false;
      this.cityhomepage = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.projectandvideos = false;
      this.builder_locality = false;
      if (isPlatformBrowser(this.platformId)) {
        $('.Header_part').css('box-shadow', '2px 2px 5px 2px rgba(0, 0, 0, 0.15)');
      }
    }
    this.Service.createLinkForCanonicalURL();
    this.getcity();
  }

  ready_new() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    // this.readytomoveflats = false;
    // this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.currentCity = this.cityname?.replace('-', ' ');
    this.cityId = value.cityid;
    var City_Seo = this.currentCity.toLowerCase()?.replace(/\s+/g, '-');
    var currentURL = this.router.url.split('?')[0];
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });
    if (this.router.url?.indexOf('/new-launch-projects/new-projects-in-') > -1) {
      var urlstructure11 = '/new-launch-projects/new-projects-in-' + City_Seo
      if (this.router.url?.indexOf('--') > -1) {
        this.responseService_city.set301Status(City_Seo);
      } else if (currentURL === urlstructure11) {
      } else {
        this.responseService_city.set301Status(City_Seo);
      }

    } else if (this.router.url?.indexOf('/ready-to-move-apartments/ready-to-move-flats-in-') > -1) {
      var urlstructure12 = '/ready-to-move-apartments/ready-to-move-flats-in-' + City_Seo

      if (this.router.url?.indexOf('--') > -1) {
        this.responseService_city.set301Status(City_Seo);
      } else if (currentURL === urlstructure12) {
      } else {
        this.responseService_city.set301Status(City_Seo);
      }
      this.apartmentUrl = true;



    } else {
    }

    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['status-:propertytype-in-:city'];
      var statusValue = url.split('-')[0];
      if (statusValue === 'ready') {
        this.readytomoveflats = true;
        this.newprojects = false;
        this.statusId = '50307';
        this.Filter.statusid = this.statusId;
        this.proptypeid = '50401';
        this.Filter.proptypeid = this.proptypeid
        this.status_name = 'Ready to Move';
        const title = 'Ready to Move Flats in ' + this.cityname + ' | Homes247';

        const description = 'Explore ready-to-move flats in ' + this.cityname + ' with verified listings, price insights and real photos. Discover top apartments across prime locations on Homes247.';

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        this.breadcrumbjson = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "India's Favourite Property Portal!",
              "item": "https://www.homes247.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": 'Real Estate in ' + this.cityname + '',
              "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + ""
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Properties for Sale in " + this.cityname + "",
              "item": "https://www.homes247.in/" + this.cityname.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Ready to Move Flats in " + this.cityname + " |  Buy Ready to occupy apartments in " + this.cityname + " | Homes247.in",
              "item": "https://www.homes247.in" + this.router.url
            }]
        }
      } else if (statusValue === 'new') {
        this.newprojects = true;
        this.readytomoveflats = false;
        this.statusId = '50310,50308';
        this.Filter.statusid = this.statusId;
        this.status_name = 'New Launch';
        const title = 'Buy New projects in ' + this.cityname + ' | 2000+ Upcoming Projects';
        const description = 'Discover new launch projects in ' + this.cityname + ' with verified listings, project details and real photos. Explore upcoming apartments and villas on Homes247.';

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        this.breadcrumbjson = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "India's Favourite Property Portal!",
              "item": "https://www.homes247.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": 'Real Estate in ' + this.cityname + '',
              "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + ""
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Properties for Sale in " + this.cityname + "",
              "item": "https://www.homes247.in/" + this.cityname.toString().toLocaleLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": " Buy New projects in " + this.cityname + " | 2000+ Upcoming Projects in " + this.currentCity + " | Homes247.in",
              "item": "https://www.homes247.in" + this.router.url
            }]
        }
      }

      this.breadcrumbLD = this.getSafeHTML(this.breadcrumbjson);
      var status = this.statusId;
      var proptypeid = this.proptypeid;
      var autocomppropparams = {
        cityid: this.cityId,
        statusid: status,
        proptypeid: proptypeid,
      }
      this.Services.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
    })

  }

  bhk_status_type_locality_city() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    // this.citystatuscombo = false;
    // this.citycombo = false;
    // this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    this.cityname = value.cityname;
    this.currentCity = this.cityname.replace('-', ' ');
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId'];
      this.bhkValue = url.charAt(0);
      if (this.bhkValue == 1) {
        this.oneBhkUrl = true;
      } else if (this.bhkValue == 2) {
        this.twoBhkUrl = true;
      } else if (this.bhkValue == 3) {
        this.threeBhkUrl = true;
      } else if (this.bhkValue == 4) {
        this.fourBhkUrl = true;
      } else {
        this.fiveBhkUrl = true;
      }

      this.apartmentUrl = true;

      var bhkValue = url.charAt(0);
      if (bhkValue == '--' || bhkValue == '-') {
        var noOfBedrooms = '3';
      } else {
        noOfBedrooms = bhkValue;
      }
      var City_Seo = this.currentCity.toLowerCase()?.replace(/\s+/g, '-');


      if (this.router.url?.indexOf('bstc') > -1) {
        this.citystatuscombo = true;
        this.citycombo = false;
        this.localitycombo = false;
        this.projectstatus = '50307';
        this.Filter.statusid = this.projectstatus;
        const title = this.bhkValue + ' BHK Ready to Move Flats in ' + this.cityname + ' | Homes247';

        const description = 'Find ' + this.bhkValue + ' BHK ready-to-move flats in ' + this.cityname + ' with verified listings, price details and real photos. Explore top apartments and projects on Homes247.';

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        this.breadcrumbjson = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "India's Favourite Property Portal!",
              "item": "https://www.homes247.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + " | Homes247.in",
              "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": this.bhkValue + " BHK Flats/Apartments in " + this.cityname + " | Homes247.in",
              "item": "https://www.homes247.in/btc/" + this.bhkValue + "-bhk-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-')
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": this.bhkValue + ' BHK Ready to Move Flats/Apartments in ' + this.cityname + ' | Homes247.in',
              "item": "https://www.homes247.in" + this.router.url
            }]
        }


        if (this.currentCity == undefined) {
          this.responseService_bstc_withoutcity.set301Status(noOfBedrooms);
        } else {
        }

        if (this.router.url?.indexOf('/bstc/1-bhk-ready-to-move-flats-apartments-in-') > -1) {
          var urlstructure11 = '/bstc/1-bhk-ready-to-move-flats-apartments-in-' + City_Seo + ''
        } else if (this.router.url?.indexOf('/bstc/2-bhk-ready-to-move-flats-apartments-in-') > -1) {
          var urlstructure12 = '/bstc/2-bhk-ready-to-move-flats-apartments-in-' + City_Seo + ''
        } else if (this.router.url?.indexOf('/bstc/3-bhk-ready-to-move-flats-apartments-in-') > -1) {
          var urlstructure13 = '/bstc/3-bhk-ready-to-move-flats-apartments-in-' + City_Seo + ''
        } else if (this.router.url?.indexOf('/bstc/4-bhk-ready-to-move-flats-apartments-in-') > -1) {
          var urlstructure14 = '/bstc/4-bhk-ready-to-move-flats-apartments-in-' + City_Seo + ''
        } else if (this.router.url?.indexOf('/bstc/5-bhk-ready-to-move-flats-apartments-in-') > -1) {
          var urlstructure15 = '/bstc/5-bhk-ready-to-move-flats-apartments-in-' + City_Seo + ''
        } else if (this.router.url?.indexOf('/bstc/-bhk-ready-to-move-flats-apartments-in-') > -1) {
          var urlstructure16 = '/bstc/-bhk-ready-to-move-flats-apartments-in-' + City_Seo + ''
        } else {
        }
        if (this.router.url?.indexOf('--') > -1) {
          this.responseService_bstc.set301Status(noOfBedrooms, City_Seo);
        } else if (this.router.url?.indexOf(urlstructure11) > -1) {
        } else if (this.router.url?.indexOf(urlstructure12) > -1) {
        } else if (this.router.url?.indexOf(urlstructure13) > -1) {
        } else if (this.router.url?.indexOf(urlstructure14) > -1) {
        } else if (this.router.url?.indexOf(urlstructure15) > -1) {
        } else if (this.router.url?.indexOf(urlstructure16) > -1) {
          this.responseService_bstc.set301Status(noOfBedrooms, City_Seo);
        } else {
          this.responseService_bstc.set301Status(noOfBedrooms, City_Seo);
        }

      } else if (this.router.url?.indexOf('btc') > -1) {
        this.citycombo = true;
        this.citystatuscombo = false;
        this.localitycombo = false;
        if (this.router.url?.indexOf('-flats-') > -1) {
          this.status_name = 'Flats';
        } else if (this.router.url?.indexOf('-villas-') > -1) {
          this.status_name = 'Villas';

        }
        const title = this.getSeoTitle(
          `Buy ${this.bhkValue} BHK ${this.status_name} in ${this.cityname} | Best Deals at Homes247.in`,
          `${this.bhkValue} BHK ${this.status_name} ${this.cityname}`
        );

        const description = `Explore ${this.bhkValue} BHK ${this.status_name} in ${this.cityname}. Discover budget-friendly apartments with essential amenities at Homes247.in. Visit now!`;

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        if (this.currentCity == undefined) {
          this.responseService_btc_withoutcity.set301Status(noOfBedrooms);
        } else {
        }

        // if (this.router.url?.indexOf('/btc/1-bhk-flats-in-') > -1) {
        //   var urlstructure6 = '/btc/1-bhk-flats-in-' + City_Seo + ''
        // } else if (this.router.url?.indexOf('/btc/2-bhk-flats-in-') > -1) {
        //   var urlstructure7 = '/btc/2-bhk-flats-in-' + City_Seo + ''
        // } else if (this.router.url?.indexOf('/btc/3-bhk-flats-in-') > -1) {
        //   var urlstructure8 = '/btc/3-bhk-flats-in-' + City_Seo + ''
        // } else if (this.router.url?.indexOf('/btc/4-bhk-flats-in-') > -1) {
        //   var urlstructure9 = '/btc/4-bhk-flats-in-' + City_Seo + ''
        // } else if (this.router.url?.indexOf('/btc/5-bhk-flats-in-') > -1) {
        //   var urlstructure10 = '/btc/5-bhk-flats-in-' + City_Seo + ''
        // } else if (this.router.url?.indexOf('/btc/-bhk-flats-in-') > -1) {
        //   var urlstructure111 = '/btc/-bhk-flats-in-' + City_Seo + ''
        // } else {
        // }

        // if (this.router.url?.indexOf('--') > -1) {
        //   this.responseService_btc.set301Status(noOfBedrooms, City_Seo);
        // } else if (this.router.url?.indexOf(urlstructure6) > -1) {
        // } else if (this.router.url?.indexOf(urlstructure7) > -1) {
        // } else if (this.router.url?.indexOf(urlstructure8) > -1) {
        // } else if (this.router.url?.indexOf(urlstructure9) > -1) {
        // } else if (this.router.url?.indexOf(urlstructure10) > -1) {
        // } else if (this.router.url?.indexOf(urlstructure111) > -1) {
        //   this.responseService_btc.set301Status(noOfBedrooms, City_Seo);
        // } else {
        //   this.responseService_btc.set301Status(noOfBedrooms, City_Seo);
        // }

        // URL check logic — supports both flats and villas

        const bhkOptions = [1, 2, 3, 4, 5];
        const propertyTypes = ['flats', 'villas'];  // Add more types here anytime

        let matchedUrl: string | null = null;
        let matchedType: string | null = null;
        let matchedBhk: number | null = null;

        // Step 1: Find matching URL pattern
        for (const type of propertyTypes) {
          for (const bhk of bhkOptions) {
            const pattern = `/btc/${bhk}-bhk-${type}-in-`;
            if (this.router.url?.indexOf(pattern) > -1) {
              matchedUrl = `/btc/${bhk}-bhk-${type}-in-${City_Seo}`;
              matchedType = type;
              matchedBhk = bhk;
              break;
            }
          }
          if (matchedUrl) break;
        }

        if (this.router.url?.indexOf('--') > -1) {
          this.responseService_btc.set301Status(Number(noOfBedrooms), City_Seo, matchedType ?? 'flats');

        } else if (matchedUrl && this.router.url?.indexOf(matchedUrl) > -1) {
        } else {
          this.responseService_btc.set301Status(Number(noOfBedrooms), City_Seo, matchedType ?? 'flats');
        }
      }
      var localityId = url.split('-').pop();
      this.localityId = localityId;
      var propertyTypeValue = url.split('-')[5];
      this.property_type = propertyTypeValue;
      var propertyTypeValue = this.property_type;
      this.bhkValue = url.charAt(0);
      // 
      this.Filter.Bedrooms = this.bhkValue
      this.noOfBedrooms = this.bhkValue;

      if (this.router.url?.indexOf('-flats-') > -1) {
        this.proptypeid = '50401';
        this.Filter.proptypeid = this.proptypeid;
      } else if (this.router.url?.indexOf('-villas-') > -1) {
        this.proptypeid = '50402';
        this.Filter.proptypeid = this.proptypeid;

      }
      var cityname = this.currentCity;
      var typeid = this.proptypeid;
      var capsname = cityname;
      this.city = capsname?.replace('-', ' ');
      var limitparam = 25;
      var limitprprtyrows = 4;
      var proptypeid = typeid;
      var bedroom = this.noOfBedrooms;
      var loc = this.locality;
      var status = this.projectstatus;

      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Properties for Sale in " + this.cityname + "",
            "item": "https://www.homes247.in/" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + " | Homes247.in",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": this.bhkValue + ' BHK Flats/Apartments in ' + this.cityname + ' | Homes247.in',
            "item": "https://www.homes247.in" + this.router.url
          }]
      }

      // this.cityid = value.cityid;
      var autocomppropparams = {
        cityid: this.cityId,
        statusid: status,
        proptypeid: proptypeid,
        bedroom: this.bhkValue,
        locality_id: this.locality
      }
      this.Services.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
      var paramlocality = {
        locid: localityId,
      };
      // Pradeesh edit
      this.Services.getlocalitymeta(this.city, paramlocality).subscribe(metatag => {
        let metatags = metatag['Localityseo'] || [];
        this.localityName = metatags[0]?.LocalityName || '';
        // 
      })
    })
  }

  fbc_residential() {
    this.apartmentUrl = true;
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    // this.budgetFlatTrue = false;
    // this.residflatsforsale = false;    
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    var city = this.cityname.toLowerCase();
    var addhyphens = city?.replace(' ', '-');
    this.currentCity = value.cityname?.replace('-', ' ');
    String.prototype.toLocaleLowerCase = function () {
      return this?.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      });
    };
    var idcity = this.cityId;
    this.URLID = '412';
    this.proptypeid = ['50401'];
    var urlid = this.URLID;
    this.apartmentUrl = true;

    if (this.router.url?.indexOf('residential-flats-in') > -1) {
      this.ResidenceType = 'Apartments';
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      // 
      this.residflatsforsale = true;
      this.budgetFlatTrue = false;

      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Properties for Sale in " + this.cityname + "",
            "item": "https://www.homes247.in/" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + "",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }

    }
    else if (this.router.url?.indexOf('fbc/flats-for-30-lakhs-in') > -1) {
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      this.minPrice = '1';
      this.Filter.property_minprice = this.minPrice;
      this.maxPrice = '4';
      this.Filter.property_maxprice = this.maxPrice;
      this.budgetFlatTrue = true;
      // if (this.budgetFlatTrue) {
      //   this.BudgetFlatTruedescription()
      // }
      this.residflatsforsale = false;

      this.titleName = 'Flats for 30 Lakhs in' + ' ' + this.cityname;
      this.secondorytitle = 'Flats under 30 Lakhs in' + ' ' + this.cityname;
      this.broadmatch = '30 Lakhs';
      this.urlmatch = '/fbc/flats-for-30-lakhs-in-' + this.cityname.toLowerCase()?.replace(/\s+/g, '-');
      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + "",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flats For 30 Lakhs  in " + this.cityname + " | Apartments  in " + this.cityname + " Below 30 Lakhs",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      const title = 'Flats Under 30 Lakhs in ' + this.cityname + ' | Homes247';

      const description = 'Explore flats for sale in ' + this.cityname + ' under 30 Lakhs with verified listings, project details and real photos. Find affordable apartments on Homes247.';

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    }
    else if (this.router.url?.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-30-lakhs-to-40-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      this.minPrice = '5';
      this.Filter.property_minprice = this.minPrice;
      this.maxPrice = '6';
      this.Filter.property_maxprice = this.maxPrice;
      this.budgetFlatTrue = true;
      // if (this.budgetFlatTrue) {
      //   this.BudgetFlatTruedescription()
      // }
      this.residflatsforsale = false;
      this.titleName = 'Flats in' + ' ' + this.cityname + ' ' + 'for sale 30 Lakhs to 40 Lakhs';
      this.secondorytitle = '30 Lakhs to 40 Lakhs Flats in' + ' ' + this.cityname;
      this.broadmatch = '30 Lakhs - 40 Lakhs';
      this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + '-for-sale-30-lakhs-to-40-lakhs';
      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + "",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flats in " + this.cityname + " for Sale 30 Lakhs to 40 Lakhs, Apartments in " + this.cityname + " Below 40 Lakhs",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      const title = 'Flats in ' + this.cityname + ' for Sale 30 to 40 Lakhs | Homes247';

      const description = 'Explore flats for sale in ' + this.cityname + ' from 30 to 40 Lakhs with verified listings, project details and real photos. Discover affordable apartments on Homes247.';

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    }
    else if (this.router.url?.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-40-lakhs-to-50-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      this.minPrice = '6';
      this.Filter.property_minprice = this.minPrice;
      this.maxPrice = '7';
      this.Filter.property_maxprice = this.maxPrice;
      this.budgetFlatTrue = true;
      // if (this.budgetFlatTrue) {
      //   this.BudgetFlatTruedescription()
      // }
      this.residflatsforsale = false;
      this.titleName = 'Flats in' + ' ' + this.cityname + ' ' + 'for sale 40 Lakhs to 50 Lakhs';
      this.secondorytitle = '40 Lakhs to 50 Lakhs Flats in' + ' ' + this.cityname;
      this.broadmatch = '40 Lakhs - 50 Lakhs';
      this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + '-for-sale-40-lakhs-to-50-lakhs';
      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in" + this.cityname,
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flats in " + this.cityname + " for Sale 40 Lakhs to 50 Lakhs, Apartments in " + this.cityname + " Below 50 Lakhs",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      const title = 'Flats in ' + this.cityname + ' for Sale 40 to 50 Lakhs | Homes247';

      const description = 'Explore flats for sale in ' + this.cityname + ' from 40 to 50 Lakhs with verified listings, project details and real photos. Discover affordable apartments on Homes247.';

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    }
    else if (this.router.url?.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-50-lakhs-to-60-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      this.minPrice = '7';
      this.Filter.property_minprice = this.minPrice;
      this.maxPrice = '8';
      this.Filter.property_maxprice = this.maxPrice;
      this.budgetFlatTrue = true;
      // if (this.budgetFlatTrue) {
      //   this.BudgetFlatTruedescription()
      // }
      this.residflatsforsale = false;
      this.titleName = 'Flats in' + ' ' + this.cityname + ' ' + 'for sale 50 Lakhs to 60 Lakhs';
      this.secondorytitle = '50 Lakhs to 60 Lakhs Flats in' + ' ' + this.cityname;
      this.broadmatch = '50 Lakhs - 60 Lakhs';
      this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + '-for-sale-50-lakhs-to-60-lakhs';
      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + "",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flats in " + this.cityname + " for Sale 50 Lakhs to 60 Lakhs, Apartments in " + this.cityname + " Below 60 Lakhs",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      const title = 'Flats in ' + this.cityname + ' for Sale 50 to 60 Lakhs | Homes247';

      const description = 'Explore flats for sale in ' + this.cityname + ' from 50 to 60 Lakhs with verified listings, project details and real photos. Discover affordable apartments on Homes247.';

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    }
    else if (this.router.url?.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-60-lakhs-to-70-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      this.minPrice = '8';
      this.Filter.property_minprice = this.minPrice;
      this.maxPrice = '9';
      this.Filter.property_maxprice = this.maxPrice;
      this.budgetFlatTrue = true;
      // if (this.budgetFlatTrue) {
      //   this.BudgetFlatTruedescription()
      // }
      this.residflatsforsale = false;
      this.titleName = 'Flats in' + ' ' + this.cityname + ' ' + 'for sale 60 Lakhs to 70 Lakhs';
      this.secondorytitle = '60 Lakhs to 70 Lakhs Flats in' + ' ' + this.cityname;
      this.broadmatch = '60 Lakhs - 70 Lakhs';
      this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + '-for-sale-60-lakhs-to-70-lakhs';
      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + "",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flats in " + this.cityname + " for Sale 60 Lakhs to 70 Lakhs, Apartments in " + this.cityname + " Below 70 Lakhs",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      const title = 'Flats in ' + this.cityname + ' for Sale 60 to 70 Lakhs | Homes247';

      const description = 'Explore flats for sale in ' + this.cityname + ' from 60 to 70 Lakhs with verified listings, project details and real photos. Discover affordable apartments on Homes247.';

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    }
    else if (this.router.url?.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-70-lakhs-to-80-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      this.minPrice = '9';
      this.Filter.property_minprice = this.minPrice;
      this.maxPrice = '10';
      this.Filter.property_maxprice = this.maxPrice;
      this.budgetFlatTrue = true;
      // if (this.budgetFlatTrue) {
      //   this.BudgetFlatTruedescription()
      // }
      this.residflatsforsale = false;
      this.titleName = 'Flats in' + ' ' + this.cityname + ' ' + 'for sale 70 Lakhs to 80 Lakhs';
      this.secondorytitle = '70 Lakhs to 80 Lakhs Flats in' + ' ' + this.cityname;
      this.broadmatch = '70 Lakhs - 80 Lakhs';
      this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + '-for-sale-70-lakhs-to-80-lakhs';
      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + "",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flats in " + this.cityname + " for Sale 70 Lakhs to 80 Lakhs, Apartments in " + this.cityname + " Below 80 Lakhs",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      const title = 'Flats in ' + this.cityname + ' for Sale 70 to 80 Lakhs | Homes247';

      const description = 'Explore flats for sale in ' + this.cityname + ' from 70 to 80 Lakhs with verified listings, project details and real photos. Discover affordable apartments on Homes247.';

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    }
    else if (this.router.url?.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-80-lakhs-to-90-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      this.minPrice = '10';
      this.Filter.property_minprice = this.minPrice;
      this.maxPrice = '11';
      this.Filter.property_maxprice = this.maxPrice;
      this.budgetFlatTrue = true;
      // if (this.budgetFlatTrue) {
      //   this.BudgetFlatTruedescription()
      // }
      this.residflatsforsale = false;
      this.titleName = 'Flats in' + ' ' + this.cityname + ' ' + 'for sale 80 Lakhs to 90 Lakhs';
      this.secondorytitle = '80 Lakhs to 90 Lakhs Flats in' + ' ' + this.cityname;
      this.broadmatch = '80 Lakhs - 90 Lakhs';
      this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + '-for-sale-80-lakhs-to-90-lakhs';
      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + "",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flats in " + this.cityname + " for Sale 80 Lakhs to 90 Lakhs, Apartments in " + this.cityname + " Below 90 Lakhs",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      const title = 'Flats in ' + this.cityname + ' for Sale 80 to 90 Lakhs | Homes247';

      const description = 'Explore flats for sale in ' + this.cityname + ' from 80 to 90 Lakhs with verified listings, project details and real photos. Discover affordable apartments on Homes247.';

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    }
    else if (this.router.url?.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-90-lakhs-to-1-crore') > -1) {
      this.projecttype = ['50401'];
      this.Filter.proptypeid = this.projecttype
      this.minPrice = '11';
      this.Filter.property_minprice = this.minPrice;
      this.maxPrice = '12';
      this.Filter.property_maxprice = this.maxPrice;
      this.budgetFlatTrue = true;
      // if (this.budgetFlatTrue) {
      //   this.BudgetFlatTruedescription()
      // }
      this.residflatsforsale = false;
      this.titleName = 'Flats in' + ' ' + this.cityname + ' ' + 'for sale 90 Lakhs to 1 Crore';
      this.secondorytitle = '90 Lakhs to 1 Crore Flats in' + ' ' + this.cityname;
      this.broadmatch = '90 Lakhs - 1 Crore';
      this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
      this.breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + "",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flats in " + this.cityname + " for Sale 90 Lakhs to 1 Crore | Homes247",
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      const title = 'Flats in ' + this.cityname + ' for Sale 90 to 1 Crore | Homes247';

      const description = 'Explore flats for sale in ' + this.cityname + ' from 90 to 1 Crore with verified listings, project details and real photos. Discover affordable apartments on Homes247.';

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    } else {
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
    }
    this.Services.getcitynewurl(idcity, urlid).subscribe(metatags => {
      let metatag = metatags['CityUrl'];
      if (this.router.url?.indexOf('residential-flats-in') > -1) {
        const title = 'Apartments for Sale in ' + this.cityname + ' | Homes247';

        const description = 'Find the best residential flats in ' + this.cityname + ' for sale with premium amenities, ideal locations, and affordable prices. Explore listings on Homes247 today.';

        this.titleService.setTitle(title);

        this.meta.updateTag({ name: 'description', content: description });

        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      }

      this.pagedescription = metatags['CityUrl'][0].url_description;
    })
    var min = this.minPrice;
    var max = this.maxPrice;
    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId,
      minprice: min,
      maxprice: max,
    }
    this.Services.getlocalityproperties(locpropparam).subscribe(lists => {
      this.localityproperties = lists['autolist'];
    });
  }

  Villas() {
    // 
    this.villasUrl = true;
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = true;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
    //   this.autoCompleteData = myLocalList['autolist'];
    // });
    this.projecttype = ['50402'];
    this.Filter.proptypeid = this.projecttype

    this.URLID = '413';
    var idcity = this.cityId;
    var urlid = this.URLID;


    this.Services.getcitynewurl(idcity, urlid).subscribe(metatags => {
      const title = 'Premium Villas for Sale in ' + this.cityname + ' | Homes247';

      const description = 'Explore villas for sale in ' + this.cityname + ' with modern amenities and prime locations. Discover 2, 3 & 4 BHK villas and find your dream home on Homes247.';

      this.titleService.setTitle(title);

      this.meta.updateTag({ name: 'description', content: description });

      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });


      this.pagedescription = metatags['CityUrl'][0].url_description;
    });

    const breadcrumbjson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "India's Favourite Property Portal!",
          "item": "https://www.homes247.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": 'Real Estate in ' + this.cityname + '',
          "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + ""
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Villas for sale in " + this.cityname + "|Buy villas in " + this.cityname + " | Homes247.in",
          "item": "https://www.homes247.in" + this.router.url
        }]
    }
    this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);

    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId
    }
    this.Services.getlocalityproperties(locpropparam).subscribe(lists => {
      this.localityproperties = lists['autolist'];
    })
  }

  Plots() {
    // 
    this.plotUrl = true;
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = true;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    this.projecttype = ['50403'];
    this.Filter.proptypeid = this.projecttype

    var idcity = this.cityId;
    this.URLID = '417';
    var urlid = this.URLID;

    this.Services.getcitynewurl(idcity, urlid).subscribe(metatags => {
      const title = 'Residential Plots for Sale in ' + this.cityname + ' | Homes247';

      const description = 'Browse residential plots for sale in ' + this.cityname + ' with verified listings, location insights and price details. Discover top land investment options on Homes247.';

      this.titleService.setTitle(title);

      this.meta.updateTag({ name: 'description', content: description });

      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

      this.pagedescription = metatags['CityUrl'][0].url_description;

    });

    this.breadcrumbjson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "India's Favourite Property Portal!",
          "item": "https://www.homes247.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": 'Real Estate in ' + this.cityname + '',
          "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-')
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Plots for sale in " + this.cityname + "|Buy Plots in " + this.cityname + " | Homes247.in",
          "item": "https://www.homes247.in" + this.router.url
        }]
    }
    this.breadcrumbLD = this.getSafeHTML(this.breadcrumbjson);

    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId
    }
    this.Services.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    }
    );
  }

  Home() {
    // 
    this.independentHouseUrl = true;
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = true;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    this.projecttype = ['50401', '50402'];
    this.Filter.proptypeid = this.projecttype

    this.URLID = '411';
    var idcity = this.cityId;
    var urlid = this.URLID;

    this.cityname = value.cityname;
    this.currentCity = this.cityname?.replace('-', ' ');
    var City_Seo = this.currentCity.toLowerCase()?.replace(/\s+/g, '-');

    if (this.router.url?.indexOf('/home-for-sale-in-' + City_Seo + '') > -1) {
      var urlstructure1 = '/home-for-sale-in-' + City_Seo + ''
    } else {

    }

    if (this.router.url?.indexOf('--') > -1) {
      this.responseService_house.set301Status(City_Seo);
    } else if (this.router.url?.indexOf(urlstructure1) > -1) {
    } else {
      this.responseService_house.set301Status(City_Seo);
    }

    this.Services.getcitynewurl(idcity, urlid).subscribe(metatags => {
      const title = 'Homes for Sale in ' + this.cityname + ' | Homes247';

      const description = 'Find independent houses for sale in ' + this.cityname + ' with verified listings, price insights and real photos. Explore ready homes in prime locations on Homes247.';

      this.titleService.setTitle(title);

      this.meta.updateTag({ name: 'description', content: description });

      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.pagedescription = metatags['CityUrl'][0].url_description;
    });

    // ********************************Breadcrumb Structured Data Starts********************************

    const breadcrumbjson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "India's Favourite Property Portal!",
          "item": "https://www.homes247.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": 'Real Estate in ' + this.cityname + '',
          "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + ""
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Home for sale in " + this.cityname + " | Buy House in " + this.cityname + "",
          "item": "https://www.homes247.in" + this.router.url
        }]
    }
    this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId
    }
    this.Services.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    });
  }

  Upcoming_new_launch() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = true;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['new-projects-in-:locality-:city-:localityId'];
      this.locality = url.split('-').pop();
      this.projectstatus = '50310,50308';
      var autocomppropparams = {
        statusid: this.projectstatus,
        locality_id: this.locality,
      }
      this.Services.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
    })
  }

  Stlc() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = true;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);

    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });

    var localityId_1 = this.router.url.split('-').pop();
    var paramlocality = {
      locid: localityId_1,
    };
    this.Services.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
      let metatags = metatag['Localityseo'];  //gowshik edit//
      this.localityName = metatags[0]?.LocalityName || '';
      this.localityName = this.localityName;
    })
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['status-:propertytype-in-:localityname-:city-:localityId'];
      this.localityId = url.split('-').pop();
      var statusId = '50307';
      var proptypeid = '50401';

      var value = this.cityservice.cityfinder(this.router.url);
      this.cityname = value.cityname;
      this.cityId = value.cityid;
      var autocomppropparams = {
        cityid: this.cityId,
        statusid: statusId,
        proptypeid: proptypeid,
        locality_id: this.localityId
      }
      this.Services.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
        if ((lists['status']) == 'False') {
          this.localityproperties_hide = false;
        } else {
          this.localityproperties_hide = true;

        }
      })

    });
  }

  Btlc() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = true;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var localityId_1 = this.router.url.split('-').pop();
    // var value = this.cityservice.cityfinder(this.router.url);

    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });
    var paramlocality = {
      locid: localityId_1,
    };
    this.Services.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
      let metatags = metatag['Localityseo'];  //gowshik edit//
      this.localityName = metatags[0]?.LocalityName || '';
      this.localityName = this.localityName;

      this.routeSub = this.activeroute.params.subscribe(params => {
        var url = params['bhk-:propertytype-in-:locality-:city-:localityId'];
        var propertyTypeValue = url.split('-')[2];
        this.property_type = propertyTypeValue.charAt(0).toLocaleUpperCase() + propertyTypeValue.slice(1);
        // 
        var propertyTypeValue = this.property_type;
        // 
        var bhkValue = url.charAt(0);
        this.noOfBedrooms = bhkValue;
        // 
        this.proptypeurlparam = url;
        var localityId = url.split('-').pop();
        this.localityId = localityId;
        if (propertyTypeValue === 'Flats') {
          this.proptypeid = '50401';
          this.propertytypeid = '50401';
          // this.secondkeyword = 'Apartment';
        } else if (propertyTypeValue === 'Villas') {
          this.proptypeid = '50402';
          this.propertytypeid = '50402';
          // this.secondkeyword = 'Villa';
        }
        // 
        var loc = localityId;
        var bedroom = bhkValue;
        var autocomppropparams = {
          locality_id: loc,
          proptypeid: this.proptypeid,
          bedroom: bedroom
        }
        this.Services.getlocalityproperties(autocomppropparams).subscribe(lists => {
          this.localityproperties = lists['autolist'];
        });
      })
    })
  }

  Builder() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = true;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.routeSub = this.activeroute.params.subscribe(params => {
      if (this.router.url?.indexOf('/builder/') > -1) {
        var cityname = params['cityname'];
        var lasturl = params['buildername-:builderid'];
        this.builderid = lasturl.split('-').pop();
        var idremoved = lasturl?.replace('-' + this.builderid, '');
        var buildername = idremoved?.replace('-', ' ');
        this.builder = buildername;
      } else if (this.router.url?.indexOf('/all-builders-by-city/') > -1) {
        var builderiid = this.router.url.split('/').pop();
        this.builderid = builderiid;
        var value = this.cityservice.cityfinder(this.router.url);
        this.cityname = value.cityname;
        this.cityId = value.cityid;
      } else {
        var builderiid = this.router.url.split('-').pop();
        this.builderid = builderiid;
        var value = this.cityservice.cityfinder(this.router.url);
        this.cityname = value.cityname;
        this.cityId = value.cityid;
      }

      // this.builder = buildername;
      this.cityname = cityname;
      var locpropparam = {
        buildid: this.builderid,
        Cityid: this.cityId
      };
      this.Services.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
    });
  }

  Status() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.status = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var cityname = params['cityname'];
      var url = params['statusname-:statusid'];
      // this.urlparam = url;
      var statid = url.split('-').pop().match(/[0-9]+/);
      this.statusid = statid;
      this.Filter.statusid = this.statusid;
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityname = value.cityname;
      this.cityId = value.cityid;
      // 
      var locpropparam = {
        statusid: this.statusid,
        cityid: this.cityId
      }
      this.Services.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });

      // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
      //   this.autoCompleteData = myLocalList['autolist'];
      // });
      //  
      var urlidremoval = url?.replace('-' + statid, '');
      var urlhyphenremoval = urlidremoval?.replace(/-/g, ' ');
      String.prototype.toLocaleUpperCase = function () {
        return this?.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var property_status = urlhyphenremoval.toLocaleUpperCase();
      var capsname = cityname.toLocaleUpperCase();
      this.city = capsname?.replace('-', ' ');
      this.status_name = property_status;

      const title = this.status_name + " Properties in " + this.cityname + " | Homes247.in";
      const description = "Find " + this.status_name + " properties in " + this.cityname + " with modern amenities, prime locations, and flexible payment options. Invest smart & secure your dream home.";
      this.titleService.setTitle(title);

      this.meta.updateTag({ name: 'description', content: description });

      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

      this.Services.getpropstatusmeta(statid, this.cityId).subscribe(metatag => {
        let metatags = metatag['Statusseo'];
        // if (metatags == "") {

        // } else {
        //   this.titleService.setTitle(metatags[0].page_title);
        //   this.meta.updateTag({ name: 'description', content: metatags[0].meta_description });
        //   this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        //   this.meta.updateTag({ property: 'og:title', content: metatags[0].page_title });
        //   this.meta.updateTag({ property: 'og:description', content: metatags[0].meta_description });

        //   // this.pagetitle = metatags[0].page_title;
        //   // this.pagedesc = metatags[0].meta_description;
        // }




        const breadcrumbjson = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "India's Favourite Property Portal!",
              "item": "https://www.homes247.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Properties for Sale in " + this.cityname + "",
              "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": metatags[0].page_title,
              "item": "https://www.homes247.in" + this.router.url
            }]
        }
        this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);

        this.pagedescription = metatags[0].status_description;
      });
    });
  }

  Zone() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = true;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var cityname = params['cityname'];
      var url = params['zonename-:zoneid'];
      // this.urlparam = url;
      var regionid = url.split('-').pop();
      var idremoval = url?.replace('-' + regionid, '');
      var hyphenremoval = idremoval?.replace(/-/g, ' ');
      String.prototype.toLocaleUpperCase = function () {
        return this?.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityname = value.cityname;
      this.cityId = value.cityid;

      var regionid = url.split('-').pop();
      this.zoneid = regionid;
      this.regionid = regionid;
      // 
      var prop_zone = hyphenremoval?.toLocaleUpperCase();
      var capsname = cityname?.toLocaleUpperCase();
      this.city = capsname?.replace('-', ' ');
      // this.citybreadcrump = cityname;
      this.zones = prop_zone;

      var locpropparam = {
        regionid: this.zoneid,
      }
      this.Services.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
      var paramss = {
        cityId: this.cityId,
        regionid: regionid
      };
      this.Service.getlocality(paramss).subscribe(localitys => {
        this.localitys = localitys['details'];
      });
      this.Services.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
      const title = `Premium Properties in ${this.zones} | Homes247.in`;

      const description = `Explore properties in ${this.zones} with top locations, modern amenities & best deals. Find your ideal home on Homes247.in.`;
      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      this.Services.getcityregionmeta(regionid).subscribe(metatag => {
        let metatags = metatag['Regionseo'];
        // const title = metatags[0].page_title;
        // const description = metatags[0].meta_description;



        this.pagedescription = metatags[0].page_description;

      });

      const breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Properties for Sale in " + this.cityname + "",
            "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Properties for Sale in " + this.zones + "| Properties in " + this.zones + " |Homes247.in",
            "item": "https://www.homes247.in" + this.router.url
          },
        ]
      }
      this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
    });
  }
  property_typeId: any;


  Project() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = true;
    this.builder_locality = false;
  }

  Agriculture() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = true;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      this.cityId = value.cityid;
      // if (value.cityid === undefined) {
      //   this.currentCity = 'Bangalore';
      //   this.cityid = '1';
      // } else {
      //   this.cityid = value.cityid;
      //   this.cityname = value?.cityname;
      //   this.currentCity = value.cityname.replace('-', ' ');
      //   this.storage.setItem('CityName', this.cityname);
      // }
      // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
      //   let metatags = metatag['Citylistingseo'];
      //   this.localitydescription = metatags[0].city_description;
      // });
      this.property_typeId = '50405';
      this.Filter.proptypeid = this.property_typeId


      this.Services.getproptypemeta(this.property_typeId, this.cityId).subscribe(metatag => {
        let metatags = metatag['Typeseo'];
        if (!metatags || metatags.length === 0) {
          const title = 'Agricultural Land for Sale in ' + this.currentCity + ' | Homes247';

          const description = 'Explore agricultural and farm land for sale in ' + this.currentCity + '. Discover verified farm land listings, property details and the best deals only on Homes247.in.';

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.png' });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        } else {
          this.titleService.setTitle(metatags[0].page_title);
          this.meta.updateTag({ name: 'description', content: metatags[0].meta_description });
          this.meta.updateTag({ property: 'og:title', content: metatags[0].page_title });
          this.meta.updateTag({ property: 'og:description', content: metatags[0].meta_description });
          this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.png' });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: metatags[0].page_title });
          this.meta.updateTag({ name: 'twitter:description', content: metatags[0].meta_description });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        }
      });

      const breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": 'Real Estate in ' + this.cityname + '',
            "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + ""
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Properties for Sale in " + this.cityname + "",
            "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Agricultural Land for Sale in " + this.cityname + " | Farm Land for sale in " + this.cityname + " | Homes247.in",
            "item": "https://www.homes247.in" + this.router.url
          }
        ]
      }
      this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
      var locpropparam = {
        proptypeid: this.property_typeId,
        cityid: this.cityId
      }
      this.Services.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });

      // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
      //   this.autoCompleteData = myLocalList['autolist'];
      // });

    });
  }

  Atc() {
    // 
    this.atc = true;
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.apc = false;
    this.lpc = false;
    this.ltc = false;
    this.btluc = false;
    this.btac = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });

    this.proptypeid = ['50401'];
    this.Filter.proptypeid = this.proptypeid
    this.minPrice = '1';
    this.Filter.property_minprice = this.minPrice;
    this.maxPrice = '6';
    this.Filter.property_maxprice = this.maxPrice;

    const breadcrumbjson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "India's Favourite Property Portal!",
          "item": "https://www.homes247.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Properties for Sale in " + this.cityname + "",
          "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Affordable Projects in  " + this.cityname + "",
          "item": "https://www.homes247.in/apc/affordable-projects-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-')
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Affordable Flats in  " + this.cityname,
          "item": "https://www.homes247.in" + this.router.url
        }]
    }
    this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);


    const title = this.getSeoTitle(
      `Buy Affordable Flats in ${this.cityname} | Visit Homes247.in`,
      `Buy Affordable Flats in ${this.cityname} | Visit Homes247.in`
    );

    const description = `Explore affordable flats in ${this.cityname}. Discover budget-friendly apartments with essential amenities at Homes247.in. Book today.`;

    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.currentCity = this.cityname?.replace('-', ' ');
    var City_Seo = this.currentCity?.toLowerCase()?.replace(/\s+/g, '-');
    var urlstructure1 = '/atc/affordable-flats-in-' + City_Seo
    var currentURL = this.router.url.split('?')[0];
    if (this.router.url?.indexOf('--') > -1) {
      this.responseService_atc.set301Status(City_Seo);
    } else if (currentURL === urlstructure1) {
    } else {
      this.responseService_atc.set301Status(City_Seo);
    }

  }

  Ltc() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.apc = false;
    this.lpc = false;
    this.atc = false;
    this.ltc = true;
    this.btac = false;
    this.btluc = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });

    this.proptypeid = ['50401'];
    this.Filter.proptypeid = this.proptypeid
    this.minPrice = '13';
    this.Filter.property_minprice = this.minPrice;
    this.maxPrice = '24';
    this.Filter.property_maxprice = this.maxPrice;

    const breadcrumbjson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "India's Favourite Property Portal!",
          "item": "https://www.homes247.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Properties for Sale in " + this.cityname + "",
          "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Luxury Projects in  " + this.cityname + "",
          "item": "https://www.homes247.in/lpc/luxury-projects-in-" + this.cityname.toLowerCase()?.replace(/\s+/g, '-')
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Luxury Properties in  " + this.cityname,
          "item": "https://www.homes247.in" + this.router.url
        }]
    }
    this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);

    const title = this.getSeoTitle(
      `Top Luxury Apartments in ${this.cityname} | Buy at Homes247.in`,
      `Top Luxury Flats in ${this.cityname} | Buy at Homes247.in`
    );

    const description = `Explore premium luxury flats in ${this.cityname}. Discover high-end apartments with world-class amenities at Homes247.in. Explore now!`;

    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.currentCity = this.cityname?.replace('-', ' ');
    var City_Seo = this.currentCity?.toLowerCase()?.replace(/\s+/g, '-');
    var urlstructure1 = '/ltc/luxury-flats-in-' + City_Seo
    var currentURL = this.router.url.split('?')[0];

    if (this.router.url?.indexOf('--') > -1) {
      this.responseService_atc.set301Status1(City_Seo);
    } else if (currentURL === urlstructure1) {
    } else {
      this.responseService_atc.set301Status1(City_Seo);
    }

  }

  Btluc() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.apc = false;
    this.lpc = false;
    this.atc = false;
    this.ltc = false;
    this.btac = false;
    this.btluc = true;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });


    // this.proptypeid = ['50401'];
    // this.minPrice = '13';
    // this.maxPrice = '24';
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId'];
      this.bhkValue = url.charAt(0);
      this.Filter.Bedrooms = this.bhkValue
      this.noOfBedrooms = this.bhkValue;
      if (this.router.url?.indexOf('luxury-flats-apartments-in') > -1) {
        this.status_name = 'Luxury Flats'
        this.minPrice = '13';
        this.Filter.property_minprice = this.minPrice;
        this.maxPrice = '24';
        this.Filter.property_maxprice = this.maxPrice;
        this.proptypeid = ['50401'];
        this.Filter.proptypeid = this.proptypeid

        const title = 'Buy ' + this.noOfBedrooms + ' BHK Luxury Apartments in ' + this.cityname + ' | Homes247.in';

        const description = 'Explore premium ' + this.noOfBedrooms + ' BHK luxury flats in ' + this.cityname + '. Discover high-end apartments with top amenities and best deals at Homes247.in';

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      } else if (this.router.url?.indexOf('luxury-villas-in') > -1) {
        this.status_name = 'Luxury Villas'
        this.minPrice = '13';
        this.Filter.property_minprice = this.minPrice;
        this.maxPrice = '24';
        this.Filter.property_maxprice = this.maxPrice;
        this.proptypeid = ['50402'];
        this.Filter.proptypeid = this.proptypeid

        const title = this.noOfBedrooms + ' BHK Luxury Villas in ' + this.cityname + ' | Premium Villas | Homes247.in';

        const description = 'Discover ' + this.noOfBedrooms + ' BHK luxury villas in ' + this.cityname + ' with premium amenities, spacious layouts and prime locations. Explore exclusive villa properties on Homes247.in.';

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      }
      const breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Properties for Sale in " + this.cityname + "",
            "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + " | Homes247.in",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": this.noOfBedrooms + " BHK Flats/Apartments in " + this.cityname + " | Homes247.in",
            "item": "https://www.homes247.in/btc/" + this.noOfBedrooms + "-bhk-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-')
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": this.noOfBedrooms + " BHK " + this.status_name + " in " + this.cityname,
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
    })


  }

  Btac() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.apc = false;
    this.lpc = false;
    this.atc = false;
    this.ltc = false;
    this.btac = true;
    this.btluc = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });


    // this.proptypeid = ['50401'];
    // this.minPrice = '13';
    // this.maxPrice = '24';
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId'];
      this.bhkValue = url.charAt(0);
      this.Filter.Bedrooms = this.bhkValue
      this.noOfBedrooms = this.bhkValue;
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityname = value.cityname;
      this.currentCity = this.cityname?.replace('-', ' ');
      var City_Seo = this.currentCity?.toLowerCase()?.replace(/\s+/g, '-');

      if (this.router.url?.indexOf('affordable-flats-apartments-in') > -1) {
        this.btac = true;
        this.status_name = 'Affordable Flats'
        this.minPrice = '1';
        this.Filter.property_minprice = this.minPrice;
        this.maxPrice = '7';
        this.Filter.property_maxprice = this.maxPrice;
        this.proptypeid = [50401];
        this.Filter.proptypeid = this.proptypeid

        const title = this.noOfBedrooms + ' BHK Affordable Flats in ' + this.cityname + ' | Budget Apartments | Homes247.in';

        const description = 'Explore ' + this.noOfBedrooms + ' BHK affordable flats and budget apartments in ' + this.cityname + ' with verified listings, modern amenities and great locations on Homes247.in.';

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        var urlstructure1 = '/btac/' + this.bhkValue + '-bhk-affordable-flats-apartments-in-' + City_Seo;
        var currentURL = this.router.url.split('?')[0];
        if (this.router.url?.indexOf('--') > -1) {
          this.responseService_atc.set301Status4(this.noOfBedrooms, City_Seo);
        } else if (currentURL === urlstructure1) {
        } else {
          this.responseService_atc.set301Status4(this.noOfBedrooms, City_Seo);
        }
      } else if (this.router.url?.indexOf('affordable-villas-in') > -1) {
        this.btac = true;
        // 
        this.status_name = 'Affordable Villas'
        this.minPrice = '1';
        this.Filter.property_minprice = this.minPrice;
        this.maxPrice = '7';
        this.Filter.property_maxprice = this.maxPrice;
        this.proptypeid = [50402];
        this.Filter.proptypeid = this.proptypeid

        const title = this.noOfBedrooms + ' BHK Affordable Villas in ' + this.cityname + ' | Budget Villas | Homes247.in';

        const description = 'Discover ' + this.noOfBedrooms + ' BHK affordable villas in ' + this.cityname + ' with spacious layouts and prime locations. Explore verified villa listings on Homes247.in.';

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        var urlstructure2 = '/btac/' + this.bhkValue + '-bhk-affordable-villas-in-' + City_Seo;
        var currentURL = this.router.url.split('?')[0];

        if (this.router.url?.indexOf('--') > -1) {
          this.responseService_atc.set301Status5(this.noOfBedrooms, City_Seo);
        } else if (currentURL === urlstructure2) {
        } else {
          this.responseService_atc.set301Status5(this.noOfBedrooms, City_Seo);
        }
      }

      const breadcrumbjson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "India's Favourite Property Portal!",
            "item": "https://www.homes247.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Properties for Sale in " + this.cityname + "",
            "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Buy Flats in " + this.cityname + " | Flats for sale in " + this.cityname + " | Homes247.in",
            "item": "https://www.homes247.in/residential-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-') + "-for-sale"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": this.noOfBedrooms + " BHK Flats/Apartments in " + this.cityname + " | Homes247.in",
            "item": "https://www.homes247.in/btc/" + this.noOfBedrooms + "-bhk-flats-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-')
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": this.noOfBedrooms + " BHK " + this.status_name + " in " + this.cityname,
            "item": "https://www.homes247.in" + this.router.url
          }]
      }
      this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
    })


  }

  Apc() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.apc = true;
    this.lpc = false;
    this.atc = false;
    this.ltc = false;
    this.btac = false;
    this.btluc = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });


    this.minPrice = '1';
    this.Filter.property_minprice = this.minPrice;
    this.maxPrice = '6';
    this.Filter.property_maxprice = this.maxPrice;
    const breadcrumbjson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "India's Favourite Property Portal!",
          "item": "https://www.homes247.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": " Buy New projects in " + this.cityname + " | Upcoming Projects in " + this.cityname + " | Homes247.in",
          "item": "https://www.homes247.in/new-launch-projects/new-projects-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-')
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Properties for Sale in " + this.cityname + "",
          "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
        },

        {
          "@type": "ListItem",
          "position": 4,
          "name": "Affordable Projects in" + this.cityname,
          "item": "https://www.homes247.in" + this.router.url
        }]
    }
    this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
    const title = this.getSeoTitle(
      `Top Affordable Projects in ${this.cityname} | Homes247.in`,
      `Affordable Projects ${this.cityname}`
    );

    const description = `Explore affordable projects in ${this.cityname}. Discover budget-friendly homes with essential amenities at Homes247.in. Visit Now!`;

    this.titleService.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.currentCity = this.cityname?.replace('-', ' ');
    var City_Seo = this.currentCity?.toLowerCase()?.replace(/\s+/g, '-');
    var urlstructure1 = '/apc/affordable-projects-in-' + City_Seo
    var currentURL = this.router.url.split('?')[0];

    if (this.router.url?.indexOf('--') > -1) {
      this.responseService_atc.set301Status2(City_Seo);
    } else if (currentURL === urlstructure1) {
    } else {
      this.responseService_atc.set301Status2(City_Seo);
    }

  }

  Lpc() {
    // 
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.apc = false;
    this.lpc = true;
    this.atc = false;
    this.ltc = false;
    this.btac = false;
    this.btluc = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    // if (value.cityid === undefined) {
    //   this.currentCity = 'Bangalore';
    //   this.cityid = '1';
    // } else {
    //   this.cityid = value.cityid;
    //   this.cityname = value?.cityname;
    //   this.currentCity = value.cityname.replace('-', ' ');
    //   this.storage.setItem('CityName', this.cityname);
    // }
    // this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
    //   let metatags = metatag['Citylistingseo'];
    //   this.localitydescription = metatags[0].city_description;
    // });

    this.minPrice = '13';
    this.Filter.property_minprice = this.minPrice;
    this.maxPrice = '24';
    this.Filter.property_maxprice = this.maxPrice;

    const title = this.getSeoTitle(
      `Luxury Projects in ${this.cityname} | Best Deals at Homes247.in`,
      `Luxury Projects in ${this.cityname} | Best Deals at Homes247`
    );

    const description = `Explore luxury projects in ${this.cityname} with premium amenities, prime locations & top deals. Find your dream home at Homes247.in`;

    this.titleService.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

    const breadcrumbjson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "India's Favourite Property Portal!",
          "item": "https://www.homes247.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": " Buy New projects in " + this.cityname + " | Upcoming Projects in " + this.cityname + " | Homes247.in",
          "item": "https://www.homes247.in/new-launch-projects/new-projects-in-" + this.cityname.toLocaleLowerCase()?.replace(/\s+/g, '-')
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Properties for Sale in " + this.cityname + "",
          "item": "https://www.homes247.in/" + this.cityname.toLowerCase()?.replace(/\s+/g, '-') + "/property-sale"
        },

        {
          "@type": "ListItem",
          "position": 4,
          "name": "Luxury Projects in" + this.cityname,
          "item": "https://www.homes247.in" + this.router.url
        }]
    }
    this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.currentCity = this.cityname?.replace('-', ' ');
    var City_Seo = this.currentCity?.toLowerCase()?.replace(/\s+/g, '-');
    var urlstructure1 = '/lpc/luxury-projects-in-' + City_Seo
    var currentURL = this.router.url.split('?')[0];

    if (this.router.url?.indexOf('--') > -1) {
      this.responseService_atc.set301Status3(City_Seo);
    } else if (currentURL === urlstructure1) {
    } else {
      this.responseService_atc.set301Status3(City_Seo);
    }

  }


  luxuryPropList = [];
  luxuryproploader: boolean = true;
  HideLuxuryProp = true;
  luxuryPropDetails() {
    const limite = 4;
    const limitrows = 6;
    // const statusid = '50308';
    const min = 13;
    const max = 24;
    let param = {
      limit: limite,
      limitrows: limitrows,
      // statusid: statusid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getCity(this.city, param).subscribe(response => {
      // 
      const propertylists = response['deatils'];
      this.luxuryPropList = propertylists;
      // console.log(this.luxuryPropList);
      if (this.luxuryPropList?.length >= 0) {
        this.luxuryproploader = false;
      } else {
        this.luxuryproploader = true;
      }
      if (this.luxuryPropList?.length <= 0) {
        // 
        this.HideLuxuryProp = false;
      } else {
        // 
        this.HideLuxuryProp = true;
      }
    });
  }

  affordablePropList = [];
  affordableproploader: boolean = true;
  HideAffordableProp = true;
  affordablePropDetails() {
    const limite = 0;
    const limitrows = 25;
    // const statusid = '50308';
    const min = 6;
    const max = 9;
    let param = {
      limit: limite,
      limitrows: limitrows,
      // statusid: statusid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getCity(this.city, param).subscribe(response => {
      const propertylists = response['deatils'];
      this.affordablePropList = propertylists;
      if (this.affordablePropList?.length <= 0) {
        this.HideAffordableProp = false;
        this.affordableproploader = true;
      } else {
        this.HideAffordableProp = true;
        this.affordableproploader = false;
      }
    });
  }

  readyToMovePropList = [];
  readyToMoveproploader: boolean = true;
  HideReadyToMoveProp = true;
  onReadyToMoveDetails() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50307';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid
    };
    this.Service.getCity(this.city, param).subscribe(response => {
      const propertylists = response['deatils'];
      this.readyToMovePropList = propertylists;
      if (this.readyToMovePropList?.length >= 0) {
        this.readyToMoveproploader = false;
      } else {
        this.readyToMoveproploader = true;
      }
      if (this.readyToMovePropList?.length <= 0) {
        this.HideReadyToMoveProp = false;
      } else {
        this.HideReadyToMoveProp = true;
      }
    });
  }

  HideTopPropSection = true;
  getTopProjects() {
    this.Service.gettopproperties(this.cityId).subscribe((topProperty: any[]) => {
      this.topProperties = topProperty['deatils'];
      if (topProperty['status'] === 'True') {
        this.topprojectsloader = false;
        this.shuffletopprojects(this.topProperties);
      } else {
        this.topprojectsloader = true;
      }
      if (this.topProperties?.length <= 0) {
        this.HideTopPropSection = false;
      } else {
        this.HideTopPropSection = true;
      }
    });
  }


  whatsupshare(propertydemo: any) {

    const phoneNumber = '919008029014'; // WhatsApp number

    const propertyUrl =
      'https://www.homes247.in/property/' +
      propertydemo.city_name.toLowerCase()?.replace(/\s+/g, '-') + '/' +
      propertydemo.locality_name.toLowerCase()?.replace(/\s+/g, '-') + '/' +
      propertydemo.propertyName.toLowerCase()?.replace(/\s+/g, '-') + '-' +
      propertydemo.property_info_IDPK;

    const message = encodeURIComponent(
      `Hi, I’m interested in this property. Please share more details. ${propertyUrl}`
    );

    const shareUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(shareUrl, '_blank');
  }


  activeIndexMap: { [key: string]: number } = {};
  getSeoTitle(shortTitle: string, longTitle: string): string {
    return shortTitle.length <= 60 ? shortTitle : longTitle;
  }

  // BudgetFlatTruedescription() {
  //   var value = this.cityservice.cityfinder(this.router.url);

  //   if (value.cityid === undefined) {
  //     this.currentCity = 'Bangalore';
  //     this.cityid = '1';
  //   } else {
  //     this.cityid = value.cityid;
  //     this.cityname = value?.cityname;
  //     this.currentCity = value.cityname?.replace('-', ' ');
  //     this.storage.setItem('CityName', this.cityname);
  //   }
  //   this.Service.getseocitylistmeta(this.cityid).subscribe(metatag => {
  //     let metatags = metatag['Citylistingseo'];
  //     this.localitydescription = metatags[0].city_description;
  //   });
  // }



  imageErrorMap: { [key: number]: boolean } = {};
  onImgError(event: any, id: number) {
    // hide broken image instantly
    event.target.style.display = 'none';
    // trigger Angular condition
    this.imageErrorMap[id] = true;
  }
}