
import { SafeStorageService } from '../safe-storage.service';
// Swal lazy-loaded
import { CarouselModule, OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { cleanUrlPipe, OrderByPipe2, MyFilterunique2, ReplaceLineBreaksany } from '../mainpipe-pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { City, minmax } from '../builder-new/builder-new-interface';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

declare var $: any;


@Component({
  selector: 'app-builder-section-two',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, cleanUrlPipe, NgxSkeletonLoaderModule, OrderByPipe2, MyFilterunique2, ReplaceLineBreaksany, CarouselModule],
  templateUrl: './builder-section-two.html',
  styleUrl: './builder-section-two.css',
})
export class BuilderSectionTwo implements AfterViewInit {
  @ViewChild('cancel') cancel: ElementRef;
  // @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  // @ViewChild('cd2', { static: false }) private countdown2: CountdownComponent;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  private routeSub: Subscription;
  myControl = new FormControl();
  public autoCompleteData: { [key: string]: Object }[] = [];
  // public localityproperties: { [key: string]: Object }[] = [];
  bhkValue: any;
  currenturl: any;
  // statusid: any[];


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


  constructor(public Service: DataService,
    private router: Router,
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    public cityservice: CityService,
    public Service2: DataService2,
    public Filter: FilterService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,) {
    this.window = this.doc.defaultView!;
    this.Service.mouseenterlisten2().subscribe((m: any) => {
      // this.compareShowonimg = this.compareShowonimg ? false : true;
      // this.Oncompareclick();
      this.compareShowonimg = this.compareShowonimg ? false : true;
    })
    this.Service.mouseenterlisten1().subscribe((m: any) => {
      this.getcity();
      this.loadMore();
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
  propertylists1 = [];
  propertylists2 = [];
  propertylists3 = [];
  propertylists4 = [];
  propertylists5 = [];
  propertylists6 = [];

  static buildercount: number;
  urlparam: any;
  builderid: any;
  builder: any;
  city: any;
  citynamebuilder: any;
  citybreadcrump: any;
  cityapi = new City();
  // noOfBedrooms = [];
  minbudget_IDPK: any;
  maxbudget_IDPK: any;
  possission = '';
  locality: string;
  UserId: any;
  projectcount: any;
  showLoader = false;
  zeroprojects = false;
  propertylists: any;
  cityid: any;
  newProperties = [];
  newlaunchesloader = true;
  Hidenewlaunches = true;
  localstorediv: any;
  storagearr: any;
  localstoredivSeenProjects: any;
  seenProjectsStoragearr: any;
  compareShowonimg: boolean = false;
  hideshowcompare: boolean = false;
  citybread: any;
  filterShowHide: boolean;
  IsVisibleFilter: boolean;
  projectTypeHide: boolean = true;
  localityHide: boolean = false;
  statusHide: boolean = true;
  registerForm: FormGroup;
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
  // projectStatus = [];
  // projecttype = [];
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
  maxbudget_value: any;
  propidarray = [];
  parsedarray = [];
  jsonparse = [];
  sortShowHide: boolean;
  builderdescription: any;
  description: boolean;
  offers: any;
  propertyid: any;
  Date = new Date();
  user = new Enquiry();
  bedrooms: any;
  budgets: any;
  possissions: any;
  localitys: any;
  budget_show = true;
  bud_val_show = false;
  breadcrumbLD: SafeHtml;

  cityname: any;
  cityId: any;
  buildername: any;
  cityzonelinks: any;
  maxPrice;
  minPrice;

  loaded = false;
  FooterComponent: any;
  propertyId: any;
  alertmesg: any;
  minprice = new minmax();
  maxprice = new minmax();
  modelmindata: any;
  minprice_value: any;
  maxprice_value: any;
  modeldata: any;

  property_id: any;
  propertyname: any;
  enquiry = new Enquiry();

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
  topnewapiload = true;
  topnewdivreached = false;
  Mousemovement = false;
  innerheader: any;
  luxuryproploader: boolean = true;
  sectionFirstResponce: boolean = false;
  spbc = false;
  stbc_apartments = false;
  stbc_villas = false;
  btbc_flats = false;
  btbc_villas = false;
  BuilderMain = false;
  Builderbudget = false;
  builder_seo: any;
  city_seo: any;
  titleName: any;
  broadmatch: any;
  statusid = [];
  noOfBedrooms = [];
  projectStatus = [];
  projecttype = [];
  allDataLoaded = false;
  userRentalFavList = [];
  propertyIds = [];

  ngOnInit(): void {
    this.dataloads();
    this.getcity();
    this.scripts();
    this.currenturl = this.router.url;

  }

  propertyimage: string = '';
  propertyInitialImages: string = '';
  dataloads() {
    this.propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
    this.propertyInitialImages = this.Service.imagesURLInitial + 'uploadPropertyImgs/';
  }
  getcity() {
    BuilderSectionTwo.buildercount = 29;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityname = value.cityname;
      this.cityId = value.cityid;
      // var builderid = this.router.url.split('-').pop().match(/[0-9]+/);
      this.builderid = builderid;
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
      var paramss = {
        buildid: this.builderid,
        Cityid: this.cityId
      };
      this.Service.getbuildermeta(this.cityname, paramss).subscribe(metatag => {
        let metatags = metatag['Builderseo'];
        this.builder = metatags?.[0]?.builderInfo_name ;
        var builder_seo = metatags?.[0]?.builderInfo_name ;
        this.builder_seo = builder_seo.toLowerCase().replace(/\s+/g, '-');
        if (this.router.url?.indexOf('/builder/') > -1) {
          var cityname = params['cityname'];
          this.cityname = params['cityname'];
          var lasturl = params['buildername-:builderid'];
          console.log('Last URL:', lasturl);
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
          // this.secondorytitle = this.builder + " Properties Under 30 Lakhs in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Properties For 30 Lakhs to 40 Lakhs in " + this.cityname ;
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
          // this.secondorytitle = this.builder + " Properties For 34 Lakhs to 50 Lakhs in " + this.cityname ;
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
          // this.secondorytitle = this.builder + " Properties For 50 Lakhs to 60 Lakhs in " + this.cityname ;
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
          // this.secondorytitle = this.builder + " Properties For 60 Lakhs to 70 Lakhs in " + this.cityname ;
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
          // this.secondorytitle = this.builder + " Properties For 70 Lakhs to 80 Lakhs in " + this.cityname ;
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
          // this.secondorytitle = this.builder + " Properties For 80 Lakhs to 90 Lakhs in " + this.cityname ;
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
          // this.secondorytitle = this.builder + " Properties For 90 Lakhs to 1 Crore in " + this.cityname ;
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
          // this.secondorytitle = this.builder + " Properties Above 1 Crore in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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

          // this.broadmatch = 'btbc/'+this.bhkValue+'-bhk-villas-by';
          // this.secondorytitle = this.builder + " Ready to Move Properties in " + this.cityname;
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
          // this.noOfBedrooms = this.bhkValue;
          // this.noOfBedrooms.push(this.bhkValue);
          // this.URLID = '412';
          // this.ResidenceType = 'Apartments';
          this.minbudget_IDPK = '1';
          this.maxbudget_IDPK = '6';
          // this.aff_lux = true;

          this.broadmatch = 'affordable';
          // this.secondorytitle =  'Affordable ' + this.builder + ' Properties in ' + this.cityname;

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
          // this.aff_lux = true;


          this.broadmatch = 'luxury';

          // this.secondorytitle =  'Luxury ' + this.builder + ' Properties in ' + this.cityname;


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
        else if (this.router.url?.indexOf('batc/' + this.builder_seo + '-affordable-apartments-in-') > -1) {
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
          // this.aff_lux2 = true;

          this.broadmatch = 'affordable';
          // this.secondorytitle =  'Affordable ' + this.builder + ' Properties in ' + this.cityname;

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
        else if (this.router.url?.indexOf('batc/' + this.builder_seo + '-affordable-villas-in-') > -1) {
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
          // this.aff_lux2 = true;

          this.broadmatch = 'affordable';
          // this.secondorytitle =  'Affordable ' + this.builder + ' Properties in ' + this.cityname;

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
          // this.aff_lux3 = true;

          this.broadmatch = 'affordable';
          // this.secondorytitle =  'Affordable ' + this.builder + ' Properties in ' + this.cityname;

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
          // this.aff_lux3 = true;

          this.broadmatch = 'affordable';
          // this.secondorytitle =  'Affordable ' + this.builder + ' Properties in ' + this.cityname;

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
          // this.brtc = true;
          // this.secondorytitle = this.builder + " Apartments in " + this.cityname;
          this.broadmatch = 'ready-to-move';

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
          // this.brtc = true;
          // this.secondorytitle = this.builder + " Villas in " + this.cityname;
          this.broadmatch = 'ready-to-move';

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
          // this.brtc = true;
          // this.secondorytitle = this.builder + " Plots in " + this.cityname;
          this.broadmatch = 'ready-to-move';

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
          // this.router.navigate(['/404'], { skipLocationChange: true });
        }


        // if (this.router.url?.indexOf('/builder/') > -1) {
        // }else{
        //   if(this.router.url?.indexOf('/bbc/'+ this.builder_seo + this.titleName + this.city_seo +'-'+ this.builderid +'') > -1) {
        //   }else{
        //     this.router.navigate(['/404'], { skipLocationChange: true });
        //   }
        // }

        String.prototype.toLocaleUpperCase = function () {
          return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        };
        var value = this.cityservice.cityfinder(this.router.url);
        this.cityname = value.cityname.replace('-', ' ');
        this.cityId = value.cityid;
        // var builder_name = removeurlhyphen.toLocaleUpperCase();
        // this.builder = builder_name;
        var capsname = this.cityname.toLocaleUpperCase();
        this.city = capsname.replace('-', ' ');
        this.citynamebuilder = capsname;
        this.citybreadcrump = this.cityname;
        this.cityapi.limit = '0';
        this.cityapi.limitrows = '4';
        var limitparam = 29;
        var limitprprtyrows = 4;
        // var buildname = this.builder;
        var buildid = this.builderid;
        // var bedroom = this.Filter.Bedrooms;
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

        // var pos = this.Filter.possission;
        // var loc = this.Filter.servicelocality;
        // this.statusid = this.Filter.statusid
        // this.projecttype = this.Filter.proptypeid;
        // this.UserId = this.storage?.getItem("userID");
        var param = {
          limit: limitparam,
          limitrows: limitprprtyrows,
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

        this.Service.getprojectscount(this.city, param).subscribe(countprojects => {
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
          if (this.projectcount <= 0) {
            this.showLoader = false;
            this.zeroprojects = true;
          }
        });


        // section 1
        var param1 = {
          limit: 5,
          limitrows: 4,
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
        this.Service.getCity(this.city, param1).subscribe(lists => {
          const propertylists = lists['deatils'];
          this.propertylists1 = propertylists;
          this.showLoader = true;
          this.sectionFirstResponce = true;
        });
        // section 1
        // section 2
        var param2 = {
          limit: 9,
          limitrows: 4,
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
        this.Service.getCity(this.city, param2).subscribe(lists => {
          const propertylists = lists['deatils'];
          this.propertylists2 = propertylists;
          this.showLoader = true;
          this.sectionFirstResponce = true;
        });
        // section 2
        // section 3
        var param3 = {
          limit: 13,
          limitrows: 4,
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
        this.Service.getCity(this.city, param3).subscribe(lists => {
          const propertylists = lists['deatils'];
          this.propertylists3 = propertylists;
        });
        // section 3
        // section 4
        var param4 = {
          limit: 17,
          limitrows: 4,
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
        this.Service.getCity(this.city, param4).subscribe(lists => {
          const propertylists = lists['deatils'];
          this.propertylists4 = propertylists;
        });
        // section 4
        // section 5
        var param5 = {
          limit: 21,
          limitrows: 4,
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
        this.Service.getCity(this.city, param5).subscribe(lists => {
          const propertylists = lists['deatils'];
          this.propertylists5 = propertylists;
        });
        // section 5
        // section 6
        var param6 = {
          limit: 25,
          limitrows: 4,
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
        this.Service.getCity(this.city, param6).subscribe(lists => {
          const propertylists = lists['deatils'];
          this.propertylists6 = propertylists;
        });
        this.Service.getCity(this.city, param).subscribe(lists => {
          let propertylists = lists['deatils'];
          this.propertylists = propertylists;
          // var apicityname = this.propertylists[0].city_name;
          // var apinamecity = apicityname.toLowerCase();
          // var apibuildername = this.builder.replace(/\s+/g, '-').toLowerCase();
          // let builderlastjoiner = apibuildername + '-' + this.builderid;
          // if (this.cityname != apinamecity) {
          //   this.router.navigate([apinamecity + '/builder/' + apibuildername + '-' + this.builderid]);
          // } else if (lasturl != builderlastjoiner) {
          //   this.router.navigate([apinamecity + '/builder/' + apibuildername + '-' + this.builderid]);
          // } else {
          // }
        });
        var locpropparam = {
          builderId: buildid,
          cityid: this.cityId
        }
        // this.Service.getlocalityproperties(locpropparam).subscribe(
        //   (lists) => {
        //     this.localityproperties = lists['autolist'];
        //   }
        // );
        // this.Service.getAuto(this.cityId).subscribe((myLocalList) => {
        //   this.apioptions(myLocalList['autolist']);
        //   this.autoCompleteData = myLocalList['autolist'];
        // });
        // section 6
      });
    });

    this.luxuryPropDetails();
    this.affordablePropDetails();
    this.onReadyToMoveDetails();
    this.getNewLuanchProp();
  }
  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  filterfetch() {
    this.window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.Service.mouseenterservice1();
  }
  private observer: IntersectionObserver | null = null;
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
        if (entry.isIntersecting && !this.allDataLoaded) {
          this.loadMore();
        }
      });
    });

    if (this.scrollAnchor) {
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
  }

  loadMore() {
    this.showLoader = true;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityid = value.cityid;
    // this.currentCity = value.cityname;
    this.cityname = value.cityname;
    this.routeSub = this.activeroute.params.subscribe(params => {
      if (this.router.url?.indexOf('/builder/') > -1) {
        this.cityname = params['cityname'];
        var buildername = params['buildername'];
        var lasturl = params['buildername-:builderid'];
        var builderid = lasturl.split('-').pop().match(/[0-9]+/);
        String.prototype.toLocaleUpperCase = function () {
          return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        };
        var capsname = this.cityname.toLocaleUpperCase();
        this.city = capsname;
      } else {
        var builderiid = this.router.url.split('-').pop().match(/[0-9]+/);
        this.builderid = builderiid;
        var capsname = this.cityname.toLocaleUpperCase();
      }



      let totalcount = this.projectcount;
      const limit = BuilderSectionTwo.buildercount += 4;
      let limitprprtyrows = 4;
      var bedroom = this.Filter.Bedrooms;
      if (this.router.url?.indexOf('/builder/') > -1) {
        this.minbudget_IDPK = this.Filter.min;
        this.maxbudget_IDPK = this.Filter.max;
        var pos = this.Filter.possission;
        var loc = this.Filter.servicelocality;
        this.statusid = this.Filter.statusid
        this.projecttype = this.projecttype
        this.noOfBedrooms = this.Filter.Bedrooms;
      } else if (this.router.url?.indexOf('spbc') > -1) {
        this.minbudget_IDPK = this.Filter.min;
        this.maxbudget_IDPK = this.Filter.max;
        var pos = this.Filter.possission;
        var loc = this.Filter.servicelocality;
        this.statusid = this.projectStatus;
        this.projecttype = this.projecttype
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
      var pos = this.Filter.possission;
      var loc = this.Filter.servicelocality;
      // this.projecttype = this.Filter.proptypeid;
      var statusid = this.Filter.statusid
      this.UserId = this.storage?.getItem("userID");
      // this.projecttype = ['50401'];
      // 
      let param = {
        city: this.cityId,
        limit: limit,
        limitrows: limitprprtyrows,
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
      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        return this.Service.getCity(this.city, param).subscribe(propertylists => {
          var status = propertylists['status'];
          if (status == "False" || propertylists['deatils'].length === 0) {
            this.showLoader = false;
            this.allDataLoaded = true;
            $('.search-results').css('padding-bottom', '22px');
            return;
          }
          this.propertylists = this.propertylists.concat(propertylists['deatils']);
        });
      } else {
        this.showLoader = false;
        this.allDataLoaded = true;
      }
    });
  }

  options;
  filteredOptions: Observable<any>;
  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (value.length >= 1 ? this._filter(value) : []))
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
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
  luxuryPropList = [];
  HideLuxuryProp = true;
  luxuryPropDetails() {
    const limite = 4;
    const limitrows = 6;

    const min = 13;
    const max = 24;
    let param = {
      limit: limite,
      limitrows: limitrows,
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    // 
    this.Service.getCity(this.cityname, param).subscribe(response => {
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
    });
  }
  onReset() {
    BuilderSectionTwo.buildercount = 28;
    this.registerForm.reset({
      projectType: '',
      minBudget: '',
      maxBudget: '',
      posessionWithin: '',
      locality: '',
    });
    this.oneBedroomSelect = false;
    this.twoBedroomSelect = false;
    this.threeBedroomSelect = false;
    this.fourBedroomSelect = false;
    this.fiveBedroomSelect = false;
    this.apartmentSelect = false;
    this.villaSelect = false;
    this.plotSelect = false;
    this.readyToMoveSelect = false;
    this.underConstructionSelect = false;
    this.newLaunchSelect = false;
    this.preLaunchSelect = false;
    this.noOfBedrooms = [];
    this.projectStatus = [];
    this.projecttype = [];
    this.possission = '';
    this.proptypeId = '';
    this.minBugPrice = '';
    this.maxBugPrice = '';
    this.ngOnInit();

  }
  oneBedroom() {
    this.oneBedroomSelect = !this.oneBedroomSelect;
    if (this.oneBedroomSelect) {
      this.noOfBedrooms.push('1');
    } else if (this.oneBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '1') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.Filter.Bedrooms = this.noOfBedrooms;
    this.filterSelectOne = false;

  }

  twoBedroom() {
    this.twoBedroomSelect = !this.twoBedroomSelect;
    if (this.twoBedroomSelect) {
      this.noOfBedrooms.push('2');
    } else if (this.twoBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '2') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.Filter.Bedrooms = this.noOfBedrooms
    this.filterSelectOne = false;

  }

  threeBedroom() {
    this.threeBedroomSelect = !this.threeBedroomSelect;
    if (this.threeBedroomSelect) {
      this.noOfBedrooms.push('3');
    } else if (this.threeBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '3') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.Filter.Bedrooms = this.noOfBedrooms
    this.filterSelectOne = false;

  }

  fourBedroom() {
    this.fourBedroomSelect = !this.fourBedroomSelect;
    if (this.fourBedroomSelect) {
      this.noOfBedrooms.push('4');
    } else if (this.fourBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '4') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.Filter.Bedrooms = this.noOfBedrooms
    this.filterSelectOne = false;

  }

  fiveBedroom() {
    this.fiveBedroomSelect = !this.fiveBedroomSelect;
    if (this.fiveBedroomSelect) {
      this.noOfBedrooms.push('5');
    } else if (this.fiveBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '5') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.Filter.Bedrooms = this.noOfBedrooms;
    // 
    this.filterSelectOne = false;
  }
  tweentylaksSelect = false;
  tweentylaksTosixtylakhsSelect = false;
  sixtylakhsToEhightylakhsSelect = false;
  EhightylakhsTooneCrSelect = false;
  oneCrAboveCrSelect = false;

  lessThntweentylaks() {
    if (this.tweentylaksSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.tweentylaksSelect = false;
    } else if (this.tweentylaksSelect === false) {
      this.maxbudget_IDPK = '4';
      this.minbudget_IDPK = '1';
      this.tweentylaksSelect = true;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;

    }
    this.Filter.min = this.minbudget_IDPK;
    this.Filter.max = this.maxbudget_IDPK;
  }

  tweentylaksTosixtylakhs() {
    if (this.tweentylaksTosixtylakhsSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.tweentylaksTosixtylakhsSelect = false;
    } else if (this.tweentylaksTosixtylakhsSelect === false) {
      this.maxbudget_IDPK = '8';
      this.minbudget_IDPK = '4';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = true;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;
    }
    this.Filter.min = this.minbudget_IDPK;
    this.Filter.max = this.maxbudget_IDPK;
  }

  sixtylakhsToEhightylakhs() {
    if (this.sixtylakhsToEhightylakhsSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.sixtylakhsToEhightylakhsSelect = false;
    } else if (this.sixtylakhsToEhightylakhsSelect === false) {
      this.maxbudget_IDPK = '10';
      this.minbudget_IDPK = '8';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = true;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;

    }
    this.Filter.min = this.minbudget_IDPK;
    this.Filter.max = this.maxbudget_IDPK;
  }

  EhightylakhsTooneCr() {
    if (this.EhightylakhsTooneCrSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.EhightylakhsTooneCrSelect = false;
    } else if (this.EhightylakhsTooneCrSelect === false) {
      this.maxbudget_IDPK = '12';
      this.minbudget_IDPK = '10';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = true;
      this.oneCrAboveCrSelect = false;

    }
    this.Filter.min = this.minbudget_IDPK;
    this.Filter.max = this.maxbudget_IDPK;
  }

  oneCrAbove() {
    if (this.oneCrAboveCrSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.oneCrAboveCrSelect = false;
    } else if (this.oneCrAboveCrSelect === false) {
      this.maxbudget_IDPK = '24';
      this.minbudget_IDPK = '12';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = true;

    }
    this.Filter.min = this.minbudget_IDPK;
    this.Filter.max = this.maxbudget_IDPK;
  }

  apartmentclick() {
    this.apartmentSelect = !this.apartmentSelect;
    if (this.apartmentSelect) {
      this.projecttype.push('50401');
    } else if (this.apartmentSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50401') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  villaclick() {
    this.villaSelect = !this.villaSelect;
    if (this.villaSelect) {
      this.projecttype.push('50402');
    } else if (this.villaSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50402') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  plotclick() {
    this.plotSelect = !this.plotSelect;
    if (this.plotSelect) {
      this.projecttype.push('50403');
    } else if (this.plotSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50403') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  readyToMove() {
    this.readyToMoveSelect = !this.readyToMoveSelect;
    if (this.readyToMoveSelect) {
      this.projectStatus.push('50307');
    } else if (this.readyToMoveSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50307') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  underConstruction() {
    this.underConstructionSelect = !this.underConstructionSelect;
    if (this.underConstructionSelect) {
      this.projectStatus.push('50309');
    } else if (this.underConstructionSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50309') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  newLaunch() {
    this.newLaunchSelect = !this.newLaunchSelect;
    if (this.newLaunchSelect) {
      this.projectStatus.push('50310');
    } else if (this.newLaunchSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50310') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  upcoming() {
    this.preLaunchSelect = !this.preLaunchSelect;
    if (this.preLaunchSelect) {
      this.projectStatus.push('50308');
    } else if (this.preLaunchSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50308') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  affordablePropList = [];
  affordableproploader: boolean = true;
  HideAffordableProp = true;
  affordablePropDetails() {
    const limite = 4;
    const limitrows = 6;
    const min = 6;
    const max = 9;
    let param = {
      limit: limite,
      limitrows: limitrows,
      minprice: min,
      maxprice: max,
      buliderId: this.builderid
    };
    this.Service.getCity(this.cityname, param).subscribe(response => {
      const propertylists = response['deatils'];
      this.affordablePropList = propertylists;
      if (this.affordablePropList.length >= 0) {
        this.affordableproploader = false;
      } else {
        this.affordableproploader = true;
      }
      if (this.affordablePropList.length <= 0) {
        this.HideAffordableProp = false;
      } else {
        this.HideAffordableProp = true;
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
      statusid: statusid,
      buliderId: this.builderid
    };
    this.Service.getCity(this.cityname, param).subscribe(response => {
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
    });
  }

  getNewLuanchProp() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50310';

    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid,
      buliderId: this.builderid
    };
    this.Service.getCity(this.cityname, param).subscribe(response => {
      const propertylists = response['deatils'];
      this.newProperties = propertylists;
      if (this.newProperties.length >= 0) {
        this.newlaunchesloader = false;
      } else {
        this.newlaunchesloader = true;
      }
      if (this.newProperties.length <= 0) {
        this.Hidenewlaunches = false;
      } else {
        this.Hidenewlaunches = true;
      }
    });

  }
  ImmediateSelect = false;
  SixMonthsSelect = false;
  OneYearSelect = false;
  twoYearSelect = false;
  PosessionImmediate() {
    if (this.ImmediateSelect === true) {
      this.possission = '';
      this.ImmediateSelect = false;
    } else if (this.ImmediateSelect === false) {
      this.possission = '1';
      this.ImmediateSelect = true;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
    }
  }

  PosessionSixMonths() {
    if (this.SixMonthsSelect === true) {
      this.possission = '';
      this.SixMonthsSelect = false;
    } else if (this.SixMonthsSelect === false) {
      this.possission = '6';
      this.ImmediateSelect = false;
      this.SixMonthsSelect = true;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
    }
  }

  PosessionOneYear() {
    if (this.OneYearSelect === true) {
      this.possission = '';
      this.OneYearSelect = false;
    } else if (this.OneYearSelect === false) {
      this.possission = '12';
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = true;
      this.twoYearSelect = false;
    }
  }

  PosessionTwoYearAbove() {
    if (this.twoYearSelect === true) {
      this.possission = '';
      this.twoYearSelect = false;
    } else if (this.twoYearSelect === false) {
      this.possission = '24';
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = true;
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

  otploader = false;


  // HideSort() {
  //   this.sortShowHide = false;
  // }
  Oncompareclick() {
    this.compareShowonimg = this.compareShowonimg ? false : true;
    // this.compareShowonimg = this.compareShowonimg ? false : true;
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

  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
    this.Mousemovement = true
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

  activeIndexMap1: { [key: string]: number } = {};
  activeIndexMap2: { [key: string]: number } = {};
  activeIndexMap3: { [key: string]: number } = {};
  activeIndexMap4: { [key: string]: number } = {};
  activeIndexMap5: { [key: string]: number } = {};
  activeIndexMap6: { [key: string]: number } = {};
  activeIndexMap: { [key: string]: number } = {};


  imageErrorMap: { [key: number]: boolean } = {};
  onImgError(event: any, id: number) {
    // hide broken image instantly
    event.target.style.display = 'none';
    // trigger Angular condition
    this.imageErrorMap[id] = true;
  }



}
