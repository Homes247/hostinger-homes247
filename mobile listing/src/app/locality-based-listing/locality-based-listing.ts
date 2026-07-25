import { CommonModule, isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Injectable } from '@angular/core';
import { DataService } from '../data.service';
// import { City, flitercity, minmax, enquiry } from './localitys';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterModule } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CityService } from '../city.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
// import { ServerResponseService_PropertyDetails } from '../responseService_property_details.service';
// import { ServerResponseService_locality } from '../server-response-8(locality).service';
// import { ServerResponseService_mainhome } from '../server-response-main-home.service';
import { ServerResponseService_locality } from '../server-response-8(locality).service';
import { MyJsonLdComponent } from '../my-json-ld/my-json-ld.component';
import { cleanUrlPipe, MyFilterunique2, OrderByPipe2, ReplaceLineBreaksany, SanitizeHtmlPipe } from '../mainpipe-pipe';
// import { InnerHeader } from '../inner-header/inner-header';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { SafeStorageService } from '../safe-storage?.service';
import { CarouselModule, OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
// Swal lazy-loaded
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { SafeStorageService } from '../safe-storage.service';





declare var $: any;


@Component({
  selector: 'app-locality-based-listing',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MyJsonLdComponent, cleanUrlPipe, NgxSkeletonLoaderModule, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany, CarouselModule, InnerHeadderWithSidenav],
  templateUrl: './locality-based-listing.html',
  styleUrl: './locality-based-listing.css',
  providers: [ServerResponseService_locality],

})
export class LocalityBasedListing implements AfterViewInit {
  myControl = new FormControl();
  @ViewChild('cancel', { static: false }) cancel!: ElementRef;
  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
  @ViewChild('cd2', { static: false }) private countdown2!: CountdownComponent;
  @ViewChild('scrollapiloader', { static: false }) scrollapiloader!: ElementRef;
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  private routeSub!: Subscription;
  public localityproperties: { [key: string]: Object }[] = [];
  public localitypropertiesstructureddata: { [key: string]: Object }[] = [];
  public autoCompleteData: { [key: string]: Object }[] = [];

  Mousemovement: boolean = false;

  city: any;
  localtyname: any;
  citybread: any;
  citybreadcrump: any;
  cityhead: any;
  builder: any;
  zones: any;
  status_name: any;
  property_type: any;
  projectcountRent: any;

  filterShowHide!: boolean;
  hideDesktopFilterbar!: boolean;
  IsVisibleFilter!: boolean;
  localityHide: boolean = false;
  statusHide: boolean = true;
  projectTypeHide: boolean = true;
  registerForm!: FormGroup;
  apartmentSelect: boolean = false;
  villaSelect: boolean = false;
  plotSelect: boolean = false;
  oneBedroomSelect: boolean = false;
  twoBedroomSelect: boolean = false;
  threeBedroomSelect: boolean = false;
  fourBedroomSelect: boolean = false;
  fiveBedroomSelect: boolean = false;
  readyToMoveSelect: boolean = false;
  underConstructionSelect: boolean = false;
  newLaunchSelect: boolean = false;
  preLaunchSelect: boolean = false;
  noOfBedrooms: any = [];
  projectStatus: any = [];
  projecttype = [];
  proptypeId: any;
  minBugPrice: any;
  maxBugPrice: any;
  filterLoader: boolean = false;
  reraid: any;
  localId: any;
  filterSelectOne: boolean = false;
  budgetsLength: any;
  newBudget = [];
  minbudget_value: any;
  maxbudget_IDPK: any;
  maxbudget_value: any;
  minbudget_IDPK!: string;
  propidarray = [];
  parsedarray: any = [];
  jsonparse = [];
  storagearr: any;
  localstoredivSeenProjects: any;
  seenProjectsStoragearr: any;
  localstorediv: any;
  static localitycount: number;
  localitylist: any;
  builderlist: any;
  statuslist: any;
  proptypelist: any;
  regionslist: any;
  showLoader = false;
  zeroprojects = false;
  Internallinkshide: boolean = true;
  urlparam: any;
  sortShowHide!: boolean;
  localitydescription: any;
  description!: boolean;
  offers: any;
  propertyid: any;
  UserId: any;
  user = new Enquiry();
  propertylists: any;
  projectcount: any;
  bedrooms: any;
  budgets: any;
  possissions: any;
  localitys: any;
  budget_show = true;
  bud_val_show = false;
  cityname: any;
  cityId: any;
  localityname: any;
  localityid: any;
  cityzonelinks: any;
  propertyId: any;
  alertmesg: any;
  loaded = false;
  FooterComponent: any;
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
  locname: any;
  locid: any;
  newcity: any;
  propertiescount: any;
  blogapiload = true;
  topnewapiload = true;
  topnewdivreached = false;
  Hidenewlaunches = true;
  innerheader: any;
  propertiesDetailsnew: any;
  currenturl: any;
  isExpanded = false;
  userRentalFavList: any[] = [];
  propertyIds: any[] = [];
  projectpgcount: any;
  projectcountcommercial: any;
  Matautocomplete: any;
  cityName!: string;




  newProperties = [];
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numberdatesforyears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numbersforyears = [1, 2, 3, 4, 5];
  Date = new Date();
  YearDate = new Date();

  breadcrumbLD!: SafeHtml;
  carouselsLD!: SafeHtml;
  eventsLD!: SafeHtml;
  localbusinessLD!: SafeHtml;
  productmerchantreviewLD!: SafeHtml;
  carouselsarrayjoin: any[] = [];
  eventsarrayjoin: any[] = [];
  localbusinessarrayjoin: any[] = [];
  productmerchantreviewarrayjoin: any[] = [];
  carouselsjson: any;
  eventsjson: any;
  localbusinessjson: any;
  productmerchantreviewjson: any;
  averagerating: any[] = [];

  enquiryFormComponent: any;
  otploader = false;

  formatsDateTest: string[] = ['dd/MM/yyyy'];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow?.toISOString();
  dateNowMilliseconds = this.dateNow?.getTime();
  isServer: boolean = false;
  test = false;
  newListingCard = false;
  private observer: IntersectionObserver | null = null;
  pagePropertyCount: number = 0;
  Locality2Component: any;
  Locality3Component: any;
  Locality4Component: any;
  componentloads = false;
  localname: any;
  SelectedPropName: any;
  propertylists1 = [];
  propertylists2 = [];
  propertylists3 = [];
  propertylists4 = [];
  propertylists5 = [];
  propertylists6 = [];
  sectionFirstResponce: boolean = false;

  modelmindata: any;
  minprice_value: any;
  maxprice_value: any;
  modeldata: any;

  fliterbedroom!: string;
  possission!: string;
  locality!: string;

  options: any;
  filteredOptions!: Observable<any>;

  property_id: any;
  propertyname: any;
  enquiry = new Enquiry();

  // Pradeesh optimization flags
  mainlocalitypage = true;
  atc = true;
  ltc = true;
  btac = true;
  btluc = true;
  atlc = true;
  ltlc = true;
  newlaunchprojects: any;
  localitycombo = true;
  citycombo = true;
  citystatuscombo = true;
  readytomoveflats = true;
  newprojects = true;
  localityproperties_hide = true;
  localityId: any = [];
  bhkValue: any;
  budgetFlatTrue = true;
  btllc = true;
  bstlc = true;
  home = true;
  stlc = true;
  btlc = true;
  upcoming_new_launch = true;
  status = true;
  btalc = true;
  mainpage = true;
  aplc = true;
  lplc = true;
  builder_locality = true;
  apc = true;
  lpc = true;
  City_header: boolean = false;
  Filter_Property_Type = false;
  Filter_Bedroom_Type = false;
  Filter_Posession_Within = false;
  Filter_Budget = false;
  Filter_Property_Status = false;
  Filter_Locality = false;
  residflatsforsale: any;
  localityName: any;
  cityid: any;
  currentCity: any;
  currentLocalityName: any;
  currentCity_1: any;
  maxPrice: any;
  minPrice: any;
  URLID: any;
  ResidenceType: any;
  affordable_locality = false;
  oneBhkUrl = false;
  twoBhkUrl = false;
  threeBhkUrl = false;
  fourBhkUrl = false;
  fiveBhkUrl = false;
  apartmentUrl = false;
  villasUrl = false;
  breadcrumbjson: any;

  luxuryPropList: any = [];
  luxuryproploader: boolean = true;
  HideLuxuryProp = true;

  affordablePropList: any = [];
  affordableproploader: boolean = true;
  HideAffordableProp = true;

  readyToMovePropList: any = [];
  readyToMoveproploader: boolean = true;
  HideReadyToMoveProp = true;

  topProperties: any = [];
  HideTopPropSection = true;
  topprojectsloader: boolean = true;

  activeIndexMap: { [key: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private sanitizer: DomSanitizer,
    public Service: DataService,
    private fb: FormBuilder,
    private router: Router,
    public cityservice: CityService,
    public Service2: DataService2,
    private activeroute: ActivatedRoute,
    public Filter: FilterService,
    public responseService_locality: ServerResponseService_locality,
    @Inject(PLATFORM_ID) private platformId: Object,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    private cd: ChangeDetectorRef

  ) {
    this.window = this.doc.defaultView!;
    this.isServer = isPlatformBrowser(this.platformId);
    this.Service.mouseenterlisten1().subscribe({
      next: (m: any) => {
        this.getcity();
      }
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
      this.window?.scrollTo(0, 0);
    });
  }
  window!: Window;

  @HostListener('touchstart', [])
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.Mousemovement = true;
    if (isPlatformBrowser(this.platformId)) {
      if ($(window).scrollTop() >= 140) {
        $('.androidApp').css('display', 'block');
        $('.city_search_filter').css('margin', '114px 0 0 0');
        $('#hidefilter').addClass('hidefilter');
      } else {
        $('#hidefilter').removeClass('hidefilter');
      }
    }
    // const link = document.createElement('link');
    // link.rel = 'preload';
    // link.as = 'style';
    // link.href =
    //   'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';

    // link.onload = () => {
    //   link.rel = 'stylesheet';
    // };

    // document.head.appendChild(link);
  }

