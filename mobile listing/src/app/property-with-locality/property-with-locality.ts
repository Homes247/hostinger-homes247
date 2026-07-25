import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown'; // Import Module for Standalone
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CityService } from '../city.service';
import { City, flitercity, minmax, } from '../city-based-listing/citybasedlisting';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { SafeStorageService } from '../safe-storage.service';
import { CarouselModule, OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
// Swal lazy-loaded
import { ServerResponseService_locality } from '../server-response-8(locality).service';
import { MyJsonLdComponent } from '../my-json-ld/my-json-ld.component';
import { cleanUrlPipe, MyFilterunique2, OrderByPipe2, ReplaceLineBreaksany, SanitizeHtmlPipe } from '../mainpipe-pipe';
// import { InnerHeader } from '../inner-header/inner-header';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
;


declare var $: any;


@Component({
  selector: 'app-property-with-locality',
  imports: [CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule, MyJsonLdComponent, cleanUrlPipe, NgxSkeletonLoaderModule, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany, CarouselModule, InnerHeadderWithSidenav],
  templateUrl: './property-with-locality.html',
  styleUrl: './property-with-locality.css',
  providers: [ServerResponseService_locality],

})
export class PropertyWithLocality implements OnInit, AfterViewInit {
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  @ViewChild('cd', { static: false }) private countdown3!: CountdownComponent;
  @ViewChild('cd2', { static: false }) private countdown4!: CountdownComponent;
  @ViewChild('scrollapiloader') scrollapiloader!: ElementRef;
  @ViewChild('cancel') cancel!: ElementRef;

  myControl = new FormControl();

  public autoCompleteData: { [key: string]: Object }[] = [];
  public localityproperties: { [key: string]: Object }[] = [];
  public propertieslists: { [key: string]: Object }[] = [];
  private routeSub!: Subscription;
  pagePropertyCount: number = 0

  property_type: any;
  secondoryproptype: any;
  status_name: any;
  Relevance: any;
  LowtoHigh: any;
  HightoLow: any;
  Recent: any;
  citybread: any;
  description!: boolean;
  citybreadcrump: any;
  builder: any;
  localtyname: any;
  zones: any;
  filterShowHide!: boolean;
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
  ];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();
  sortShowHide!: boolean;
  IsVisibleFilter!: boolean;
  localityHide: boolean = true;
  projectTypeHide: boolean = false;
  statusHide: boolean = true;
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
  hideDesktopLocality = true;
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
  UserId: any;
  localstorediv: any;
  localitylist: any;
  builderlist: any;
  statuslist: any;
  proptypelist: any;
  regionslist: any;
  // update by veera end
  static typecount: number;
  zeroprojects = false;
  proptypeurlparam: any;
  localityData: any = [];
  dropdownSettingsMobile = {};
  proptypedescription!: boolean;
  propertyid: any;

  cityname: any;
  cityId: any;
  proptypename: any;
  proptypeid: any;
  cityzonelinks: any;
  cityzonelinks_types: any;
  cityid = '1';
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
  property_typeId: any;
  localityName: any;
  localityId: any;

  topnewapiload = true;
  topnewdivreached = false;
  innerheader: any;
  userRentalFavList: any[] = [];
  propertyIds: any[] = [];
  propertiescount: any;
  projectcountRent: any;
  projectpgcount: any;
  projectcountcommercial: any;
  Matautocomplete: any;
  isExpanded = false;


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
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 }
    },
  };

  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numberdatesforyears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numbersforyears = [1, 2, 3, 4, 5];
  Date = new Date();
  YearDate = new Date();

  breadcrumbjson: any;
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

  options: any;
  filteredOptions!: Observable<any>;
  private observer: IntersectionObserver | null = null;
  Internallinkshide: boolean = true;
  ProptypeWithLocality3: any;
  user = new Enquiry();
  propertylists: any;
  projectcount: any;
  localitys: any;
  cityapi = new City();
  minprice = new minmax();
  maxprice = new minmax();
  city: any;
  showLoader = false;
  fliterbedroom!: string;
  possission = '';
  locality: any = [];
  bedroom = new flitercity();
  property_id: any;
  propertyname: any;
  enquiry = new Enquiry();
  IsVisible = false;
  propertyId: any;
  alertmesg: any;
  SelectedPropName: any;
  propertylists1 = [];
  propertylists2 = [];
  propertylists3 = [];
  propertylists4 = [];
  propertylists5 = [];
  propertylists6 = [];
  sectionFirstResponce: boolean = false;
  ProptypeWithLocalityComponent2: any;
  Mousemovement: boolean = false;
  componentloads = false;
  ProptypeWithLocality4: any;
  activeIndexMap: { [key: string]: number } = {};

  constructor(
    private titleService: Title,
    private meta: Meta,
    private sanitizer: DomSanitizer,
    public Service: DataService,
    private router: Router,
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    public cityservice: CityService,
    public Service2: DataService2,
    @Inject(PLATFORM_ID) private platformId: Object,
    public Filter: FilterService,
    @Inject(DOCUMENT) private doc: Document,
    private storage: SafeStorageService,
  ) {
    this.window = this.doc.defaultView
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
      this.window.scrollTo(0, 0);
    });
    this.Service.mouseenterlisten1().subscribe({
      next: (m: any) => {
        this.getcity();
      }
    })
  }

  window!: Window;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.Mousemovement = true;

    $('.Header_part').css('box-shadow', '2px 2px 5px 2px rgba(0, 0, 0, 0.15)');

    if (this.scrollapiloader && this.scrollapiloader.nativeElement) {
      const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
      const scrollPosition = this.window.pageYOffset;
      if (this.topnewdivreached = scrollPosition >= elementPosition) {
        if (this.topnewapiload == true) {
          this.topnewapiload = false;
          let id = '1';
          var paramss = {
            cityId: this.cityId,
          };;
        }
      }
    }

    if ($(window).scrollTop() >= 140) {
      $('#hidefilter').addClass('hidefilter');
    } else {
      $('#hidefilter').removeClass('hidefilter');
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
    this.dataloads();
    this.metaseo();
    this.getcity();
    // this.semanticjquery();
    // this.SHowinternallinks()
    this.scripts();
    this.getlocality();
    this.onresize();
    this.sortfiltershowhide();
    this.luxuryPropDetails();
    this.getTopProjects();
    this.onReadyToMoveDetails();
    this.affordablePropDetails();
    // this.FilterTransition();
    if (isPlatformBrowser(this.platformId)) {
      this.cityname = this.storage?.getItem('CityName');
      this.proptypename = this.storage?.getItem('PropType');
      this.proptypeid = this.storage?.getItem('ProptypeId');
    }
    this.registerForm = this.fb.group({
      projectType: [''],
      minBudget: [''],
      maxBudget: [''],
      posessionWithin: [''],
      locality: [''],
    });
    this.cityzonelinks = false;
    this.dropdownSettingsMobile = {
      singleSelection: false,
      idField: 'locality_IDPK',
      textField: 'locality_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 3
    };
    $('.head_sticky').css('padding-bottom', '62px');

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

    }
  }
  propertyimage: string = '';
  propertyInitialImages: string = '';
  loginidNew:any
  dataloads() {
    this.propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
    this.propertyInitialImages = this.Service.imagesURLInitial + 'uploadPropertyImgs/';


      const loginid = this.storage?.getItem('loginID');
    this.loginidNew = loginid
    this.UserId = this.storage?.getItem("userID");
  }

  transitionEnd(event: any) {
    var dv = document.getElementById("floatinglink");
    if (dv) {
      var dvStyle = dv.getAttribute('style') || '';
      if (dvStyle?.indexOf("translateX(-584%)") > -1) {
        $('.floating-link').css('width', '216px');
        $('.border_div').css('opacity', '1');
        $('#floating_img').css('display', 'none');
      }
    }
  }

  metaseo() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    const urlPath = this.router.url.split('?')[0];

    // ... [Lengthy if-else block for SEO - Kept as requested] ...
    if (urlPath === '/apartments-in-yeshwanthpur-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '678';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Yeshwanthpur';
    } else if (urlPath === '/apartments-in-mysore-road-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '114';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Mysore Road';
    } else if (urlPath === '/apartments-in-kanakapura-road-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '118';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Kanakapura Road';
    } else if (urlPath === '/apartments-in-old-madras-road-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '6';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Old Madras Road';
    } else if (urlPath === '/apartments-in-yelahanka-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '721';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Yelahanka';
    } else if (urlPath === '/apartments-in-jakkur-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '49';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Jakkur';
    } else if (urlPath === '/apartments-in-electronic-city-phase-2-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '701';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Electronic City Phase 2';
    } else if (urlPath === '/apartments-in-electronic-city-phase-1-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '129';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Electronic City Phase 1';
    } else if (urlPath === '/apartments-in-thanisandra-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '56';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'thanisandra';
    } else if (urlPath === '/apartments-in-hennur-road-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '50';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Hennur Road';
    } else if (urlPath === '/apartments-in-haralur-road-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '267';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Haralur Road';
    } else if (urlPath === '/apartments-in-k-r-puram-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '201';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'K R Puram';
    } else if (urlPath === '/apartments-in-bellandur-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '199';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Bellandur';
    } else if (urlPath === '/apartments-in-varthur-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '21';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Varthur';
    } else if (urlPath === '/apartments-in-koramangala-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '86';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Koramangala';
    } else if (urlPath === '/apartments-in-mahadevapura-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '20';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Mahadevapura';
    } else if (urlPath === '/apartments-in-marathahalli-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '2';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Marathahalli';
    } else if (urlPath === '/apartments-in-electronic-city-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '10';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Electronic City';
    } else if (urlPath === '/apartments-in-whitefield-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '1';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Whitefield';
    } else if (urlPath === '/apartments-in-sarjapur-road-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '5';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Sarjapur Road';
    } else if (urlPath === '/apartments-in-sarjapur-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '14';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Sarjapur';
    } else if (urlPath === '/apartments-in-bannerghatta-road-bangalore') {
      this.property_typeId = '50401';
      this.property_type = 'Apartments';
      this.secondoryproptype = 'Flats';
      this.localityId = '96';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Bannerghatta Road'
    }
    else if (urlPath === '/villas-in-kanakapura-road-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '118';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Kanakapura Road';
    } else if (urlPath === '/villas-in-chandapura-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '854';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Chandapura';
    } else if (urlPath === '/villas-in-yelahanka-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '721';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Yelahanka';
    } else if (urlPath === '/villas-in-budigere-cross-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '725';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Budigere Cross';
    } else if (urlPath === '/villas-in-varthur-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '21';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Varthur';
    } else if (urlPath === '/villas-in-sarjapur-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '14';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Sarjapur';
    } else if (urlPath === '/villas-in-electronic-city-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '10';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Electronic City';
    } else if (urlPath === '/villas-in-whitefield-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '1';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Whitefield';
    } else if (urlPath === '/villas-in-sarjapur-road-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '5';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Sarjapur Road';
    } else if (urlPath === '/villas-in-marathahalli-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '2';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Marathahalli';
    } else if (urlPath === '/villas-in-bannerghatta-road-bangalore') {
      this.property_typeId = '50402';
      this.property_type = 'Villas';
      this.secondoryproptype = 'Villas';
      this.localityId = '96';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Bannerghatta Road';
    }
    else if (urlPath === '/plots-in-sarjapur-road-bangalore') {
      this.property_typeId = '50403';
      this.property_type = 'Plots';
      this.secondoryproptype = 'plots';
      this.localityId = '5';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Sarjapur Road';
    } else if (urlPath === '/plots-in-electronic-city-bangalore') {
      this.property_typeId = '50403';
      this.property_type = 'Plots';
      this.secondoryproptype = 'plots';
      this.localityId = '10';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Electronic City';
    } else if (urlPath === '/plots-in-kanakapura-road-bangalore') {
      this.property_typeId = '50403';
      this.property_type = 'Plots';
      this.secondoryproptype = 'plots';
      this.localityId = '118';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Kanakapura Road';
    } else if (urlPath === '/plots-for-sale-in-yelahanka-bangalore') {
      this.property_typeId = '50403';
      this.property_type = 'Plots';
      this.secondoryproptype = 'plots';
      this.localityId = '721';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Yelahanka';
    } else if (urlPath === '/plots-for-sale-in-whitefield-bangalore') {
      this.property_typeId = '50403';
      this.property_type = 'Plots';
      this.secondoryproptype = 'plots';
      this.localityId = '1';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Whitefield';
    } else if (urlPath === '/plots-for-sale-in-varthur-bangalore') {
      this.property_typeId = '50403';
      this.property_type = 'Plots';
      this.secondoryproptype = 'plots';
      this.localityId = '21';
      this.cityid = '1';
      this.city = 'bangalore';
      this.localityName = 'Varthur';
    }

    this.Service.getloccitytype(this.property_typeId, this.cityid, this.localityId).subscribe({
      next: (metatag: any) => {
        let metatags = metatag['Loctypeseo'];
        this.proptypedescription = metatags[0].page_description;
        if (metatags[0].page_description == '') {
          this.description = false;
        } else {
          this.description = true;
        }
        if (metatags[0].page_title == '') {
          this.titleService.setTitle(this.property_type + ' in ' + this.localityName + ' | ' + this.secondoryproptype + ' for sale in ' + this.localityName + ',Bangalore');
          this.meta.updateTag({
            name: 'description',
            content: 'Apartments in ' + this.localityName + ' | Explore the Best ' + this.secondoryproptype + ' for Sale in ' + this.localityName + ', Bangalore from the top developers and get the best deals only from Homes247.in'
          });
        } else if (metatags[0].page_title == null) {
          this.titleService.setTitle(this.property_type + ' in ' + this.localityName + ' | ' + this.secondoryproptype + ' for sale in ' + this.localityName + ',Bangalore');
          this.meta.updateTag({
            name: 'description',
            content: 'Apartments in ' + this.localityName + ' | Explore the Best ' + this.secondoryproptype + ' for Sale in ' + this.localityName + ', Bangalore from the top developers and get the best deals only from Homes247.in'
          });
        } else {
          this.titleService.setTitle(metatags[0].page_title);
          this.meta.updateTag({ name: 'description', content: metatags[0].meta_description });
        }
      }
    });

    this.Service.createLinkForCanonicalURL();
  }

  propertyNameClick(PropertyName: any, RegionID: any, localityid: any, PropertyID: any) {
    this.SelectedPropName = PropertyName;
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.propid = PropertyID;
    $('#otpValidate').css('display', 'block');
  }

  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onTouchLoad() {
    this.Mousemovement = true;
    this.Service.mouseenterservice3();

    // if (this.componentloads == false) {
    //   this.componentloads = true;

    //   // Update for Standalone: Import Component directly instead of Module
    //   // Note: Adjust the path if necessary to point to the standalone component file
    //   import('../mat-autocomplete-new/mat-autocomplete-new.module').then(mod => mod.MatAutocompleteNewModule).then(MatAutocompleteNewModule => {
    //     // Logic adjusted for standalone compatibility where possible, keeping existing flow
    //     this.Matautocomplete = MatAutocompleteNewModule.components['lazy'];
    //   });

    //   import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule => {
    //     this.enquiryFormComponent = enquiryFormModule.components['lazy'];
    //     $('.modal-login').css('z-index', '99999');
    //   });
    // }
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

  getcity() {
    this.showLoader = true
    PropertyWithLocality.typecount = -4;
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

    this.routeSub = this.activeroute.params.subscribe(params => {
      var value = this.cityservice.cityfinder(this.router.url);
      var citiname = value.cityname.replace('-', ' ');
      this.cityname = citiname.replace('-', ' ');
      this.citybreadcrump = this.cityname.toLocaleLowerCase();
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      var limitparam = 0;
      var limitprprtyrows = 4;
      var proptypeid = this.property_typeId;
      var bedroom = this.Filter.Bedrooms;
      var min = this.Filter.min;
      var max = this.Filter.max;
      var pos = this.Filter.possission;
      var loc = this.localityId;
      this.UserId = this.storage?.getItem("userID");
      var param = {
        limit: limitparam,
        limitrows: limitprprtyrows,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
      };
      this.Service.getprojectscount(this.city, param).subscribe({
        next: (countprojects: any) => {
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
        }
      });

      this.Service.getCity(this.city, param).subscribe({
        next: (lists) => {
          if (lists['status'] == "True") {
            let propertylists = lists['deatils'];
            this.propertylists = propertylists;
            this.showLoader = false;
            if (this.projectcount <= 4) {
              if (isPlatformBrowser(this.platformId)) {
                $('.search-results').css('padding-bottom', '88px');
              }
            }
          } else {
            this.showLoader = true;
          }

        }
      });;

      var paramInd = {};
      this.Service.getprojectscount(this.city, param).subscribe({
        next: (countprojects: any) => {
          this.filterLoader = false;
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
          if (this.projectcount <= 0) {
            this.zeroprojects = true;
          }
        }
      });

      this.Service.getindividualprojectscount(this.city, paramInd).subscribe({
        next: (projectcounts: any) => {
          let projectcount = projectcounts['Counts'];
          this.propertiescount = projectcount[0].PropertyCounts;
        }
      });


      this.Service.getRentprojectscount(this.city, paramInd).subscribe({
        next: (countprojects: any) => {
          let projectcount = countprojects['Counts'];
          this.projectcountRent = projectcount[0].PropertyCounts;
        }
      });

      var param2 = {
        limit: '',
        limitrows: ''
      };

      this.Service.PGRentCount(this.city, param2).subscribe({
        next: (countprojects: any) => {
          let projectcount = countprojects['Counts'];
          this.projectpgcount = projectcount[0].PropertyCounts;
        }
      })

      this.Service.commercialSalePropertiesCount(this.city, param2).subscribe({
        next: (countprojects: any) => {
          let projectcount = countprojects['Counts'];
          this.projectcountcommercial = projectcount[0].PropertyCounts;
        }
      })

      var autocomppropparams = {
        statusid: this.projectStatus,
        locality_id: this.locality,
      }

      if (this.property_type == "Apartments") {
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
              "name": "Properties for Sale in " + this.city + "",
              "item": "https://www.homes247.in/" + this.city.toLowerCase().replace(/\s+/g, '-') + "/property-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Buy Flats in " + this.city + " | Flats for sale in " + this.city + " | Homes247.in",
              "item": "https://www.homes247.in/residential-flats-in-" + this.city.toLowerCase().replace(/\s+/g, '-') + "-for-sale"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Flats | Apartments for sale in " + this.localityName + ", " + this.city + " - Homes247.in",
              "item": "https://www.homes247.in" + this.router.url
            }]
        }
      } else if (this.property_type == "Villas") {
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
              "name": "Properties for Sale in " + this.city + "",
              "item": "https://www.homes247.in/" + this.city.toLowerCase().replace(/\s+/g, '-') + "/property-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Buy Villas in " + this.city + " | Villas for sale in " + this.city + " | Homes247.in",
              "item": "https://www.homes247.in/villas-for-sale-in-" + this.city.toLowerCase().replace(/\s+/g, '-')
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Villas for sale in " + this.localityName + ", " + this.city + " - Homes247.in",
              "item": "https://www.homes247.in" + this.router.url
            }]
        }
      } else if (this.property_type == "Plots") {
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
              "name": "Properties for Sale in " + this.city + "",
              "item": "https://www.homes247.in/" + this.city.toLowerCase().replace(/\s+/g, '-') + "/property-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Buy Plots in " + this.city + " | Plots for sale in " + this.city + " | Homes247.in",
              "item": "https://www.homes247.in/plots-in-" + this.city.toLowerCase().replace(/\s+/g, '-')
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Plots for sale in " + this.localityName + ", " + this.city + " - Homes247.in",
              "item": "https://www.homes247.in" + this.router.url
            }]
        }
      }

      this.breadcrumbLD = this.getSafeHTML(this.breadcrumbjson);

      // ******************Carousal Structured data Starts*********************
      var carousalparam = {
        proptypeid: proptypeid,
        locality_id: loc,
        limit: 0,
        limitrows: 40,
      }
      this.Service.getlocalityproperties(carousalparam).subscribe({
        next: (lists) => {
          this.propertieslists = lists['autolist'];
          for (let i = 0; i < this.propertieslists.length; i++) {
            this.carouselsjson =
            {
              "@type": "ListItem",
              "position": i,
              "name": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'],
              "description": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'] + " Reviews | Price | Homes247.in ",
              "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists[i]['coverimage'],
              "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id']
            }
            this.carouselsarrayjoin.push(this.carouselsjson);
          }
          this.carouselsLD = this.getcarousalSafeHTML(this.carouselsarrayjoin);
        }
      });
      // ******************Carousal Structured data Ends*********************

      // ******************Events Structured data Starts*********************

      var eventsparam = {
        proptypeid: proptypeid,
        locality_id: loc,
        limit: 0,
        limitrows: 60,
      }
      this.Service.getlocalityproperties(eventsparam).subscribe({
        next: (lists) => {
          this.propertieslists = lists['autolist'];
          for (let i = 0; i < this.propertieslists.length; i++) {
            this.eventsjson = {
              "@context": "https://schema.org",
              "@type": "Event",
              "name": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'],
              "description": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'] + " | Reviews | Price | Homes247.in ",
              "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists[i]['coverimage'],
              "startDate": dateonlydate + "T18:30+05:30",
              "endDate": YearDateformatchange + "T18:30+05:30",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "location": {
                "@type": "VirtualLocation",
                "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id'],
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
                "name": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'],
                "price": this.propertieslists[i]['price'],
                "priceCurrency": "INR",
                "validFrom": dateonlydate + "T18:30+05:30",
                "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id'],
                "availability": "https://schema.org/InStock"
              }]
            }
            this.eventsarrayjoin.push(this.eventsjson);
          }
          this.eventsLD = this.getSafeHTML(this.eventsarrayjoin);
        }
      });

      // ******************Events Structured data Ends*********************

      // ******************Localbusiness Structured data Starts*********************

      var localbusinessparam = {
        proptypeid: proptypeid,
        locality_id: loc,
        limit: 0,
        limitrows: 100,
      }
      this.Service.getlocalityproperties(localbusinessparam).subscribe({
        next: (lists) => {
          this.propertieslists = lists['autolist'];
          for (let i = 0; i < this.propertieslists.length; i++) {
            this.localbusinessjson =
            {
              "@context": "http://schema.org/",
              "@type": "RealEstateAgent",
              "name": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'],
              "description": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'] + " | Reviews | Price | Homes247.in ",
              "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id'],
              "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists[i]['coverimage'],
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
          this.localbusinessLD = this.getSafeHTML(this.localbusinessarrayjoin);
        }
      });

      // ******************Localbusiness Structured data Ends***********************

      // *********************Product - Merchant Listings - Review Snippets Structured data Starts*********************

      var productmerchantreviewparam = {
        proptypeid: proptypeid,
        locality_id: loc,
        limit: 0,
        limitrows: 150,
      }
      this.Service.getlocalityproperties(productmerchantreviewparam).subscribe({
        next: (lists) => {
          this.propertieslists = lists['autolist'];
          for (let i = 0; i < this.propertieslists.length; i++) {
            this.averagerating[i] = this.propertieslists[i]['Averagerating'];
            this.productmerchantreviewjson = {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": this.propertieslists[i]['name'] + " in " + this.propertieslists[i]['locality'] + " , " + this.propertieslists[i]['city'],
              "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.propertieslists[i]['coverimage'],
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
                "url": "https://www.homes247.in/property/" + this.propertieslists[i]['city'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['locality'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "/" + this.propertieslists[i]['name'].toString().toLocaleLowerCase().replace(/\s+/g, '-') + "-" + this.propertieslists[i]['id'],
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
        }
      });
    });
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
        "name":"Flats | Apartments for sale in ${this.localityName}, ${this.city} - Homes247.in",
        "description":"Buy ready to move and ongoing Flats | Apartments for sale in ${this.localityName}, ${this.city} by reputed builders in prime locations. Check Pricing details, Floor plans.",
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

  apioptions(apivalue: any) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit() {

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
    this.pagePropertyCount = PropertyWithLocality.typecount
    this.showLoader = true;

    this.routeSub = this.activeroute.params.subscribe(params => {
      var typeid = this.property_typeId;
      let totalcount = this.projectcount;
      const limit = PropertyWithLocality.typecount += 4;
      let limitprprtyrows = 4;
      var proptypeid = this.property_typeId;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var status = this.Filter.statusid;
      var loc = this.localityId;
      this.UserId = this.storage?.getItem("userID");
      let param = {
        limit: limit,
        limitrows: limitprprtyrows,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        statusid: status,
      };

      let livecount = this.propertylists?.length || 0;
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
        return new Subscription();
      }
    });
  }

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }

  scripts() {
    $(function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // $('.ui.dropdown').dropdown();
      $('.ui.search.dropdown').dropdown({
        minCharacters: 3,
        useLabels: false
      });
      $('ui.price_filter.dropdown').dropdown({
        fullTextSearch: true
      });
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
  }

  // semanticjquery() {
  //   $('.ui.dropdown').dropdown({});
  // }

  onresize() {
    var width = this.window.innerWidth;
    if (width < 1080) {
      this.filterShowHide = true;
    } else {
      this.filterShowHide = false;
    }
  }

  getlocality() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    var regionid = '';
    var paramss = {
      cityId: this.cityId,
      regionid: regionid
    };
    this.Service.getlocality(paramss).subscribe({
      next: (localitys) => {
        this.localitys = localitys['details'];
      }
    });
  }

  getenquiry(id: any, name: any) {
    this.property_id = id;
    this.propertyname = name;
  }

  ShowHide() {
    this.IsVisible = this.IsVisible ? false : true;
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

  addwishlist(id: any) {
    this.propertyId = id;
    const userid = this.storage?.getItem("userID");
    var param = {
      userid: userid,
      propid: this.propertyId
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
      this.storage.setItem('propertyID', '[]');
    }
    const proparray = this.storage?.getItem('propertyID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(id);

    this.parsedarray = JSON.parse(proparray);
    if (itemToRemoveIndex == -1) {
      this.parsedarray.push(id);
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    } else {
      this.parsedarray = this.parsedarray.filter(function (item: any) {
        return item !== id;
      });
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
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

  onLocalitySelect(eve: any) {
    this.localityData.push(eve.locality_IDPK);
    this.getcity();
  }

  onLocalityDeSelect(event: any) {
    var index = this.locality?.indexOf(event);
    this.localityData.splice(index, 1);
    this.getcity();
  }

  sortfiltershowhide() {
    var prevScrollpos = window.pageYOffset;
    var isScrolling: any;
    window.addEventListener('scroll', function (event) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        $('.sortfilter_div').css('display', 'block');
      } else {
        $('.sortfilter_div').css('display', 'none');
        $('#fixed-accordion').css('visibility', 'hidden');
      }
      prevScrollpos = currentScrollPos;
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        $('.sortfilter_div').css('display', 'block');
      }, 2000);
      if ($(window).scrollTop()! + $(window).height()! > $(document).height()! - 200) {
        $('.sortfilter_div').css('display', 'none');
        isScrolling = setTimeout(function () {
          $('.sortfilter_div').css('display', 'none');
        }, 2000);
      }
    }, false);
  }

  Oncompareclick() {
    this.Service.mouseenterservice2();
    this.compareShowonimg = this.compareShowonimg ? false : true;
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
    if (this.compareproparray.length >= 1) {
      this.hideshowcompare = true;
      this.compareStorageArry = JSON.parse(localStorage?.getItem('ComparePropID')!);
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
 private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }

  async oncompareshowimgclick(propid: any, proptype: any) {
    this.hideshowcompare = true;
    if ('ComparePropID' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID', '[]');
    }
    this.comparePropType = this.storage?.getItem('comparePropType1');
    const proparray = this.storage?.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
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
          this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function (item: any) {
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
        this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
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
          this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function (item: any) {
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
        this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
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
    this.compareStorageArry = JSON.parse(localStorage?.getItem('ComparePropID')!);
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
          this.storage.setItem('comparePropType1', this.proptype1);
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
          this.storage.setItem('comparePropType2', this.proptype2);
          this.compareloader2 = false;
          this.compareprop2 = true;
        }
      });
    }
  }

  closeprop1(propid1: any) {
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
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
      this.parsedarray = this.parsedarray.filter(function (item: any) {
        return item !== propid1;
      });
      this.compareloader1 = true;
      this.compareprop1 = false;
      this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
    }
  }

  closeprop2(propid2: any) {
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
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
    const itemToRemoveIndex = jsonpars?.indexOf(propid2);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item: any) {
        return item !== propid2;
      });
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID')!);
    }
  }

  CompareNow() {
    this.router.navigate(['/compare-properties']);
    this.storage.setItem('cityname', this.cityname);
  }

  // isInWishlist(propertyID: number): boolean {
  //      const userId = this.storage?.getItem('userID');
  //   if (userId) {
  //     return this.storagearr.includes(propertyID);
  //   } else {
  //     return this.storagearr.includes(propertyID);
  //   }
  // }

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
          userId: userid,
          propId: propertyID,
          CatagoryId: 1
        };

        this.Service.removeFavaourite(param).subscribe();
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

  shareContent(propertydemo: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: "Homes247.in",
          text: 'Check out this amazing Property!',
          url: 'https://www.homes247.in/property/' + propertydemo.city_name.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo.locality_name.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo.propertyName.toLowerCase().replace(/\s+/g, '-') + '-' + propertydemo.property_info_IDPK,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));

    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  whatsupshare(propertydemo: any) {
    const phoneNumber = '919008029014'; // WhatsApp number

    const propertyUrl =
      'https://www.homes247.in/property/' +
      propertydemo.city_name.toLowerCase().replace(/\s+/g, '-') + '/' +
      propertydemo.locality_name.toLowerCase().replace(/\s+/g, '-') + '/' +
      propertydemo.propertyName.toLowerCase().replace(/\s+/g, '-') + '-' +
      propertydemo.property_info_IDPK;

    const message = encodeURIComponent(
      `Hi, I’m interested in this property. Please share more details. ${propertyUrl}`
    );

    const shareUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(shareUrl, '_blank');
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
    const limite = 4;
    const limitrows = 6;
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
      if (this.affordablePropList.length <= 0) {
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
  topProperties = [];
  HideTopPropSection = true;
  topprojectsloader: boolean = true;
  shuffletopprojects(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.topProperties = a;
  }
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


  imageErrorMap: { [key: number]: boolean } = {};
  onImgError(event: any, id: number) {
    // hide broken image instantly
    event.target.style.display = 'none';
    // trigger Angular condition
    this.imageErrorMap[id] = true;
  }


}
