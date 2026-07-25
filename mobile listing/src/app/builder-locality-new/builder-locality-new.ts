import { SafeStorageService } from '../safe-storage.service';
// Swal lazy-loaded
import { CarouselModule, OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { cleanUrlPipe, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany } from '../mainpipe-pipe';
import { MyJsonLdComponent } from '../my-json-ld/my-json-ld.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { InnerHeader } from '../inner-header/inner-header';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { City } from '../builder-new/builder-new-interface';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { ServerResponseService_builderLocality } from '../server-response-builder-locality.service';
import { ServerResponseService_mainhome } from '../server-response-main-home.service';
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';



declare var $: any;

@Component({
  selector: 'app-builder-locality-new',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MyJsonLdComponent, cleanUrlPipe, NgxSkeletonLoaderModule, OrderByPipe2, MyFilterunique2, ReplaceLineBreaksany, CarouselModule, InnerHeadderWithSidenav],
  templateUrl: './builder-locality-new.html',
  styleUrl: './builder-locality-new.css',
  providers: [ServerResponseService_builderLocality, ServerResponseService_mainhome],

})
export class BuilderLocalityNew implements AfterViewInit {

  @ViewChild('cancel') cancel: ElementRef;
  // @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  // @ViewChild('cd2', { static: false }) private countdown2: CountdownComponent;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  private routeSub: Subscription;
  public autoCompleteData: { [key: string]: Object }[] = [];
  public localityproperties: { [key: string]: Object }[] = [];
  public localitypropertiesstructureddata: { [key: string]: Object }[] = [];
  breadcrumbLD: SafeHtml;
  carouselsLD: SafeHtml;
  eventsLD: SafeHtml;
  localbusinessLD: SafeHtml;
  productmerchantreviewLD: SafeHtml;
  city: any;
  builder: any;
  citybreadcrump: any;
  filterShowHide: boolean;
  registerForm: FormGroup;
  myControl = new FormControl();
  parsedarray = [];
  storagearr: any;
  localstoredivSeenProjects: any;
  seenProjectsStoragearr: any;
  UserId: any;
  localstorediv: any;
  zeroprojects = false;
  urlparam: any;
  sortShowHide: boolean;
  builderdescription: any;
  description: boolean;
  offers: any;
  propertyid: any;
  propertylists: any;
  projectcount: any;
  cityapi = new City();
  cityname: any;
  cityId: any;
  buildername: any;
  builderid: any;
  citynamebuilder: any;
  cityid: any;
  cityzonelinks: any;
  loaded = false;
  propertyId: any;
  alertmesg: any;
  property_id: any;
  propertyname: any;
  enquiry = new Enquiry();
  hideshowcompare: boolean = false;
  compareShowonimg: boolean = false;
  propertiesDetails: any;
  compareloader1: boolean = true;
  compareloader2: boolean = true;
  propertyname1: any;
  propimag1: any;
  builderLocalitySectionThreeComponent: any;
  propertyname2: any;
  propimag2: any;
  comparePropType: any;
  compareStorageArry: any;
  propid1: any;
  compareprop1: boolean = false;
  compareprop2: boolean = false;
  propid2: any;
  proptype1: any;
  proptype2: any;
  compareproparray: any;
  topnewapiload = true;
  topnewdivreached = false;
  Mousemovement = false;
  innerheader: any;
  BuilderLocalitySectionTwoComponent: any;
  showLoader = false;
  SelectedPropName: any;
  luxuryPropList = [];
  luxuryproploader: boolean = true;
  HideLuxuryProp = true;
  readyToMovePropList = [];
  readyToMoveproploader: boolean = true;
  HideReadyToMoveProp = true;
  affordablePropList = [];
  affordableproploader: boolean = true;
  HideAffordableProp = true;
  // propertylists1 = [];
  newProperties = [];
  newlaunchesloader = true;
  Hidenewlaunches = true;
  otploader = false;
  IsVisibleFilter = false;
  IsVisible = false;
  Builder3Component: any;
  Internallinkshide: boolean = true;
  sectionFirstResponce: boolean = false;

  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numberdatesforyears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numbersforyears = [1, 2, 3, 4, 5];
  Date = new Date();
  YearDate = new Date();