  ngOnInit() {
    this.PageIndex();

    this.dataloads()
    this.getmeta();
    this.setPageTitle()
    // this.semanticjquery();
    this.scripts();
    this.onresize();
    this.localityname = this.storage?.getItem('LocalityName');

    this.registerForm = this.fb.group({
      projectType: [''],
      minBudget: [''],
      maxBudget: [''],
      posessionWithin: [''],
      locality: [''],
    });

    this.currenturl = this.router.url;
    $('.head_sticky').css('padding-bottom', '59px');
    $('.city_search_filter').css('margin', '60px 0 0 0');
    this.affordablePropDetails();
    this.luxuryPropDetails();
    this.onReadyToMoveDetails();
    this.getTopProjects();


  }

  customOptionsGallery: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayHoverPause: false,
    margin: 10,
    autoWidth: false, // Ensure images do not exceed container width
    center: true, // Keeps the image centered
    lazyLoad: true, // Improves image loading
    autoplayTimeout: 3000, // Set delay for auto sliding
    smartSpeed: 600, // Smooth sliding animation
    // autoplaySpeed: 300,
    // nav: true,
    // navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/individual/leftArrow.svg" alt=\'LeftArrow\' class=\'prop_indi_owl owl-nav owl-prev main_move_left_gallery\'>',
    //   '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/individual/rightArrow.svg" alt=\'RightArrow\' class=\'prop_indi_owl owl-nav owl-next main_move_right_gallery\'>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };

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
  getcity() {
    this.showLoader = true;
    LocalityBasedListing.localitycount = 5;
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    this.city = value.cityname.replace('-', ' ');
    this.cityid = value.cityid;

    const dateonlydate = this.Date?.toISOString()?.split('T')[0];
    const YearDateformatchange = this.YearDate.toISOString().split('T')[0];
    var citiname = value.cityname.replace('-', ' ');
    this.cityName = citiname.replace('-', ' ');
    this.citybreadcrump = this.cityname.toLocaleLowerCase();

    var limitparam = 0;
    var limitprprtyrows = 10;
    var crawllimitprprty = 5000;

    var locid = this.localityId;
    var bedroom = this.Filter.Bedrooms;
    var min = this.Filter.min;
    var max = this.Filter.max;
    var pos = this.Filter.possission;
    var statusid = this.Filter.statusid
    var proptypeId = this.Filter.proptypeid;
    this.UserId = this.storage?.getItem("userID");
    var param = {
      limit: limitparam,
      limitrows: limitprprtyrows,
      locality: locid,
      bedroom: bedroom,
      minprice: min,
      maxprice: max,
      possission: pos,
      statusid: statusid,
      proptypeid: proptypeId,
    };

    this.Service.getCity(this.city, param).subscribe({
      next: (lists) => {
        if (lists['status'] == "True") {
          let propertylists = lists['deatils'];
          this.propertylists = propertylists;
          this.newListingCard = true;
          this.showLoader = false;
          if (this.projectcount <= 10) {
            $('.search-results').css('padding-bottom', '22px');
          }
        }
      }
    });

    var paramindividual = { locality: locid };
    this.Service.getprojectscount(this.city, param).subscribe({
      next: (countprojects) => {
        let projectcount = countprojects['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
        this.setPageTitle();
        if (this.projectcount <= 0) {
          this.zeroprojects = true;
        }
      }
    });
    this.Service.getindividualprojectscount(this.city, paramindividual).subscribe({
      next: (projectcounts) => {
        let projectcount = projectcounts['Counts'];
        this.propertiescount = projectcount[0].PropertyCounts;
      }
    });
    var paramInd = {
      locality: locid,
    };

    this.Service.getRentprojectscount(this.cityname, paramInd).subscribe({
      next: (countprojects) => {
        let projectcount = countprojects['Counts'];
        this.projectcountRent = projectcount[0].PropertyCounts;
      }
    });

    var param2 = {
      limit: '',
      limitrows: ''
    };

    this.Service.PGRentCount(this.cityname, param2).subscribe({
      next: (countprojects) => {
        let projectcount = countprojects['Counts'];
        this.projectpgcount = projectcount[0].PropertyCounts;
      }
    });

    this.Service.commercialSalePropertiesCount(this.cityname, param2).subscribe({
      next: (countprojects) => {
        let projectcount = countprojects['Counts'];
        this.projectcountcommercial = projectcount[0].PropertyCounts;
      }
    });

    // ******************Carousal Structured data Starts*********************
    var carousalparam = {
      locality_id: this.locid,
      limit: 0,
      limitrows: 5,
    }
    this.Service.getlocalityproperties(carousalparam).subscribe({
      next: (lists) => {
        this.localitypropertiesstructureddata = lists['autolist'];
        for (let i = 0; i < this.localitypropertiesstructureddata.length; i++) {
          this.carouselsjson =
          {
            "@type": "ListItem",
            "position": i,
            "name": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'],
            "description": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'] + " Reviews | Price | Homes247.in ",
            "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.localitypropertiesstructureddata[i]['coverimage'],
            "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id']
          }
          this.carouselsarrayjoin?.push(this.carouselsjson);
        }
        var localityid = this.router.url?.split('-').pop()!.match(/[0-9]+/)!;

        var param = {
          locid: localityid,
        };
        this.Service.getlocalitymeta('', param).subscribe({
          next: (metatag) => {
            let metatags = metatag['Localityseo'];
            this.localitydescription = metatags[0].Description;
            if (this.localitydescription == '') {
              this.description = false;
            } else {
              this.description = true;
            }
            this.localname = metatags[0].LocalityName;
            this.localtyname = this.localname;
            var Locality_Seo = this.localname?.toLowerCase().replace(/\s+/g, '-');
            var City_Seo = metatags[0].city_name?.toLowerCase().replace(/\s+/g, '-');


            this.carouselsLD = this.getcarousalSafeHTML(this.carouselsarrayjoin);

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
                  "name": 'Real Estate in ' + this.city + '',
                  "item": "https://www.homes247.in/real-estate-in-" + this.city.toString().toLocaleLowerCase().replace(/\s+/g, '-') + ""
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Properties for Sale in " + this.city + "",
                  "item": "https://www.homes247.in/" + this.city.toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/property-sale"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Properties for Sale in " + this.localtyname + ", " + this.city + " - Homes247.in",
                  "item": "https://www.homes247.in" + this.router.url
                }]
            }
            this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
          }
        });
      }
    });
    // ******************Carousal Structured data Ends*********************

    // ******************Events Structured data Starts*********************

    var eventsparam = {
      locality_id: this.locid,
      limit: 0,
      limitrows: 5,
    }
    this.Service.getlocalityproperties(eventsparam).subscribe({
      next: (lists) => {
        this.localitypropertiesstructureddata = lists['autolist'];
        for (let i = 0; i < this.localitypropertiesstructureddata.length; i++) {
          this.eventsjson = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'],
            "description": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'] + " | Reviews | Price | Homes247.in ",
            "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.localitypropertiesstructureddata[i]['coverimage'],
            "startDate": dateonlydate + "T18:30+05:30",
            "endDate": YearDateformatchange + "T18:30+05:30",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "location": {
              "@type": "VirtualLocation",
              "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id'],
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
              "name": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'],
              "price": this.localitypropertiesstructureddata[i]['price'],
              "priceCurrency": "INR",
              "validFrom": dateonlydate + "T18:30+05:30",
              "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id'],
              "availability": "https://schema.org/InStock"
            }]
          }
          this.eventsarrayjoin?.push(this.eventsjson);
        }
        this.eventsLD = this.getSafeHTML(this.eventsarrayjoin);
      }
    });

    // ******************Events Structured data Ends*********************

    // ******************Localbusiness Structured data Starts*********************

    var localbusinessparam = {
      locality_id: this.locid,
      limit: 0,
      limitrows: 5,
    }
    this.Service.getlocalityproperties(localbusinessparam).subscribe({
      next: (lists) => {
        this.localitypropertiesstructureddata = lists['autolist'];
        for (let i = 0; i < this.localitypropertiesstructureddata.length; i++) {
          this.localbusinessjson =
          {
            "@context": "http://schema.org/",
            "@type": "RealEstateAgent",
            "name": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'],
            "description": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'] + " | Reviews | Price | Homes247.in ",
            "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id'],
            "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.localitypropertiesstructureddata[i]['coverimage'],
            "telephone": "9164247247",
            "address": {
              '@type': 'PostalAddress',
              'streetAddress': this.localitypropertiesstructureddata[i]['locality'] + ',' + this.localitypropertiesstructureddata[i]['name'],
              'addressLocality': this.localitypropertiesstructureddata[i]['locality'],
              'postalCode': '560001',
              'addressRegion': this.localitypropertiesstructureddata[i]['city'],
              'addressCountry': 'IN'
            },
            'priceRange': this.localitypropertiesstructureddata[i]['price'],
            'openingHoursSpecification': [{
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              'opens': '10:00',
              'closes': '18:30'
            }],
          }
          this.localbusinessarrayjoin?.push(this.localbusinessjson);
        }
        this.localbusinessLD = this.getSafeHTML(this.localbusinessarrayjoin);
      }
    });

    // ******************Localbusiness Structured data Ends***********************

    // *********************Product - Merchant Listings - Review Snippets Structured data Starts*********************

    var productmerchantreviewparam = {
      locality_id: this.locid,
      limit: 0,
      limitrows: 5,
    }
    this.Service.getlocalityproperties(productmerchantreviewparam).subscribe({
      next: (lists) => {
        this.localitypropertiesstructureddata = lists['autolist'];
        for (let i = 0; i < this.localitypropertiesstructureddata.length; i++) {
          this.averagerating[i] = this.localitypropertiesstructureddata[i]['Averagerating'];
          this.productmerchantreviewjson = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'],
            "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.localitypropertiesstructureddata[i]['coverimage'],
            "description": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'] + " | Reviews | Price | Homes247.in ",
            "sku": "Homes247",
            "mpn": "Homes247-" + this.localitypropertiesstructureddata[i]['id'],
            "brand": {
              "@type": "Brand",
              "name": "Homes247.in"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": parseFloat(this.averagerating[i]).toFixed(1),
              "reviewCount": this.localitypropertiesstructureddata[i]['Totalratings']
            },
            "offers": {
              "@type": "Offer",
              "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id'],
              "priceCurrency": "INR",
              "price": this.localitypropertiesstructureddata[i]['price'],
              "priceValidUntil": YearDateformatchange + "T18:30+05:30",
              "itemCondition": "NewCondition",
              "availability": "InStock"
            }
          }
          this.productmerchantreviewarrayjoin?.push(this.productmerchantreviewjson);
        }
        this.productmerchantreviewLD = this.getSafeHTML(this.productmerchantreviewarrayjoin);
      }
    });
  }

  ngAfterViewInit() {

    // if (isPlatformBrowser(this.platformId)) {
    //   this.initIntersectionObserver();

    //   const link1 = document.createElement('link');
    //   link1.rel = 'stylesheet';
    //   link1.href =
    //     'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';

    //   const link2 = document.createElement('link');
    //   link2.rel = 'stylesheet';
    //   link2.href =
    //     'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';

    //   document.head.appendChild(link1);
    //   document.head.appendChild(link2);
    // }
  }


  private initIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadMore();
        }
      });
    });

    if (this.scrollAnchor) {
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
  }

  loadMore() {
    this.pagePropertyCount = LocalityBasedListing.localitycount;

    this.showLoader = true;
    let totalcount = this.projectcount;
    // const limit = LocalityBasedListing.localitycount += 5;
    // let limitprprtyrows = 5;
    const limit = LocalityBasedListing.localitycount;
    LocalityBasedListing.localitycount += 5;
    let limitprprtyrows = 5;
    var locid = this.localityId;
    var bedroom = this.Filter.Bedrooms;
    var min = this.Filter.min;
    var max = this.Filter.max;
    var pos = this.Filter.possission;
    var statusid = this.Filter.statusid
    var proptypeId = this.Filter.proptypeid;
    this.UserId = this.storage?.getItem("userID");
    let param = {
      limit: limit,
      limitrows: limitprprtyrows,
      locality: locid,
      bedroom: bedroom,
      minprice: min,
      maxprice: max,
      possission: pos,
      statusid: statusid,
      proptypeid: proptypeId,
    };
    let livecount = this.propertylists.length || 0;
    if (livecount < totalcount) {
      $('.search-results').css('padding-bottom', '88px');
      return this.Service.getCity(this.city, param).subscribe({
        next: (propertylists) => {
          var status = propertylists['status'];
          if (status == "False") {
            this.showLoader = false;
            $('.search-results').css('padding-bottom', '88px');
          } else {
            this.propertylists = this.propertylists.concat(propertylists['deatils']);
          }
        }
      });
    } else {
      this.showLoader = false;
      return new Subscription(); // Return empty sub to match return type if necessary
    }
  }

  @HostListener('touchstart', [])
  onTouchLoad() {


    if (this.componentloads == false) {
      this.componentloads = true;
      import('../mat-autocomplete-new/mat-autocomplete-new')
        .then(c => {
          this.Matautocomplete = c.MatAutocompleteNew;
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
        link1.rel = 'stylesheet';
        link1.href =
          'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';

        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href =
          'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';

        document.head.appendChild(link1);
        document.head.appendChild(link2);
      }

    }


    // if (this.componentloads == false) {
    //   this.componentloads = true;
    //   import('../mat-autocomplete-new/mat-autocomplete-new.module').then(mod => mod.MatAutocompleteNewModule).then(MatAutocompleteNewModule => {
    //     this.Matautocomplete = MatAutocompleteNewModule.components['lazy'];
    //   });

    //   import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule => {
    //     this.enquiryFormComponent = enquiryFormModule.components['lazy'];
    //     $('.modal-login').css('z-index', '99999');
    //   });
    // }
    // $('.desc_div').removeClass('desc_div');

    if (this.topnewapiload == true) {
      this.topnewapiload = false;
    }
  }

  transitionEnd(event: any) {
    var dv = document.getElementById("floatinglink")!;
    var dvStyle = dv.getAttribute('style')!;
    if (dvStyle?.indexOf("translateX(-584%)") > -1) {
      $('.floating-link').css('width', '216px');
      $('.border_div').css('opacity', '1');
      $('#floating_img').css('display', 'none');
    }
  }

  getmeta() {
    var localityid = this.router.url?.split('-').pop()!.match(/[0-9]+/)!;
    this.localityid = localityid;

    var param = {
      locid: localityid,
    };
    this.Service.getlocalitymeta('', param).subscribe({
      next: (metatag) => {
        let metatags = metatag['Localityseo'];
        // this.localitydescription = metatags[0].Description;
        // if (this.localitydescription == '') {
        //   this.description = false;
        // } else {
        //   this.description = true;
        // }
        this.localname = metatags[0].LocalityName;
        this.localtyname = this.localname;
        var Locality_Seo = this.localname?.toLowerCase().replace(/\s+/g, '-');
        var City_Seo = metatags[0].city_name?.toLowerCase().replace(/\s+/g, '-');
      }
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
    }
    // $('.androidApp').css('display', 'none');
  }

  propertyNameClick(PropertyName: any, RegionID: any, localityid: any, PropertyID: any) {
    this.SelectedPropName = PropertyName;
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.propid = PropertyID;
    $('#otpValidate').css('display', 'block');
  }

  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getcarousalSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    const html = `<script type="application/ld+json">{
        "@context":"http://schema.org",
          "@type":"ItemList",
          "name":"Properties for Sale in ${this.localtyname}, ${this.city} - Homes247.in",
          "description":"Properties for Sale in ${this.localtyname}, ${this.city}. Avail the best deals on 1, 2&3 BHK available in ${this.localtyname}. Call us for pricing, project details & features.",
          "itemListElement":[
            ${json}
        ],"numberOfItems":40}
      </script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  shuffle(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  onresize() {
    var width = this.window.innerWidth;
    if (width < 1080) {
      this.filterShowHide = true;
    } else {
      this.filterShowHide = false;
    }
  }

  ShowHideFilter() {
    this.Service.mouseenterservice5();

    setTimeout(() => {
      if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        $('.head_stick').css('display', 'none');
      } else {
        $('.head_stick').css('display', 'block');
      }
    }, 300);

    $('#filterModal').modal('show');
    this.window.scroll(0, 0);
    this.sortShowHide = false;
  }

  scripts() {
    $(function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // $('.ui.dropdown').dropdown();
      // $('.ui.search.dropdown').dropdown({
      //   minCharacters: 3,
      //   useLabels: false,
      // });
    });

    // Pradeesh
    if (this.storage?.getItem('userID') !== null) {

      this.UserId = this.storage?.getItem('userID');

      let stored = this.storage?.getItem('propertyID');
      this.storagearr = stored ? JSON.parse(stored) : [];

      this.Service.getUserWishListByIdTest(this.UserId, 1)
        .subscribe(userFavList => {

          this.userRentalFavList = userFavList['favouritelist'];

          this.propertyIds =
            this.userRentalFavList?.map(item => item.propertyId) || [];

          this.storagearr = [...this.propertyIds];

          this.storage?.setItem('propertyID',
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
      this.storage?.setItem('SeenPropertyID', '[]');
      this.seenProjectsStoragearr = JSON.parse(this.storage?.getItem('SeenPropertyID'));
    }
  }

  // semanticjquery() {
  //   $('.ui.dropdown').dropdown({});
  // }

  apioptions(apivalue: any) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (value.length >= 1 ? this._filter(value) : []))
    );
  }

  private _filter(value: string) {
    const filterValue = value?.toLowerCase();
    return this.options?.filter((option: any) =>
      option.name?.toLowerCase().includes(filterValue)
    );
  }

  getlocality() {
    var value = this.cityservice.cityfinder(this.newcity);
    this.cityname = value.cityname.replace('-', ' ');
    this.cityId = value.cityid;
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

  // sortfiltershowhide() {
  //   var prevScrollpos = window.pageYOffset;
  //   var isScrolling: any;
  //   window.addEventListener(
  //     'scroll',
  //     function (event) {
  //       var currentScrollPos = window.pageYOffset;
  //       if (prevScrollpos > currentScrollPos) {
  //         $('.sortfilter_div').css('display', 'block');
  //       } else {
  //         $('.sortfilter_div').css('display', 'none');
  //         $('#fixed-accordion').css('visibility', 'hidden');
  //       }
  //       prevScrollpos = currentScrollPos;
  //       window.clearTimeout(isScrolling);
  //       isScrolling = setTimeout(function () {
  //         $('.sortfilter_div').css('display', 'block');
  //       }, 2000);
  //       if (
  //         $(window).scrollTop()! + $(window).height()! >
  //         $(document).height()! - 200
  //       ) {
  //         $('.sortfilter_div').css('display', 'none');
  //         isScrolling = setTimeout(function () {
  //           $('.sortfilter_div').css('display', 'none');
  //         }, 2000);
  //       }
  //     },
  //     false
  //   );
  // }

  addwishlist(id: any) {
    this.propertyId = id;
    const userid = this.storage?.getItem("userID");
    var param = {
      userid: userid,
      propid: this.propertyId,
    };
    this.Service.addfavaourite(param).subscribe({
      next: (response) => {
        this.alertmesg = response['message'];
        if (response['status'] === 'True') {
          $('.toast').toast('show');
        }
      }
    });
  }

  wishlistaddstorage(id: any) {
    if ('propertyID' in this.storage) {
    } else {
      this.storage?.setItem('propertyID', '[]');
    }
    const proparray = this.storage?.getItem('propertyID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(id);

    this.parsedarray = JSON.parse(proparray);
    if (itemToRemoveIndex == -1) {
      this.parsedarray?.push(id);
      this.storage?.setItem(
        'propertyID',
        JSON.stringify(this.parsedarray)
      );
    } else {
      this.parsedarray = this.parsedarray?.filter(function (item: any) {
        return item !== id;
      });
      this.storage?.setItem(
        'propertyID',
        JSON.stringify(this.parsedarray)
      );
    }
  }

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }

  Oncompareclick() {
    this.Service.mouseenterservice2();
    this.compareShowonimg = this.compareShowonimg ? false : true;
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID')!);
    if (this.compareproparray.length >= 1) {
      this.hideshowcompare = true;
      this.compareStorageArry = JSON.parse(
        this.storage?.getItem('ComparePropID')!
      );
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
      if (compare1 != undefined) {
        this.Service2.getpropertynew(compare1).subscribe({
          next: (prop) => {
            let propDetails = prop['details'];
            this.propertiesDetails = propDetails;
            this.propimag1 = this.propertiesDetails[0].images[0].name;
            this.propertyname1 = this.propertiesDetails[0]['propertyName'];
            this.propid1 = this.propertiesDetails[0]['property_info_IDPK'];
            this.compareloader1 = false;
            this.compareprop1 = true;
          }
        });
      }
      if (compare2 != undefined) {
        this.Service2.getpropertynew(compare2).subscribe({
          next: (prop) => {
            let propDetails = prop['details'];
            this.propertiesDetails = propDetails;
            this.propimag2 = this.propertiesDetails[0].images[0].name;
            this.propertyname2 = this.propertiesDetails[0]['propertyName'];
            this.propid2 = this.propertiesDetails[0]['property_info_IDPK'];
            this.compareloader2 = false;
            this.compareprop2 = true;
          }
        });
      }
    } else {
      this.hideshowcompare = false;
    }
    this.sortShowHide = false;
  }

  async oncompareshowimgclick(propid: any, proptype: any) {
    this.hideshowcompare = true;
    if ('ComparePropID' in this.storage) {
    } else {
      this.storage?.setItem('ComparePropID', '[]');
    }
    this.comparePropType = this.storage?.getItem('comparePropType1');
    const proparray = this.storage?.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID')!);
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
            timer: 2000,
          });
        } else {
          this.parsedarray?.push(propid);
          this.storage?.setItem(
            'ComparePropID',
            JSON.stringify(this.parsedarray)
          );
          this.compareproparray = JSON.parse(
            this.storage?.getItem('ComparePropID')!
          );
        }
      } else {
        this.parsedarray = this.parsedarray?.filter(function (item: any) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.storage?.removeItem('comparePropType1');
        } else {
          this.hideshowcompare = true;
        }
        this.storage?.setItem(
          'ComparePropID',
          JSON.stringify(this.parsedarray)
        );
        this.compareproparray = JSON.parse(
          this.storage?.getItem('ComparePropID')!
        );
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
            timer: 2000,
          });
        } else {
          this.parsedarray?.push(propid);
          this.storage?.setItem(
            'ComparePropID',
            JSON.stringify(this.parsedarray)
          );
          this.compareproparray = JSON.parse(
            this.storage?.getItem('ComparePropID')!
          );
        }
      } else {
        this.parsedarray = this.parsedarray?.filter(function (item: any) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.storage?.removeItem('comparePropType1');
        } else {
          this.hideshowcompare = true;
        }
        this.storage?.setItem(
          'ComparePropID',
          JSON.stringify(this.parsedarray)
        );
        this.compareproparray = JSON.parse(
          this.storage?.getItem('ComparePropID')!
        );
      }
    } else {
      const Swal = await this.getSwal();
      Swal.fire({
        text: 'Compare only with same Property Type',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
    this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID')!);
    var compare1 = this.compareStorageArry[0];
    var compare2 = this.compareStorageArry[1];
    if (compare1 != undefined) {
      this.Service2.getpropertynew(compare1).subscribe({
        next: (prop) => {
          let propDetails = prop['details'];
          this.propertiesDetails = propDetails;
          this.propimag1 = this.propertiesDetails[0].images[0].name;
          this.propertyname1 = this.propertiesDetails[0]['propertyName'];
          this.propid1 = this.propertiesDetails[0]['property_info_IDPK'];
          this.proptype1 = this.propertiesDetails[0]['propertyType'];
          this.cityname = this.propertiesDetails[0]['city_name'];
          this.storage?.setItem('comparePropType1', this.proptype1);
          this.compareloader1 = false;
          this.compareprop1 = true;
        }
      });
    }
    if (compare2 != undefined) {
      this.Service2.getpropertynew(compare2).subscribe({
        next: (prop) => {
          let propDetails = prop['details'];
          this.propertiesDetails = propDetails;
          this.propimag2 = this.propertiesDetails[0].images[0].name;
          this.propertyname2 = this.propertiesDetails[0]['propertyName'];
          this.propid2 = this.propertiesDetails[0]['property_info_IDPK'];
          this.proptype2 = this.propertiesDetails[0]['propertyType'];
          this.cityname = this.propertiesDetails[0]['city_name'];
          this.storage?.setItem('comparePropType2', this.proptype2);
          this.compareloader2 = false;
          this.compareprop2 = true;
        }
      });
    }
  }
  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }

  closeprop1(propid1: any) {
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID')!);
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.storage?.removeItem('comparePropType1');
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID' in this.storage) {
    } else {
      this.storage?.setItem('ComparePropID', '[]');
    }
    const proparray = this.storage?.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(propid1);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray?.filter(function (item: any) {
        return item !== propid1;
      });
      this.compareloader1 = true;
      this.compareprop1 = false;
      this.storage?.setItem(
        'ComparePropID',
        JSON.stringify(this.parsedarray)
      );
      this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID')!);
    }
  }

  closeprop2(propid2: any) {
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID')!);
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.storage?.removeItem('comparePropType1');
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID' in this.storage) {
    } else {
      this.storage?.setItem('ComparePropID', '[]');
    }
    const proparray = this.storage?.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(propid2);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray?.filter(function (item: any) {
        return item !== propid2;
      });
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.storage?.setItem(
        'ComparePropID',
        JSON.stringify(this.parsedarray)
      );
      this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID')!);
    }
  }

  CompareNow() {
    this.router.navigate(['/compare-properties']);
    this.storage?.setItem('cityname', this.cityname);
  }

  isInWishlist(propertyID: number): boolean {
    const userId = this.storage?.getItem('userID');

    return userId
      ? this.storagearr?.includes(propertyID) ?? false
      : this.storagearr?.includes(propertyID) ?? false;
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

        this.Service.removeFavaourite(param).subscribe();
      }

    } else {
      this.storagearr?.push(propertyID);

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

    this.storage?.setItem('propertyID', JSON.stringify(this.storagearr));
    if (this.storage?.getItem('propertyID')) {
      this.storagearr = JSON.parse(this.storage?.getItem('propertyID'));
    } else {
      this.storage?.setItem('propertyID', '[]');
      this.storagearr = JSON.parse(this.storage?.getItem('propertyID'));
    }
  }


  // ── SEO HELPER: keeps page titles within the 60-char sweet spot ──
  getSeoTitle(shortTitle: string, longTitle: string): string {
    return shortTitle.length <= 60 ? shortTitle : longTitle;
  }

  breadcrumbs: { label: string; url: string }[] = [];

  setBreadcrumbs(): void {
    const city = (this.currentCity || this.cityname || '').toString().trim();
    const citySlug = city?.toLowerCase().replace(/\s+/g, '-');
    const loc = (this.localityName || '').toString().trim();
    const locSlug = loc?.toLowerCase().replace(/\s+/g, '-');
    const bhk = this.noOfBedrooms;

    const home = { label: "Home", url: "/" };
    const cityProps = { label: `Properties in ${city}`, url: `/${citySlug}/property-sale` };
    const newProjectsCity = {
      label: `New Projects in ${city}`,
      url: `/new-launch-projects/new-projects-in-${citySlug}`
    };

    if (this.mainlocalitypage) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Properties in ${loc}`, url: this.router.url }
      ];
    } else if (this.upcoming_new_launch) {
      this.breadcrumbs = [
        home,
        newProjectsCity,
        { label: `New Projects in ${loc}, ${city}`, url: this.router.url }
      ];
    } else if (this.stlc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Flats for Sale in ${city}`, url: `/residential-flats-in-${citySlug}-for-sale` },
        { label: `Ready to Move Flats in ${city}`, url: `/ready-to-move-apartments/ready-to-move-flats-in-${citySlug}` },
        { label: `Ready to Move Flats in ${loc}`, url: this.router.url }
      ];
    } else if (this.atlc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Affordable Flats in ${city}`, url: `/atlc/affordable-flats-in-${citySlug}` },
        { label: `Affordable Flats in ${loc}`, url: this.router.url }
      ];
    } else if (this.btlc) {
      if (this.property_type === 'Villas') {
        this.breadcrumbs = [
          home,
          cityProps,
          { label: `Villas for Sale in ${city}`, url: `/villas-for-sale-in-${citySlug}` },
          { label: `${bhk} BHK Villas in ${loc}, ${city}`, url: this.router.url }
        ];
      } else {
        this.breadcrumbs = [
          home,
          cityProps,
          { label: `Flats for Sale in ${city}`, url: `/residential-flats-in-${citySlug}-for-sale` },
          { label: `${bhk} BHK Flats in ${city}`, url: `/btc/${bhk}-bhk-flats-in-${citySlug}` },
          { label: `${bhk} BHK Flats in ${loc}`, url: this.router.url }
        ];
      }
    } else if (this.bstlc || this.btalc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Flats for Sale in ${city}`, url: `/residential-flats-in-${citySlug}-for-sale` },
        { label: `${bhk} BHK in ${loc}, ${city}`, url: this.router.url }
      ];
    } else if (this.btllc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Luxury Flats in ${city}`, url: `/ltlc/luxury-flats-in-${citySlug}` },
        { label: `${bhk} BHK Luxury Flats in ${loc}`, url: this.router.url }
      ];
    } else if (this.aplc || this.lplc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `${this.ResidenceType} in ${city}`, url: this.router.url }
      ];
    } else if (this.ltlc) {
      this.breadcrumbs = [
        home,
        cityProps,
        { label: `Luxury Flats in ${city}`, url: `/ltlc/luxury-flats-in-${citySlug}` },
        { label: `Luxury Flats in ${loc}`, url: this.router.url }
      ];
    } else {
      this.breadcrumbs = [home, cityProps];
    }
  }


  pageTitle: string = '';
  setPageTitle(): void {
    const city = (this.currentCity || this.cityname || '').toString().trim();
    const loc = (this.localityName || '').toString().trim();
    const bhk = this.noOfBedrooms || '';

    if (this.mainlocalitypage) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Properties in ${loc}`;
    } else if (this.upcoming_new_launch) {
      this.pageTitle = `${this.projectcount || 'XXXX'} ${bhk} New Projects in ${loc}, ${city}`;
    } else if (this.stlc) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Ready to Move Flats in ${loc}, ${city}`;
    } else if (this.atlc) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Affordable Flats in ${loc}, ${city}`;
    } else if (this.btlc) {
      this.pageTitle = `${bhk} BHK Properties in ${loc}, ${city}`;
    } else if (this.ltlc) {
      this.pageTitle = `Luxury Apartments in ${loc}, ${city}`;
    } else if (this.lplc) {
      this.pageTitle = `Luxury ${this.ResidenceType} in ${loc}, ${city}`;
    } else if (this.aplc) {
      this.pageTitle = `${this.projectcount || 'XXXX'} Affordable ${this.ResidenceType} in ${loc}, ${city}`;
    } else if (this.bstlc || this.btalc || this.btllc) {
      this.pageTitle = `${bhk} BHK ${this.status_name} in ${loc}, ${city}`;
    } else {
      this.pageTitle = `Properties in ${loc}`;
    }

    this.setBreadcrumbs();

  }


  PageIndex() {
    if (this.router.url?.indexOf('/property-sale-in-') > -1) {
      this.mainlocalitypage = true;
      this.atlc = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.btllc = false;
      this.bstlc = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.btalc = false;
      this.aplc = false;
      this.mainpage = false;
      this.lplc = false;
      this.builder_locality = false;
      this.apc = false;
      this.lpc = false;
      this.ltc = false;
      this.btluc = false;
      this.btac = false;
      this.atc = false;
      this.ltlc = false;
      this.City_header = true;
      this.Filter_Property_Type = true;
      this.Filter_Bedroom_Type = true;
      this.Filter_Posession_Within = true;
      this.Filter_Budget = true;
      this.Filter_Property_Status = true;
      this.routeSub = this.activeroute.params.subscribe(params => {
        var cityname = params['cityname'];
        var capsname = cityname.toLocaleUpperCase();
        this.currentCity = capsname.replace('-', ' ');
        var lasturl = params['staticlocurl-:localityname-:localityid'];
        var localityid = lasturl?.split('-').pop().match(/[0-9]+/);
        this.localityId = localityid;


        // ✅ SSR fix — set localityName synchronously from URL before API call
        const urlSlug = lasturl || '';
        this.localityName = urlSlug
          .replace(/-\d+$/, '')
          .replace(new RegExp(`-${this.currentCity?.toLowerCase().replace(/\s+/g, '-')}$`), '')
          .replace(/^[\w]+-[\w]+-[\w]+-[\w]+-[\w]+-in-/, '') // strip bhk prefix if present
          .replace(/-/g, ' ')
          .replace(/\b\w/g, c => c?.toUpperCase())
          .trim();



        String.prototype.toLocaleUpperCase = function () {
          return this.replace(/\w\S*/g, function (txt) {
            return txt?.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        };

        var citynamecaps = cityname.toLocaleUpperCase();

        var param = {
          locid: localityid,
        };
        this.Service.getlocalitymeta(this.currentCity, param).subscribe({
          next: (metatag) => {
            let metatags = metatag['Localityseo'];
            this.locname = metatags[0].LocalityName;
            var Locality_Seo = this.locname?.toLowerCase().replace(/\s+/g, '-');
            var City_Seo = metatags[0].city_name?.toLowerCase().replace(/\s+/g, '-');
            this.localityName = this.locname;
            this.setPageTitle();


            var urlstructure1 = '/' + City_Seo + '/property-sale-in-' + Locality_Seo + '-' + localityid

            if (this.router.url?.indexOf(urlstructure1) > -1) {
            } else {
              this.responseService_locality.set301Status(City_Seo, Locality_Seo, localityid);
            }

            // ── SEO: /property-sale-in ──
            let pageTitle: string;
            let pageDesc: string;

            pageTitle = this.getSeoTitle(
              `Properties for Sale in ${metatags[0].LocalityName}, ${citynamecaps} | Homes247`,
              `Properties ${metatags[0].LocalityName}, ${citynamecaps}`
            );
            pageDesc = `Explore premium properties for sale in ${metatags[0].LocalityName}. Secure your dream home with the best market prices and RERA-verified deals.`;
            this.titleService.setTitle(pageTitle);
            this.meta.updateTag({ name: 'description', content: pageDesc });
            this.meta.updateTag({ property: 'og:title', content: pageTitle });
            this.meta.updateTag({ property: 'og:description', content: pageDesc });
            this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
            this.meta.updateTag({ property: 'og:type', content: 'website' });
            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
            this.meta.updateTag({ name: 'twitter:description', content: pageDesc });
            this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

            var width = this.window.innerWidth;
            // if (width < 420) {
            //   this.localitydescription = false;
            // } else {
            //   this.localitydescription = metatags[0].Description;
            // }

            const cityName = (this.currentCity || '').toString();
            const citySlug = cityName?.toLowerCase().replace(/\s+/g, '-');
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
                  "name": 'Real Estate in ' + this.currentCity?.toLowerCase().replace(/\b\w/g, c => c?.toUpperCase()) + '',
                  "item": "https://www.homes247.in/real-estate-in-" + this.currentCity?.toLowerCase().replace(/\b\w/g, c => c?.toUpperCase()) + ""
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Properties for Sale in " + this.currentCity?.toLowerCase().replace(/\b\w/g, c => c?.toUpperCase()) + "",
                  "item": "https://www.homes247.in/" + this.currentCity?.toLowerCase().replace(/\b\w/g, c => c?.toUpperCase()) + "/property-sale"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Properties for Sale in " + this.localityName + ", " + this.currentCity?.toLowerCase().replace(/\b\w/g, c => c?.toUpperCase()) + " - Homes247.in",
                  "item": "https://www.homes247.in" + this.router.url
                }]
            }
            // alert(this.localityName)
            this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
          }
        });
      });

    } else if (this.router.url?.indexOf('/btlc/') > -1) {
      this.Btlc();

    } else if (this.router.url?.indexOf('/upcoming-new-launch-properties/new-projects-in-') > -1) {
      this.Upcoming_new_launch();
    } else if (this.router.url?.indexOf('/stlc/') > -1) {
      this.Stlc();
    } else if (this.router.url?.indexOf('/atlc/') > -1) {
      this.Atlc();
    } else if (this.router.url?.indexOf('/btalc/') > -1) {
      this.Btalc();
    } else if (this.router.url?.indexOf('/btllc/') > -1) {
      this.Btllc();
    } else if (this.router.url?.indexOf('/bstlc/') > -1) {
      this.Bstlc();
    } else if (this.router.url?.indexOf('/aplc/') > -1) {
      this.Aplc();
    } else if (this.router.url?.indexOf('/lplc/') > -1) {
      this.Lplc();
    } else if (this.router.url?.indexOf('/ltlc/') > -1) {
      this.Ltlc();
    } else {
      this.mainpage = true;
      this.mainlocalitypage = false;
      this.atlc = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.btllc = false;
      this.bstlc = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.btalc = false;
      this.aplc = false;
      this.lplc = false;
      this.builder_locality = false;
      this.apc = false;
      this.lpc = false;
      this.ltc = false;
      this.btluc = false;
      this.btac = false;
      this.atc = false;
      $('.Header_part').css('box-z', '2px 2px 5px 2px rgba(0, 0, 0, 0.15)');
    }
    this.Service.createLinkForCanonicalURL();
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    this.cityname = value.cityname.replace('-', ' ');
    this.cityid = value.cityid;
    this.getcity();


  }

  Upcoming_new_launch() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = true;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;

    this.Filter_Posession_Within = true;
    this.Filter_Budget = true;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname;
    var localityid = this.router.url?.split('-').pop().match(/[0-9]+/);
    this.localityid = localityid;
    this.routeSub = this.activeroute.params.subscribe(params => {

      this.projectStatus = [50310, 50308];
      this.Filter.statusid = this.projectStatus;
      var autocomppropparams = {
        statusid: this.projectStatus,
        locality_id: this.localityId,
      }
      this.Service.getlocalityproperties(autocomppropparams).subscribe({
        next: (lists) => {
          this.localityproperties = lists['autolist'];
        }
      });
      var localityid = this.router.url?.split('-').pop().match(/[0-9]+/);
      this.localityid = localityid;

      var paramlocality = {
        locid: this.localityid,
      };


      this.Service.getlocalitymeta(this.cityname, paramlocality).subscribe({
        next: (metatag) => {
          let metatags = metatag['Localityseo'];
          this.localityName = metatags[0].LocalityName;
          this.localityName = this.localityName;
          this.setPageTitle();
          const upcomingTitle = this.getSeoTitle(
            `New Launch Projects in ${this.localityName}, ${this.cityname} | Homes247`,
            `New Projects ${this.localityName}, ${this.cityname}`
          );

          const upcomingDesc = `Explore new launch projects in ${this.localityName}, ${this.cityname}. Discover premium apartments and villas with top amenities on Homes247.`;
          this.titleService.setTitle(upcomingTitle);
          this.meta.updateTag({ name: 'description', content: upcomingDesc });
          this.meta.updateTag({ property: 'og:title', content: upcomingTitle });
          this.meta.updateTag({ property: 'og:description', content: upcomingDesc });
          this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: upcomingTitle });
          this.meta.updateTag({ name: 'twitter:description', content: upcomingDesc });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

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
                "name": "Properties for Sale in " + this.cityname + "",
                "item": "https://www.homes247.in/" + this.cityname.toLocaleLowerCase().replace(/\s+/g, '-') + "/property-sale"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": " Buy New projects in " + this.cityname + " | Upcoming Projects in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in/new-launch-projects/new-projects-in-" + this.cityname.toLocaleLowerCase().replace(/\s+/g, '-')
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "New Projects in " + this.localityName + "," + this.cityname + " | Upcoming Projects in Sale in " + this.localityName + "," + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
      })
    })
  }

  Stlc() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = true;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;

    this.Filter_Posession_Within = true;
    this.Filter_Budget = true;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname

    let urls = this.router.url?.split('?')[0];
    var localityId_1 = urls?.split('-').pop()!.match(/[0-9]+/)!;
    var paramlocality = {
      locid: localityId_1,
    };
    this.Service.getlocalitymeta(this.cityname, paramlocality).subscribe({
      next: (metatag) => {
        let metatags = metatag['Localityseo'];
        this.localityName = metatags[0].LocalityName;
        this.localityName = this.localityName;
        this.setPageTitle();
        // ── SEO: /stlc ──
        const stlcTitle = this.getSeoTitle(
          `Buy Ready to Move Flats in ${this.localityName} | Homes247.in`,
          `Ready to Move Flats ${this.localityName}, ${this.cityname}`
        );
        // console.log(stlcTitle);
        const stlcDesc = `Find ready to move flats and apartments in ${this.localityName}, ${this.cityname}. Explore premium ready homes with top amenities on Homes247.`;
        // alert(stlcDesc);
        // console.log(stlcDesc);
        this.titleService.setTitle(stlcTitle);
        this.meta.updateTag({ name: 'description', content: stlcDesc });
        this.meta.updateTag({ property: 'og:title', content: stlcTitle });
        this.meta.updateTag({ property: 'og:description', content: stlcDesc });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: stlcTitle });
        this.meta.updateTag({ name: 'twitter:description', content: stlcDesc });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      }
    })
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['status-:propertytype-in-:localityname-:city-:localityId'];
      let urls = this.router.url?.split('?')[0];
      this.localityId = urls?.split('-').pop().match(/[0-9]+/);
      this.projectStatus = [50307];
      this.Filter.statusid = this.projectStatus
      this.Filter.proptypeid = [50401];

      var autocomppropparams = {
        cityid: this.cityid,
        statusid: this.Filter.proptypeid,
        proptypeid: this.projectStatus,
        locality_id: this.localityId
      }
      this.Service.getlocalityproperties(autocomppropparams).subscribe({
        next: (lists) => {
          this.localityproperties = lists['autolist'];
          if ((lists['status']) == 'False') {
            this.localityproperties_hide = false;
          } else {
            this.localityproperties_hide = true;
          }
        }
      })
    });
  }

  Atlc() {
    this.mainlocalitypage = false;
    this.atlc = true;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;

    this.Filter_Bedroom_Type = true;
    this.Filter_Posession_Within = true;
    this.Filter_Property_Status = true;
    var localityid = this.router.url?.split('-').pop()!.match(/[0-9]+/)!;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname

    var paramlocality = {
      locid: localityid,
    };
    var currentCity = ''
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe({
      next: (metatag) => {
        let metatags = metatag['Localityseo'];
        this.currentLocalityName = metatags[0].LocalityName;
        this.localityName = this.currentLocalityName;
        this.currentCity_1 = metatags[0].city_name;
        this.setPageTitle();
        // ── SEO: /atlc ──
        const atlcTitle = this.getSeoTitle(
          `Affordable Flats in ${this.currentLocalityName}, ${this.currentCity_1} | Homes247.in`,
          `Affordable Flats ${this.currentLocalityName}, ${this.currentCity_1}`
        );
        const atlcDesc = `Discover affordable flats and apartments in ${this.currentLocalityName}, ${this.cityname}. Find budget-friendly homes with top amenities on Homes247.`;
        this.titleService.setTitle(atlcTitle);
        this.meta.updateTag({ name: 'description', content: atlcDesc });
        this.meta.updateTag({ property: 'og:title', content: atlcTitle });
        this.meta.updateTag({ property: 'og:description', content: atlcDesc });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: atlcTitle });
        this.meta.updateTag({ name: 'twitter:description', content: atlcDesc });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      }
    })
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['affordable-flats-in-:localityname-:cityname-:localityid'];
      var localityid = url?.split('-').pop().match(/[0-9]+/);
      this.Filter.proptypeid = [50401];
      this.minPrice = '1';
      this.Filter.min = this.minPrice;
      this.maxPrice = '6';
      this.Filter.max = this.maxPrice;
      this.URLID = '411';
      this.ResidenceType = 'Flats';
      this.affordable_locality = true;
      this.localityId = [localityid]
    })
  }

  Btlc() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = true;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;

    this.Filter_Posession_Within = true;
    this.Filter_Budget = true;
    this.Filter_Property_Status = true;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname;
    var localityId_1 = this.router.url?.split('-').pop()!.match(/[0-9]+/)!;


    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['bhk-:propertytype-in-:locality-:city-:localityId'];
      var propertyTypeValue = url?.split('-')[2];
      this.property_type = propertyTypeValue?.charAt(0).toLocaleUpperCase() + propertyTypeValue?.slice(1);
      this.setPageTitle()
      var localityId = url?.split('-').pop().match(/[0-9]+/);
      this.localityId = localityId;
      var propertyTypeValue = this.property_type;
      // var bhkValue = url.charAt(0);
      var bhkValue = this.router.url?.split('/').pop().split('-')[0];

      this.noOfBedrooms = bhkValue;
      this.Filter.Bedrooms = this.noOfBedrooms;
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityId = value.cityid;
      this.cityname = value.cityname;

      if (bhkValue == '1') {
        this.oneBhkUrl = true;
      } else if (bhkValue == '2') {
        this.twoBhkUrl = true;
      } else if (bhkValue == '3') {
        this.threeBhkUrl = true;
      } else if (bhkValue == '4') {
        this.fourBhkUrl = true;
      } else {
        this.fiveBhkUrl = true;
      }

      if (propertyTypeValue === 'Flats') {
        this.Filter.proptypeid = [50401];
        this.apartmentUrl = true;
      } else if (propertyTypeValue === 'Villas') {
        this.Filter.proptypeid = [50402];
        this.villasUrl = true;
      }
      // alert(this.cityname)

      var paramlocality = {
        locid: localityId_1,
      };
      this.Service.getlocalitymeta(this.cityname, paramlocality).subscribe({
        next: (metatag) => {
          let metatags = metatag['Localityseo'];
          this.localityName = metatags[0].LocalityName;
          this.localityName = this.localityName;
          this.setPageTitle();


          // ── SEO: /btlc ──
          let btlcTitle = '';
          let btlcDesc = '';
          if (this.router.url?.indexOf('flats') > -1) {
            btlcTitle = this.getSeoTitle(
              `${bhkValue} BHK Apartments in ${this.localityName}, ${this.cityname} | Homes247`,
              `${bhkValue} BHK Flats ${this.localityName}`
            );
            btlcDesc = `Discover premium ${bhkValue} BHK Apartments in ${this.localityName}. Browse verified listings and luxury apartments from ${this.cityname}'s top builders.`;
          } else if (this.router.url?.indexOf('villas') > -1) {
            btlcTitle = this.getSeoTitle(
              `Buy ${bhkValue} BHK Villas in ${this.localityName} ${this.cityname} | Homes247`,
              `${bhkValue} BHK Villas in ${this.localityName}`
            );
            btlcDesc = `Discover premium ${bhkValue} BHK villas in ${this.localityName}. Explore luxury gated communities and high-end homes from ${this.cityname}'s top builders.`;
          }
          if (btlcTitle) {
            this.titleService.setTitle(btlcTitle);
            this.meta.updateTag({ name: 'description', content: btlcDesc });
            this.meta.updateTag({ property: 'og:title', content: btlcTitle });
            this.meta.updateTag({ property: 'og:description', content: btlcDesc });
            this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
            this.meta.updateTag({ property: 'og:type', content: 'website' });
            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            this.meta.updateTag({ name: 'twitter:title', content: btlcTitle });
            this.meta.updateTag({ name: 'twitter:description', content: btlcDesc });
            this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
          }
        }
      })
      if (this.router.url?.indexOf('flats') > -1) {
        const cityName = (this.currentCity || '').toString();
        const citySlug = cityName?.toLowerCase().replace(/\s+/g, '-');

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
              "item": "https://www.homes247.in/residential-flats-in-" + this.cityname + "-for-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": bhkValue + "BHK Flats/Apartments in " + this.cityname + " | Homes247.in",
              "item": "https://www.homes247.in/btc/" + bhkValue + "-bhk-flats-in-" + this.cityname
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": bhkValue + "BHK Ready to Move Flats/Apartments in " + this.cityname + " | Homes247.in",
              "item": "https://www.homes247.in" + this.router.url
            }
          ]
        }
      } else if (this.router.url?.indexOf('villas') > -1) {
        const cityName = (this.currentCity || '').toString();
        const citySlug = cityName?.toLowerCase().replace(/\s+/g, '-');

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
              "name": "Villas for sale in " + this.cityname + "|Buy villas in " + this.cityname + " | Homes247.in",
              "item": "https://www.homes247.in/villas-for-sale-in-" + this.cityname
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": bhkValue + " BHK Villas in " + this.localityName + "," + this.cityname + " | 3 BHK  Villas for Sale in " + this.localityName + ", " + this.cityname + " | Homes247.in ",
              "item": "https://www.homes247.in/btlc/" + bhkValue + "-bhk-villas-in-" + this.localityName.toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.cityname + "-" + this.localityId
            }
          ]
        }
      }

      this.breadcrumbLD = this.getSafeHTML(this.breadcrumbjson);
    })
  }

  Btalc() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = true;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;

    this.Filter_Posession_Within = true;
    this.Filter_Property_Status = true;

    this.URLID = '411';
    this.ResidenceType = 'Flats';
    this.affordable_locality = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['bhk-:ready-to-move-:propertytype-in-:locality-:cityname-:localityid'];
      this.bhkValue = url?.charAt(0);
      this.noOfBedrooms = this.bhkValue;
      this.Filter.Bedrooms = this.noOfBedrooms;
      var localityId = this.router.url?.split('-').pop().match(/[0-9]+/);
      this.localityId = [localityId]
      if (this.router.url?.indexOf('affordable-flats-apartments') > -1) {
        this.localitycombo = true;
        this.status_name = 'Affordable Flats'
        this.minPrice = '1';
        this.Filter.min = this.minPrice;
        this.maxPrice = '7';
        this.Filter.max = this.maxPrice;
        this.Filter.proptypeid = [50401];
      } else if (this.router.url?.indexOf('affordable-villas-in') > -1) {
        this.localitycombo = true;
        this.status_name = 'Affordable Villas'
        this.minPrice = '1';
        this.Filter.min = this.minPrice;
        this.maxPrice = '7';
        this.Filter.max = this.maxPrice;
        this.Filter.proptypeid = [50402];
      }
    })

    var paramlocality = {
      locid: this.localityId,
    };
    var currentCity = ''
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe({
      next: (metatag) => {
        let metatags = metatag['Localityseo'];
        this.currentLocalityName = metatags[0].LocalityName;
        this.localityName = this.currentLocalityName;
        this.setPageTitle();
        if (this.router.url?.indexOf('affordable-flats-apartments') > -1) {
          // ── SEO: /btalc/ affordable flats ──
          const btalcFlatTitle = this.getSeoTitle(
            `${this.bhkValue} BHK Affordable Flats in ${this.localityName} | Homes247`,
            `${this.bhkValue}BHK Budget Flats ${this.localityName}`
          );
          const btalcFlatDesc = `Find ${this.bhkValue} BHK affordable flats and apartments in ${this.localityName}, ${this.cityname}. Explore budget homes with top amenities on Homes247.in.`;
          this.titleService.setTitle(btalcFlatTitle);
          this.meta.updateTag({ name: 'description', content: btalcFlatDesc });
          this.meta.updateTag({ property: 'og:title', content: btalcFlatTitle });
          this.meta.updateTag({ property: 'og:description', content: btalcFlatDesc });
          this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: btalcFlatTitle });
          this.meta.updateTag({ name: 'twitter:description', content: btalcFlatDesc });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        } else if (this.router.url?.indexOf('affordable-villas-in') > -1) {
          // ── SEO: /btalc/ affordable villas ──
          const btalcVillaTitle = this.getSeoTitle(
            `${this.bhkValue} BHK Affordable Villas in ${this.localityName} | Homes247.in`,
            `${this.bhkValue} BHK Budget Villas ${this.localityName}`
          );
          const btalcVillaDesc = `Find ${this.bhkValue} BHK affordable villas and premium homes in ${this.localityName}, ${this.cityname}. Explore top amenities and best prices on Homes247.in.`;
          this.titleService.setTitle(btalcVillaTitle);
          this.meta.updateTag({ name: 'description', content: btalcVillaDesc });
          this.meta.updateTag({ property: 'og:title', content: btalcVillaTitle });
          this.meta.updateTag({ property: 'og:description', content: btalcVillaDesc });
          this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: btalcVillaTitle });
          this.meta.updateTag({ name: 'twitter:description', content: btalcVillaDesc });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        }
      }
    })
  }

  Btllc() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = true;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;

    this.Filter_Posession_Within = true;
    this.Filter_Property_Status = true;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname

    this.URLID = '411';
    this.ResidenceType = 'Flats';
    this.affordable_locality = true;

    var localityId = this.router.url?.split('-').pop().match(/[0-9]+/);
    this.localityId = [localityId]
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['bhk-:ready-to-move-:propertytype-in-:locality-:cityname-:localityid'];
      this.bhkValue = url?.charAt(0);

      this.noOfBedrooms = this.bhkValue;


      this.Filter.Bedrooms = this.noOfBedrooms;
    })
    if (this.router.url?.indexOf('luxury-flats-apartments-in') > -1) {
      this.localitycombo = true;
      this.status_name = 'Luxury Flats'
      this.minPrice = '13';
      this.Filter.min = this.minPrice;
      this.maxPrice = '24';
      this.Filter.max = this.maxPrice;
      this.Filter.proptypeid = [50401];
    } else if (this.router.url?.indexOf('luxury-villas-in') > -1) {
      this.localitycombo = true;
      this.status_name = 'Luxury Villas'
      this.minPrice = '13';
      this.Filter.min = this.minPrice;
      this.maxPrice = '24';
      this.Filter.max = this.maxPrice;
      this.Filter.proptypeid = [50402];
    }

    var paramlocality = {
      locid: localityId,
    };
    var currentCity = ''
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe({
      next: (metatag) => {
        let metatags = metatag['Localityseo'];
        this.currentLocalityName = metatags[0].LocalityName;
        this.localityName = this.currentLocalityName;
        this.setPageTitle();
        if (this.router.url?.indexOf('luxury-flats-apartments-in') > -1) {
          // ── SEO: /btllc/ luxury flats ──
          const btllcFlatTitle = this.getSeoTitle(
            `${this.bhkValue} BHK Luxury Apartments in ${this.localityName} | Homes247.in`,
            `${this.bhkValue} BHK Luxury Flats ${this.localityName}`
          );
          const btllcFlatDesc = `Luxury ${this.bhkValue} BHK flats and apartments in ${this.localityName}, ${this.cityname}. Explore premium homes with top amenities on Homes247.in. Visit Now!`;
          this.titleService.setTitle(btllcFlatTitle);
          this.meta.updateTag({ name: 'description', content: btllcFlatDesc });
          this.meta.updateTag({ property: 'og:title', content: btllcFlatTitle });
          this.meta.updateTag({ property: 'og:description', content: btllcFlatDesc });
          this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: btllcFlatTitle });
          this.meta.updateTag({ name: 'twitter:description', content: btllcFlatDesc });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        } else if (this.router.url?.indexOf('luxury-villas-in') > -1) {
          // ── SEO: /btllc/ luxury villas ──
          const btllcVillaTitle = this.getSeoTitle(
            `Top ${this.bhkValue} BHK Luxury Villas in ${this.localityName} | Homes247.in`,
            `${this.bhkValue} BHK Luxury Villas ${this.localityName}`
          );
          const btllcVillaDesc = `Browse luxury ${this.bhkValue} BHK villas in ${this.localityName}, ${this.cityname} for sale. Explore premium homes with top amenities & prices on Homes247.in.`;
          this.titleService.setTitle(btllcVillaTitle);
          this.meta.updateTag({ name: 'description', content: btllcVillaDesc });
          this.meta.updateTag({ property: 'og:title', content: btllcVillaTitle });
          this.meta.updateTag({ property: 'og:description', content: btllcVillaDesc });
          this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: btllcVillaTitle });
          this.meta.updateTag({ name: 'twitter:description', content: btllcVillaDesc });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        }
      }
    })
  }

  Lplc() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = true;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname

    this.Filter_Property_Type = true;
    this.Filter_Bedroom_Type = true;
    this.Filter_Posession_Within = true;
    this.Filter_Property_Status = true;
    this.URLID = '411';
    this.ResidenceType = 'Projects';
    this.affordable_locality = true;

    var localityid = this.router.url?.split('-').pop().match(/[0-9]+/);
    this.minPrice = '13';
    this.Filter.min = this.minPrice;
    this.maxPrice = '24';
    this.Filter.max = this.maxPrice;
    this.URLID = '411';
    this.ResidenceType = 'Projects';
    this.localityId = [localityid];

    var paramlocality = {
      locid: localityid,
    };
    var currentCity = ''
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe({
      next: (metatag) => {
        let metatags = metatag['Localityseo'];
        this.currentLocalityName = metatags[0].LocalityName;
        this.localityName = this.currentLocalityName;
        this.setPageTitle();
        // ── SEO: /lplc ──
        const lplcTitle = this.getSeoTitle(
          `Luxury Projects in ${this.currentLocalityName}, ${this.cityname} | Homes247.in`,
          `Luxury Projects ${this.currentLocalityName}, ${this.cityname} `
        );
        const lplcDesc = `Explore luxury projects in ${this.currentLocalityName}, ${this.cityname}. Find premium high-end homes with top amenities on Homes247.in. Browse now!`;
        this.titleService.setTitle(lplcTitle);
        this.meta.updateTag({ name: 'description', content: lplcDesc });
        this.meta.updateTag({ property: 'og:title', content: lplcTitle });
        this.meta.updateTag({ property: 'og:description', content: lplcDesc });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: lplcTitle });
        this.meta.updateTag({ name: 'twitter:description', content: lplcDesc });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      }
    })
  }

  Bstlc() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = true;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = true;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;

    this.Filter_Posession_Within = true;
    this.Filter_Budget = true;

    this.URLID = '411';
    this.ResidenceType = 'Flats';
    this.affordable_locality = true;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname;

    var localityId = this.router.url?.split('-').pop().match(/[0-9]+/);
    this.localityId = [localityId];
    if (this.router.url?.indexOf('affordable-flats-apartments-in') > -1) {
      this.localitycombo = true;
      this.minPrice = '1';
      this.Filter.min = this.minPrice;
      this.maxPrice = '7';
      this.Filter.max = this.maxPrice;
      this.Filter.proptypeid = [50401];
    } else if (this.router.url?.indexOf('affordable-villas-in') > -1) {
      this.localitycombo = true;
      this.minPrice = '1';
      this.Filter.min = this.minPrice;
      this.maxPrice = '7';
      this.Filter.max = this.maxPrice;
      this.Filter.proptypeid = [50402];
    }
    if (this.router.url?.indexOf('/bstlc/') > -1) {
      this.localitycombo = true;
      this.status_name = 'Ready to Move Flats'
      this.projectStatus = [50307];
      this.Filter.statusid = this.projectStatus;
      this.Filter.proptypeid = [50401];
    }
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['bhk-:ready-to-move-:propertytype-in-:locality-:cityname-:localityid'];
      this.bhkValue = url?.charAt(0);
      this.noOfBedrooms = this.bhkValue;
      this.Filter.Bedrooms = this.noOfBedrooms
      var localityid = this.router.url?.split('-').pop().match(/[0-9]+/);
      this.localityid = localityid;

      var paramlocality = {
        locid: this.localityid,
      };
      var currentCity = ''
      this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe({
        next: (metatag) => {
          let metatags = metatag['Localityseo'];
          this.currentLocalityName = metatags[0].LocalityName;
          this.localityName = this.currentLocalityName;
          this.setPageTitle();
          // ── SEO: /bstlc ──
          const bstlcTitle = this.getSeoTitle(
            `${this.bhkValue} BHK Ready to Move Flats in ${this.localityName} | Homes247.in`,
            `${this.bhkValue} BHK Ready Flats ${this.localityName}`
          );
          const bstlcDesc = `Find ${this.bhkValue} BHK ready to move flats in ${this.localityName}, ${this.currentCity}. Explore premium homes with top amenities and prices on Homes247.in.`;
          this.titleService.setTitle(bstlcTitle);
          this.meta.updateTag({ name: 'description', content: bstlcDesc });
          this.meta.updateTag({ property: 'og:title', content: bstlcTitle });
          this.meta.updateTag({ property: 'og:description', content: bstlcDesc });
          this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: bstlcTitle });
          this.meta.updateTag({ name: 'twitter:description', content: bstlcDesc });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

          if (this.router.url?.indexOf('/bstlc/') > -1) {
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
                  "item": "https://www.homes247.in/" + this.cityname.toLocaleLowerCase().replace(/\s+/g, '-') + "/property-sale"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": this.noOfBedrooms + ' BHK Ready to Move Flats/Apartments in ' + this.cityname + ' | Homes247.in',
                  "item": "https://www.homes247.in/bstc/" + this.noOfBedrooms + "-bhk-ready-to-move-flats-apartments-in-" + this.cityname.toLocaleLowerCase().replace(/\s+/g, '-')
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": this.noOfBedrooms + ' BHK Ready to Move Flats/Apartments in ' + this.localityName + ',' + this.cityname + ' | Homes247.in',
                  "item": "https://www.homes247.in" + this.router.url
                }]
            }
          }
        }
      })
    })
  }



  Aplc() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = true;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname

    this.Filter_Property_Type = true;
    this.Filter_Bedroom_Type = true;
    this.Filter_Posession_Within = true;
    this.Filter_Property_Status = true;
    this.URLID = '411';
    this.ResidenceType = 'Projects';
    this.affordable_locality = true;

    var localityid = this.router.url?.split('-').pop().match(/[0-9]+/);
    this.minPrice = '1';
    this.Filter.min = this.minPrice;
    this.maxPrice = '6';
    this.Filter.max = this.maxPrice;
    this.URLID = '411';
    this.ResidenceType = 'Projects';
    this.affordable_locality = true;
    this.localityId = [localityid]

    var paramlocality = {
      locid: localityid,
    };
    var currentCity = ''
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe({
      next: (metatag) => {
        let metatags = metatag['Localityseo'];
        this.currentLocalityName = metatags[0].LocalityName;
        this.localityName = this.currentLocalityName;
        this.setPageTitle();
        // ── SEO: /aplc ──
        const aplcTitle = this.getSeoTitle(
          `Top Affordable Projects in ${this.currentLocalityName} | Homes247.in`,
          `Affordable Projects ${this.currentLocalityName}, ${this.cityname}`
        );
        const aplcDesc = `Explore affordable projects in ${this.currentLocalityName}, ${this.cityname}. Find budget-friendly homes with top amenities on Homes247.in. View now!`;
        this.titleService.setTitle(aplcTitle);
        this.meta.updateTag({ name: 'description', content: aplcDesc });
        this.meta.updateTag({ property: 'og:title', content: aplcTitle });
        this.meta.updateTag({ property: 'og:description', content: aplcDesc });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: aplcTitle });
        this.meta.updateTag({ name: 'twitter:description', content: aplcDesc });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      }
    })
  }

  Ltlc() {
    this.mainlocalitypage = false;
    this.atlc = false;
    this.ltlc = true;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.btllc = false;
    this.bstlc = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.btalc = false;
    this.aplc = false;
    this.mainpage = false;
    this.lplc = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.cityname = value.cityname

    this.Filter_Property_Type = true;
    this.Filter_Bedroom_Type = true;
    this.Filter_Posession_Within = true;
    this.Filter_Property_Status = true;

    this.URLID = '411';
    this.ResidenceType = 'Flats';
    this.affordable_locality = true;
    var localityid = this.router.url?.split('-').pop().match(/[0-9]+/);
    this.localityId = [localityid]
    this.Filter.proptypeid = [50401];
    this.minPrice = '13';
    this.Filter.min = this.minPrice;
    this.maxPrice = '24';
    this.Filter.max = this.maxPrice;
    var paramlocality = {
      locid: localityid,
    };
    var currentCity = ''
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe({
      next: (metatag) => {
        let metatags = metatag['Localityseo'];
        this.currentLocalityName = metatags[0].LocalityName;
        this.localityName = this.currentLocalityName;
        this.setPageTitle();
        // ── SEO: /ltlc ──
        const ltlcTitle = this.getSeoTitle(
          `Luxury Flats in ${this.currentLocalityName}, ${this.cityname} | Homes247.in`,
          `Luxury Flats ${this.currentLocalityName}, ${this.cityname}`
        );
        const ltlcDesc = `Find luxury apartments in ${this.currentLocalityName}, ${this.cityname}. Explore premium high-end homes with top amenities on Homes247.in. Browse today!`;
        this.titleService.setTitle(ltlcTitle);
        this.meta.updateTag({ name: 'description', content: ltlcDesc });
        this.meta.updateTag({ property: 'og:title', content: ltlcTitle });
        this.meta.updateTag({ property: 'og:description', content: ltlcDesc });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
        this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: ltlcTitle });
        this.meta.updateTag({ name: 'twitter:description', content: ltlcDesc });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });
      }
    })
  }

  luxuryPropDetails() {
    const limite = 4;
    const limitrows = 6;
    const min = 13;
    const max = 24;
    let param = {
      limit: limite,
      limitrows: limitrows,
      minprice: min,
      maxprice: max,
    };
    this.Service.getCity(this.city, param).subscribe({
      next: (response) => {
        const propertylists = response['deatils'];
        this.luxuryPropList = propertylists;
        if (this.luxuryPropList.length >= 0) {
          this.luxuryproploader = false;
        } else {
          this.luxuryproploader = true;
        }
        if (this.luxuryPropList.length <= 0) {
          this.HideLuxuryProp = false;
        } else {
          this.HideLuxuryProp = true;
        }
      }
    });
  }

  affordablePropDetails() {
    const limite = 4;
    const limitrows = 25;
    const min = 6;
    const max = 9;
    let param = {
      limit: limite,
      limitrows: limitrows,
      minprice: min,
      maxprice: max,
    };
    this.Service.getCity(this.city, param).subscribe({
      next: (response) => {
        const propertylists = response['deatils'];
        this.affordablePropList = propertylists;
        if (this.affordablePropList.length <= 0) {
          this.HideAffordableProp = false;
          this.affordableproploader = true;
        } else {
          this.HideAffordableProp = true;
          this.affordableproploader = false;
        }
      }
    });
  }

  onReadyToMoveDetails() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50307';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid
    };
    this.Service.getCity(this.city, param).subscribe({
      next: (response) => {
        const propertylists = response['deatils'];
        this.readyToMovePropList = propertylists;
        if (this.readyToMovePropList.length >= 0) {
          this.readyToMoveproploader = false;
        } else {
          this.readyToMoveproploader = true;
        }
        if (this.readyToMovePropList.length <= 0) {
          this.HideReadyToMoveProp = false;
        } else {
          this.HideReadyToMoveProp = true;
        }
      }
    });
  }

  getTopProjects() {
    this.Service.gettopproperties(this.cityid).subscribe({
      next: (topProperty: any) => {
        const propertylists = topProperty['deatils'];
        this.topProperties = propertylists;
        if (this.topProperties.length >= 0) {
          this.topprojectsloader = false;
        } else {
          this.topprojectsloader = true;
        }
        if (this.topProperties.length <= 0) {
          this.HideTopPropSection = false;
        } else {
          this.HideTopPropSection = true;
        }
      }
    });
  }

  shareContent(propertydemo) {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: "Homes247.in",
          text: 'Check out this amazing Property!',
          url: 'https://www.homes247.in/property/' + propertydemo.city_name?.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo.locality_name?.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo.propertyName?.toLowerCase().replace(/\s+/g, '-') + '-' + propertydemo.property_info_IDPK,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  whatsupshare1() {
    var currenturl = this.router.url;
    var shareurl = 'https://api.whatsapp.com/send?text=I Found this property on Homes247.in :) https://www.homes247.in' + currenturl;
    this.window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    var topPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.location.hash = 'whatsupshare';
    document.documentElement.scrollTop = topPos;
  }

  whatsupshare(propertydemo: any) {
    const phoneNumber = '919008029014'; // WhatsApp number

    const propertyUrl =
      'https://www.homes247.in/property/' +
      propertydemo.city_name?.toLowerCase().replace(/\s+/g, '-') + '/' +
      propertydemo.locality_name?.toLowerCase().replace(/\s+/g, '-') + '/' +
      propertydemo.propertyName?.toLowerCase().replace(/\s+/g, '-') + '-' +
      propertydemo.property_info_IDPK;

    const message = encodeURIComponent(
      `Hi, I’m interested in this property. Please share more details. ${propertyUrl}`
    );

    const shareUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(shareUrl, '_blank');
  }


  imageErrorMap: { [key: number]: boolean } = {};
  onImgError(event: any, id: number) {
    // hide broken image instantly
    event.target.style.display = 'none';
    // trigger Angular condition
    this.imageErrorMap[id] = true;
  }






  activeDrop: string | null = null;

  // View More States (for the internal "View More" buttons)
  showMoreLux: boolean = false;
  showMoreAff: boolean = false;





  toggleDrop(index: number, key: string): void {
    const combinedKey = key + index;

    // If clicking the same one, close it. Otherwise, open the new one.
    if (this.activeDrop === combinedKey) {
      this.activeDrop = null;
    } else {
      this.activeDrop = combinedKey;
    }

    // Reset the "View More" buttons when switching categories for a clean UI
    this.showMoreLux = false;
    this.showMoreAff = false;
  }











}