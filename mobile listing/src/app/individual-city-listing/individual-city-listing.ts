import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { AfterViewInit, Component, DOCUMENT, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatChipOption, MatChipSelectionChange } from '@angular/material/chips';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { Observable, Subscription, take } from 'rxjs';
import { CityService } from '../city.service';
import { City, flitercity, minmax, } from '../city-based-listing/citybasedlisting';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { enquiry } from '../prop-details-new/class';
import { SafeStorageService } from '../safe-storage.service';
import { cleanUrlPipe, Convertnumber } from '../mainpipe-pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { InnerHeader } from '../inner-header/inner-header';
// Swal lazy-loaded
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { ElitedataService } from '../elitedata.service';
import { AdCardsComponent } from "../ad-cards/ad-cards.component";


declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-individual-city-listing',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatChipsModule,
    cleanUrlPipe,
    Convertnumber,
    InnerHeadderWithSidenav, NgxSkeletonLoaderModule,
    AdCardsComponent
],
  templateUrl: './individual-city-listing.html',
  styleUrl: './individual-city-listing.css',
})
export class IndividualCityListing implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;

  @ViewChildren(MatChipOption) chips!: QueryList<MatChipOption>;

  myControl = new FormControl();
  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
  @ViewChild('cancel') cancel!: ElementRef;
  public n: number = 1;



  resetFormss!: FormGroup;
  Addedshowing: boolean = false;
  addedImages: boolean = false;
  otpValidating: boolean = false;

  filterShowHide!: boolean;
  sortShowHide!: boolean;
  IsVisibleFilter!: boolean;
  oneBedroomSelect: boolean = false;
  twoBedroomSelect: boolean = false;
  threeBedroomSelect: boolean = false;
  fourBedroomSelect: boolean = false;
  fiveBedroomSelect: boolean = false;
  registerForm!: FormGroup;
  apartmentSelect: boolean = false;
  villaSelect: boolean = false;
  plotSelect: boolean = false;
  readyToMoveSelect: boolean = false;
  underConstructionSelect: boolean = false;
  newLaunchSelect: boolean = false;
  preLaunchSelect: boolean = false;
  newBudget: any = [];
  budgetsLength: any;
  noOfBedrooms: any = [];
  projectStatus: any = [];
  projecttype: any = [];
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
  minbudget_IDPK: any;
  maxbudget_IDPK: any;
  area_min: any;
  area_max: any;
  minbudget_value: any;
  maxbudget_value: any;
  static citycount: number;
  proptypeurlparam: any;
  propertyid: any;
  alertmesg: any;
  propidarray: any = [];
  parsedarray: any = [];
  jsonparse: any = [];
  storagearr: any;
  seenProjectsStoragearr: any;
  localstorediv: any;
  localstoredivSeenProjects: any;

  zeroprojects = false;
  citybreadcrump: any;
  localityName: any;
  dropdownSettingsMobile = {};
  localityData: any = [];
  searches: any;
  localitydescription: any;
  description!: boolean;
  seenproject: any;
  UserId: any;

  Date = new Date();
  user = new enquiry();
  propertylists: any;

  projectcount: any;
  bedrooms: any;
  budgets: any;
  possissions: any;
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

  sortedCollection!: any[];
  private routeSub!: Subscription;
  cityname: any;

  cityId: any;
  reraid: any = [];
  cityhead: any;
  cityidseo: any;
  cityzonelinks_types: any;

  loaded = false;
  FooterComponent: any;

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
  fliterbedroom!: string;
  possission!: string;
  locality: any = [];
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
  comparePropType2: any;
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
  onebathroomSelect: boolean = false;
  twobathroomSelect: boolean = false;
  threebathroomSelect: boolean = false;
  fourbathroomSelect: boolean = false;
  fiveplusbathroomSelect: boolean = false;
  bathroom: any;
  ownerSelect: boolean = false;
  brokerselect: boolean = false;
  postedby: any;
  NoFurnishSelect!: boolean;
  FurnishType: any;
  SemiFurnishSelect!: boolean;
  FullFurnishSelect!: boolean;
  bhklist: any;
  balconylist: any;
  bathroomlist: any;
  furnishlist: any;
  Tenantslist: any;
  Ownershiplist: any;
  Propertytypelist: any;
  Doorfacelist: any;
  Approvalslist: any;
  Amenitieslist: any;
  amenities: any = [];
  approvals: any = [];
  doorfacings: any = [];
  postedBy: any;
  balconyarray: any = [];
  amenityId: any = [];
  bhkarray: any = [];
  bathroomarray: any = [];
  ReadyToMoveSelect = false;
  statusid: any = [];
  UnderConstructionSelect = false;
  listarraylength: any;
  urlcityname: any;
  propertiescount: any;
  IsVisibleEnquery!: boolean;
  propbhk: any;
  propname: any;
  proptype: any;
  otploader: boolean = true;
  proparea: any;
  propareatype: any;
  propertyenquire!: string;
  showingCompare: boolean = false;
  showAdded: boolean = false;
  Matautocomplete: any;
  private mouseSub: any;


  formatsDateTest: string[] = [
    'dd/MM/yyyy',
  ];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();
  currentTab: any;
  projectcountRent: any;
  currenturl: any;
  projectpgcount: any;
  projectcountcommercial: any;
  userRentalFavList: any = [];
  propertyIds: any = [];
  // fb: any;
  currentCity: string;
  userID: string | null = null;




  constructor(private titleService: Title, private meta: Meta,
    public Service: DataService,
    private router: Router,
    private activeroute: ActivatedRoute,
    public cityservice: CityService,
    private dataService2: DataService2,
    private Filter: FilterService,
        private eliteService: ElitedataService,

    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,

  ) {
    this.window = this.doc.defaultView!;
    this.mouseSub = this.Service.mouseenterlisten1()
      .pipe(take(1))
      .subscribe(() => {
        this.getindividuallist();
      });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      this.window.scrollTo(0, 0);
    });
    setTimeout(() => {
      this.n = this.n += 4;
    }, 1000);
  }
  window!: Window;
  innerheader: any;
  propertyimage: any = 'https://img.homes247.in/images/individuallistings/cover/';

  onScrollOnce: boolean = true
  Mousemovement:boolean =  false
  @HostListener('scroll', [])
  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
    if (this.onScrollOnce) {
      this.Mousemovement = true
      this.onScrollOnce = false
    this.propertyimage = this.Service.SellImages + 'cover/';
    this.Service.mouseenterservice3();
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
  enquiryFormindComponent: any

  transitionEnd(event: any) {
    var dv: any = document.getElementById("floatinglink");
    var dvStyle = dv.getAttribute('style');
    if (dvStyle?.indexOf("translateX(-584%)") > -1) {
      $('.floating-link').css('width', '216px');
      $('.border_div').css('opacity', '1');
      $('#floating_img').css('display', 'none');

    }
  }
  demo: any = [];
  loginidNew: any
    login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  ngOnInit() {
    this.getlocality();
    this.getindividuallist();
    this.geturlparams();
    // this.scripts();
    this.getbedrooms();
    this.getpossissions();
    this.getbudgets();
    // this.onresize();
    // this.getindividualfilterdatalist();
    //  this.sortfiltershowhide();
    IndividualCityListing.citycount = 0;
    this.searches = this.activeroute.queryParams['_value']['Searches'];
    this.UserId = this.storage?.getItem('userID');
    this.userID = this.storage?.getItem('userID');

    //queryParams here
    this.activeroute.queryParams.subscribe((params: any) => {
      this.showLoader = false
      this.currentTab = params['tab']
    })


   const loginid = this.storage?.getItem('loginID');
    if (loginid === '1') {
      this.login = true;
      this.userId = this.storage?.getItem('userID');
      this.userNumber = this.storage?.getItem('userNumber');

     this.eliteService.getContactedList(this.userId).subscribe(response => {
        if (response['status'] == "True") {
          this.contactedList = response['pro_view']

          this.elitePropertyId = this.contactedList.map((item: any) => {
            this.contactData[String(item.property_IDPK)] = item.owner_details;

            return item.property_IDPK;

          });
          if (this.elitePropertyId?.length == 0) {

          } else {
            this.eliteView = true;
          }
        }
      })

    } else {
      this.login = false;
    }
    this.loginidNew = loginid
    // if (this.currentTab == "compare") {
    //   this.Oncompareclick();
    //   this.compareShowonimg = true;

    //   // 

    //   this.hideshowcompare = true;


    // }


    // if (isPlatformBrowser(this.platformId)) {
    //   $('.head_sticky').css('padding-bottom', '54px');
    // }


  }

  // dataloads() {
  //   this.propertyimage = this.Service.SellImages + 'cover/';

  // }




  selectedSortValue: number | null = null;
  onSortChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedSortValue = +value; // Convert string to number and store
    // console.log('Selected Sort Value:', this.selectedSortValue);
    this.getindividuallist();
  }



  isInWishlist(propertyID: number): boolean {
    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.storagearr = this.propertyIds
      // this.storagearr.push(this.userFavListthis.storage);
      return this.storagearr.includes(propertyID);

    } else {

      return this.storagearr.includes(propertyID);
    }
  }



  //  Pradeesh
  Heart_Transtion(propertyID: number) {
    const index = this.storagearr?.indexOf(propertyID);
    var loginID = this.storage?.getItem('loginID')
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = this.storage?.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 2
        };
        this.Service.removeFavaourite(param).subscribe(response => {
        });
      }
    }
    else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = this.storage?.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 2
        };
        this.Service.addfavaourite(param).subscribe(response => {
        });
      }
    }
    this.storage.setItem('individualPropertyID', JSON.stringify(this.storagearr));
  }

  geturlparams() {
    (String.prototype as any).toLocaleUpperCase = function () {
      return this.replace(/\w\S*/g, function (txt: string) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    this.currenturl = this.router.url;

    this.UserId = this.storage?.getItem("userID");


    var value = this.cityservice.cityfinder(this.router.url);
    // this.currentCity = value.cityname;
    this.cityname = value.cityname;
    this.cityidseo = value.cityid;
    var capsname = (this.cityname as any).toLocaleUpperCase();
    this.city = capsname;
    this.citybread = capsname;
    this.cityhead = capsname;
    var idcity = this.cityidseo;
    this.titleService.setTitle("Real Estate Projects in " + this.cityname + " for sale | Buy New Projects");
    this.meta.updateTag({ name: 'description', content: "Explore Newly Launched, Ready to move & Under Construction Projects in " + this.cityname + " with Homes247.in - Get instant price quote, offers & schedule a site visit." });
    this.Service.createLinkForCanonicalURL();

    var ParamRent = {}

    this.Service.getRentprojectscount(this.cityname, ParamRent).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.projectcountRent = projectcount[0].PropertyCounts;
    })
    var param2 = {
      limit: '',
      limitrows: ''
    };


    var paramsale = {
      limit: '',
      limitrows: '',
      sale_rent: '',
    };

    this.Service.PGRentCount(this.cityname, param2).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.projectpgcount = projectcount[0].PropertyCounts;
    })

    this.Service.commercialSalePropertiesCount(this.cityname, paramsale).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.projectcountcommercial = projectcount[0].PropertyCounts;
    })
  }

  getlocality() {
    this.otploader = true

    var value = this.cityservice.cityfinder(this.router.url);
    this.urlcityname = value.cityname.toLowerCase();
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    var regionid = '';
    var paramss = {
      cityId: this.cityId,
      regionid: regionid
    };
    this.Service.getlocality(paramss).subscribe(localitys => {
      this.localitys = localitys['details'];
    });

  }

  getindividuallist() {
    this.otploader = true

    IndividualCityListing.citycount = 4;
    this.activeroute.queryParamMap.subscribe((params: any) => {
      if (params['params']) {
        if (params['params']) {
          if (params['params']['propertytype']) {
            this.projecttype = params['params']['propertytype'];
          }
          if (params['params']['localityid']) {
            this.locality = params['params']['localityid'];
          }
          if (params['params']['bedroom']) {
            this.bhkarray = params['params']['bedroom'];
          }
          if (params['params']['bathroom']) {
            this.bathroomarray = params['params']['bathroom'];
          }
          if (params['params']['min']) {
            this.minbudget_IDPK = params['params']['min'];
          }
          if (params['params']['max']) {
            this.maxbudget_IDPK = params['params']['max'];
          }
          if (params['params']['sqftmin']) {
            this.area_min = params['params']['sqftmin'];
          }
          if (params['params']['sqftmax']) {
            this.area_max = params['params']['sqftmax'];
          }
          if (params['params']['balconyId']) {
            this.balconyarray = params['params']['balconyId'];
          }
          if (params['params']['amenities']) {
            this.amenityId = params['params']['amenities'];
          }
          if (params['params']['status']) {
            this.projectStatus = params['params']['status'];
          }
        }
      }
    });
    let isValidUrl = false;
    const currentUrl = this.router.url;
    if (currentUrl.includes('?propertytype')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?utm_source')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?localityid')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?bedroom')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?bathroom')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?min')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?max')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?sqftmin')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?sqftmax')) {
      isValidUrl = true;
    } else if (currentUrl.includes('?amenities')) {
      isValidUrl = true;
    }

    // if (!isValidUrl) {
    //   this.router.navigate(['/404'], { skipLocationChange: true });
    // }
    // this.routeSub = this.activeroute.params.subscribe(params => {
    this.showLoader = false;
    this.cityapi.limit = '0';
    this.cityapi.limitrows = '4';
    var limit = '0';
    var limitrows = '4';
    var proptypeid = this.projecttype;
    var bedroom = this.bhkarray;
    var min = this.minbudget_IDPK;
    var max = this.maxbudget_IDPK;
    var loc = this.locality;
    var balcony = this.balconyarray;
    var Furnish = this.FurnishType;
    // ;
    var posted = this.postedBy;
    var doorfacing = this.doorfacings;
    // var amenities = this.amenities;
    var availability = this.statusid;
    var bathroom = this.bathroomarray;
    var projectStatus = this.projectStatus;

    var param = {
      limit: limit,
      limitrows: limitrows,
      proptypeid: proptypeid,
      bedroom: bedroom,
      minprice: min,
      maxprice: max,
      locality: loc,
      balcony: balcony,
      furnish: Furnish,
      ownership: posted,
      doorface: doorfacing,
      bathroom: bathroom,
      area_min: this.area_min,
      area_max: this.area_max,
      amenityId: this.amenityId,
      statusid: projectStatus
    };
    this.otploader = true
    this.Service.getIndividualList(this.urlcityname, param).subscribe(lists => {
      if (lists['status'] === 'True') {
        let propertylists = lists['listings'];
        this.propertylists = propertylists;
        setTimeout(() => {
          this.otploader = false
        }, 200);
        this.localId = propertylists[0].Localityid;
        this.showLoader = true;
        if (this.propertylists <= 0) {
          this.showLoader = false;
          this.zeroprojects = true;
        }
        if (this.propertylists < 4) {
          this.showLoader = false;
        }
      }
    });


    this.Service.getindividualprojectscount(this.urlcityname, param).subscribe(countprojects => {
      // this.showLoader = true;
      let projectcount = countprojects['Counts'];
      this.propertiescount = projectcount[0].PropertyCounts;
    });


    var param1 = {
      // limit: limitparam,
      // limitrows: limitprprtyrows,
      proptypeid: this.Filter.proptypeid,
      bedroom: this.Filter.Bedrooms,
      bathroom: this.Filter.Bathrooms,
      price_on_request: this.Filter.price_on_request,
      // minprice: this.Filter.min,
      // maxprice: this.Filter.max,
      property_minprice: this.Filter.property_minprice,
      property_maxprice: this.Filter.property_maxprice,
      possission: this.Filter.possission,
      locality: this.Filter.servicelocality,
      statusid: this.Filter.statusid,
      amenityId: this.Filter.amenities,
      area_min: this.Filter.sqftmin,
      area_max: this.Filter.sqftmax,
      // searches: search,
      // userId: this.UserId,
    };
    this.Service.getprojectscount(this.urlcityname, param1).subscribe(projectcounts => {
      let projectcount = projectcounts['Counts'];
      this.projectcount = projectcount[0].PropertyCounts;
    });

    // });
  }

  private observer: IntersectionObserver | null = null;



  ngAfterViewInit(): void {
    // $('.ui.dropdown').dropdown({});
    // (document.querySelector('.child') as HTMLElement).style.color = 'black';
    import('../enquiry-form-individual/enquiry-form-individual')
      .then(c => {
        this.enquiryFormindComponent = c.EnquiryFormIndividual;
        if (isPlatformBrowser(this.platformId)) {
          $('.modal-login').css('z-index', '99999');
        }
      });

    this.initIntersectionObserver();
    this.scripts();
    this.onresize();
    if (this.currentTab == "compare") {
      this.Oncompareclick();
      this.compareShowonimg = true;
      this.hideshowcompare = true;
    }
    if (isPlatformBrowser(this.platformId)) {
      $('.head_sticky').css('padding-bottom', '54px');
    }
    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });
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


  // isAllDataLoaded = false;

  loadMore() {
    // this.showLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      let totalcount = this.propertiescount;
      const limit = IndividualCityListing.citycount;
      IndividualCityListing.citycount += 4;
      let limitprprtyrows = 4;
      var rera = this.reraid;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var loc = this.locality;
      var proptypeid = this.projecttype;
      var projectStatus = this.projectStatus;
      var balcony = this.balconyarray;

      var furnished = this.FurnishType;
      var posted = this.postedby;
      this.UserId = this.storage?.getItem('userID');
      let param = {
        limit: limit,
        limitrows: limitprprtyrows,
        reraId: rera,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        statusid: projectStatus,
        proptypeid: proptypeid,
        ownership: posted,
        furnish: furnished,
        area_min: this.area_min,
        area_max: this.area_max,
        amenityId: this.amenityId,
        balcony: balcony,
        // userId: this.UserId,
      };
      // if (this.isAllDataLoaded) return;

      // let livecount = this.propertylists.length;
      let livecount = this.propertylists?.length || 0;

      if (livecount < totalcount) {
        return this.Service.getIndividualList(this.urlcityname, param).subscribe(propertylists => {
          var status = propertylists['status'];
          if (status == "False") {
            this.showLoader = false;
            $('.search-resultss').css('padding-bottom', '41px');
          } else {
            const newData = propertylists['listings'] || [];

            // ✅ Same dedup logic as Rent
            const uniqueData = newData.filter(
              (newItem: any) =>
                !this.propertylists.some(
                  (oldItem: any) => oldItem.PropertyID === newItem.PropertyID
                )
            );

            this.propertylists = [...this.propertylists, ...uniqueData];

            // ✅ Recalculate after dedup
            livecount = this.propertylists.length;

            if (livecount >= totalcount || uniqueData.length === 0) {
              this.showLoader = false;
              $('.search-resultss').css('padding-bottom', '41px');
            }
          }
        });
      } else {
        this.showLoader = false;
      }

    });
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
      $('.ui.budget_minprice.search.dropdown').dropdown({
        // minCharacters : 1
        onChange: function (this: any) {
          $('.budget_minprice').removeClass('minbud');
          $('.budget_maxprice').addClass('maxbud');
          if (this.maxprice_value != null) {
            $('#budgetmodal').addClass('collapsed');
            $('#budgetmodal').removeClass('expanded');
            $('.budget_minprice').addClass('minbud');
            $('.budget_maxprice').removeClass('maxbud');
          }
        },
        forceSelection: false,
      });
      $('.ui.budget_maxprice.search.dropdown').dropdown({
        // minCharacters : 1
        onChange: function () {
          $('#budgetmodal').addClass('collapsed');
          $('#budgetmodal').removeClass('expanded');
          $('.budget_minprice').addClass('minbud');
          $('.budget_maxprice').removeClass('maxbud');

        },
        forceSelection: false
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


    const userId = this.storage?.getItem('userID');

    if (userId) {
      this.UserId = this.storage?.getItem('userID');
      // this.Service1.getUserWishListByIdTest(this.UserId, 3).subscribe(response => {
      // });
      if ('individualPropertyID' in this.storage) {
        // this.userFavListthis.storage = JSON.parse(this.storage?.getItem('individualPropertyID'));
      } else {
        this.storage.setItem('individualPropertyID', '[]');
        // this.userFavListthis.storage = JSON.parse(this.storage?.getItem('individualPropertyID'));
      }
      this.Service.getUserWishListByIdTest(this.UserId, 2).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map((item: any) => item.propertyId) || [];
        // 
      });
    } else {
      if ('individualPropertyID' in this.storage) {
        this.storagearr = JSON.parse(this.storage?.getItem('individualPropertyID'));
      } else {
        this.storage.setItem('individualPropertyID', '[]');
        this.storagearr = JSON.parse(this.storage?.getItem('individualPropertyID'));
      }
    }
  }


  onresize() {
    this.registerForm = this.fb.group({
      locality: [''],
    });
    this.cityzonelinks_types = false;
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
    var width = this.window.innerWidth;
    if (width < 1080) {
      this.filterShowHide = true;
    } else {
      this.filterShowHide = false;
    }
  }



  projectType(projectType: any) {
    this.proptypeId = projectType;
    this.filterSelectOne = false;
  }

  posessionWithin(posession: any) {
    this.possission = posession;
    this.filterSelectOne = false;

  }


  minbugvalue(id: any) {
    // debugger
    this.budgetsLength = this.budgets.length;
    this.newBudget = this.budgets.slice(id, this.budgetsLength);
    this.minBugPrice = id;
    this.filterSelectOne = false;

  }

  maxbugvalue(id: any) {
    // debugger
    this.maxBugPrice = id;
    this.filterSelectOne = false;

  }

  applyFilter() {
    if (this.noOfBedrooms.length != 0 || this.minBugPrice != undefined
      || this.possission != undefined || this.localId != undefined
      || this.proptypeId != undefined
      || this.projectStatus.length != 0 || this.projecttype.length != 0) {
      this.ShowHideFilter();
    } else if (this.noOfBedrooms.length == 0 || this.minBugPrice == undefined
      || this.possission == undefined || this.localId == undefined
      || this.proptypeId == undefined
      || this.projectStatus.length == 0 || this.projecttype.length != 0) {
      this.filterSelectOne = true;
    }
  }

  // update by veera end


  minpriceclick() {
    this.modeldata = this.minprice.budget_IDPK;
    this.budget_show = false;
    this.bud_val_show = true;
    this.minprice_value = this.minprice.budget_value;
  };

  maxpriceclick() {
    this.modelmindata = this.maxprice.budget_IDPK;
    this.budget_show = false;
    this.bud_val_show = true;
    if (this.minprice_value == null) {
      this.minprice_value = '1 L';
    } else {
      this.maxprice_value = this.maxprice.budget_value;
      this.minprice_value = this.minprice.budget_value;
    }
    this.maxprice_value = this.maxprice.budget_value;
  };

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
      this.maxbudget_IDPK = '200000';
      this.minbudget_IDPK = '1';
      this.tweentylaksSelect = true;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;
    }
  }

  tweentylaksTosixtylakhs() {
    if (this.tweentylaksTosixtylakhsSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.tweentylaksTosixtylakhsSelect = false;
    } else if (this.tweentylaksTosixtylakhsSelect === false) {
      this.maxbudget_IDPK = '600000';
      this.minbudget_IDPK = '200000';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = true;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;
    }
  }

  sixtylakhsToEhightylakhs() {
    if (this.sixtylakhsToEhightylakhsSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.sixtylakhsToEhightylakhsSelect = false;
    } else if (this.sixtylakhsToEhightylakhsSelect === false) {
      this.maxbudget_IDPK = '800000';
      this.minbudget_IDPK = '600000';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = true;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;
    }
  }

  EhightylakhsTooneCr() {
    if (this.EhightylakhsTooneCrSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.EhightylakhsTooneCrSelect = false;
    } else if (this.EhightylakhsTooneCrSelect === false) {
      this.maxbudget_IDPK = '10000000';
      this.minbudget_IDPK = '800000';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = true;
      this.oneCrAboveCrSelect = false;
    }
  }

  oneCrAbove() {
    if (this.oneCrAboveCrSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.oneCrAboveCrSelect = false;

    } else if (this.oneCrAboveCrSelect === false) {
      this.maxbudget_IDPK = '50000000';
      this.minbudget_IDPK = '10000000';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = true;
    }
  }

  ImmediateSelect = false;
  SixMonthsSelect = false;
  OneYearSelect = false;
  twoYearSelect = false;


  ReadyToMoveclick() {
    this.ReadyToMoveSelect = !this.ReadyToMoveSelect;
    if (this.ReadyToMoveSelect) {
      // this.statusid = '138564';
      this.statusid.push('138564');
    } else if (this.ReadyToMoveSelect === false) {
      for (var i = 0; i < this.statusid.length; i++) {
        if (this.statusid[i] === '138564') {
          this.statusid.splice(i, 1);
        }
      }
    }
  }

  UnderConstructionclick() {
    this.UnderConstructionSelect = !this.UnderConstructionSelect;
    if (this.UnderConstructionSelect) {
      this.statusid.push('138565');
    } else if (this.UnderConstructionSelect === false) {
      // this.statusid = '138565';
      for (var i = 0; i < this.statusid.length; i++) {
        if (this.statusid[i] === '138565') {
          this.statusid.splice(i, 1);
        }
      }
    }
  }


  // ReadyToMoveclick() {
  //   this.ReadyToMoveSelect = !this.ReadyToMoveSelect;

  //   if (this.ReadyToMoveSelect) {

  //     this.projectStatus.push('50307');
  //     ;

  //   } else if (this.ReadyToMoveSelect == false) {

  //     for (var i = 0; i < this.projectStatus.length; i++) {
  //       if (this.projectStatus[i] === '50307') {
  //         this.projectStatus.splice(i, 1);
  //       }
  //     }
  //   }
  //   this.Filter.statusid = this.projectStatus
  //   this.filterSelectOne = false;
  //   this.Service.mouseenterservice1();
  // }


  // UnderConstructionclick() {
  //   this.UnderConstructionSelect = !this.UnderConstructionSelect;
  //   if (this.UnderConstructionSelect) {
  //     this.projectStatus.push('50309');
  //   } else if (this.UnderConstructionSelect == false) {
  //     for (var i = 0; i < this.projectStatus.length; i++) {
  //       if (this.projectStatus[i] === '50309') {
  //         this.projectStatus.splice(i, 1);
  //       }
  //     }
  //   }
  //   this.Filter.statusid = this.projectStatus
  //   this.filterSelectOne = false;
  //   this.Service.mouseenterservice1();
  // }









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

  ShowHideFilter() {
    // this.Service.mouseenterservice1();
    this.Service.mouseenterservice5();

    setTimeout(() => {
      if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        $('.head_stick').css('display', 'none');
      } else {
        $('.head_stick').css('display', 'block'); // Show again when no modal is open
      }
    }, 300);
    $('#filterModal').modal('show');
    window.scroll(0, 0);
  }

  getbedrooms() {
    this.Service.getbedrooms().subscribe(bedrooms => {
      this.bedrooms = bedrooms['bedroom'];
    });
  }

  getbudgets() {
    this.Service.getbudgets().subscribe(budgets => {
      this.budgets = budgets['budget'];
    });
  }

  getpossissions() {
    this.Service.getpossissions().subscribe(possissions => {
      this.possissions = possissions['possission'];
    });
  }

  IsVisible = false;


  ShowHide(bhk: any, proptype: any, propname: any) {
    this.IsVisible = this.IsVisible ? false : true;
  }


  // onLocalitySelect(eve) {
  //   this.localityData.push(eve.locality_IDPK);
  //   this.getindividuallist();
  // }

  // onLocalityDeSelect(event) {
  //   var index = this.localityData?.indexOf(event);
  //   this.localityData.splice(index, 1);
  //   this.getindividuallist();
  // }
  localityplace: any = [];

  onLocalitySelect(event: any) {
    this.locality.push(event.locality_IDPK);
    // this.Filter.servicelocality = this.locality;

    // this.Service.mouseenterservice1(); 
    // this.getcity()
    this.getindividuallist();
  }


  onLocalityDeSelect(event: any) {
    this.localityplace = this.localityplace.filter((item) => item !== event);
    this.locality = this.locality.filter((item: any) => item !== event.locality_IDPK);

    // this.Filter.servicelocality = this.locality;
    this.Service.mouseenterservice1();
    // this.getcity();
    this.getindividuallist();

  }
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 120,
    demand: true
  };
  otpexpired = false;

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }


  sortfiltershowhide() {
    var prevScrollpos = window.pageYOffset;
    var isScrolling: any;
    window.addEventListener('scroll', function (event) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        $('.compare_sort_filter_div').css('visibility', 'visible');
      } else {
        $('.compare_sort_filter_div').css('visibility', 'hidden');
        $('#fixed-accordion').css('visibility', 'hidden');
      }
      prevScrollpos = currentScrollPos;
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        $('.compare_sort_filter_div').css('visibility', 'visible');
      }, 2000);
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        $('.compare_sort_filter_div').css('visibility', 'hidden');
        isScrolling = setTimeout(function () {
          $('.compare_sort_filter_div').css('visibility', 'hidden');
        }, 2000);
      }
    }, false);
  }

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }

  // HideSort() {
  //   this.sortShowHide = false;
  // }

  // new radha update

  // filters list

  // getindividualfilterdatalist() {
  //   this.Service.getindividualfilterslist().subscribe(list => {
  //     this.bhklist = list['Bhks'];
  //     this.balconylist = list['Balcony'];
  //     this.bathroomlist = list['Bathroom'];
  //     this.furnishlist = list['Furnish'];
  //     this.Tenantslist = list['Tenants'];
  //     this.Ownershiplist = list['Ownership'];
  //     this.Propertytypelist = list['Propertytype'];
  //     this.Doorfacelist = list['Doorface'];
  //     this.Approvalslist = list['Approvals'];
  //     this.Amenitieslist = list['Amenities'];
  //   });
  // }


  toggleSelectionbhk(chip: MatChipOption, option: any) {
    chip.toggleSelected();
  }

  changeSelectedbhk($event: MatChipSelectionChange, option: any) {
    // console.log($event.selected);
    if ($event.selected === true) {
      this.bhkarray.push(option.id);
      // ;

    } else if ($event.selected === false) {
      for (var i = 0; i < this.bhkarray.length; i++) {
        if (this.bhkarray[i] === option.id) {
          this.bhkarray.splice(i, 1);
        }
      }
    }
    //  this.GetRentalList();
  }

  toggleSelectionbalcony(chip: MatChipOption, option: any) {
    chip.toggleSelected();
  }

  changeSelectedbalcony($event: MatChipSelectionChange, option: any) {
    // console.log($event.selected);
    if ($event.selected === true) {
      this.balconyarray.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.balconyarray.length; i++) {
        if (this.balconyarray[i] === option.id) {
          this.balconyarray.splice(i, 1);
        }
      }
    }
    //  this.GetRentalList();
  }

  toggleSelectionbathroom(chip: MatChipOption, option: any) {
    chip.toggleSelected();
  }

  changeSelectedbathroom($event: MatChipSelectionChange, option: any) {
    // console.log($event.selected);
    if ($event.selected === true) {
      this.bathroomarray.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.bathroomarray.length; i++) {
        if (this.bathroomarray[i] === option.id) {
          this.bathroomarray.splice(i, 1);
        }
      }
    }
    //  this.GetRentalList();
  }

  // onefurnishingType= false;
  // changeSelectedfurnished(option) {
  //   // 
  //   this.FurnishType = option.id;
  //   ;


  // }

  // furnished list
  changeSelectedFurnishestype($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) {
      this.FurnishType = option.id;
    }
    else if ($event.selected === false) {
      this.FurnishType = '';
    }

  }

  toggleSelectionFurnishedtype(chip: MatChipOption, option: any) {
    chip.toggleSelected();
  }





  changeSelectedownership($event: MatChipSelectionChange, option: any) {

    if ($event.selected === true) {
      this.postedBy = option.id;
    }
    else if ($event.selected === false) {
      this.postedBy = ''


    }

  }

  toggleSelectionpostedtype(chip: MatChipOption, option: any) {

    chip.toggleSelected();

  }



  toggleSelectionpropertytype(chip: MatChipOption, option: any) {
    chip.toggleSelected();
  }

  changeSelectedpropertytype($event: MatChipSelectionChange, option: any) {
    // console.log($event.selected);
    if ($event.selected === true) {
      this.projecttype.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === option.id) {
          this.projecttype.splice(i, 1);
        }

      }
    }
    //  this.GetRentalList();
  }

  toggleSelectiondoorface(chip: MatChipOption, option: any) {
    chip.toggleSelected();
  }

  changeSelecteddoorface($event: MatChipSelectionChange, option: any) {
    // console.log($event.selected);
    if ($event.selected === true) {
      this.doorfacings.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.doorfacings.length; i++) {
        if (this.doorfacings[i] === option.id) {
          this.doorfacings.splice(i, 1);
        }
      }
    }
    //  this.GetRentalList();
  }

  // toggleSelectionapproval(chip: MatChipOption, option: any) {
  //   chip.toggleSelected();
  // }

  // changeSelectedapproval($event: MatChipSelectionChange, option) {
  //   if ($event.selected === true) {
  //    this.approvals.push(option.id);
  //  } else if ($event.selected === false) {
  //    for (var i = 0; i < this.approvals.length; i++) {
  //      if (this.approvals[i] === option.id) {
  //        this.approvals.splice(i, 1);
  //      }
  //    }
  //  }
  // }

  toggleSelectionamenities(chip: MatChipOption, option: any) {
    chip.toggleSelected();
  }

  changeSelectedamenities($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) {
      this.amenities.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.amenities.length; i++) {
        if (this.amenities[i] === option.id) {
          this.amenities.splice(i, 1);
        }
      }
    }
  }

  propUserIDPK: any;

  goBackFromEnq() {
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }



  otpsend() {
    if ($('#uname').val() == "") {
      $('#uname').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) {
        $('#uname').removeAttr("style");
      }
      else {
        $('#uname').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#uemail').val() === '') {
      // $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      // return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#uemail').val())) {
        $('#uemail').removeAttr('style');
      } else {
        $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }
    if ($('#unumber').val() == "") {
      $('#unumber').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#unumber').val())) {
        $('#unumber').removeAttr("style");
      }
      else {
        $('#unumber').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    this.otploader = true;
    this.SubmitForm();
  }
  ShowHideEnquery1(proparea: any, propareatype: any, proptype: any, propname: any, userIdfk: any, data: any) {
    // this.proparea = proparea;
    // this.propareatype = propareatype;
    // this.proptype = proptype;
    // this.propname = propname;
    // this.propUserIDPK = data;
    this.Filter.localityid = this.localId;
    this.Filter.proptype = proptype;
    this.Filter.PropertyName = propname;
    this.Filter.Bedrooms = this.propbhk;
    this.Filter.userIdfk = userIdfk;
    this.Filter.area = proparea;
    this.Filter.areatype = propareatype;
    this.Filter.propid = data.PropertyID;
    $('#otpValidateind').css('display', 'block');
    $('.loginModelImg12').css('display', 'block');
    $('.loginModelImg13').css('display', 'none');
  }
  ShowHideEnquery(bhk: any, proptype: any, propname: any, userIdfk: any, data: any) {
    // this.propbhk = bhk;
    // this.proptype = proptype;
    // this.propname = propname;
    // this.propUserIDPK = data;
    this.Filter.localityid = this.localId;
    this.Filter.proptype = proptype;
    this.Filter.PropertyName = propname;
    this.Filter.Bedrooms = bhk;
    this.Filter.userIdfk = userIdfk;
    this.Filter.area = this.proparea;
    this.Filter.areatype = this.propareatype;
    this.Filter.propid = data.PropertyID;

    $('#otpValidateind').css('display', 'block');
    $('.loginModelImg13').css('display', 'block');
    $('.loginModelImg12').css('display', 'none');

    // this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }
  SubmitForm() {
    // this.Filter.localityid = this.localId;
    // this.Filter.proptype = this.proptype;
    // this.Filter.PropertyName = this.propname;
    // this.Filter.Bedrooms = this.propbhk;
    // this.Filter.userIdfk = this.propUserIDPK;
    // this.Filter.area = this.proparea;
    // this.Filter.areatype = this.propareatype;
    // $('#otpValidateind').css('display', 'block');

    // var param = this.user;
    //   this.user.localityId = this.localId;
    //   const varient = 'varient';
    //   if (this.proptype !== 'Plot') {
    //     var pageOrgin = this.propbhk + '-' + this.proptype + '-' + this.propname;
    //     // var propertyname = this.propname;
    //     this.propertyenquire = pageOrgin;
    //   }
    //   if (this.proptype === 'Plot') {
    //     // var propertyname = this.propname;
    //     var pageOrgin = this.proparea + ' ' + this.propareatype + '-' + this.proptype + '-' + this.propname;
    //     this.propertyenquire = pageOrgin;
    //   }

    //  this.Service.individuallistenq(param, this.propertyenquire, this.propname, this.propUserIDPK).subscribe(success => {
    //     if (success['status'] === 'True') {
    //       this.otploader = false;
    //       this.cancel.nativeElement.click();
    //       $('body').removeClass('bodyoverlay');
    //       swal({
    //         text: 'We Will Intimate you soon!',
    //         type: 'success',
    //         showConfirmButton: false,
    //         timer: 2500
    //       });
    //       $('#modal-container2').addClass('out');
    //       $('body').removeClass('modal-active');
    //       this.user.name = '';
    //       this.user.number = '';
    //       this.user.mail = '';
    //       this.user.otp = '';
    //       this.IsVisibleEnquery = false;
    //       $('#btn_reset2').click();
    //       $('#uname').attr('placeholder', 'Username');
    //       $('#uemail').attr('placeholder', 'Email');
    //       $('#unumber').attr('placeholder', '+91');
    //      $('#contactButton2').attr('disabled', true);
    //       // $('#exampleCheck2').attr('disabled',false); 
    //       $('#exampleCheck2').attr('checked', false); // Unchecks 
    //     } else {
    //       swal({
    //         type: 'error',
    //         title: 'Something Went Wrong',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   });
  }
  checkboxClick2() {
    if ($('#exampleCheck2').is(':checked')) {
      $('#contactButton2').removeAttr('disabled'); //enable input
      $('#contactButton2').addClass('contactButton2Active');
    } else {
      $('#contactButton2').attr('disabled', true); //disable input

      $('#contactButton2').removeClass('contactButton2Active');
      $('#contactButton2').addClass('contactButton2');
    }
  }

  hideFavAndShare: boolean = false;
  oncompareshowimgclick(propid: any, proptype: any) {

    this.hideshowcompare = true;
    if ('ComparePropID1_ReSale' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID1_ReSale', '[]');
    }

    if ('comparePropType_ReSale_1' in this.storage) {
      this.comparePropType = this.storage?.getItem('comparePropType_ReSale_1');
    } else {
      this.comparePropType = this.storage?.getItem('comparePropType_ReSale_2');
    }
    const proparray = this.storage?.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    if (this.comparePropType == null) {
      const itemToRemoveIndex = jsonpars?.indexOf(propid);
      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        if (this.compareproparray.length >= 2) {
          swal({
            text: 'Upto two properties can compare at a time',
            type: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.parsedarray.push(propid);

          this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
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
          this.storage.removeItem('comparePropType_ReSale_1');
        } else {
          this.hideshowcompare = true;
        }
        this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      }
      this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
    } else if (this.comparePropType == proptype) {
      const proparray = this.storage?.getItem('ComparePropID1_ReSale');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars?.indexOf(propid);
      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        if (this.compareproparray.length >= 2) {

          swal({
            text: 'Upto two properties can compare at a time',
            type: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.parsedarray.push(propid);
          this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
        }
      }
      else {
        this.parsedarray = this.parsedarray.filter(function (item: any) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.storage.removeItem('comparePropType_ReSale_1');
        } else {
          this.hideshowcompare = true;
        }
        this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      }
      this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
    } else {
      swal({
        text: 'Compare only with same Property Type',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    if (this.comparePropType == null || this.comparePropType == proptype) {
      if (compare1 != undefined) {
        this.Service.getindividualpropertydetails(compare1).subscribe(prop => {
          let propDetails = prop['propertydetails'];
          this.propertiesDetails = propDetails;
          this.propimag1 = this.propertiesDetails[0]['property_coverimage'];
          this.propertyname1 = this.propertiesDetails[0]['PropertyName'];
          this.propid1 = this.propertiesDetails[0]['PropertyID'];
          this.proptype1 = this.propertiesDetails[0]['PropertyType'];
          this.cityname = this.propertiesDetails[0]['City'];
          this.storage.setItem('comparePropType_ReSale_1', this.proptype1);
          this.compareloader1 = false;
          this.compareprop1 = true;
        });
      }
      if (compare2 != undefined) {
        this.Service.getindividualpropertydetails(compare2).subscribe(prop => {
          let propDetails = prop['propertydetails'];
          this.propertiesDetails = propDetails;
          this.propimag2 = this.propertiesDetails[0]['property_coverimage'];
          this.propertyname2 = this.propertiesDetails[0]['PropertyName'];
          this.propid2 = this.propertiesDetails[0]['PropertyID'];
          this.proptype2 = this.propertiesDetails[0]['PropertyType'];
          this.cityname = this.propertiesDetails[0]['City'];
          this.storage.setItem('comparePropType_ReSale_2', this.proptype2);
          this.compareloader2 = false;
          this.compareprop2 = true;
        });
      }
    }
  }
  closeprop1(propid1: any) {
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID1_ReSale' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID1_ReSale', '[]');
    }
    const proparray = this.storage?.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(propid1);
    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item: any) {
        return item !== propid1;
      });
      this.compareloader1 = true;
      this.compareprop1 = false;
      this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    }
    this.storage.removeItem('comparePropType_ReSale_1');
  }

  closeprop2(propid2: any) {
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID1_ReSale' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID1_ReSale', '[]');
    }
    const proparray = this.storage?.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(propid2);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item: any) {
        return item !== propid2;
      });
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    }
    this.storage.removeItem('comparePropType_ReSale_2');

  }
  CompareNow() {
    this.router.navigate(['/compare-properties']);
    this.storage.setItem('cityname', this.cityname);
    this.storage.setItem('page_type', 'All')


  }
  Oncompareclick() {
    this.storage.removeItem('ComparePropID');
    this.storage.removeItem('comparePropType1');
    this.storage.removeItem('comparePropType2');

    // this.Services.mouseenterservice2();
    this.compareShowonimg = this.compareShowonimg ? false : true;
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    if (this.compareproparray.length >= 1) {
      this.hideshowcompare = true;
      this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
      if (compare1 != undefined) {
        this.Service.getindividualpropertydetails(compare1).subscribe(prop => {
          let propDetails = prop['propertydetails'];
          this.propertiesDetails = propDetails;
          this.propimag1 = this.propertiesDetails[0]['property_coverimage'];
          this.propertyname1 = this.propertiesDetails[0]['PropertyName'];
          this.propid1 = this.propertiesDetails[0]['PropertyID'];
          this.compareloader1 = false;
          this.compareprop1 = true;
        });
      }
      if (compare2 != undefined) {
        this.Service.getindividualpropertydetails(compare2).subscribe(prop => {
          let propDetails = prop['propertydetails'];
          this.propertiesDetails = propDetails;
          this.propimag2 = this.propertiesDetails[0]['property_coverimage'];
          this.propertyname2 = this.propertiesDetails[0]['PropertyName'];
          this.propid2 = this.propertiesDetails[0]['PropertyID'];
          this.compareloader2 = false;
          this.compareprop2 = true;
        });
      }
    } else {
      this.hideshowcompare = false;
    }
    this.sortShowHide = false;

  }
  onReset() {
    this.chips.forEach(chip => chip.deselect());
    //   $("#matChip").on('click', 'button', function(){
    //     $(this).parent().prev().remove();
    //     $(this).parent().remove();
    // })
    IndividualCityListing.citycount = 0;
    // this.registerForm.reset({
    //   locality:'',
    // });
    this.ReadyToMoveSelect = false;
    this.UnderConstructionSelect = false;
    this.tweentylaksSelect = false;
    this.tweentylaksTosixtylakhsSelect = false;
    this.sixtylakhsToEhightylakhsSelect = false;
    this.EhightylakhsTooneCrSelect = false;
    this.minbudget_IDPK = [];
    this.maxbudget_IDPK = [];
    this.oneCrAboveCrSelect = false;
    this.localityplace = [];
    this.locality = [];
    this.projecttype = [];
    this.bhkarray = [];
    this.localityData = [];
    this.balconyarray = [];
    this.FurnishType = '';
    this.postedBy = '';
    this.doorfacings = [];
    // var amenities = this.amenities;
    this.statusid = [];
    this.bathroomarray = [];
    var dropdown = $('.ui.dropdown.commonMobileDropdown');
    $(dropdown).dropdown('clear');
    $(dropdown).dropdown('destroy');
    $(dropdown).dropdown('restore defaults');

    this.getindividuallist();

  }


  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.mouseSub) {
      this.mouseSub.unsubscribe();
    }
    // Clean up the click listener to avoid memory leaks
    // if (this.clickListener) {
    //   this.clickListener();
    // }
  }

  shareContent(propertydemo) {
    if ((window.navigator as any).share) {
      // if(propertydemo.propertyype != 'Plot'){
      (window.navigator as any)
        .share({
          title: "Homes247.in",
          text: 'Check out this amazing Property!',
          url: 'https://www.homes247.in/property/' + propertydemo.City.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo.Locality.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' + propertydemo.PropertyID,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));

    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  get shouldShowSkeleton(): boolean {
    return this.showLoader && this.propertiescount !== 0;
  }



  

  // subscription code
  elitePropertyId: any = [];
  contactingPropertyId: any[] = [];
  eliteView: boolean = false;

  contactData: { [key: string]: any } = {};

  elitePlanView(propertyId: string | number) {
    const exists = this.elitePropertyId.includes(propertyId) || this.contactingPropertyId.includes(propertyId);

    if (exists) {
      console.log('Duplicate entry — not added');
      return;
    }

    this.contactingPropertyId.push(propertyId);

    var param = {
      number: this.userNumber,
      userId: this.userId,
      propid: propertyId,
      category_id: 2
    }

    this.eliteService.detailesCard(param).subscribe(response => {
      this.contactingPropertyId = this.contactingPropertyId.filter(id => id !== propertyId);
       if (response['status'] == "True") {
        
        this.elitePropertyId.push(propertyId);
        this.contactData[String(propertyId)] = response['contacteddata'];
       
      } else {
        this.elitePlan();
      }
    }, error => {
      this.contactingPropertyId = this.contactingPropertyId.filter(id => id !== propertyId);
    })


    // if (this.elitePropertyId.length < 3) {
    //   this.elitePropertyId.push(propertyId);
    //   console.log('Added:', this.elitePropertyId);
    //   this.eliteView = true;
    //   let stored = JSON.parse(localStorage.getItem('Elite_contact') || '[]');
    //   if (!Array.isArray(stored)) {
    //     stored = [];
    //   }
    //   if (!stored.includes(propertyId)) {
    //     stored.push(propertyId);
    //   }
    //   localStorage.setItem('Elite_contact', JSON.stringify(stored));
    // } else {
    //   console.log('Cannot add more than 3. Calling elitePlan()...');
    //   this.elitePlan();
    // }


    //  this.eliteService.getContactedList(this.userId).subscribe(response => {
    //   this.contactedList = response['pro_view']
    //   this.elitePropertyId = this.contactedList.map(
    //     (item: any) => item.property_IDPK
    //   );
    //  if (this.elitePropertyId.length == 0) {

    // } else {
    //   this.eliteView = true;
    // }
    // })


  }



  // isEliteOpen = true;
  elitePlan() {
    $('#elitePlanModal').modal('show');
  }
  elitePlanRouter() {
    $('#elitePlanClose').click();
     // this.router.navigate(['/homes-elite']);
     window.location.href = 'https://hostinger.homes247.in/homes-elite#1';
  }



}