  carouselsarrayjoin: any[] = [];
  eventsarrayjoin: any[] = [];
  localbusinessarrayjoin: any[] = [];
  productmerchantreviewarrayjoin: any[] = [];
  carouselsjson: any;
  eventsjson: any;
  localbusinessjson: any;
  productmerchantreviewjson: any;
  averagerating: any[] = [];
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
  ];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();
  currentCity: string;
  builder_seo: any;

  BuilderMain = false;
  Builderbudget = false;
  city_seo: any;
  titleName: any;
  minbudget_IDPK: any;
  maxbudget_IDPK: any;
  broadmatch: any;
  secondorytitle: any;
  proptypeId: any;
  // projecttype: any;
  bhkValue: any
  statusid = [];
  noOfBedrooms = [];
  projectStatus = [];
  projecttype = [];
  // BuilderMain = false;
  // Builderbudget = false;

  stbc_apartments = false;
  stbc_villas = false;
  btbc_flats = false;
  btbc_villas = false;
  brtc = false;
  currentCity2: string;
  currenturl: any;

  enquiryFormComponent: any;

  userRentalFavList = [];
  propertyIds = [];


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



  constructor(private titleService: Title, private meta: Meta,
    public Service: DataService, private router: Router,
    private fb: FormBuilder, private activeroute: ActivatedRoute,
    public cityservice: CityService, public Service2: DataService2,
    public Filter: FilterService,
    private sanitizer: DomSanitizer,
    public ServerResponseService_builderLocality: ServerResponseService_builderLocality,
    public responseService_Main_Home: ServerResponseService_mainhome,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.window = this.doc.defaultView!;
    this.Service.mouseenterlisten1().subscribe((m: any) => {
      this.getcity();
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      this.window.scrollTo(0, 0);
    });
  }
  window!: Window;
  status = false;
  aff_lux = false;
  aff_lux2 = false;
  aff_lux3 = false;
  addToggle() {
    this.status = !this.status;
  }

   private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }


  ngOnInit() {
    this.dataloads();
    this.getmeta();
    this.getcity();
    // this.SHowinternallinks();
    // this.semanticjquery();
    this.scripts();
    // this.getOffers();
    this.onresize();
    if (isPlatformBrowser(this.platformId)) {
      // this.cityname = this.storage?.getItem('CityName');
      // this.buildername = this.storage?.getItem('BuilderName');
    }
    this.registerForm = this.fb.group({
      projectType: [''],
      minBudget: [''],
      maxBudget: [''],
      posessionWithin: [''],
      locality: [''],
    });
    // let node8: any = document.createElement('link');
    // node8.setAttribute('href','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    // node8.rel = 'stylesheet';
    // node8.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node8);

    this.currenturl = this.router.url;

  }
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

  // getSeoTitle(shortTitle: string, longTitle: string): string {
  //   let title = shortTitle.length <= 60 ? shortTitle : longTitle;
  //   return title;
  // }

  getSeoTitle(shortTitle: string, longTitle: string): string {
    // Guard: if either param is missing, return whatever is available
    if (!shortTitle && !longTitle) return '';
    if (!shortTitle) return longTitle;
    if (!longTitle) return shortTitle;

    const maxLength = 60;

    if (shortTitle.length <= maxLength) {
      return shortTitle;
    }

    if (longTitle.length <= maxLength) {
      return longTitle;
    }

    // Strip the " | Homes247.in" or " | Homes247" suffix before processing
    const stripped = longTitle.replace(/ \| Homes247(\.in)?$/, '');
    const parts = stripped.split(' in ');
    const fullPrefix = parts[0];       // e.g. "Puravankara Limited Luxury Apartments"
    const locality = parts[1] ?? '';   // e.g. "Pallikaranai"

    const suffix = '| Homes247';

    // ✅ Try shortening the builder name (first 2 words only)
    const prefixWords = fullPrefix.split(' ');
    const shortPrefix = prefixWords.slice(0, 2).join(' ') + ' ' + prefixWords.slice(3).join(' ');
    //                  e.g. "Puravankara"                 +     "Luxury Apartments"

    const localityWords = locality.split(' ');
    let finalLocality = '';
    let finalPrefix = fullPrefix;

    for (const word of localityWords) {
      const temp = finalLocality ? `${finalLocality} ${word}` : word;

      // First try with full prefix
      const fullTitle = `${fullPrefix} in ${temp} ${suffix}`;

      if (fullTitle.length <= maxLength) {
        finalLocality = temp;
        finalPrefix = fullPrefix;
        continue;
      }

      // ✅ If full prefix doesn't fit, try with short prefix (drop extra builder words)
      const shortTitle2 = `${shortPrefix} in ${temp} ${suffix}`;
      if (shortTitle2.length <= maxLength) {
        finalLocality = temp;
        finalPrefix = shortPrefix;
        continue;
      }

      // Neither fits — force first locality word in if nothing added yet
      if (!finalLocality) {
        finalLocality = word;
        finalPrefix = shortPrefix; // ✅ use short prefix in fallback too
      }
      break;
    }

    return `${finalPrefix} in ${finalLocality} ${suffix}`;
  }

  getSeoDiscription(shortDisc: string, longDisc: string): string {
    let discription = shortDisc.length <= 158 ? shortDisc : longDisc;
    return discription;

  }

  LocalityId: any;
  localname: any;
  localname_seo: any;
  getmeta() {
    this.Service.createLinkForCanonicalURL();
    this.routeSub = this.activeroute.params.subscribe(params => {
      if (this.router.url?.indexOf('/bplc') > -1) {
        var lasturl = params['buildername-properties-in-:locname-:city-:localityid-:builderid'];
        const inputString = lasturl
        const parts = inputString.split('-');
        const numberValue = parseInt(parts[parts.length - 2]);
        this.LocalityId = numberValue
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        this.builderid = builderid;
      } else if (this.router.url?.indexOf('/baplc') > -1) {
        var lasturl = params['buildername-affordable-properties-in-:locname-:city-:localityid-:builderid'];
        const inputString = lasturl
        const parts = inputString.split('-');
        const numberValue = parseInt(parts[parts.length - 2]);
        this.LocalityId = numberValue;
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        this.builderid = builderid;
      } else if (this.router.url?.indexOf('/batlc') > -1) {
        var lasturl = params['buildername-affordable-apartments-in-:locname-:city-:localityid-:builderid'];
        const inputString = lasturl
        const parts = inputString.split('-');
        const numberValue = parseInt(parts[parts.length - 2]);
        this.LocalityId = numberValue;
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        this.builderid = builderid;
      } else if (this.router.url?.indexOf('/batlc') > -1) {
        var lasturl = params['buildername-affordable-villas-in-:locname-:city-:localityid-:builderid'];
        const inputString = lasturl
        const parts = inputString.split('-');
        const numberValue = parseInt(parts[parts.length - 2]);
        this.LocalityId = numberValue;
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        this.builderid = builderid;
      } else if (this.router.url?.indexOf('/blplc') > -1) {
        var lasturl = params['buildername-luxury-properties-in-:locname-:city-:localityid-:builderid'];
        const inputString = lasturl
        const parts = inputString.split('-');
        const numberValue = parseInt(parts[parts.length - 2]);
        this.LocalityId = numberValue;
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        this.builderid = builderid;
      } else if (this.router.url?.indexOf('/bltlc') > -1) {
        var lasturl = params['buildername-luxury-apartments-in-:locname-:city-:localityid-:builderid'];
        const inputString = lasturl
        const parts = inputString.split('-');
        const numberValue = parseInt(parts[parts.length - 2]);
        this.LocalityId = numberValue;
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        this.builderid = builderid;
      } else if (this.router.url?.indexOf('/bltlc') > -1) {
        var lasturl = params['buildername-luxury-villas-in-:locname-:city-:localityid-:builderid'];
        const inputString = lasturl
        const parts = inputString.split('-');
        const numberValue = parseInt(parts[parts.length - 2]);
        this.LocalityId = numberValue;
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        this.builderid = builderid;
      } else {
        var builderiid = this.router.url.split('-').pop().match(/[0-9]+/);
        this.builderid = builderiid;
      }

      var paramlocality = {
        locid: this.LocalityId,
      };

      this.Service.getlocalitymeta('', paramlocality).subscribe(metatag => {
        let metatags = metatag['Localityseo'];  //gowshik edit//
        this.localname = metatags[0].LocalityName;
        this.localname_seo = this.localname.toLowerCase().replace(/\s+/g, '-');
        var City_Seo = metatags[0].city_name.toLowerCase().replace(/\s+/g, '-');
        var value = this.cityservice.cityfinder(City_Seo);
        this.cityid = value.cityid;
        this.currentCity = value.cityname;
        this.cityname = value.cityname;



        var cityid = this.cityid;
        var param = {
          buildid: this.builderid,
          Cityid: cityid
        };
        String.prototype.toLocaleUpperCase = function () {
          return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        };

        var capsname = this.cityname;
        this.cityname = capsname.replace('-', ' ');

        if (Number(this.builderid)) {
        } else if (this.builderid?.indexOf('?') > -1) {
        } else {
          this.responseService_Main_Home.set301Status();
        }

        var citynamecaps = this.cityname.replace('-', ' ').toLocaleUpperCase();
        // this.Service.createLinkForCanonicalURL();
        this.Service.getbuildermeta(this.cityname, param).subscribe(metatag => {
          let metatags = metatag['Builderseo'];
          this.builder = metatags[0].builderInfo_name;
          var builder_seo = metatags[0].builderInfo_name;
          this.builder_seo = builder_seo.toLowerCase().replace(/\s+/g, '-');
          var finalbuildername = metatags[0].builderInfo_name;

          var shortBuilerName = finalbuildername.split(' ').slice(0, 2).join(' ');
          const IMAGE_URL = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';


          // if (this.currentCity == undefined) {
          //   this.ServerResponseService_builderLocality.set301Status(this.builder_seo,this.localname_seo,City_Seo,this.LocalityId,this.builderid);
          // }
          // if(City_Seo !== this.currentCity2){
          //   this.ServerResponseService_builderLocality.set301Status(this.builder_seo,this.localname_seo,City_Seo,this.LocalityId,this.builderid);
          // }else{
          // }

          if (this.router.url?.indexOf('/bplc') > -1) {
            var urlstructure = '/bplc/' + this.builder_seo + '-properties-in-' + this.localname_seo + '-' + City_Seo + '-' + this.LocalityId + '-' + this.builderid;
            this.secondorytitle = finalbuildername + ' Properties in ' + this.localname;
          }
          else if (this.router.url?.indexOf('/baplc') > -1) {
            var urlstructure2 = '/baplc/' + this.builder_seo + '-affordable-properties-in-' + this.localname_seo + '-' + City_Seo + '-' + this.LocalityId + '-' + this.builderid;
            this.secondorytitle = finalbuildername + ' Affordable Properties in ' + this.localname;
          }
          else if (this.router.url?.indexOf('/batlc/' + this.builder_seo + '-affordable-apartments-in-') > -1) {
            var urlstructure3 = '/batlc/' + this.builder_seo + '-affordable-apartments-in-' + this.localname_seo + '-' + City_Seo + '-' + this.LocalityId + '-' + this.builderid;
            this.secondorytitle = finalbuildername + ' Affordable Apartments in ' + this.localname;
          }
          else if (this.router.url?.indexOf('/batlc/' + this.builder_seo + '-affordable-villas-in-') > -1) {
            var urlstructure4 = '/batlc/' + this.builder_seo + '-affordable-villas-in-' + this.localname_seo + '-' + City_Seo + '-' + this.LocalityId + '-' + this.builderid;
            this.secondorytitle = finalbuildername + ' Affordable Villas in ' + this.localname;
          }
          else if (this.router.url?.indexOf('/blplc') > -1) {
            var urlstructure5 = '/blplc/' + this.builder_seo + '-luxury-properties-in-' + this.localname_seo + '-' + City_Seo + '-' + this.LocalityId + '-' + this.builderid;
            this.secondorytitle = finalbuildername + ' Luxury Properties in ' + this.localname;
          }
          else if (this.router.url?.indexOf('/bltlc/' + this.builder_seo + '-luxury-apartments-in-') > -1) {
            var urlstructure6 = '/bltlc/' + this.builder_seo + '-luxury-apartments-in-' + this.localname_seo + '-' + City_Seo + '-' + this.LocalityId + '-' + this.builderid;
            this.secondorytitle = finalbuildername + ' Luxury Apartments in ' + this.localname;
          }
          else if (this.router.url?.indexOf('/bltlc/' + this.builder_seo + '-luxury-villas-in-') > -1) {
            var urlstructure7 = '/bltlc/' + this.builder_seo + '-luxury-villas-in-' + this.localname_seo + '-' + City_Seo + '-' + this.LocalityId + '-' + this.builderid;
            this.secondorytitle = finalbuildername + ' Luxury Villas in ' + this.localname;
          } else {
          }
          if (this.router.url?.indexOf('--') > -1) {
            this.ServerResponseService_builderLocality.set301Status(this.builder_seo, this.localname_seo, City_Seo, this.LocalityId, this.builderid);
          } else if (this.router.url?.indexOf(urlstructure) > -1) {
          } else if (this.router.url?.indexOf(urlstructure2) > -1) {
          } else if (this.router.url?.indexOf(urlstructure3) > -1) {
          } else if (this.router.url?.indexOf(urlstructure4) > -1) {
          } else if (this.router.url?.indexOf(urlstructure5) > -1) {
          } else if (this.router.url?.indexOf(urlstructure6) > -1) {
          } else if (this.router.url?.indexOf(urlstructure7) > -1) {
          } else {
            this.ServerResponseService_builderLocality.set301Status(this.builder_seo, this.localname_seo, City_Seo, this.LocalityId, this.builderid);
          }



          if (this.router.url?.indexOf('/bplc') > -1) {

            const title = this.getSeoTitle(
              `${finalbuildername} Properties in ${this.localname} | Homes247.in`,
              `${shortBuilerName} Properties in ${this.localname}`
            );

            const description = this.getSeoDiscription(
              `Find ${finalbuildername} properties in ${this.localname} with spacious homes, prime locations, premium amenities and best prices at Homes247.`,
              `Find ${shortBuilerName} properties. Explore listings on Homes247.in.`
            );

            this.titleService.setTitle(title);
            this.meta.updateTag({ name: 'description', content: description });

            // OG + Twitter
            this.meta.updateTag({ property: 'og:title', content: title });
            this.meta.updateTag({ property: 'og:description', content: description });
            this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
            this.meta.updateTag({ property: 'og:type', content: 'website' });

            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            this.meta.updateTag({ name: 'twitter:title', content: title });
            this.meta.updateTag({ name: 'twitter:description', content: description });
            this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
          } else if (this.router.url?.indexOf('/baplc') > -1) {

            const title = this.getSeoTitle(
              `${finalbuildername} Affordable Homes in ${this.localname} | Homes247`,
              `${shortBuilerName} Affordable Homes in ${this.localname} `
            );

            const description = this.getSeoDiscription(
              `Find affordable properties by ${finalbuildername} in ${this.localname}. Check prices, floor plans, and amenities on Homes247.in today.`,
              `Find affordable properties by ${shortBuilerName}. Check listings on Homes247.in.`
            );

            this.titleService.setTitle(title);
            this.meta.updateTag({ name: 'description', content: description });

            // OG + Twitter
            this.meta.updateTag({ property: 'og:title', content: title });
            this.meta.updateTag({ property: 'og:description', content: description });
            this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
            this.meta.updateTag({ property: 'og:type', content: 'website' });

            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            this.meta.updateTag({ name: 'twitter:title', content: title });
            this.meta.updateTag({ name: 'twitter:description', content: description });
            this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
          } 
          else if (this.router.url?.indexOf('/batlc/') > -1) {

            const title = this.getSeoTitle(
              `${finalbuildername} Affordable Flats in ${this.localname} | Homes247`,
              `${shortBuilerName} Affordable Flats in ${this.localname}`
            );
            const description = this.getSeoDiscription(
              `Discover affordable ${finalbuildername} flats in ${this.localname}. Check floor plans, prices & verified listings on Homes247.in today.`,
              `Find affordable flats by ${shortBuilerName}. Check listings on Homes247.in.`
            );

            this.titleService.setTitle(title);
            this.meta.updateTag({ name: 'description', content: description });

            // OG + Twitter
            this.meta.updateTag({ property: 'og:title', content: title });
            this.meta.updateTag({ property: 'og:description', content: description });
            this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
            this.meta.updateTag({ property: 'og:type', content: 'website' });

            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            this.meta.updateTag({ name: 'twitter:title', content: title });
            this.meta.updateTag({ name: 'twitter:description', content: description });
            this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
          } else if (this.router.url?.indexOf('/batlc/' + this.builder_seo + '-affordable-villas-in-') > -1) {

            const title = this.getSeoTitle(
              `${finalbuildername} Affordable Villas ${this.localname} | Homes247`,
              `${shortBuilerName} Affordable Villas in ${this.localname}`
            );

            const description = this.getSeoDiscription(
              `Discover affordable ${finalbuildername} villas in ${this.localname}. Check floor plans, prices and verified listings on Homes247.in today.`,
              `Find affordable villas by ${shortBuilerName}. Check listings on Homes247.in.`
            );

            this.titleService.setTitle(title);
            this.meta.updateTag({ name: 'description', content: description });

            // OG + Twitter
            this.meta.updateTag({ property: 'og:title', content: title });
            this.meta.updateTag({ property: 'og:description', content: description });
            this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
            this.meta.updateTag({ property: 'og:type', content: 'website' });

            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            this.meta.updateTag({ name: 'twitter:title', content: title });
            this.meta.updateTag({ name: 'twitter:description', content: description });
            this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
          } else if (this.router.url?.indexOf('/blplc') > -1) {

            const title = this.getSeoTitle(
              `${finalbuildername} Luxury Properties ${this.localname} | Homes247`,
              `${shortBuilerName} Luxury Properties in ${this.localname} `
            );

            const description = this.getSeoDiscription(
              `Explore ${finalbuildername} luxury properties in ${this.localname} with premium amenities, modern designs and best prices at Homes247.`,
              `Explore luxury properties by ${shortBuilerName}. Check listings on Homes247.in.`
            );

            this.titleService.setTitle(title);
            this.meta.updateTag({ name: 'description', content: description });

            // OG + Twitter
            this.meta.updateTag({ property: 'og:title', content: title });
            this.meta.updateTag({ property: 'og:description', content: description });
            this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
            this.meta.updateTag({ property: 'og:type', content: 'website' });

            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            this.meta.updateTag({ name: 'twitter:title', content: title });
            this.meta.updateTag({ name: 'twitter:description', content: description });
            this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
          } else if (this.router.url?.indexOf('/bltlc/' + this.builder_seo + '-luxury-apartments-in-') > -1) {

            const title = this.getSeoTitle(
              `${finalbuildername} Luxury Apartments in ${this.localname} | Homes247`,
              `${shortBuilerName} Luxury Apartments in ${this.localname} `
            );

            const description = this.getSeoDiscription(
              `Explore elite luxury apartments in ${this.localname} by ${finalbuildername}. Discover premium amenities and best prices at Homes247.in.`,
              `Explore luxury apartments by ${shortBuilerName}. Check listings on Homes247.in.`
            );

            this.titleService.setTitle(title);
            this.meta.updateTag({ name: 'description', content: description });

            // OG + Twitter same
            this.meta.updateTag({ property: 'og:title', content: title });
            this.meta.updateTag({ property: 'og:description', content: description });
            this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });

            this.meta.updateTag({ name: 'twitter:title', content: title });
            this.meta.updateTag({ name: 'twitter:description', content: description });
          } else if (this.router.url?.indexOf('/bltlc/' + this.builder_seo + '-luxury-villas-in-') > -1) {

            const title = this.getSeoTitle(
              `${finalbuildername} Luxury Villas in ${this.localname} | Homes247.in`,
              `Buy ${shortBuilerName} Luxury Villas in ${this.localname}`
            );

            const description = this.getSeoDiscription(
              `Explore elite luxury villas in ${this.localname} by ${finalbuildername}. Discover premium amenities and the best prices at Homes247.in.`,
              `Explore luxury villas by ${shortBuilerName}. Check listings on Homes247.in.`
            );

            this.titleService.setTitle(title);
            this.meta.updateTag({ name: 'description', content: description });

            // OG + Twitter same
            this.meta.updateTag({ property: 'og:title', content: title });
            this.meta.updateTag({ property: 'og:description', content: description });
            this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
            this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });

            this.meta.updateTag({ name: 'twitter:title', content: title });
            this.meta.updateTag({ name: 'twitter:description', content: description });
          } else {
            this.titleService.setTitle(
              finalbuildername + ' Projects in ' + this.localname + ', ' + citynamecaps + ' | Homes247'
            );
            this.meta.updateTag({
              name: 'description',
              content:
                'Explore ' + finalbuildername + ' residential projects in ' + this.localname + ', ' + citynamecaps +
                '. Find apartments, villas & more by ' + finalbuildername + '. Your dream home awaits | Homes247'
            });
          }

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
        });
      });
    });
  }
  loc: any;
  MousemovementImage: boolean = false;
  Matautocomplete: any;

  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
    this.MousemovementImage = true;

    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (this.topnewdivreached = scrollPosition >= elementPosition) {
      if (this.topnewapiload == true) {
        this.topnewapiload = false;
        this.Mousemovement = true;
        // this.FilterTransition();
      }
    }
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
    }
    // if ($(window).scrollTop() >= 140) {
    //   $('#hidefilter').addClass('hidefilter');
    // } else {
    //   $('#hidefilter').removeClass('hidefilter');
    // }
    import('../builder-locality-section-two/builder-locality-section-two')
      .then(c => {
        this.BuilderLocalitySectionTwoComponent = c.BuilderLocalitySectionTwo;
        if (isPlatformBrowser(this.platformId)) {
          $('.modal-login').css('z-index', '99999');
        }
      });
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
    this.Mousemovement = true;
    this.Service.mouseenterservice3();

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

  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {
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

    this.affordablePropDetails();

  }

  // onTouchLoad() {

  // }
  // SHowinternallinks() {
  //   import('../builder3/builder3.module').then(mod => mod.Builder3Module).then(Builder3Module => {
  //     this.Builder3Component = Builder3Module.components['lazy'];
  //   });
  //   this.Internallinkshide = this.Internallinkshide ? false : true;
  //   $('.get_call_back').css('display', 'block');
  // }
  componentloads = false;
  ShowHideFilter() {
    this.Service.mouseenterservice5();
    setTimeout(() => {
      if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        $('.head_stick').css('display', 'none');
      } else {
        $('.head_stick').css('display', 'block'); // Show again when no modal is open
      }
    }, 300);
    this.sortShowHide = false;
  }
  alloffersList = [];
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.alloffersList = a;
  }
  luxary: boolean = false;
  affordable: boolean = false;
  getcity() {
    this.showLoader = true;
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
      this.cityname = value.cityname;

      this.cityId = value.cityid;
      this.cityid = value.cityid;
      var builderid = this.router.url.split('-').pop().match(/[0-9]+/);
      this.builderid = builderid;

      var paramss = {
        buildid: this.builderid,
        Cityid: this.cityid
      };

      this.Service.getbuildermeta(this.cityname, paramss).subscribe(metatag => {
        let metatags = metatag['Builderseo'];
        var builder_seo = metatags[0].builderInfo_name;
        this.builder_seo = builder_seo.toLowerCase().replace(/\s+/g, '-');
        this.builder = builder_seo;


        this.BuilderMain = true;
        if (this.router.url?.indexOf('/bplc') > -1) {
          var buildname = this.builder;
        } else if (this.router.url?.indexOf('/baplc') > -1) {
          this.affordable = true;
          this.broadmatch = 'aff_prop';
          var buildname = this.builder;
          this.minbudget_IDPK = '1';
          this.maxbudget_IDPK = '6';
        } else if (this.router.url?.indexOf('-affordable-apartments-in-') > -1) {
          this.affordable = true;
          this.broadmatch = 'aff_prop';
          var buildname = this.builder;
          this.projecttype = ['50401'];
          this.minbudget_IDPK = '1';
          this.maxbudget_IDPK = '6';
        } else if (this.router.url?.indexOf('-affordable-villas-in-') > -1) {
          this.affordable = true;
          this.broadmatch = 'aff_prop';
          var buildname = this.builder;
          this.projecttype = ['50402'];
          this.minbudget_IDPK = '1';
          this.maxbudget_IDPK = '6';
        } else if (this.router.url?.indexOf('/blplc') > -1) {
          this.luxary = true;
          this.broadmatch = 'lux_prop';
          var buildname = this.builder;
          this.minbudget_IDPK = '7';
          this.maxbudget_IDPK = '24';
        } else if (this.router.url?.indexOf('luxury-apartments-in-') > -1) {
          this.luxary = true;
          this.broadmatch = 'lux_apartments';
          var buildname = this.builder;
          this.projecttype = ['50401'];
          this.minbudget_IDPK = '7';
          this.maxbudget_IDPK = '24';
        } else if (this.router.url?.indexOf('luxury-villas-in-') > -1) {
          this.luxary = true;
          this.broadmatch = 'lux_villas';
          var buildname = this.builder;
          this.projecttype = ['50402'];
          this.minbudget_IDPK = '7';
          this.maxbudget_IDPK = '24';
        } else {

        }

        String.prototype.toLocaleUpperCase = function () {
          return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        };
        var capsname = this.cityname.toLocaleUpperCase();
        this.city = capsname.replace('-', ' ');
        // 


        this.citynamebuilder = capsname;
        this.citybreadcrump = this.cityname;
        this.cityapi.limit = '0';
        this.cityapi.limitrows = '4';
        var limitparam = 0;
        var limitprprtyrows = 4;
        var buildname = this.builder;
        var pos = this.Filter.possission;
        // var buildid = this.builderid;
        // if (this.router.url?.indexOf('/bplc') > -1) {
        //   this.minbudget_IDPK = this.Filter.min;
        //   this.maxbudget_IDPK = this.Filter.max;
        //   this.loc = this.LocalityId;
        //   this.statusid = this.Filter.statusid
        //   this.projecttype = this.Filter.proptypeid;
        //   this.noOfBedrooms = this.Filter.Bedrooms;
        // } 
        // else{}

        this.UserId = this.storage?.getItem("userID");

        var param = {
          limit: limitparam,
          limitrows: limitprprtyrows,
          buldername: buildname,
          buliderId: this.builderid,
          bedroom: this.noOfBedrooms,
          minprice: this.minbudget_IDPK,
          maxprice: this.maxbudget_IDPK,
          possission: pos,
          localityname: this.localname,
          locality: this.LocalityId,
          statusid: this.statusid,
          proptypeid: this.projecttype,
          userId: this.UserId,
        };

        // 

        this.Service.getprojectscount(this.city, param).subscribe(countprojects => {
          // 
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
          if (this.projectcount <= 0) {
            this.showLoader = false;
            this.zeroprojects = true;
            // this.otploader = false;

          }
        });
        this.Service.getCity(this.city, param).subscribe(lists => {
          if (lists['status'] == "True") {
            let propertylists = lists['deatils'];
            this.propertylists = propertylists;
            this.showLoader = false;
            this.sectionFirstResponce = true;
            // this.otploader = false;
          } else {
            this.showLoader = true;

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
              "item": "https://www.homes247.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": 'Real Estate in ' + this.cityname + '',
              "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toString().toLowerCase().replace(/\s+/g, '-') + ""
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Properties for Sale in " + this.cityname + "",
              "item": "https://www.homes247.in/" + this.cityname.toString().toLowerCase().replace(/\s+/g, '-') + "/property-sale"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": this.builder + " in " + this.cityname + " | " + this.builder + " |Homes247.in",
              "item": "https://www.homes247.in" + this.router.url
            }]
        }
        this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        // ******************Carousal Structured data Starts*********************
        var carousalparam = {
          builderId: this.builderid,
          cityid: this.cityid,
          limit: 0,
          limitrows: 40,
        }
        this.Service.getlocalityproperties(carousalparam).subscribe(lists => {
          this.localitypropertiesstructureddata = lists['autolist'];
          for (let i = 0; i < this.localitypropertiesstructureddata.length; i++) {
            this.carouselsjson =
            {
              "@type": "ListItem",
              "position": i,
              "name": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'],
              "description": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'] + " Reviews | Price | Homes247.in ",
              "image": "https://img-mb.homes247.in/images/uploadPropertyImgs/" + this.localitypropertiesstructureddata[i]['coverimage'],
              "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id']
            }
            this.carouselsarrayjoin.push(this.carouselsjson);
          }
          this.carouselsLD = this.getcarousalSafeHTML(this.carouselsarrayjoin);

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
                "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id'],
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
                "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id'],
                "availability": "https://schema.org/InStock"
              }]
            }
            this.eventsarrayjoin.push(this.eventsjson);
          }
          this.eventsLD = this.getSafeHTML(this.eventsarrayjoin);
        });

        for (let i = 0; i < this.localitypropertiesstructureddata.length; i++) {
          this.localbusinessjson =
          {
            "@context": "http://schema.org/",
            "@type": "RealEstateAgent",
            "name": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'],
            "description": this.localitypropertiesstructureddata[i]['name'] + " in " + this.localitypropertiesstructureddata[i]['locality'] + " , " + this.localitypropertiesstructureddata[i]['city'] + " | Reviews | Price | Homes247.in ",
            "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id'],
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
          this.localbusinessarrayjoin.push(this.localbusinessjson);
        }
        this.localbusinessLD = this.getSafeHTML(this.localbusinessarrayjoin);

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
              "url": "https://www.homes247.in/property/" + this.localitypropertiesstructureddata[i]['city'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['locality'].toString().toLowerCase().replace(/\s+/g, '-') + "/" + this.localitypropertiesstructureddata[i]['name'].toString().toLowerCase().replace(/\s+/g, '-') + "-" + this.localitypropertiesstructureddata[i]['id'],
              "priceCurrency": "INR",
              "price": this.localitypropertiesstructureddata[i]['price'],
              "priceValidUntil": YearDateformatchange + "T18:30+05:30",
              "itemCondition": "NewCondition",
              "availability": "InStock"
            }
          }
          this.productmerchantreviewarrayjoin.push(this.productmerchantreviewjson);
        }
        this.productmerchantreviewLD = this.getSafeHTML(this.productmerchantreviewarrayjoin);
        // ******************Carousal Structured data Ends*********************
      });
    });


  }
  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // ******************Carousal Structured data Starts*********************
  getcarousalSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON

    if (this.router.url?.indexOf('/builder/') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":"${this.builder} in ${this.city} | ${this.builder} | Homes247.in",
            "description":"Explore the best projects from ${this.builder} at Homes247.in | Buy Apartments, Plots and Villas from ${this.builder} in the prime locations of ${this.city}| Get Best Deals.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    if (this.router.url?.indexOf('properties-under-30-lakhs') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":" ${this.builder} Properties Under 30 Lakhs in ${this.city} | ${this.builder} Properties in ${this.city} Below 30 Lakhs | Homes247.in",
            "description":${this.builder} Properties for Sale in  ${this.city} for 30 Lahks .Affordable ${this.builder} Properties For Sale in ${this.city} below 30 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    if (this.router.url?.indexOf('properties-30-lakhs-to-40-lakhs') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":"${this.builder} Properties For 30 Lakhs to 40 Lakhs in ${this.city} | ${this.builder} Properties  in ${this.city} Below 40 Lakhs  | Homes247.in",
            "description":"${this.builder} Properties for Sale in ${this.city} For 30 Lakhs to 40 Lakhs. Affordable ${this.builder} Properties For Sale in ${this.city} below 40 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    if (this.router.url?.indexOf('properties-40-lakhs-to-50-lakhs') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":"${this.builder} Properties For 40 Lakhs to 50 Lakhs in ${this.city} | ${this.builder} Properties  in ${this.city} Below 50 Lakhs  | Homes247.in",
            "description":"${this.builder} Properties for Sale in ${this.city} For 40 Lakhs to 50 Lakhs. Affordable ${this.builder} Properties For Sale in ${this.city} below 50 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    if (this.router.url?.indexOf('properties-50-lakhs-to-60-lakhs') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":"${this.builder} Properties For 50 Lakhs to 60 Lakhs in ${this.city} | ${this.builder} Properties  in ${this.city} Below 60 Lakhs  | Homes247.in",
            "description":"${this.builder} Properties for Sale in ${this.city} For 50 Lakhs to 60 Lakhs. Affordable ${this.builder} Properties For Sale in ${this.city} below 60 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    if (this.router.url?.indexOf('properties-60-lakhs-to-70-lakhs') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":" ${this.builder} Properties For 60 Lakhs to 70 Lakhs in ${this.city} | ${this.builder} Properties in ${this.city} Below 70 Lakhs | Homes247.in",
            "description":" ${this.builder} Properties for Sale in ${this.city} For 60 Lakhs to 70 Lakhs. Luxury Properties in ${this.builder} ${this.city} below 70 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    if (this.router.url?.indexOf('properties-70-lakhs-to-80-lakhs') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":" ${this.builder} Properties For 70 Lakhs to 80 Lakhs in ${this.city} | ${this.builder} Properties in ${this.city} Below 80 Lakhs | Homes247.in",
            "description":" ${this.builder} Properties for Sale in ${this.city} For 70 Lakhs to 80 Lakhs. Luxury Properties in ${this.builder} ${this.city} below 80 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    if (this.router.url?.indexOf('properties-80-lakhs-to-90-lakhs') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":" ${this.builder} Properties For 80 Lakhs to 90 Lakhs in ${this.city} | ${this.builder} Properties in ${this.city} Below 90 Lakhs | Homes247.in",
            "description":" ${this.builder} Properties for Sale in ${this.city} For 80 Lakhs to 90 Lakhs. Luxury Properties in ${this.builder} ${this.city} below 90 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    if (this.router.url?.indexOf('properties-90-lakhs-to-1-crore') > -1) {
      const html = `<script type="application/ld+json">{
          "@context":"http://schema.org",
            "@type":"ItemList",
            "name":" ${this.builder} Properties For 90 Lakhs to 1 Crore in ${this.city} | ${this.builder} Properties in ${this.city} Below 1 Crore | Homes247.in",
            "description":" ${this.builder} Properties for Sale in ${this.city} For 90 Lakhs to 1 Crore. Luxury Properties in ${this.builder} ${this.city} below 1 Crore. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
            "itemListElement":[
              ${json}
          ],"numberOfItems":40}
        </script>`;
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

  }
  // ******************Carousal Structured data Ends*********************


  propertyNameClick(PropertyName, RegionID, localityid, PropertyID) {
    this.SelectedPropName = PropertyName;
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.propid = PropertyID;
    $('#otpValidate').css('display', 'block');
  }



  addwishlist(id) {
    this.propertyId = id;
    const userid = this.storage?.getItem("userID");
    var param = {
      userid: userid,
      propid: this.propertyId
    };
    this.Service.addfavaourite(param).subscribe(response => {
      this.alertmesg = response['message'];
      if (response['status'] === 'True') {
        $('.toast').toast('show');
      }
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
      this.parsedarray.push(id);
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    } else {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== id;
      });
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    }
  }

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }

  // HideSort() {
  //   this.sortShowHide = false;
  // }

  // getOffers() {

  //   var limitparam = 0;
  //   var limitrows = 6;
  //   var param = {
  //     limit: limitparam,
  //     limitrows: limitrows
  //   };
  //   this.Service.getOffers(this.currentCity, param).subscribe(offers => {
  //     this.offers = offers['offer_deatils'];
  //   });
  // }

  scripts() {
    $(function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // $('.ui.dropdown').dropdown();
      // $('.ui.search.dropdown').dropdown({
      //   minCharacters: 3,
      //   useLabels: false
      // });
      // $('ui.price_filter.dropdown').dropdown({
      //   fullTextSearch: true
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
  FilterTransition() {
    var lastScrollTop = 0;
    $(window).scroll(function (event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
        document.getElementById("move").style.transform = "translateX(0) rotate(0)";
        document.getElementById("move").style.transition = " all 0.5s";
        document.getElementById("floatinglink").style.transform = "translateX(0%)";
        document.getElementById("floatinglink").style.transition = " all 0.8s";
        $('.floating-link').css('width', '');
        $('.border_div').css('opacity', '0');
        $('#floating_img').css('display', 'block');
      } else {
        document.getElementById("move").style.transform = "translateX(0) rotate(-360deg)";
        document.getElementById("move").style.transition = " all 0.5s";
        document.getElementById("floatinglink").style.transform = "translateX(-584%)";
        document.getElementById("floatinglink").style.transition = " all 0.8s";
        $('.border_div').removeAttr('id');
      }
      lastScrollTop = st;
    });

    $(window).scroll(function () {
      clearTimeout($.data(this, 'scrollTimer'));
      $.data(this, 'scrollTimer', setTimeout(function () {
        document.getElementById("move").style.transform = "translateX(0) rotate(-360deg)";
        document.getElementById("move").style.transition = " all 0.5s";
        document.getElementById("floatinglink").style.transform = "translateX(-584%)";
        document.getElementById("floatinglink").style.transition = " all 0.8s";
        $('.border_div').removeAttr('id');
      }, 1000));
    });

  }
  transitionEnd(event) {
    var dv = document.getElementById("floatinglink");
    var dvStyle = dv.getAttribute('style');
    if (dvStyle?.indexOf("translateX(-584%)") > -1) {
      $('.floating-link').css('width', '216px');
      $('.border_div').css('opacity', '1');
      $('#floating_img').css('display', 'none');

    }
  }



  readmore() {
    $('.banner_description').css('height', '265px');
    $('.about_us_banner label').css('top', '20%');
    $('p.banner_description').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  readless() {
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
    var scrollableDiv = document.getElementById('scrollable');
    scrollToTarget('top', scrollableDiv);
    $('.banner_description').css('height', '50px');
    $('.about_us_banner label').css('top', '40%');
    $('.about_us_banner label.descrip').css('top', '28%');
    $('p.banner_description').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }


  Oncompareclick() {
    this.Service.mouseenterservice2();
    this.compareShowonimg = this.compareShowonimg ? false : true;
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
    if (this.compareproparray.length >= 1) {
      this.hideshowcompare = true;
      this.compareStorageArry = JSON.parse(localStorage?.getItem('ComparePropID'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
      if (compare1 != undefined) {
        this.Service2.getpropertynew(compare1).subscribe(prop => {
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
        this.Service2.getpropertynew(compare2).subscribe(prop => {
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
    this.hideshowcompare = true;
    if ('ComparePropID' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID', '[]');
    }
    this.comparePropType = this.storage?.getItem('comparePropType1');
    const proparray = this.storage?.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
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
          this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
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
        this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
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
          this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
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
        this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
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
    this.compareStorageArry = JSON.parse(localStorage?.getItem('ComparePropID'));
    var compare1 = this.compareStorageArry[0];
    var compare2 = this.compareStorageArry[1];
    if (compare1 != undefined) {
      this.Service2.getpropertynew(compare1).subscribe(prop => {
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
      this.Service2.getpropertynew(compare2).subscribe(prop => {
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
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
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
      this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
    }
  }

  closeprop2(propid2) {
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
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
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== propid2;
      });
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
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
  shareContent(propertydemo) {
    if ((window.navigator as any).share) {
      // if(propertydemo.propertyype != 'Plot'){
      (window.navigator as any)
        .share({
          title: "Test",
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

  affordablePropDetails() {
    const limite = 0;
    const limitrows = 35;
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



  activeIndexMap: { [key: string]: number } = {};

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
