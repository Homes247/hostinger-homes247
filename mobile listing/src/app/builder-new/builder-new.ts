
import { SafeStorageService } from '../safe-storage.service';
// Swal lazy-loaded
import { CarouselModule, OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { cleanUrlPipe, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany } from '../mainpipe-pipe';
import { MyJsonLdComponent } from '../my-json-ld/my-json-ld.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { ServerResponseService } from '../server-response-3.service';
import { City } from './builder-new-interface';
// import { InnerHeader } from '../inner-header/inner-header';
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';


declare var $: any;
@Component({
  selector: 'app-builder-new',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MyJsonLdComponent, cleanUrlPipe, NgxSkeletonLoaderModule, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany, CarouselModule, InnerHeadderWithSidenav],
  templateUrl: './builder-new.html',
  styleUrl: './builder-new.css',
  providers: [ServerResponseService],
})
export class BuilderNew implements AfterViewInit {
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
  Builder4Component: any;
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
  BuilderSectionTwoComponent: any;
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
  spbc = false;
  stbc_apartments = false;
  stbc_villas = false;
  btbc_flats = false;
  btbc_villas = false;
  brtc = false;
  currenturl: any;

  userRentalFavList = [];
  propertyIds = [];


  enquiryFormComponent: any;
  otploader = false;
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
    public responseService: ServerResponseService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,

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
  ngOnInit() {
    this.dataloads();
    this.getcity();
    this.getmeta();
    // this.SHowinternallinks();
    this.semanticjquery();
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
    this.currenturl = this.router.url;
    if (this.componentloads = false) {
      this.componentloads = true;
      import('../mat-autocomplete-new/mat-autocomplete-new')
        .then(c => {
          this.Matautocomplete = c.MatAutocompleteNew;
        });
    }
    import('../enquiry-form/enquiry-form')
      .then(c => {
        this.enquiryFormComponent = c.EnquiryFormComponent;
        if (isPlatformBrowser(this.platformId)) {
          $('.modal-login').css('z-index', '99999');
        }
      });
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
  getmeta() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityid = value.cityid;
    this.currentCity = value.cityname;
    this.cityname = value.cityname;
    // 
    this.routeSub = this.activeroute.params.subscribe(params => {
      if (this.router.url?.indexOf('/builder/') > -1) {
        var cityname = params['cityname'];
        this.cityname = params['cityname'];
        var lasturl = params['buildername-:builderid'];
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        this.builderid = builderid;
        var idremoved = lasturl.replace('-' + builderid, '');
        var buildername = idremoved.replace('-', ' ');
        var finalbuildername = buildername.toLocaleUpperCase();
      } else if (this.router.url?.indexOf('/btbc') > -1) {
        this.routeSub = this.activeroute.params.subscribe(params => {
          var url = params['bhk-flats-by-:buildername-:city-:builderid'];
          var bhkValue = url.charAt(0);
          this.bhkValue = bhkValue;
          var builderiid = this.router.url.split('-').pop().match(/[0-9]+/);
          this.builderid = builderiid;
        })
      }
      else {
        var builderiid = this.router.url.split('-').pop().match(/[0-9]+/);
        this.builderid = builderiid;
      }
      var cityid = this.cityid;

      var param = {
        buildid: this.builderid,
        Cityid: cityid
      };
      if (this.currentCity == undefined) {
        // this.router.navigate(['/404'], { skipLocationChange: true });
      }
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };

      var capsname = this.cityname.toLocaleUpperCase();
      this.city = capsname.replace('-', ' ');

      this.city_seo = this.cityname.toLowerCase().replace(/\s+/g, '-');
      // var value = this.cityservice.cityfinder(this.router.url);
      // 
      // 
      // if (this.city !== value.cityname) {
      //   this.router.navigate(['/404'], { skipLocationChange: true });
      // }

      // if (this.router.url?.indexOf('--') > -1) {
      //   // this.router.navigate(['/404'], { skipLocationChange: true });
      // }
      // if (Number(this.builderid)) {
      // } else if (this.builderid?.indexOf('?') > -1) {
      // } else {
      //   // this.router.navigate(['/404'], { skipLocationChange: true });
      // }



      var citynamecaps = this.cityname.replace('-', ' ').toLocaleUpperCase();
      this.Service.getbuildermeta(this.cityname, param).subscribe(metatag => {
        let metatags = metatag['Builderseo'];
        this.builder = metatags?.[0]?.builderInfo_name ;
        var builder_seo = metatags?.[0]?.builderInfo_name ;
        this.builder_seo = builder_seo.toLowerCase().replace(/\s+/g, '-');
        var finalbuildername = metatags?.[0]?.builderInfo_name ;


        var shortBuilerName = finalbuildername.split(' ').slice(0, 2).join(' ');




        if (this.router.url?.indexOf('spbc/ready-to-move-properties-') > -1) {
          var urlstructure = 'spbc/ready-to-move-properties-by-'
          var urltype = ' Ready to Move '
        } else if (this.router.url?.indexOf('spbc/new-launch-properties-') > -1) {
          var urlstructure = 'spbc/new-launch-properties-by-'
          var urltype = ' New Launch '
        } else if (this.router.url?.indexOf('spbc/up-coming-properties-') > -1) {
          var urlstructure = 'spbc/up-coming-properties-by-'
          var urltype = ' Up Coming '
        } else if (this.router.url?.indexOf('spbc/under-construction-properties-') > -1) {
          var urlstructure = 'spbc/under-construction-properties-by-'
          var urltype = ' Under Construction '
        }
        // STBC Aparttments
        else if (this.router.url?.indexOf('stbc/ready-to-move-apartments-') > -1) {
          var urlstructure2 = 'stbc/ready-to-move-apartments-by-'
          var urltype2 = ' Ready to Move Flats '
          var urltype3 = ' Ready to Move Apartments '
        } else if (this.router.url?.indexOf('stbc/new-launch-apartments-') > -1) {
          var urlstructure2 = 'stbc/new-launch-apartments-by-'
          var urltype2 = ' New Launch Flats '
          var urltype3 = ' New Launch Apartments '
        } else if (this.router.url?.indexOf('stbc/up-coming-apartments-') > -1) {
          var urlstructure2 = 'stbc/up-coming-apartments-by-'
          var urltype2 = ' Up Coming Flats '
          var urltype3 = ' Up Coming Apartments '
        } else if (this.router.url?.indexOf('stbc/under-construction-apartments-') > -1) {
          var urlstructure2 = 'stbc/under-construction-apartments-by-'
          var urltype2 = ' Under Construction Flats '
          var urltype3 = ' Under Construction Apartments '
        }

        // STBC villas

        else if (this.router.url?.indexOf('stbc/ready-to-move-villas-') > -1) {
          var urlstructure2 = 'stbc/ready-to-move-villas-by-'
          var urltype2 = ' Ready to Move Villas '
          var urltype3 = ' Ready to Move Villas '
        } else if (this.router.url?.indexOf('stbc/new-launch-villas-') > -1) {
          var urlstructure2 = 'stbc/new-launch-villas-by-'
          var urltype2 = ' New Launch Villas '
          var urltype3 = ' New Launch Villas '
        } else if (this.router.url?.indexOf('stbc/up-coming-villas-') > -1) {
          var urlstructure2 = 'stbc/up-coming-villas-by-'
          var urltype2 = ' Up Coming Villas '
          var urltype3 = ' Up Coming Villas '
        } else if (this.router.url?.indexOf('stbc/under-construction-villas-') > -1) {
          var urlstructure2 = 'stbc/under-construction-villas-by-'
          var urltype2 = ' Under Construction Villas '
          var urltype3 = ' Under Construction Villas '
        } else if (this.router.url?.indexOf('btbc/' + this.bhkValue + '-bhk-flats-by-') > -1) {
          var urlstructure3 = 'btbc/' + this.bhkValue + '-bhk-flats-by-'
          // var urltype4 = 'Flats'
          // var urltype5 = 'Apartment'
        } else if (this.router.url?.indexOf('btbc/' + this.bhkValue + '-bhk-villas-by-') > -1) {
          var urlstructure33 = 'btbc/' + this.bhkValue + '-bhk-villas-by-'
          // var urltype4 = 'Villas'
          // var urltype5 = 'Villas'
        } else if (this.router.url?.indexOf('bapc') > -1) {
          var urlstructure4 = 'bapc/' + this.builder_seo + '-affordable-properties-in-' + this.city_seo + '-' + this.builderid + ''
          // var urltype4 = 'Villas'
          // var urltype5 = 'Villas'
          // 
        } else if (this.router.url?.indexOf('blpc') > -1) {
          var urlstructure5 = 'blpc/' 
        
          // var urltype4 = 'Villas'
          // var urltype5 = 'Villas'
          // 
        } else if (this.router.url?.indexOf('batc/' + this.builder_seo + '-affordable-apartments-in-') > -1) {
          var urlstructure6 = 'batc/' + this.builder_seo + '-affordable-apartments-in-' + this.city_seo + '-' + this.builderid + ''
        } else if (this.router.url?.indexOf('batc/' + this.builder_seo + '-affordable-villas-') > -1) {
          var urlstructure7 = 'batc/' + this.builder_seo + '-affordable-villas-in-' + this.city_seo + '-' + this.builderid + ''
        } else if (this.router.url?.indexOf('bltc/' + this.builder_seo + '-luxury-apartments-') > -1) {
          var urlstructure8 = 'bltc/' + this.builder_seo + '-luxury-apartments-in-' + this.city_seo + '-' + this.builderid + ''
        } else if (this.router.url?.indexOf('bltc/' + this.builder_seo + '-luxury-villas-') > -1) {
          var urlstructure9 = 'bltc/' + this.builder_seo + '-luxury-villas-in-' + this.city_seo + '-' + this.builderid + ''
        } else if (this.router.url?.indexOf('brtc/' + this.builder_seo + '-apartments-in-') > -1) {
          var urlstructure10 = 'brtc/' + this.builder_seo + '-apartments-in-' + this.city_seo + '-' + this.builderid + ''
        } else if (this.router.url?.indexOf('brtc/' + this.builder_seo + '-villas-in-') > -1) {
          var urlstructure11 = 'brtc/' + this.builder_seo + '-villas-in-' + this.city_seo + '-' + this.builderid + ''
        } else if (this.router.url?.indexOf('brtc/' + this.builder_seo + '-plots-in-') > -1) {
          var urlstructure12 = 'brtc/' + this.builder_seo + '-plots-in-' + this.city_seo + '-' + this.builderid + ''
        } else {
        }
        const IMAGE_URL = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';

        if (this.router.url?.indexOf('-properties-under-30-lakhs-in-') > -1) {
          const title = this.getSeoTitle(
            `${finalbuildername} Projects Under 30L in ${citynamecaps}`,
            `Explore ${shortBuilerName} in ${citynamecaps}: Premium Residential Projects`
          );

          const description = this.getSeoDiscription(
            `Explore affordable ${finalbuildername} projects under 30 lakhs in ${citynamecaps}. Find the best property deals at Homes247.in!`,
            `Explore affordable ${shortBuilerName} projects under 30 lakhs in ${citynamecaps}. Find the best property deals at Homes247.in!`
          );

          this.titleService.setTitle(title);

          this.meta.updateTag({ name: 'description', content: description });

          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({
            name: 'twitter:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });


        } else if (this.router.url?.indexOf('-properties-30-lakhs-to-40-lakhs-') > -1) {
          // 
          this.titleService.setTitle(finalbuildername + " Properties For 30 Lakhs to 40 Lakhs in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps + " Below 40 Lakhs " + " | Homes247.in");
          this.meta.updateTag({
            name: 'description',
            content: finalbuildername + ' Properties for Sale in ' + citynamecaps + ' For 30 Lakhs to 40 Lakhs.' + ' Affordable ' + finalbuildername + ' Properties For Sale in ' + citynamecaps + ' below 40 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.'
          });
          this.titleName = '-properties-30-lakhs-to-40-lakhs-in-';




          this.meta.updateTag({ property: 'og:title', content: finalbuildername + " Properties For 30 Lakhs to 40 Lakhs in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps + " Below 40 Lakhs " + " | Homes247.in" });
          this.meta.updateTag({ property: 'og:description', content: finalbuildername + ' Properties for Sale in ' + citynamecaps + ' For 30 Lakhs to 40 Lakhs.' + ' Affordable ' + finalbuildername + ' Properties For Sale in ' + citynamecaps + ' below 40 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.' });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: finalbuildername + " Properties For 30 Lakhs to 40 Lakhs in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps + " Below 40 Lakhs " + " | Homes247.in" });
          this.meta.updateTag({ name: 'twitter:description', content: finalbuildername + ' Properties for Sale in ' + citynamecaps + ' For 30 Lakhs to 40 Lakhs.' + ' Affordable ' + finalbuildername + ' Properties For Sale in ' + citynamecaps + ' below 40 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.' });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });



        } else if (this.router.url?.indexOf('-properties-40-lakhs-to-50-lakhs-') > -1) {
          const title = this.getSeoTitle(
            `${finalbuildername} Properties 40L to 50L ${citynamecaps} | Homes247`,
            `${shortBuilerName} Properties 40L to 50L ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find ${finalbuildername} properties from 40 to 50 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`,
            `Find ${shortBuilerName} properties from 40 to 50 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`
          );

          // ✅ Title & Meta
          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });

          this.titleName = '-properties-40-lakhs-to-50-lakhs-in-';

          // ✅ Open Graph (FIXED)
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          // ✅ Twitter (FIXED)
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({
            name: 'twitter:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });




        } else if (this.router.url?.indexOf('-properties-50-lakhs-to-60-lakhs-') > -1) {
          this.titleService.setTitle(finalbuildername + " Properties For 50 Lakhs to 60 Lakhs in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps + " Below 60 Lakhs " + " | Homes247.in");
          this.meta.updateTag({
            name: 'description',
            content: finalbuildername + ' Properties for Sale in ' + citynamecaps + ' For 50 Lakhs to 60 Lakhs.' + ' Affordable ' + finalbuildername + ' Properties For Sale in ' + citynamecaps + ' below 60 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.'
          });
          this.titleName = '-properties-50-lakhs-to-60-lakhs-in-';




          this.meta.updateTag({ property: 'og:title', content: finalbuildername + " Properties For 50 Lakhs to 60 Lakhs in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps + " Below 60 Lakhs " + " | Homes247.in" });
          this.meta.updateTag({ property: 'og:description', content: finalbuildername + ' Properties for Sale in ' + citynamecaps + ' For 50 Lakhs to 60 Lakhs.' + ' Affordable ' + finalbuildername + ' Properties For Sale in ' + citynamecaps + ' below 60 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.' });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: finalbuildername + " Properties For 50 Lakhs to 60 Lakhs in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps + " Below 60 Lakhs " + " | Homes247.in" });
          this.meta.updateTag({ name: 'twitter:description', content: finalbuildername + ' Properties for Sale in ' + citynamecaps + ' For 50 Lakhs to 60 Lakhs.' + ' Affordable ' + finalbuildername + ' Properties For Sale in ' + citynamecaps + ' below 60 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.' });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });




        } else if (this.router.url?.indexOf('-properties-50-lakhs-to-60-lakhs-') > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Properties 50L to 60L ${citynamecaps} | Homes247`,
            `${shortBuilerName} Properties 50L to 60L in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find ${finalbuildername} properties from 50 to 60 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`,
            `Find ${shortBuilerName} properties from 50 to 60 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-50-lakhs-to-60-lakhs-in-';

          // OG
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          // Twitter
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
        } else if (this.router.url?.indexOf('-properties-60-lakhs-to-70-lakhs-') > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Properties 60L to 70L ${citynamecaps} | Homes247`,
            `${shortBuilerName} Properties 60L to 70L in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find ${finalbuildername} properties from 60 to 70 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`,
            `Find ${shortBuilerName} properties from 60 to 70 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-60-lakhs-to-70-lakhs-in-';

          // OG
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          // Twitter
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
        } else if (this.router.url?.indexOf('-properties-70-lakhs-to-80-lakhs-') > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Properties 70L to 80L ${citynamecaps} | Homes247`,
            `${shortBuilerName} Properties 70L to 80L in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find ${finalbuildername} properties from 70 to 80 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`,
            `Find ${shortBuilerName} properties from 70 to 80 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-70-lakhs-to-80-lakhs-in-';

          // OG
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          // Twitter
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
        } else if (this.router.url?.indexOf('-properties-80-lakhs-to-90-lakhs-') > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Properties 80L to 90L ${citynamecaps} | Homes247`,
            `${shortBuilerName} Properties 80L to 90L in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find ${finalbuildername} properties from 80 to 90 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`,
            `Find ${shortBuilerName} properties from 80 to 90 Lakhs in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-80-lakhs-to-90-lakhs-in-';

          // OG + Twitter same as above
        } else if (this.router.url?.indexOf('-properties-90-lakhs-to-1-crore-') > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Properties 90L to 1Cr ${citynamecaps} | Homes247`,
            `${shortBuilerName} Properties 90L to 1Cr in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find ${finalbuildername} properties from 90L to 1Cr in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`,
            `Find ${shortBuilerName} properties from 90L to 1Cr in ${citynamecaps}. Check floor plans, prices, and amenities on Homes247.in today.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-90-lakhs-to-1-crore-in-';

          // OG + Twitter same as above
        } else if (this.router.url?.indexOf('-properties-above-1-crore-in-') > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Properties Above 1Cr ${citynamecaps} | Homes247`,
            `${shortBuilerName} Properties Above 1Cr in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find premium ${finalbuildername} properties above 1 Crore in ${citynamecaps}. Check floor plans and luxury amenities on Homes247.in today.`,
            `Find premium ${shortBuilerName} properties above 1 Crore in ${citynamecaps}. Check floor plans and luxury amenities on Homes247.in today.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-above-1-crore-in-';

          // OG
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({ property: 'og:image', content: IMAGE_URL });
          this.meta.updateTag({ property: 'og:url', content: 'https://www.homes247.in' + this.router.url });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          // Twitter
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: IMAGE_URL });
        } else if (this.router.url?.indexOf(urlstructure) > -1) {

          const title = this.getSeoTitle(
            finalbuildername + ' ' + urltype + ' Properties in ' + citynamecaps,
            'Buy ' + urltype + ' Properties by ' + shortBuilerName + ' in' + citynamecaps
          )

          const discription = this.getSeoDiscription(
            'Explore ' + urltype + ' properties by ' + finalbuildername + ' in ' + citynamecaps + ' . Check prices, amenities and verified listings on Homes247.in',
            'Explore ' + urltype + ' properties by ' + shortBuilerName + ' in ' + citynamecaps + ' . Check prices, amenities and verified listings on Homes247.in',
          )



          this.titleService.setTitle(title);
          this.meta.updateTag({
            name: 'description',
            content: discription
          });
          this.titleName = '-properties-by-';



          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: discription });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: discription });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });



        } else if (this.router.url?.indexOf(urlstructure2) > -1) {
          const title = this.getSeoTitle(
            `${finalbuildername} ${urltype2} in ${citynamecaps}`,
            `${shortBuilerName} ${urltype2} in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find ${urltype2.toLowerCase()} by ${finalbuildername} in ${citynamecaps}. Check prices, amenities, and verified listings at Homes247.in.`,
            `Find ${urltype2.toLowerCase()} by ${shortBuilerName} in ${citynamecaps}. Check prices and listings at Homes247.in.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-by-';

          // ✅ OG (FIXED)
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          // ✅ Twitter (FIXED)
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({
            name: 'twitter:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });


        } else if (this.router.url?.indexOf(urlstructure3) > -1) {

          const title = this.getSeoTitle(
            `${this.bhkValue} BHK Flats by ${finalbuildername} ${citynamecaps} | Homes247.in`,
            `${this.bhkValue} BHK Flats by ${shortBuilerName} ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Explore premium ${this.bhkValue} BHK flats by ${finalbuildername} in ${citynamecaps}. Check prices, amenities & find your dream home on Homes247 today.`,
            `Explore premium ${this.bhkValue} BHK flats by ${shortBuilerName} in ${citynamecaps}. Check prices, amenities & find your dream home on Homes247 today.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({
            name: 'description',
            content: description
          });
          this.titleName = '-properties-by-';

          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        } else if (this.router.url?.indexOf(urlstructure33) > -1) {

          const title = this.getSeoTitle(
            `${this.bhkValue} BHK Villas by ${finalbuildername} ${citynamecaps} | Homes247.in`,
            `${this.bhkValue} BHK Villas by ${shortBuilerName} ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Explore premium ${this.bhkValue} BHK villas by ${finalbuildername} in ${citynamecaps}. Check prices, amenities & find your dream home on Homes247 today.`,
            `Explore premium ${this.bhkValue} BHK villas by ${shortBuilerName} in ${citynamecaps}. Check prices, amenities & find your dream home on Homes247 today.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({
            name: 'description',
            content: description
          });
          this.titleName = '-properties-by-';

          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        } else if (this.router.url?.indexOf('/builder/') > -1) {
          
          // if (metatags[0].builderseo_title == "") {
          //   this.titleService.setTitle(finalbuildername + " in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps);
          //   this.meta.updateTag({ name: 'description', content: "Explore the best projects from " + finalbuildername + " at Homes247.in | Buy Apartments, Flats and Villas from " + finalbuildername + " in the prime locations of " + citynamecaps });




          //   this.meta.updateTag({ property: 'og:title', content: finalbuildername + " in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps });
          //   this.meta.updateTag({ property: 'og:description', content: "Explore the best projects from " + finalbuildername + " at Homes247.in | Buy Apartments, Flats and Villas from " + finalbuildername + " in the prime locations of " + citynamecaps });
          //   this.meta.updateTag({
          //     property: 'og:image',
          //     content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          //   });
          //   this.meta.updateTag({
          //     property: 'og:url',
          //     content: 'https://www.homes247.in' + this.router.url
          //   });
          //   this.meta.updateTag({ property: 'og:type', content: 'website' });

          //   this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          //   this.meta.updateTag({ name: 'twitter:title', content: finalbuildername + " in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps });
          //   this.meta.updateTag({ name: 'twitter:description', content: "Explore the best projects from " + finalbuildername + " at Homes247.in | Buy Apartments, Flats and Villas from " + finalbuildername + " in the prime locations of " + citynamecaps });
          //   this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });



          // } else if (metatags[0].builderseo_title == null) {
          //   this.titleService.setTitle(finalbuildername + " in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps);
          //   this.meta.updateTag({ name: 'description', content: "Explore the best projects from " + finalbuildername + " at Homes247.in | Buy Apartments, Flats and Villas from " + finalbuildername + " in the prime locations of " + citynamecaps });



          //   this.meta.updateTag({ property: 'og:title', content: finalbuildername + " in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps });
          //   this.meta.updateTag({ property: 'og:description', content: "Explore the best projects from " + finalbuildername + " at Homes247.in | Buy Apartments, Flats and Villas from " + finalbuildername + " in the prime locations of " + citynamecaps });
          //   this.meta.updateTag({
          //     property: 'og:image',
          //     content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          //   });
          //   this.meta.updateTag({
          //     property: 'og:url',
          //     content: 'https://www.homes247.in' + this.router.url
          //   });
          //   this.meta.updateTag({ property: 'og:type', content: 'website' });

          //   this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          //   this.meta.updateTag({ name: 'twitter:title', content: finalbuildername + " in " + citynamecaps + " | " + finalbuildername + " Properties in " + citynamecaps });
          //   this.meta.updateTag({ name: 'twitter:description', content: "Explore the best projects from " + finalbuildername + " at Homes247.in | Buy Apartments, Flats and Villas from " + finalbuildername + " in the prime locations of " + citynamecaps });
          //   this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });




          // } else {
          //   this.titleService.setTitle(metatags[0].builderseo_title);
          //   this.meta.updateTag({ name: 'description', content: metatags[0].builderseo_descrp });



          //   this.meta.updateTag({ property: 'og:title', content: metatags[0].builderseo_title });
          //   this.meta.updateTag({ property: 'og:description', content: metatags[0].builderseo_descrp });
          //   this.meta.updateTag({
          //     property: 'og:image',
          //     content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          //   });
          //   this.meta.updateTag({
          //     property: 'og:url',
          //     content: 'https://www.homes247.in' + this.router.url
          //   });
          //   this.meta.updateTag({ property: 'og:type', content: 'website' });

          //   this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          //   this.meta.updateTag({ name: 'twitter:title', content: metatags[0].builderseo_title });
          //   this.meta.updateTag({ name: 'twitter:description', content: metatags[0].builderseo_descrp });
          //   this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });



          // }

          const title = this.getSeoTitle(
            `${finalbuildername} Projects ${citynamecaps} | Homes247`,
            `Explore ${shortBuilerName} Projects in ${citynamecaps} on Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Explore premium residential projects by ${finalbuildername} in ${citynamecaps}. Find luxury apartments, ready-to-move flats & new launches.`,
            `Explore premium residential projects by ${shortBuilerName} in ${citynamecaps}. Find luxury apartments, ready-to-move flats & new launches.`
          );

          this.titleService.setTitle(title);

          this.meta.updateTag({ name: 'description', content: description });
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        } else if (this.router.url?.indexOf(urlstructure4) > -1) {


          const title = this.getSeoTitle(
            'Buy ' + finalbuildername + ' Affordable Properties in ' + citynamecaps + '',
            'Affordable Properties by ' + shortBuilerName + 'in ' + citynamecaps + '| Homes247.in'
          )

          const discription = this.getSeoDiscription(
            'Explore affordable properties by ' + finalbuildername + ' in ' + citynamecaps + '. Check prices, amenities, locations & verified listings on Homes247.',
            'Explore affordable properties by ' + shortBuilerName + ' in ' + citynamecaps + '. Check prices, amenities, locations & verified listings on Homes247.',
          )



          this.titleService.setTitle(title);
          this.meta.updateTag({
            name: 'description',
            content: discription
          });
          this.titleName = '-properties-by-';


          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: discription });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: discription });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });



        } else if (this.router.url?.indexOf(urlstructure5) > -1) {
          const title = this.getSeoTitle(
            `${finalbuildername} Luxury Properties in ${citynamecaps} | Homes247.in`,
            `${shortBuilerName} Luxury Properties in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Browse the finest ${finalbuildername} luxury properties in ${citynamecaps}. Premium designs and elite lifestyle options await at Homes247.in.`,
            `Explore luxury properties by ${shortBuilerName}. Discover premium homes on Homes247.in.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-by-';

          // ✅ OG
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          // ✅ Twitter
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({
            name: 'twitter:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });

        } else if (this.router.url?.indexOf(urlstructure6) > -1) {


          const title = this.getSeoTitle(
            `Buy ${finalbuildername} Affordable Apartments ${citynamecaps}`,
            `Affordable Apartments by ${shortBuilerName} in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Explore affordable apartments by ${finalbuildername} in ${citynamecaps}. Check prices, amenities, locations & verified listings on Homes247.`,
            `Explore affordable apartments by ${shortBuilerName} in ${citynamecaps}. Check prices, amenities, locations & verified listings on Homes247.`
          );




          this.titleService.setTitle(title);
          this.meta.updateTag({
            name: 'description',
            content: description
          });
          this.titleName = '-properties-by-';


          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });


        } else if (this.router.url?.indexOf(urlstructure7) > -1) {


          const title = this.getSeoTitle(
            `Buy ${finalbuildername} Affordable Villas ${citynamecaps} | Homes247.in`,
            `Affordable Villas by ${shortBuilerName} in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Explore affordable villas by ${finalbuildername} in ${citynamecaps}. Check prices, luxury amenities and verified listings on Homes247.in.`,
            `Explore affordable villas by ${shortBuilerName} in ${citynamecaps}. Check prices, luxury amenities and verified listings on Homes247.in.`
          );



          this.titleService.setTitle(title);
          this.meta.updateTag({
            name: 'description',
            content: description
          });
          this.titleName = '-properties-by-';


          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: description });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: description });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });


        } else if (this.router.url?.indexOf(urlstructure8) > -1) {


          const title = this.getSeoTitle(
            finalbuildername + ' Luxury Apartments ' + citynamecaps + ' | Homes247',
            'Luxury Apartments by ' + shortBuilerName + 'in ' + citynamecaps + ' | Homes247.in'
          )

          const discription = this.getSeoDiscription(
            'Explore luxury apartments by ' + finalbuildername + ' in ' + citynamecaps + '. Check prices, amenities and verified listings on Homes247.in today.',
            'Explore luxury apartments by ' + shortBuilerName + ' in ' + citynamecaps + '. Check prices, amenities and verified listings on Homes247.in today.'
          )



          this.titleService.setTitle(title);
          this.meta.updateTag({
            name: 'description',
            content: discription
          });
          this.titleName = '-properties-by-';



          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: discription });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: discription });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });



        } else if (this.router.url?.indexOf(urlstructure9) > -1) {


          const title = this.getSeoTitle(
            finalbuildername + ' Luxury Villa in ' + citynamecaps + ' | Homes247',
            'Luxury Villa by ' + shortBuilerName + 'in ' + citynamecaps + ' | Homes247.in'
          )

          const discription = this.getSeoDiscription(
            'Explore luxury villa by ' + finalbuildername + ' in ' + citynamecaps + '. Check prices, amenities and verified listings on Homes247.in today.',
            'Explore luxury villa by ' + shortBuilerName + ' in ' + citynamecaps + '. Check prices, amenities and verified listings on Homes247.in today.'
          )


          this.titleService.setTitle(title);
          this.meta.updateTag({
            name: 'description',
            content: discription
          });
          this.titleName = '-properties-by-';



          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: discription });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: title });
          this.meta.updateTag({ name: 'twitter:description', content: discription });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });



        } else if (this.router.url?.indexOf(urlstructure10) > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Apartments in ${citynamecaps} | Homes247.in`,
            `${shortBuilerName} Apartments in ${citynamecaps} | Homes247.in`
          );
          
          const description = this.getSeoDiscription(
            `Find premium apartments by ${finalbuildername} in ${citynamecaps}. Explore top floor plans, prices, and verified listings at Homes247.in.`,
            `Find apartments by ${shortBuilerName}. Check prices and listings on Homes247.in.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-by-';

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
        } else if (this.router.url?.indexOf(urlstructure11) > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Villas in ${citynamecaps} | Homes247.in`,
            `${shortBuilerName} Villas in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find premium villas by ${finalbuildername} in ${citynamecaps}. Explore spacious homes, amenities, and verified listings at Homes247.in.`,
            `Find villas by ${shortBuilerName}. Check prices and listings on Homes247.in.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-by-';

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
        } else if (this.router.url?.indexOf(urlstructure12) > -1) {

          const title = this.getSeoTitle(
            `${finalbuildername} Plots in ${citynamecaps} | Homes247.in`,
            `${shortBuilerName} Plots  in ${citynamecaps} | Homes247.in`
          );

          const description = this.getSeoDiscription(
            `Find residential plots by ${finalbuildername} in ${citynamecaps}. Explore land options, pricing, and verified listings at Homes247.in.`,
            `Find plots by ${shortBuilerName}. Check listings on Homes247.in.`
          );

          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.titleName = '-properties-by-';

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
        } else {
          this.titleService.setTitle(metatags[0].builderseo_title);
          this.meta.updateTag({ name: 'description', content: metatags[0].builderseo_descrp });

          this.meta.updateTag({ property: 'og:title', content: metatags[0].builderseo_title });
          this.meta.updateTag({ property: 'og:description', content: metatags[0].builderseo_descrp });
          this.meta.updateTag({
            property: 'og:image',
            content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'
          });
          this.meta.updateTag({
            property: 'og:url',
            content: 'https://www.homes247.in' + this.router.url
          });
          this.meta.updateTag({ property: 'og:type', content: 'website' });

          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: metatags[0].builderseo_title });
          this.meta.updateTag({ name: 'twitter:description', content: metatags[0].builderseo_descrp });
          this.meta.updateTag({ name: 'twitter:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp' });

        }

        this.Service.createLinkForCanonicalURL();
        this.builderdescription = metatags[0].builder_description;
        if (this.builderdescription == '') {
          this.description = false;
        } else {
          this.description = true;
        }
        // )
        if (this.router.url?.indexOf('/builder/') > -1) {
        } else if (this.router.url?.indexOf('/bbc/' + this.builder_seo + this.titleName + this.city_seo + '-' + this.builderid + '') > -1) {
        } else if (this.router.url?.indexOf('' + urlstructure + this.builder_seo + '-' + this.city_seo + '-' + this.builderid + '') > -1) {
        } else if (this.router.url?.indexOf('' + urlstructure2 + this.builder_seo + '-' + this.city_seo + '-' + this.builderid + '') > -1) {
        } else if (this.router.url?.indexOf('' + urlstructure3 + this.builder_seo + '-' + this.city_seo + '-' + this.builderid + '') > -1) {
        } else if (this.router.url?.indexOf('' + urlstructure33 + this.builder_seo + '-' + this.city_seo + '-' + this.builderid + '') > -1) {
        } else if (this.router.url?.indexOf(urlstructure4) > -1) {
        } else if (this.router.url?.indexOf(urlstructure5) > -1) {
        } else if (this.router.url?.indexOf(urlstructure6) > -1) {
        } else if (this.router.url?.indexOf(urlstructure7) > -1) {
        } else if (this.router.url?.indexOf(urlstructure8) > -1) {
        } else if (this.router.url?.indexOf(urlstructure9) > -1) {
        } else if (this.router.url?.indexOf(urlstructure10) > -1) {
        } else if (this.router.url?.indexOf(urlstructure11) > -1) {
        } else if (this.router.url?.indexOf(urlstructure12) > -1) {
        } else {
          // this.router.navigate(['/404'], { skipLocationChange: true }) 
          this.responseService.set301Status(this.builder_seo, this.city_seo, this.builderid);

        }
        // 
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
    // let node8: any = document.createElement('link');
    // node8.setAttribute('href','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    // node8.rel = 'stylesheet';
    // node8.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node8);
    // let node4: any = document.createElement('link');
    // node4.setAttribute('data-lazy-method','interaction');
    // node4.setAttribute('data-lazy-attributes','href');
    // node4.setAttribute('data-lazy-href','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    // node4.rel = 'stylesheet';
    // node4.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node4);
  }



  builderlocality: any;
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

    // import('../builder-section-two/builder-section-two.module').then(mod => mod.BuilderSectionTwoModule).then(BuilderSectionTwoModule => {
    //   this.BuilderSectionTwoComponent = BuilderSectionTwoModule.components['lazy'];
    // });

    import('../builder-section-two/builder-section-two')
      .then(c => {
        this.BuilderSectionTwoComponent = c.BuilderSectionTwo;
      });

    // if (this.componentloads == false) {
    //   this.componentloads = true;
    //   import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule => {
    //     this.enquiryFormComponent = enquiryFormModule.components['lazy'];
    //     $('.modal-login').css('z-index', '99999');
    //   });
    // }
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


    this.affordablePropDetails()
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
    // if (this.componentloads == false) {
    //   this.componentloads = true;
    //   import('../builder4/builder4.module').then(mod => mod.Builder4Module).then(Builder4Module => {
    //     this.Builder4Component = Builder4Module.components['lazy'];
    //   });
    // }
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

  getcity() {
    // this.otploader = true;
    this.showLoader = true
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
      var builderiid = this.router.url.split('-').pop().match(/[0-9]+/);
      this.builderid = builderiid;
      if (this.router.url?.indexOf('/btbc') > -1) {
        this.routeSub = this.activeroute.params.subscribe(params => {
          var url = params['bhk-flats-by-:buildername-:city-:builderid'];
          var bhkValue = url.charAt(0);
          this.bhkValue = bhkValue;
          var builderiid = this.router.url.split('-').pop().match(/[0-9]+/);
          this.builderid = builderiid;
        })
      } else { }



      var paramss = {
        buildid: this.builderid,
        Cityid: this.cityId
      };
      // debugger
      this.Service.getbuildermeta(this.cityname, paramss).subscribe(metatag => {
        console.log(metatag);
        let metatags = metatag['Builderseo'];
        var builder_seo = metatags?.[0]?.builderInfo_name ;
        this.builder_seo = builder_seo.toLowerCase().replace(/\s+/g, '-');
        this.builder = builder_seo;


        if (this.router.url?.indexOf('/builder/') > -1) {
          var cityname = params['cityname'];
          this.cityname = params['cityname'];
          var lasturl = params['buildername-:builderid'];
          this.urlparam = lasturl;
          var builderidid = lasturl.split('-').pop().match(/[0-9]+/);
          var removeurlid = lasturl.replace('-' + builderidid, '');
          this.builderid = builderidid;
          var removeurlhyphen = removeurlid.replace(/-/g, ' ');
          var builder_name = removeurlhyphen.toLocaleUpperCase();
          this.builder = builder_name;
          var buildname = builder_name;

          this.Builderbudget = false;
          this.BuilderMain = true;
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
        }
        else if (this.router.url?.indexOf('-properties-under-30-lakhs-in-') > -1) {
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '1';
          this.maxbudget_IDPK = '4';
          this.Builderbudget = true;
          this.BuilderMain = false;
          this.secondorytitle = this.builder + " Properties Under 30 Lakhs in " + this.cityname;
          this.broadmatch = '30 Lakhs';
          // this.urlmatch = '/fbc/flats-for-30-lakhs-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-');
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " |Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": this.builder + " Properties Under 30 Lakhs in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('-properties-30-lakhs-to-40-lakhs-in-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '5';
          this.maxbudget_IDPK = '6';
          this.Builderbudget = true;
          this.BuilderMain = false;
          this.secondorytitle = this.builder + " Properties For 30 Lakhs to 40 Lakhs in " + this.cityname;
          this.broadmatch = '30 Lakhs - 40 Lakhs';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-30-lakhs-to-40-lakhs';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "30 Lakhs to 40 Lakhs " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('-properties-40-lakhs-to-50-lakhs-in-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '6';
          this.maxbudget_IDPK = '7';
          this.Builderbudget = true;
          this.BuilderMain = false;
          // this.titleName = '-properties-40-lakhs-to-50-lakhs-in-';
          this.secondorytitle = this.builder + " Properties For 34 Lakhs to 50 Lakhs in " + this.cityname;
          this.broadmatch = '40 Lakhs - 50 Lakhs';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-40-lakhs-to-50-lakhs';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "40 Lakhs to 50 Lakhs " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('-properties-50-lakhs-to-60-lakhs-in-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '7';
          this.maxbudget_IDPK = '8';
          this.Builderbudget = true;
          this.BuilderMain = false;
          // this.titleName = '-properties-50-lakhs-to-60-lakhs-in-';
          this.secondorytitle = this.builder + " Properties For 50 Lakhs to 60 Lakhs in " + this.cityname;
          this.broadmatch = '50 Lakhs - 60 Lakhs';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-50-lakhs-to-60-lakhs';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "50 Lakhs to 60 Lakhs " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('-properties-60-lakhs-to-70-lakhs-in-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '8';
          this.maxbudget_IDPK = '9';
          this.Builderbudget = true;
          this.BuilderMain = false;
          // this.titleName = '-properties-60-lakhs-to-70-lakhs-in-';
          this.secondorytitle = this.builder + " Properties For 60 Lakhs to 70 Lakhs in " + this.cityname;
          this.broadmatch = '60 Lakhs - 70 Lakhs';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-60-lakhs-to-70-lakhs';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "60 Lakhs to 70 Lakhs " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('-properties-70-lakhs-to-80-lakhs-in-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '9';
          this.maxbudget_IDPK = '10';
          this.Builderbudget = true;
          this.BuilderMain = false;
          // this.titleName = '-properties-70-lakhs-to-80-lakhs-in-';
          // this.secondorytitle = '70 Lakhs to 80 Lakhs Flats in' + ' ' + this.cityname;
          this.secondorytitle = this.builder + " Properties For 70 Lakhs to 80 Lakhs in " + this.cityname;
          this.broadmatch = '70 Lakhs - 80 Lakhs';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace() + '-for-sale-70-lakhs-to-80-lakhs';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "70 Lakhs to 80 Lakhs " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('-properties-80-lakhs-to-90-lakhs-in-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '10';
          this.maxbudget_IDPK = '11';
          this.Builderbudget = true;
          this.BuilderMain = false;
          // this.titleName = '-properties-80-lakhs-to-90-lakhs-in-';
          // this.secondorytitle = '80 Lakhs to 90 Lakhs Flats in' + ' ' + this.cityname;
          this.secondorytitle = this.builder + " Properties For 80 Lakhs to 90 Lakhs in " + this.cityname;
          this.broadmatch = '80 Lakhs - 90 Lakhs';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-80-lakhs-to-90-lakhs';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "80 Lakhs to 90 Lakhs " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('-properties-90-lakhs-to-1-crore-in-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';

          this.minbudget_IDPK = '11';
          this.maxbudget_IDPK = '12';
          this.Builderbudget = true;
          this.BuilderMain = false;

          // this.titleName = '-properties-90-lakhs-to-1-crore-in-';
          // this.secondorytitle = '90 Lakhs to 1 Crore Flats in' + ' ' + this.cityname;
          this.secondorytitle = 'Above 1 Crore' + this.builder + 'Properties in' + this.cityname;
          this.broadmatch = '90 Lakhs - 1 Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]

          }

          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);

        }
        else if (this.router.url?.indexOf('-properties-above-1-crore-in-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '12';
          this.maxbudget_IDPK = '24';
          this.Builderbudget = true;
          // this.BuilderMain = false;
          this.secondorytitle = this.builder + " Properties Above 1 Crore in " + this.cityname;
          this.broadmatch = 'Above-1-Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('spbc/ready-to-move-properties-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // this.projecttype = ['50401'];
          this.projectStatus = ['50307']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.spbc = true;
          this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
          this.broadmatch = 'ready-to-move';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('spbc/new-launch-properties-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // this.projecttype = ['50401'];
          this.projectStatus = ['50310']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.spbc = true;
          this.secondorytitle = this.builder + " New Launch Properties in " + this.cityname;
          this.broadmatch = 'new-launch';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('spbc/up-coming-properties-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // this.projecttype = ['50401'];
          this.projectStatus = ['50308']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.spbc = true;
          this.secondorytitle = this.builder + " Up Coming Properties in " + this.cityname;
          this.broadmatch = 'up-coming';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('spbc/under-construction-properties-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // this.projecttype = ['50401'];
          this.projectStatus = ['50309']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.spbc = true;
          this.secondorytitle = this.builder + " Under Construction Properties in " + this.cityname;
          this.broadmatch = 'under-construction';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }

        else if (this.router.url?.indexOf('stbc/ready-to-move-apartments-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          this.projectStatus = ['50307']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.stbc_apartments = true;
          this.secondorytitle = this.builder + " Ready to Move Apartments in " + this.cityname;
          this.broadmatch = 'ready-to-move';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('stbc/new-launch-apartments-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          this.projectStatus = ['50310']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          // this.spbc = false;
          this.stbc_apartments = true;
          this.secondorytitle = this.builder + " New Launch Apartments in " + this.cityname;
          this.broadmatch = 'new-launch';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('stbc/up-coming-apartments-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          this.projectStatus = ['50308']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          this.stbc_apartments = true;
          this.secondorytitle = this.builder + " Up Coming Apartments in " + this.cityname;
          this.broadmatch = 'up-coming';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('stbc/under-construction-apartments-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50401'];
          this.projectStatus = ['50309']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          this.stbc_apartments = true;
          this.secondorytitle = this.builder + " Under Construction Apartments in " + this.cityname;
          this.broadmatch = 'under-construction';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }

        else if (this.router.url?.indexOf('stbc/ready-to-move-villas-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50402'];
          this.projectStatus = ['50307']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.stbc_villas = true;
          this.secondorytitle = this.builder + " Ready to Move Villas in " + this.cityname;

          this.broadmatch = 'ready-to-move';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('stbc/new-launch-villas-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50402'];
          this.projectStatus = ['50310']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.stbc_villas = true;
          this.secondorytitle = this.builder + " New Launch Villas in " + this.cityname;

          this.broadmatch = 'new-launch';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('stbc/up-coming-villas-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50402'];
          this.projectStatus = ['50308']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.stbc_villas = true;
          this.secondorytitle = this.builder + " Up Coming Villas in " + this.cityname;

          this.broadmatch = 'up-coming';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('stbc/under-construction-villas-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          this.projecttype = ['50402'];
          this.projectStatus = ['50309']
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.stbc_villas = true;
          this.secondorytitle = this.builder + " Under Construction Villas in " + this.cityname;

          this.broadmatch = 'under-construction';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }

        else if (this.router.url?.indexOf('btbc/' + this.bhkValue + '-bhk-flats-by-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // 
          this.projecttype = ['50401'];
          // this.noOfBedrooms = this.bhkValue;
          this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          this.btbc_flats = true;
          this.secondorytitle = this.bhkValue + ' BHK ' + this.builder + " Flats For Sale in " + this.cityname;
          this.broadmatch = 'btbc/' + this.bhkValue + '-bhk-flats-by';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('btbc/' + this.bhkValue + '-bhk-villas-by-') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // 
          this.projecttype = ['50402'];
          // this.noOfBedrooms = this.bhkValue;
          this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          // this.minPrice = '11';
          // this.maxPrice = '12';
          this.btbc_villas = true;

          this.broadmatch = 'btbc/' + this.bhkValue + '-bhk-villas-by';
          this.secondorytitle = this.bhkValue + ' BHK ' + this.builder + " Villas For Sale in " + this.cityname;

          // this.broadmatch = '90 Lakhs - 1 Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('bapc') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // 
          this.projecttype = ['50401,50402'];
          // this.projecttype = ['50402'];
          // this.noOfBedrooms = this.bhkValue;
          // this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '1';
          this.maxbudget_IDPK = '6';
          this.aff_lux = true;

          this.broadmatch = 'affordable';
          this.secondorytitle = 'Affordable ' + this.builder + ' Properties in ' + this.cityname;

          // this.broadmatch = '90 Lakhs - 1 Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('blpc') > -1) {
        
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // 
          this.projecttype = ['50401'];
          // this.projecttype = ['50402'];
          // this.noOfBedrooms = this.bhkValue;
          // this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '7';
          this.maxbudget_IDPK = '24';
          this.aff_lux = true;


          this.broadmatch = 'luxury';

          this.secondorytitle = 'Luxury ' + this.builder + ' Properties in ' + this.cityname;


          // this.broadmatch = '90 Lakhs - 1 Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('batc/' + this.builder_seo + '-affordable-apartments-in') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // 
          this.projecttype = ['50401'];
          // this.projecttype = ['50402'];
          // this.noOfBedrooms = this.bhkValue;
          // this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '1';
          this.maxbudget_IDPK = '6';
          this.aff_lux2 = true;

          this.broadmatch = 'affordable';
          this.secondorytitle = 'Affordable ' + this.builder + ' Apartments in ' + this.cityname;

          // this.broadmatch = '90 Lakhs - 1 Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('batc/' + this.builder_seo + '-affordable-villas-in') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // 
          this.projecttype = ['50402'];
          // this.projecttype = ['50402'];
          // this.noOfBedrooms = this.bhkValue;
          // this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '1';
          this.maxbudget_IDPK = '6';
          this.aff_lux2 = true;

          this.broadmatch = 'affordable';
          this.secondorytitle = 'Affordable ' + this.builder + ' Villas in ' + this.cityname;

          // this.broadmatch = '90 Lakhs - 1 Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('bltc/' + this.builder_seo + '-luxury-apartments-in') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // 
          this.projecttype = ['50401'];
          // this.projecttype = ['50402'];
          // this.noOfBedrooms = this.bhkValue;
          // this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '7';
          this.maxbudget_IDPK = '24';
          this.aff_lux3 = true;

          this.broadmatch = 'affordable';
          this.secondorytitle = 'Luxury ' + this.builder + ' Apartments in ' + this.cityname;

          // this.broadmatch = '90 Lakhs - 1 Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('bltc/' + this.builder_seo + '-luxury-villas-in') > -1) {
          // if (urlendpoint == addhyphens) {
          // } else {
          //   this.router.navigate(['/404'], { skipLocationChange: true });
          // }
          // 
          this.projecttype = ['50402'];
          // this.projecttype = ['50402'];
          // this.noOfBedrooms = this.bhkValue;
          // this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '7';
          this.maxbudget_IDPK = '24';
          this.aff_lux3 = true;

          this.broadmatch = 'affordable';
          this.secondorytitle = 'Luxury ' + this.builder + ' Villas in ' + this.cityname;

          // this.broadmatch = '90 Lakhs - 1 Crore';
          // this.urlmatch = '/fbc/flats-in-' + this.cityname.toLowerCase().replace(/\s+/g, '-') + '-for-sale-90-lakhs-to-1-crore';
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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('/brtc/' + this.builder_seo + '-apartments-in-') > -1) {
          // );
          this.projecttype = ['50401'];
          // this.projectStatus = ['50307']
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.brtc = true;
          this.secondorytitle = this.builder + " Apartments in " + this.cityname;
          this.broadmatch = 'apartments';

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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('/brtc/' + this.builder_seo + '-villas-in-') > -1) {

          this.projecttype = ['50402'];
          // this.projectStatus = ['50307']
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.brtc = true;
          this.secondorytitle = this.builder + " Villas in " + this.cityname;
          this.broadmatch = 'villas';

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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else if (this.router.url?.indexOf('/brtc/' + this.builder_seo + '-plots-in-') > -1) {

          this.projecttype = ['50403'];
          // this.projectStatus = ['50307']
          // this.minPrice = '11';
          // this.maxPrice = '12';
          // this.Builderbudget = false;
          // this.BuilderMain = false;
          this.brtc = true;
          this.secondorytitle = this.builder + " Plots in " + this.cityname;
          this.broadmatch = 'plots';

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
                "item": "https://www.homes247.in/real-estate-in-" + this.cityname.toLowerCase().replace(/\s+/g, '-') + ""
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.builder + " in " + this.cityname + " | " + this.builder + " | Homes247.in",
                "item": "https://www.homes247.in/" + this.cityname.toLowerCase().replace(/\s+/g, '-') + "/builder/" + this.builder.toLowerCase().replace(/\s+/g, '-') + "-" + this.builderid
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "90 Lakhs to 1 Crore " + this.builder + " Properties in " + this.cityname + " | Homes247.in",
                "item": "https://www.homes247.in" + this.router.url
              }]
          }
          this.breadcrumbLD = this.getSafeHTML(breadcrumbjson);
        }
        else {
        }

        var builder_loc = {
          cityid: this.cityid,
          builderId: this.builderid,
          statusid: this.projectStatus,
          proptypeid: this.projecttype,
          maxprice: this.maxbudget_IDPK,
          minprice: this.minbudget_IDPK,
          bedroom: this.noOfBedrooms,
        }
        this.Service.get_builder_locality(builder_loc).subscribe(Builderlocality => {
          let builderlocality = Builderlocality['builderlocality'];
          this.builderlocality = builderlocality;
        });
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
        var buildname = builder_name;
        // var buildid = this.builderid;
        if (this.router.url?.indexOf('/builder/') > -1) {
          this.minbudget_IDPK = this.Filter.min;
          this.maxbudget_IDPK = this.Filter.max;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.Filter.proptypeid;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else if (this.router.url?.indexOf('spbc') > -1) {
          this.minbudget_IDPK = this.Filter.min;
          this.maxbudget_IDPK = this.Filter.max;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.projectStatus;
          this.projecttype = this.Filter.proptypeid;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else if (this.router.url?.indexOf('stbc') > -1) {
          this.minbudget_IDPK = this.Filter.min;
          this.maxbudget_IDPK = this.Filter.max;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.projectStatus;
          this.projecttype = this.projecttype;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else if (this.router.url?.indexOf('btbc') > -1) {
          this.minbudget_IDPK = this.Filter.min;
          this.maxbudget_IDPK = this.Filter.max;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.projecttype;
          this.noOfBedrooms = this.noOfBedrooms;
        } else if (this.router.url?.indexOf('bapc') > -1) {
          this.minbudget_IDPK = this.minbudget_IDPK;
          this.maxbudget_IDPK = this.maxbudget_IDPK;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.projecttype;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else if (this.router.url?.indexOf('blpc') > -1) {
          this.minbudget_IDPK = this.minbudget_IDPK;
          this.maxbudget_IDPK = this.maxbudget_IDPK;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.projecttype;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else if (this.router.url?.indexOf('batc') > -1) {
          this.minbudget_IDPK = this.minbudget_IDPK;
          this.maxbudget_IDPK = this.maxbudget_IDPK;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.projecttype;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else if (this.router.url?.indexOf('bltc') > -1) {
          this.minbudget_IDPK = this.minbudget_IDPK;
          this.maxbudget_IDPK = this.maxbudget_IDPK;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.projecttype;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else if (this.router.url?.indexOf('brtc') > -1) {
          this.minbudget_IDPK = this.Filter.min;
          this.maxbudget_IDPK = this.Filter.max;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.projecttype;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else if (this.router.url?.indexOf('bbc') > -1) {
          this.minbudget_IDPK = this.minbudget_IDPK;
          this.maxbudget_IDPK = this.maxbudget_IDPK;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.Filter.proptypeid;
          this.noOfBedrooms = this.Filter.Bedrooms;
        } else {
          this.minbudget_IDPK = this.Filter.min;
          this.maxbudget_IDPK = this.Filter.max;
          var pos = this.Filter.possission;
          var loc = this.Filter.servicelocality;
          this.statusid = this.Filter.statusid
          this.projecttype = this.Filter.proptypeid;
          this.noOfBedrooms = this.Filter.Bedrooms;
        }

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
          localityname: loc,
          statusid: this.statusid,
          proptypeid: this.projecttype,
          userId: this.UserId,
        };

        // 


        // sam
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
        // sam

        this.Service.getprojectscount(this.city, param).subscribe(countprojects => {
          // 
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
          if (this.projectcount <= 0) {
            // this.showLoader = false;
            this.zeroprojects = true;
            // this.otploader = false;

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
              "item": "https://www.homes247.in/real-estate-in-" + this.city.toString().toLowerCase().replace(/\s+/g, '-') + ""
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Properties for Sale in " + this.cityname + "",
              "item": "https://www.homes247.in/" + this.city.toString().toLowerCase().replace(/\s+/g, '-') + "/property-sale"
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
          for (let i = 0; i < this.localitypropertiesstructureddata?.length; i++) {
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

          for (let i = 0; i < this.localitypropertiesstructureddata?.length; i++) {
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

        for (let i = 0; i < this.localitypropertiesstructureddata?.length; i++) {
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

        for (let i = 0; i < this.localitypropertiesstructureddata?.length; i++) {
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
            "description":"Explore the best projects from ${this.builder} at Homes247.in| Buy Apartments, Plots and Villas from ${this.builder} in the prime locations of ${this.city}| Get Best Deals.",
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
            "description":${this.builder} Properties for Sale in ${this.city} for 30 Lahks . Affordable ${this.builder} Properties For Sale in ${this.city} below 30 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in.",
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
        "description":"${this.builder} Properties for Sale in ${this.city} For 30 Lakhs to 40 Lakhs. Affordable ${this.builder} Properties For Sale in ${this.city} below 40 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in."
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
            "description":"${this.builder} Properties for Sale in ${this.city} For 40 Lakhs to 50 Lakhs. Affordable ${this.builder} Properties For Sale in ${this.city} below 50 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in."
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
            "description":"${this.builder} Properties for Sale in ${this.city} For 50 Lakhs to 60 Lakhs. Affordable ${this.builder} Properties For Sale in ${this.city} below 60 Lakhs. Hurry Up and Call:+91 9164247247 or visit our website Homes247.in."
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
    if (isPlatformBrowser(this.platformId)) {
      $('#otpValidate').css('display', 'block');
    }
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

  semanticjquery() {
    // $('.ui.dropdown').dropdown({});
  }

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





  // readmore() {
  //   this.isExpanded = true;
  //   $('.banner_description').css('height', '390px');
  //   $('.about_us_banner label').css('top', '20%');
  //   $('p.banner_description').css('overflow-y', 'scroll');
  //   $('.down_arrow').css('display', 'none');
  //   $('.up_arrow').css('display', 'block');
  // }


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
      $('.banner_description').css('height', '60px');
      $('.about_us_banner label').css('top', '40%');
      $('.about_us_banner label.descrip').css('top', '28%');
      $('.banner_description').css('overflow-y', 'hidden');
      $('.down_arrow').css('display', 'block');
      $('.up_arrow').css('display', 'none');
    }
  }


  Oncompareclick() {
    this.Service.mouseenterservice2();
    this.compareShowonimg = this.compareShowonimg ? false : true;
    this.compareproparray = JSON.parse(localStorage?.getItem('ComparePropID'));
    if (this.compareproparray?.length >= 1) {
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
 private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
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
        if (this.compareproparray?.length >= 2) {
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
        if (this.compareproparray?.length == 1) {
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
        if (this.compareproparray?.length >= 2) {
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
        if (this.compareproparray?.length == 1) {
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
    if (this.compareproparray?.length == 1) {
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
    if (this.compareproparray?.length == 1) {
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
    if (userId) {
      return this.storagearr.includes(propertyID);
    } else {
      return this.storagearr.includes(propertyID);
    }
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
          url: 'https://www.homes247.in/property/' + propertydemo?.city_name.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo?.locality_name.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo?.propertyName.toLowerCase().replace(/\s+/g, '-') + '-' + propertydemo?.property_info_IDPK,
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
      propertydemo?.city_name.toLowerCase().replace(/\s+/g, '-') + '/' +
      propertydemo?.locality_name.toLowerCase().replace(/\s+/g, '-') + '/' +
      propertydemo?.propertyName.toLowerCase().replace(/\s+/g, '-') + '-' +
      propertydemo?.property_info_IDPK;

    const message = encodeURIComponent(
      `Hi, I’m interested in this property. Please share more details. ${propertyUrl}`
    );

    const shareUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(shareUrl, '_blank');
  }



  activeIndexMap: { [key: string]: number } = {};



  getSeoTitle(shortTitle: string, longTitle: string): string {
    let title = shortTitle?.length <= 60 ? shortTitle : longTitle;
    return title;
  }

  getSeoDiscription(shortDisc: string, longDisc: string): string {
    let discription = shortDisc?.length <= 158 ? shortDisc : longDisc;
    return discription;
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

   imageErrorMap: { [key: number]: boolean } = {};
  onImgError(event: any, id: number) {
    // hide broken image instantly
    event.target.style.display = 'none';
    // trigger Angular condition
    this.imageErrorMap[id] = true;
  }


}
